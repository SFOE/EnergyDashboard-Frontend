import { Component, Input } from '@angular/core';
import { BaseTooltipComponent } from '../../../../../shared/diagrams/tooltip/base-tooltip';
import { HistogramDetailEntry } from '../../../../../shared/diagrams/histogram/histogram-detail/histogram-detail.component';

@Component({
    selector: 'bfe-niederschlag-aktuell-histogram-chart-tooltip',
    templateUrl:
        './niederschlag-aktuell-histogram-chart-tooltip.component.html',
    styleUrls: ['./niederschlag-aktuell-histogram-chart-tooltip.component.scss']
})
export class NiederschlagAktuellHistogramChartTooltipComponent extends BaseTooltipComponent<HistogramDetailEntry> {
    @Input()
    barColors: string[];
}
