import { Component, Input } from '@angular/core';
import { HistogramAreaChartEntry } from '../../../../core/models/charts';
import { DiagramLegendEntry } from '../../../../shared/diagrams/diagram-legend/diagram-legend.component';
import { BaseTooltipComponent } from '../../../../shared/diagrams/tooltip/base-tooltip';

@Component({
    selector: 'bfe-preise-tooltip',
    templateUrl: './preise-tooltip.component.html',
    styleUrls: ['./preise-tooltip.component.scss']
})
export class PreiseTooltipComponent extends BaseTooltipComponent<HistogramAreaChartEntry> {
    @Input() lineEntries: DiagramLegendEntry[];
    @Input() postfix: string;
    @Input() withSpaceBeforePostfix = false;
    @Input() isMonthly = false;
}
