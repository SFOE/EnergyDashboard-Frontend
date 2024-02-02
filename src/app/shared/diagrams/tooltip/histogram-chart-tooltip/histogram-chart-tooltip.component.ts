import { Component, Input } from '@angular/core';
import { HistogramAreaChartEntry } from '../../../../core/models/charts';
import {
    COLOR_CHART_HISTOGRAM_AREA_MIN_MAX_DOT,
    COLOR_CHART_HISTOGRAM_AREA_SECONDARY
} from '../../../commons/colors.const';
import { BaseTooltipComponent } from '../base-tooltip';

export interface HistogramChartTooltipEntry {
    color: string;
    label: string;
}

@Component({
    selector: 'bfe-histogram-chart-tooltip',
    templateUrl: './histogram-chart-tooltip.component.html',
    styleUrls: ['./histogram-chart-tooltip.component.scss']
})
export class HistogramChartTooltipComponent extends BaseTooltipComponent<HistogramAreaChartEntry> {
    @Input() primaryColor: string;
    @Input() postfix: string;
    @Input() postfixDifference?: string;
    @Input() postfixAbsoluteValue?: string;
    @Input() withSpaceBeforePostfix = false;
    @Input() withWeekly = false;

    @Input() entries: HistogramChartTooltipEntry[] = [];

    @Input() currentLabel =
        'dashboard.strom.fuellstaende-speicherseen.tooltip.current-percentage';
    @Input() bandMinLabel =
        'dashboard.strom.fuellstaende-speicherseen.tooltip.differenz-min-percentage';
    @Input() bandMaxLabel =
        'dashboard.strom.fuellstaende-speicherseen.tooltip.differenz-max-percentage';
    @Input() bandMeanLabel =
        'dashboard.strom.fuellstaende-speicherseen.tooltip.differenz-mittelwert-percentage';

    readonly colorMinMax = COLOR_CHART_HISTOGRAM_AREA_MIN_MAX_DOT;
    readonly colorSecondary = COLOR_CHART_HISTOGRAM_AREA_SECONDARY;
    suffix: string;
    diffSuffix: string;
    absoluteSuffix: string;

    ngOnInit(): void {
        this.suffix = (this.withSpaceBeforePostfix ? ' ' : '') + this.postfix;
        this.absoluteSuffix = (this.withSpaceBeforePostfix ? ' ' : '') +
        (this.postfixAbsoluteValue ?? this.postfix);
        this.diffSuffix =
            (this.withSpaceBeforePostfix ? ' ' : '') +
            (this.postfixDifference ?? this.postfix);
    }
    hasCurrentValues() {
        return this.data?.values[1] || this.data?.absoluteValue;
    }
    hasDifference() {
        return (
            this.data?.tooltipInformation?.differenzMax != null ||
            this.data?.tooltipInformation?.differenzMin != null ||
            this.data?.tooltipInformation?.differenzMittelwert != null
        );
    }
}
