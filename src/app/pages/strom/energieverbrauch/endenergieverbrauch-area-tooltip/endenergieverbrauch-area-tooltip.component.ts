import { Component } from '@angular/core';
import { HistogramAreaChartEntry } from '../../../../core/models/charts';
import { BaseTooltipComponent } from '../../../../shared/diagrams/tooltip/base-tooltip';
import { EndenergieverbrauchChartIndex } from '../endenergieverbrauch-histogram-chart/endenergieverbrauch-histogram-chart.consts';
import { COLORS_ENDENERGIE } from '../../strom.consts';

@Component({
    selector: 'bfe-endenergieverbrauch-area-tooltip',
    templateUrl: './endenergieverbrauch-area-tooltip.component.html',
    styleUrls: ['./endenergieverbrauch-area-tooltip.component.scss']
})
export class EndenergieverbrauchAreaTooltipComponent extends BaseTooltipComponent<HistogramAreaChartEntry> {
    readonly index = EndenergieverbrauchChartIndex;
    readonly colors = COLORS_ENDENERGIE;
    measuringUnit: string = ' GWh';
    protected readonly COLORS_ENDENERGIE = COLORS_ENDENERGIE;
}
