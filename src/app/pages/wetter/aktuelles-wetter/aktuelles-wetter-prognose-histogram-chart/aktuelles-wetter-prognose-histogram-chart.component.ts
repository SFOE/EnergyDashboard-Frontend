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
    WetterTemperaturPrognose,
    WetterTemperaturPrognoseEntry
} from '../../../../core/models/wetter-temperatur-prognose';
import { WetterTemperaturTrendEntry } from '../../../../core/models/wetter-temperatur-trend';
import { WetterService } from '../../../../services/wetter/wetter.service';
import { DiagramLegendEntry } from '../../../../shared/diagrams/diagram-legend/diagram-legend.component';
import { LabelModifier } from '../../../../shared/diagrams/histogram/base-histogram.component';
import { HistogramLineEntry } from '../../../../shared/diagrams/histogram/histogram-line/histogram-line.component';
import { HistogramElFocusEvent } from '../../../../shared/diagrams/histogram/interactive-histogram.component';
import {
    LabelFilters,
    LabelFormatters
} from '../../../../shared/diagrams/label.utils';
import { DEFAULT_REGION, WetterConsts } from '../../wetter.consts';

@Component({
    selector: 'bfe-aktuelles-wetter-prognose-histogram-chart',
    templateUrl: './aktuelles-wetter-prognose-histogram-chart.component.html',
    styleUrls: ['./aktuelles-wetter-prognose-histogram-chart.component.scss']
})
export class AktuellesWetterPrognoseHistogramChartComponent
    implements OnInit, OnChanges
{
    @Input() currentRegion: string;
    @Input() currentTrend: WetterTemperaturTrendEntry;

    isLoading = true;
    dataPrognose: WetterTemperaturPrognose;
    chartDataPrognose: HistogramLineEntry[] = [];
    yDomainMin: number = 0;

    readonly primaryColor = WetterConsts.COLOR_CHART_PRIMARY;
    readonly consts = WetterConsts;
    readonly labelModifier: LabelModifier;
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
            labelKey: 'dashboard.wetter.diagram-legend.prognose-temperatur',
            type: 'dashed-line'
        }
    ];

    constructor(
        private wetterService: WetterService,
        translationService: TranslationService
    ) {
        this.labelModifier = {
            formatter: LabelFormatters.monthAndDay(translationService.language),
            filter: LabelFilters.none()
        };
        this.yLabelFormatter = (value: number) => `${value}°C`;
    }

    ngOnInit(): void {
        this.wetterService.getWetterPrognose().subscribe({
            next: (data) => {
                this.dataPrognose = data;
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
        if (!!changes['currentRegion'] && !!this.dataPrognose) {
            this.changeRegion(this.currentRegion);
        }
    }

    changeRegion(region: string): void {
        if (this.dataPrognose?.hasOwnProperty(region)) {
            const currentData = this.dataPrognose[region];
            this.chartDataPrognose =
                this.wetterService.mapWetterPrognoseToHistogramEntries(
                    currentData
                );
            this.calculateYDomainMin(currentData);
        }
    }

    calculateYDomainMin(currentData: WetterTemperaturPrognoseEntry[]): void {
        const allValues: number[] = currentData
            .filter((val) => val.lufttemperaturPrognose != null)
            .map((entry) => entry.lufttemperaturPrognose) as number[];
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
