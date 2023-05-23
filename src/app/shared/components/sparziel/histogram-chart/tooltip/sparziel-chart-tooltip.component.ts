import { Component, Input } from '@angular/core';
import { HistogramDetailEntry } from '../../../../diagrams/histogram/histogram-detail/histogram-detail.component';
import { BaseTooltipComponent } from '../../../../diagrams/tooltip/base-tooltip';

@Component({
    selector: 'bfe-sparziel-chart-tooltip',
    templateUrl: './sparziel-chart-tooltip.component.html',
    styleUrls: ['./sparziel-chart-tooltip.component.scss']
})
export class SparzielChartTooltipComponent extends BaseTooltipComponent<HistogramDetailEntry> {
    @Input() dataColors: string[];
    @Input() colorSparziel: string;
    @Input() colorTemperature: string;
    colorTemperatureTransparent: string = 'transparent';
    @Input() colorAverageUse: string;
    @Input() sparzielTarget: number;

    get isProjectedEntry(): boolean {
        return this.data?.barValues[1] !== 0 ?? false;
    }
}
