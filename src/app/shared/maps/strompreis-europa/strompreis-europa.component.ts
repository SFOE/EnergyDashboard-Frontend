import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
    Component,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChanges
} from '@angular/core';
import {
    Feature,
    GeometryObject,
    Properties,
    centerOfMass,
    feature
} from '@turf/turf';
import { I18NextPipe } from 'angular-i18next';
import {
    Browser,
    LatLng,
    LatLngExpression,
    Layer,
    Map,
    divIcon,
    geoJSON,
    marker,
    tileLayer
} from 'leaflet';
import { Observable, Subject, takeUntil } from 'rxjs';
import { PreiseStromEuropa } from '../../../core/models/preise-strom-europa.model';
import { resolveZoneByKey, resolveZoneByValue } from './bidding-zone';
import { FixedCenterCoordinates } from './fixed-center-coordinates';

export interface Threshold {
    value: number;
    color: string;
}

@Component({
    selector: 'bfe-maps-strompreis-europa',
    standalone: true,
    templateUrl: './strompreis-europa.component.html',
    styleUrls: ['./strompreis-europa.component.scss'],
    imports: [CommonModule]
})
export class StrompreisKarteEuropa implements OnInit, OnChanges, OnDestroy {
    private destroy$ = new Subject();
    private map: Map;

    @Input() prices: PreiseStromEuropa[] | null;
    @Input() thresholds: Threshold[] | null;
    @Input() mapCenterCoordinates: LatLngExpression;
    @Input() maxZoom: number;
    @Input() minZoom: number;

    constructor(
        protected readonly http: HttpClient,
        private i18nextPipe: I18NextPipe
    ) {}

    ngOnInit(): void {
        if (this.map == undefined) {
            this.map = this.createMap();
        }

        if (this.prices && this.thresholds && this.map) {
            this.prepareMap(
                this.prices,
                this.thresholds,
                this.map,
                this.i18nextPipe
            );
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.prices && this.thresholds && this.map) {
            this.prepareMap(
                this.prices,
                this.thresholds,
                this.map,
                this.i18nextPipe
            );
        }
    }

    private prepareMap(
        prices: PreiseStromEuropa[],
        thresholds: Threshold[],
        map: Map,
        i18nextPipe: I18NextPipe
    ): void {
        prices.forEach((x) => {
            var zone = resolveZoneByKey(x.biddingZone);

            this.loadOfflineMapAsync(`assets/geojson/${zone}.geojson`)
                .pipe(takeUntil(this.destroy$))
                .subscribe((data) =>
                    this.createFeature(
                        map,
                        data,
                        prices,
                        thresholds,
                        i18nextPipe
                    ).addTo(map)
                );
        });
    }

    private createMap(): Map {
        const map = new Map('map').setView(this.mapCenterCoordinates, 2);

        tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            minZoom: this.minZoom,
            maxZoom: this.maxZoom,
            attribution:
                '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        return map;
    }

    private loadOfflineMapAsync(path: string): Observable<any> {
        return this.http.get(path);
    }

    private createFeature(
        map: Map,
        data: any,
        prices: PreiseStromEuropa[],
        thresholds: Threshold[],
        i18nextPipe: I18NextPipe
    ): any {
        function getBoersenPreis(
            biddingZoneAbbreviation: string
        ): number | null {
            return (
                prices.find(
                    (x) =>
                        x.biddingZone.toLocaleLowerCase() ===
                        resolveZoneByValue(
                            biddingZoneAbbreviation
                        ).toLocaleLowerCase()
                )?.preisEurMwhMean ?? null
            );
        }

        // # section: coloring
        function getColor(biddingZoneAbbreviation: string) {
            const price = getBoersenPreis(biddingZoneAbbreviation);
            if (price == null) {
                return '#00000000';
            }
            return thresholds
                .sort((a, b) => a.value - b.value)
                .find((x) => price <= x.value)?.color;
        }

        function style(feature: any) {
            const biddingZoneAbbreviation = feature.properties?.['zoneName'];
            return {
                fillColor: getColor(biddingZoneAbbreviation),
                weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 1
            };
        }

        // # end: coloring

        // # section: highlighting
        const zoomToFeature = (e: any) => {
            map.fitBounds(e.target.getBounds());
        };

        function onEachFeature(
            feat: Feature<GeometryObject, Properties>,
            layer: Layer
        ) {
            const name = feat.properties?.['zoneName'];
            const price = getBoersenPreis(name);

            const translatedZone = i18nextPipe.transform(
                `dashboard.preise.strom.europa.bidding-zone.${name}`
            );

            layer.on({
                mouseover: highlightFeature,
                mouseout: resetHighlight,
                click: zoomToFeature
            });

            // tooltip
            layer.bindTooltip(
                `<div class=\"leaflet-custom-tooltip\">
                    <div class=\"leaflet-custom-tooltip-header\">${translatedZone}</div>
                    <div class=\"leaflet-custom-tooltip-body\">${
                        price == null
                            ? ''
                            : price +
                              '<span class="leaflet-custom-suffix"> EUR/MWh</span>'
                    }</div>
                </div>`,
                { opacity: 1 }
            );

            let coordinates = centerOfMass(feature(feat.geometry) as any)
                .geometry.coordinates;

            const fixedFeaturePoint = FixedCenterCoordinates[name];
            if (!!fixedFeaturePoint) {
                coordinates = fixedFeaturePoint;
            }

            // label
            marker(new LatLng(coordinates[1], coordinates[0]), {
                icon: divIcon({
                    className: 'leaflet-custom-feature-label',
                    html: price == null ? '' : `<span>${price}</span>`
                })
            }).addTo(map);
        }

        function highlightFeature(e: any) {
            var layer = e.target;

            layer.setStyle({
                weight: 5,
                color: '#666',
                dashArray: '',
                fillOpacity: 0.7
            });

            if (!Browser.ie && !Browser.opera && !Browser.edge) {
                layer.bringToFront();
            }
        }

        function resetHighlight(e: any) {
            geoJson.resetStyle(e.target);
        }

        // # end: highlighting

        const geoJson = geoJSON(data, {
            style: style,
            onEachFeature: onEachFeature
        });

        return geoJson;
    }

    ngOnDestroy(): void {
        this.destroy$.next(0);
        this.destroy$.complete();
    }
}
