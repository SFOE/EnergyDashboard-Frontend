import { Component, Input } from '@angular/core';
import { HistogramDetailEntry } from '../../histogram/histogram-detail/histogram-detail.component';
import { BaseTooltipComponent } from '../../tooltip/base-tooltip';

import { COLOR_POSITIVE } from '../../../../shared/commons/colors.const';

export interface Sparziel {
    percent: number;
    gwh: number;
}

@Component({
    selector: 'bfe-sparziel-chart-tooltip',
    templateUrl: './sparziel-chart-tooltip.component.html',
    styleUrls: ['./sparziel-chart-tooltip.component.scss']
})
export class SparzielChartTooltipComponent extends BaseTooltipComponent<HistogramDetailEntry> {
    @Input()
    titleKey: string;

    @Input()
    projectedPercentage: number | string | null;

    @Input()
    projectedValue: string | null;

    @Input()
    achievedPercentage: number | string | null;

    @Input()
    achievedValue: number | null;

    @Input()
    weatherAdjustedPercent: number | string | null;

    @Input()
    weatherAdjustedGwh: number;

    @Input()
    achievedColor: string;

    @Input()
    target?: Sparziel;

    @Input()
    schaezung: boolean = false;

    targetColor = COLOR_POSITIVE;
}
