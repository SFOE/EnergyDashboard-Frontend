import { Component, Input } from '@angular/core';
import { HistogramAreaChartEntry } from '../../../../core/models/charts';
import {
    COLOR_CHART_HISTOGRAM_AREA_MIN_MAX_DOT,
    COLOR_CHART_HISTOGRAM_AREA_SECONDARY
} from '../../../commons/colors.const';
import { BaseTooltipComponent } from '../base-tooltip';

@Component({
    selector: 'bfe-histogram-chart-tooltip',
    templateUrl: './histogram-chart-tooltip.component.html',
    styleUrls: ['./histogram-chart-tooltip.component.scss']
})
export class HistogramChartTooltipComponent extends BaseTooltipComponent<HistogramAreaChartEntry> {
    @Input() primaryColor: string;
    @Input() postfix: string;
    @Input() postfixDifference?: string;
    @Input() withSpaceBeforePostfix = false;
    @Input() withWeekly = false;

    readonly colorMinMax = COLOR_CHART_HISTOGRAM_AREA_MIN_MAX_DOT;
    readonly colorSecondary = COLOR_CHART_HISTOGRAM_AREA_SECONDARY;
}
