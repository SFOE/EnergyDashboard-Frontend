import { Component, Input } from '@angular/core';
import { HistogramLineEntry } from 'src/app/shared/diagrams/histogram/histogram-line/histogram-line.component';
import { BaseTooltipComponent } from 'src/app/shared/diagrams/tooltip/base-tooltip';

@Component({
    selector: 'bfe-entkoppelung-endenergieverbrauch-bip-chart-tooltip',
    templateUrl:
        './entkoppelung-endenergieverbrauch-bip-chart-tooltip.component.html',
    styleUrls: [
        '../../../../../shared/diagrams/tooltip/base-tooltip.scss',
        './entkoppelung-endenergieverbrauch-bip-chart-tooltip.component.scss'
    ]
})
export class EntkoppelungEndenergieverbrauchBipChartTooltipComponent extends BaseTooltipComponent<HistogramLineEntry> {
    @Input() labels: string[];
    @Input() colors: string[];
    @Input() postfix: string = '';
}
