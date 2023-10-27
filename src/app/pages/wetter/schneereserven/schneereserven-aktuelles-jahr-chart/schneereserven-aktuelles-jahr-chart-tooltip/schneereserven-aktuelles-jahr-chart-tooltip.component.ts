import { Component, Input } from '@angular/core';
import { HistogramAreaChartEntry } from '../../../../../core/models/charts';
import { COLOR_CHART_HISTOGRAM_AREA_MIN_MAX_DOT } from '../../../../../shared/commons/colors.const';
import { BaseTooltipComponent } from '../../../../../shared/diagrams/tooltip/base-tooltip';
@Component({
    selector: 'bfe-schneereserven-aktuelles-jahr-chart-tooltip',
    templateUrl: './schneereserven-aktuelles-jahr-chart-tooltip.component.html',
    styleUrls: ['./schneereserven-aktuelles-jahr-chart-tooltip.component.scss']
})
export class SchneereservenAktuellHistogramChartTooltipComponent extends BaseTooltipComponent<HistogramAreaChartEntry> {
    @Input()
    colors: string[];
    readonly colorMinMax = COLOR_CHART_HISTOGRAM_AREA_MIN_MAX_DOT;
}
