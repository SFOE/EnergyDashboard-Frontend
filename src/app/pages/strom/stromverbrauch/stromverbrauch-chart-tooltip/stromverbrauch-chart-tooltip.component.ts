import { Component, Input } from '@angular/core';
import { HistogramAreaChartEntry } from '../../../../core/models/charts';
import {
    COLOR_CHART_HISTOGRAM_AREA_MIN_MAX_DOT,
    COLOR_CHART_HISTOGRAM_AREA_SECONDARY
} from '../../../../shared/commons/colors.const';
import { DiagramLegendEntry } from '../../../../shared/diagrams/diagram-legend/diagram-legend.component';
import { BaseTooltipComponent } from '../../../../shared/diagrams/tooltip/base-tooltip';

@Component({
    selector: 'bfe-stromverbrauch-chart-tooltip',
    templateUrl: './stromverbrauch-chart-tooltip.component.html',
    styleUrls: ['./stromverbrauch-chart-tooltip.component.scss']
})
export class StromverbrauchChartTooltipComponent extends BaseTooltipComponent<HistogramAreaChartEntry> {
    @Input() lineEntries: DiagramLegendEntry[];
    @Input() postfix: string;
    @Input() postfixDifference?: string;
    @Input() withSpaceBeforePostfix = false;
    @Input() withSpaceBeforePostfixDifference = false;
    @Input() isMonthly = false;

    readonly colorMinMax = COLOR_CHART_HISTOGRAM_AREA_MIN_MAX_DOT;
    readonly colorSecondary = COLOR_CHART_HISTOGRAM_AREA_SECONDARY;

    hasAnyValue() {
        let hasValue = false;
        for (let i = 1; i <= this.lineEntries.length; i++) {
            if (!!this.data?.values[i]) {
                hasValue = true;
            }
        }
        return hasValue;
    }

    showDifference() {
        return (
            this.data?.tooltipInformation?.differenzMax != null ||
            this.data?.tooltipInformation?.differenzMin != null ||
            this.data?.tooltipInformation?.differenzMittelwert != null
        );
    }
}
