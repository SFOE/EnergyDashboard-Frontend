import { Component, Input } from '@angular/core';

@Component({
    selector: 'bfe-sparziel-chart-tooltip',
    templateUrl: './sparziel-chart-tooltip.component.html',
    styleUrls: ['./sparziel-chart-tooltip.component.scss']
})
export class SparzielChartTooltipComponent {
    @Input()
    titleKey: string;

    @Input()
    alreadySaved: number;

    @Input()
    projectedPercentage: number;

    @Input()
    achievedPercentage: number;

    @Input()
    target: string;

    @Input()
    weatherAdjustedPercent: number;
}
