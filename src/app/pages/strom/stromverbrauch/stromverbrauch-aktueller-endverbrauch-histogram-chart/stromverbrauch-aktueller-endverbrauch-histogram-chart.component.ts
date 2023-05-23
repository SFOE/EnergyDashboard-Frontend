import { Component, Input, OnInit } from '@angular/core';
import { TranslationService } from '../../../../core/i18n/translation.service';
import { HistogramAreaChartEntry } from '../../../../core/models/charts';
import {
    COLOR_CHART_HISTOGRAM_AREA_SECONDARY,
    COLOR_CHART_STROM_ADDITIONAL_LINE,
    COLOR_CHART_STROM_BAND_COLOR,
    COLOR_CHART_STROM_PRIMARY,
    COLOR_CHART_STROM_PRIMARY_AREA
} from '../../../../shared/commons/colors.const';
import { DiagramLegendEntry } from '../../../../shared/diagrams/diagram-legend/diagram-legend.component';
import { LabelModifier } from '../../../../shared/diagrams/histogram/base-histogram.model';
import { HistogramElFocusEvent } from '../../../../shared/diagrams/histogram/interactive-histogram.component';
import {
    LabelFilters,
    LabelFormatters
} from '../../../../shared/diagrams/label.utils';

@Component({
    selector: 'bfe-stromverbrauch-aktueller-endverbrauch-histogram-chart',
    templateUrl:
        './stromverbrauch-aktueller-endverbrauch-histogram-chart.component.html',
    styleUrls: [
        './stromverbrauch-aktueller-endverbrauch-histogram-chart.component.scss'
    ]
})
export class StromverbrauchAktuellerEndverbrauchHistogramChartComponent
    implements OnInit
{
    @Input() chartData: HistogramAreaChartEntry[] = [];
    @Input() currentDate: string;

    readonly yLabelFormatter;
    readonly labelModifier: LabelModifier;
    readonly primaryColor = COLOR_CHART_STROM_PRIMARY;
    readonly bandColor = COLOR_CHART_STROM_BAND_COLOR;
    readonly lineChartColors = [
        COLOR_CHART_HISTOGRAM_AREA_SECONDARY,
        this.primaryColor,
        COLOR_CHART_STROM_ADDITIONAL_LINE
    ];
    readonly lineEntries: DiagramLegendEntry[] = [
        {
            color: this.primaryColor,
            labelKey: 'dashboard.strom.verbrauch-daily.legend.usage',
            type: 'line'
        },
        {
            color: COLOR_CHART_STROM_ADDITIONAL_LINE,
            labelKey:
                'dashboard.strom.verbrauch-daily.legend.prognosis-bfe-sdsc',
            type: 'dashed-line'
        }
    ];

    readonly legendEntries: DiagramLegendEntry[] = [
        {
            color: COLOR_CHART_STROM_PRIMARY_AREA,
            labelKey: 'commons.legend.five-year-min-max',
            type: 'area'
        },
        {
            color: COLOR_CHART_HISTOGRAM_AREA_SECONDARY,
            labelKey: 'commons.legend.five-year-average',
            type: 'line'
        },
        ...this.lineEntries
    ];

    minYValue = 0;

    tooltipEvent?: HistogramElFocusEvent<HistogramAreaChartEntry>;

    constructor(translationService: TranslationService) {
        this.labelModifier = {
            formatter: LabelFormatters.monthShort(translationService.language),
            filter: LabelFilters.firstOfMonthOnly({ excludeLast: true })
        };
        this.yLabelFormatter = (value: number) => `${value} GWh`;
    }

    ngOnInit(): void {}

    showLineChartTooltip(
        event: HistogramElFocusEvent<HistogramAreaChartEntry>
    ) {
        this.tooltipEvent = event;
    }

    hideTooltip(): void {
        this.tooltipEvent = undefined;
    }
}
