import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { I18NextModule } from 'angular-i18next';
import { Observable, filter, map } from 'rxjs';
import { Context } from '../../../core/models/context.enum';
import { PreiseStromEuropaTrend } from '../../../core/models/preise-strom-europa-trend.model';
import { PreiseStromEuropa } from '../../../core/models/preise-strom-europa.model';
import { Trend, TrendRating } from '../../../core/models/trend.enum';
import { PreiseService } from '../../../services/preise/preise.service';
import { COLOR_STROM } from '../../../shared/commons/colors.const';
import { CommonsModule } from '../../../shared/commons/commons.module';
import { HideableTextSection } from '../../../shared/components/hideable-text-section/hideable-text-section.component';
import { SharedComponentsModule } from '../../../shared/components/shared-components.module';
import { TrendModule } from '../../../shared/components/trend/trend.module';
import { DiagramLegendModule } from '../../../shared/diagrams/diagram-legend/diagram-legend.module';
import { StrompreisKarteEuropa } from '../../../shared/maps/strompreis-europa/strompreis-europa.component';
import { GradientLegend } from './gradient-legend/gradient-legend.component';
import { Threshold, calcThresholds } from './threshold.model';

@Component({
    selector: 'bfe-strompreis-karte',
    standalone: true,
    templateUrl: './strompreis-karte.component.html',
    styleUrls: ['./strompreis-karte.component.scss'],
    imports: [
        CommonModule,
        SharedComponentsModule,
        DiagramLegendModule,
        StrompreisKarteEuropa,
        CommonsModule,
        I18NextModule,
        GradientLegend,
        TrendModule,
        HideableTextSection
    ]
})
export class StrompreisKarte implements OnInit {
    isLoading: Observable<boolean>;
    isLoadingTrend: Observable<boolean>;

    readonly context = Context.STROM;
    readonly primaryColor = COLOR_STROM;

    legend: Observable<string[]>;
    prices: Observable<PreiseStromEuropa[]>;
    trend: PreiseStromEuropaTrend = {
        id: 'id',
        date: '1970-01-01',
        value: 1337,
        trend: Trend.NEUTRAL,
        rating: TrendRating.NEUTRAL
    };
    thresholds: Observable<Threshold[]>;
    updatedAt: Observable<string>;

    // https://www.energy-charts.info/
    colors: string[] = [
        '#006837',
        '#1a9850',
        '#66bd63',
        '#a6d96a',
        '#d9ef8b',
        '#ffffbf',
        '#fee08b',
        '#fdae61',
        '#f46d43',
        '#d73027',
        '#a50026'
    ];

    constructor(private readonly preisService: PreiseService) {}

    ngOnInit(): void {
        this.prices = this.preisService.getPreiseStromEuropa().pipe(
            map((prices) => {
                return prices.sort(
                    (a, b) => a.preisEurMwhMean - b.preisEurMwhMean
                );
            })
        );

        this.isLoading = this.prices.pipe(
            filter((x) => x !== null && x !== undefined),
            map((x) => !x)
        );

        this.updatedAt = this.prices.pipe(map((x) => x[0].date));

        this.thresholds = this.prices.pipe(
            map((prices) =>
                calcThresholds(
                    prices[0].preisEurMwhMean,
                    prices[prices.length - 1].preisEurMwhMean,
                    this.colors
                )
            )
        );

        this.legend = this.prices.pipe(
            map((prices) => {
                const min = +prices[0].preisEurMwhMean;
                const max = +prices[prices.length - 1].preisEurMwhMean;
                const mid = +(min + max) / 2;
                return [min.toFixed(2), mid.toFixed(2), max.toFixed(2)];
            })
        );

        const trend = this.preisService.getPreiseStromEuropaTrend();

        trend.subscribe((data) => {
            this.trend = data;
        });

        this.isLoadingTrend = trend.pipe(
            filter((x) => x !== null && x !== undefined),
            map((x) => !x)
        );
    }
}
