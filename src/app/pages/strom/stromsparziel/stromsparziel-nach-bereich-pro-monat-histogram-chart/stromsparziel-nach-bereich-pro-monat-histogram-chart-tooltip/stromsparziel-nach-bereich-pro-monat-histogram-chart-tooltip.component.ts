import { Component, Input } from '@angular/core';
import { BaseTooltipComponent } from '../../../../../shared/diagrams/tooltip/base-tooltip';
import { HistogramDetailEntry } from '../../../../../shared/diagrams/histogram/histogram-detail/histogram-detail.component';

@Component({
    selector:
        'bfe-stromsparziel-nach-bereich-pro-monat-histogram-chart-tooltip',
    templateUrl:
        './stromsparziel-nach-bereich-pro-monat-histogram-chart-tooltip.component.html',
    styleUrls: [
        './stromsparziel-nach-bereich-pro-monat-histogram-chart-tooltip.component.scss'
    ]
})
export class StromsparzielNachBereichProMonatHistogramChartTooltipComponent extends BaseTooltipComponent<HistogramDetailEntry> {
    @Input()
    barColors: string[];

    @Input()
    lineColors: string[];

    @Input()
    barLineColor: string;
}
