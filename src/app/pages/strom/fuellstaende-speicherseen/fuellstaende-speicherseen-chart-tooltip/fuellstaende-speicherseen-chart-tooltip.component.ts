import { Component, Input } from '@angular/core';
import { StromFuellstaendeChartHistogramAreaChartEntry } from '../../../../core/models/strom-fuellstaende-speicherseen';
import {
    COLOR_CHART_HISTOGRAM_AREA_MIN_MAX_DOT,
    COLOR_CHART_HISTOGRAM_AREA_SECONDARY
} from '../../../../shared/commons/colors.const';
import { BaseTooltipComponent } from '../../../../shared/diagrams/tooltip/base-tooltip';
import { SpeicherseenConsts } from '../../strom.consts';

@Component({
    selector: 'bfe-fuellstaende-speicherseen-chart-tooltip',
    templateUrl: './fuellstaende-speicherseen-chart-tooltip.component.html',
    styleUrls: ['./fuellstaende-speicherseen-chart-tooltip.component.scss']
})
export class FuellstaendeSpeicherseenChartTooltipComponent extends BaseTooltipComponent<StromFuellstaendeChartHistogramAreaChartEntry> {
    @Input() primaryColor: string;
    @Input() postfix: string;
    @Input() postfixDifference?: string;
    @Input() withSpaceBeforePostfix = false;
    @Input() isRegionTotalCH = false;

    readonly colorMinMax = COLOR_CHART_HISTOGRAM_AREA_MIN_MAX_DOT;
    readonly colorMinimumWithReserves =
        SpeicherseenConsts.COLOR_CHART_MINIMUM_WITH_RESERVES;
    readonly colorHistoricalMinimum =
        SpeicherseenConsts.COLOR_CHART_HISTORICAL_MINIMUM;
    readonly colorSecondary = COLOR_CHART_HISTOGRAM_AREA_SECONDARY;
}
