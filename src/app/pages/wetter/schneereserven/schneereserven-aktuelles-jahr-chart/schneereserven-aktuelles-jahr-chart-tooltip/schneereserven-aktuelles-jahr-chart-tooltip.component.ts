import { Component, Input } from '@angular/core';
import { BaseTooltipComponent } from '../../../../../shared/diagrams/tooltip/base-tooltip';
import { HistogramAreaChartEntry } from '../../../../../core/models/charts';

@Component({
    selector: 'bfe-schneereserven-aktuelles-jahr-chart-tooltip',
    templateUrl: './schneereserven-aktuelles-jahr-chart-tooltip.component.html',
    styleUrls: ['./schneereserven-aktuelles-jahr-chart-tooltip.component.scss']
})
export class SchneereservenAktuellHistogramChartTooltipComponent extends BaseTooltipComponent<HistogramAreaChartEntry> {
    @Input()
    colors: string[];
}
