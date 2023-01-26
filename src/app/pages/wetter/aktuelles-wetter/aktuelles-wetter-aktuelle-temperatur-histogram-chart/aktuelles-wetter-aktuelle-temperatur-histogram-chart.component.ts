import {
    Component,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges
} from '@angular/core';
import { TranslationService } from '../../../../core/i18n/translation.service';
import { HistogramAreaChartEntry } from '../../../../core/models/charts';
import {
    WetterTemperaturAktuell,
    WetterTemperaturAktuellEntry
} from '../../../../core/models/wetter-temperatur-aktuell';
import { WetterTemperaturTrendEntry } from '../../../../core/models/wetter-temperatur-trend';
import { WetterService } from '../../../../services/wetter/wetter.service';
import { DiagramLegendEntry } from '../../../../shared/diagrams/diagram-legend/diagram-legend.component';
import { LabelModifier } from '../../../../shared/diagrams/histogram/base-histogram.component';
import { HistogramLineEntry } from '../../../../shared/diagrams/histogram/histogram-line/histogram-line.component';
import { HistogramElFocusEvent } from '../../../../shared/diagrams/histogram/interactive-histogram.component';
import {
    LabelFormatters,
    LabelFilters
} from '../../../../shared/diagrams/label.utils';
import { DEFAULT_REGION, WetterConsts } from '../../wetter.consts';

@Component({
    selector: 'bfe-aktuelles-wetter-aktuelle-temperatur-histogram-chart',
    templateUrl:
        './aktuelles-wetter-aktuelle-temperatur-histogram-chart.component.html',
    styleUrls: [
        './aktuelles-wetter-aktuelle-temperatur-histogram-chart.component.scss'
    ]
})
export class AktuellesWetterAktuelleTemperaturHistogramChartComponent
    implements OnInit, OnChanges
{
    @Input() currentRegion: string;
    @Input() currentTrend: WetterTemperaturTrendEntry;

    isLoading = true;
    dataAktuelleTemperatur: WetterTemperaturAktuell;
    chartDataAktuelleTemperatur: HistogramLineEntry[];
    yDomainMin: number = 0;

    readonly primaryColor = WetterConsts.COLOR_CHART_PRIMARY;
    readonly consts = WetterConsts;
    readonly labelModifier: LabelModifier;
    readonly subLabelModifier: LabelModifier;
    readonly yLabelFormatter;
    tooltipEvent?: HistogramElFocusEvent<HistogramAreaChartEntry>;

    readonly legendEntries: DiagramLegendEntry[] = [
        {
            color: WetterConsts.COLOR_CHART_MIN_MAX_RANGE,
            labelKey: 'dashboard.wetter.diagram-legend.five-year-min-max',
            type: 'area'
        },
        {
            color: WetterConsts.COLOR_CHART_SECONDARY,
            labelKey: 'dashboard.wetter.diagram-legend.normwert-temperatur',
            type: 'line'
        },
        {
            color: this.primaryColor,
            labelKey: 'dashboard.wetter.diagram-legend.aktuelle-temperatur',
            type: 'line'
        }
    ];

    constructor(
        private wetterService: WetterService,
        private translationService: TranslationService
    ) {
        this.labelModifier = {
            formatter: LabelFormatters.monthShort(translationService.language),
            filter: LabelFilters.firstOfMonthOnly()
        };
        this.subLabelModifier = {
            formatter: LabelFormatters.yearFull(translationService.language),
            filter: LabelFilters.januaryAndDecember()
        };
        this.yLabelFormatter = (value: number) => `${value}°C`;
    }

    ngOnInit(): void {
        this.wetterService.getWetterAktuell().subscribe({
            next: (data) => {
                this.dataAktuelleTemperatur = data;
                this.changeRegion(DEFAULT_REGION);
            },
            error: (error) => {
                console.error(error);
            },
            complete: () => {
                this.isLoading = false;
            }
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (!!changes['currentRegion'] && !!this.dataAktuelleTemperatur) {
            this.changeRegion(this.currentRegion);
        }
    }

    changeRegion(region: string): void {
        if (this.dataAktuelleTemperatur?.hasOwnProperty(region)) {
            const currentData = this.dataAktuelleTemperatur[region];
            this.chartDataAktuelleTemperatur =
                this.wetterService.mapWetterAktuellToHistogramEntries(
                    currentData
                );
            this.calculateYDomainMin(currentData);
        }
    }

    calculateYDomainMin(currentData: WetterTemperaturAktuellEntry[]): void {
        const allValues: number[] = currentData
            .filter((val) => val.lufttemperaturTagesmittel != null)
            .map((entry) => entry.lufttemperaturTagesmittel) as number[];
        const allMin = currentData
            .map((entry) => entry.fiveYearMin)
            .filter((val) => val != null);

        this.yDomainMin = Math.min(...allValues, ...allMin) - 2;
    }

    showLineChartTooltip(
        event: HistogramElFocusEvent<HistogramAreaChartEntry>
    ) {
        this.tooltipEvent = event;
    }

    hideTooltip(): void {
        this.tooltipEvent = undefined;
    }
}
