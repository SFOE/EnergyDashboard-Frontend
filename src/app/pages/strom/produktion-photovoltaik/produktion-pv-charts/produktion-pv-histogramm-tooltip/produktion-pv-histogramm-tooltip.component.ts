import { Component, Input } from '@angular/core';
import { BaseTooltipComponent } from '../../../../../shared/diagrams/tooltip/base-tooltip';
import { HistogramDetailEntry } from '../../../../../shared/diagrams/histogram/histogram-detail/histogram-detail.component';

@Component({
    selector: 'bfe-produktion-pv-histogram-tooltip',
    templateUrl: './produktion-pv-histogramm-tooltip.component.html',
    styleUrls: ['./produktion-pv-histogramm-tooltip.component.scss']
})
export class ProduktionPvHistogrammTooltipComponent extends BaseTooltipComponent<HistogramDetailEntry> {
    @Input()
    barColors: string[];
}
