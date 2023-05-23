import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { TranslationService } from '../../../../core/i18n/translation.service';
import { HistogramAreaChartEntry } from '../../../../core/models/charts';
import { ImportExportEntry } from '../../../../core/models/import-export';
import {
    COLOR_CHART_HISTOGRAM_AREA_SECONDARY,
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
    selector: 'bfe-import-export-historical-values-histogram-chart',
    templateUrl:
        './import-export-historical-values-histogram-chart.component.html',
    styleUrls: [
        './import-export-historical-values-histogram-chart.component.scss'
    ]
})
export class ImportExportHistoricalValuesHistogramChartComponent
    implements OnInit, OnChanges
{
    @Input() chartData: HistogramAreaChartEntry[] = [];
    @Input() currentEntry: ImportExportEntry;

    readonly labelModifier: LabelModifier;
    readonly subLabelModifier: LabelModifier;
    readonly yLabelFormatter;
    readonly primaryColor = COLOR_CHART_STROM_PRIMARY;
    readonly bandColor = COLOR_CHART_STROM_BAND_COLOR;
    readonly lineChartColors = [
        COLOR_CHART_HISTOGRAM_AREA_SECONDARY,
        this.primaryColor
    ];
    readonly lengendEntries: DiagramLegendEntry[] = [
        {
            color: COLOR_CHART_STROM_PRIMARY_AREA,
            labelKey:
                'dashboard.strom.fuellstaende-speicherseen.diagram-legend.five-year-min-max',
            type: 'area'
        },
        {
            color: COLOR_CHART_HISTOGRAM_AREA_SECONDARY,
            labelKey:
                'dashboard.strom.fuellstaende-speicherseen.diagram-legend.five-year-average',
            type: 'line'
        },
        {
            color: this.primaryColor,
            labelKey: 'commons.legend.latest',
            type: 'line'
        }
    ];

    minYValue = 0;

    tooltipEvent?: HistogramElFocusEvent<HistogramAreaChartEntry>;

    constructor(translationService: TranslationService) {
        this.labelModifier = {
            formatter: LabelFormatters.monthShort(translationService.language),
            filter: LabelFilters.firstWeekOfMonth({ excludeLast: true })
        };
        this.subLabelModifier = {
            formatter: LabelFormatters.yearFull(translationService.language),
            filter: LabelFilters.januaryAndDecember()
        };
        this.yLabelFormatter = (value: number) => `${value} GWh`;
    }

    ngOnInit(): void {}

    ngOnChanges() {
        if (this.chartData) {
            this.minYValue = Math.min(
                ...this.chartData.map((entry) => entry.band?.lower || 0)
            );
            this.minYValue = this.minYValue * 1.1;
        }
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
