import { Component, Input, OnInit } from '@angular/core';
import { TranslationService } from '../../../../core/i18n/translation.service';
import { HistogramAreaChartEntry } from '../../../../core/models/charts';
import { ImportExportEntry } from '../../../../core/models/import-export';
import { DiagramLegendEntry } from '../../../../shared/diagrams/diagram-legend/diagram-legend.component';
import { LabelModifier } from '../../../../shared/diagrams/histogram/base-histogram.model';
import { HistogramElFocusEvent } from '../../../../shared/diagrams/histogram/interactive-histogram.component';
import {
    LabelFilters,
    LabelFormatters
} from '../../../../shared/diagrams/label.utils';
import { GasspeicherConsts } from '../../gas.consts';

@Component({
    selector: 'bfe-gas-import-historical-values-histogram-chart',
    templateUrl:
        './gas-import-historical-values-histogram-chart.component.html',
    styleUrls: ['./gas-import-historical-values-histogram-chart.component.scss']
})
export class GasImportHistoricalValuesHistogramChartComponent
    implements OnInit
{
    @Input() chartData: HistogramAreaChartEntry[] = [];
    @Input() currentEntry: ImportExportEntry;

    readonly labelModifier: LabelModifier;
    readonly subLabelModifier: LabelModifier;

    readonly yLabelFormatter;
    readonly primaryColor = GasspeicherConsts.COLOR_CHART_PRIMARY;
    readonly bandColor = GasspeicherConsts.COLOR_CHART_MIN_MAX_RANGE;
    readonly lineChartColors = [
        GasspeicherConsts.COLOR_CHART_SECONDARY,
        this.primaryColor
    ];
    readonly lengendEntries: DiagramLegendEntry[] = [
        {
            color: this.bandColor,
            labelKey:
                'dashboard.strom.fuellstaende-speicherseen.diagram-legend.five-year-min-max',
            type: 'area'
        },
        {
            color: GasspeicherConsts.COLOR_CHART_SECONDARY,
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

    tooltipEvent?: HistogramElFocusEvent<HistogramAreaChartEntry>;

    constructor(translationService: TranslationService) {
        this.labelModifier = {
            formatter: LabelFormatters.monthShort(translationService.language),
            filter: LabelFilters.none()
        };
        this.subLabelModifier = {
            formatter: LabelFormatters.yearFull(translationService.language),
            filter: LabelFilters.januaryAndDecember()
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
