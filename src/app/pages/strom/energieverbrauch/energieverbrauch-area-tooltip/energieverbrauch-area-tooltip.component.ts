import { Component } from '@angular/core';
import { HistogramAreaChartEntry } from '../../../../core/models/charts';
import { BaseTooltipComponent } from '../../../../shared/diagrams/tooltip/base-tooltip';
import { EnergieverbrauchChartIndex } from '../energieverbrauch-histogram-chart/energieverbrauch-histogram-chart.consts';
import { COLORS_BRUTTOENERGIE } from '../../strom.consts';

@Component({
    selector: 'bfe-energieverbrauch-area-tooltip',
    templateUrl: './energieverbrauch-area-tooltip.component.html',
    styleUrls: ['./energieverbrauch-area-tooltip.component.scss']
})
export class EnergieverbrauchAreaTooltipComponent extends BaseTooltipComponent<HistogramAreaChartEntry> {
    readonly index = EnergieverbrauchChartIndex;
    readonly colors = COLORS_BRUTTOENERGIE;
    measuringUnit: string = ' GWh';
    protected readonly COLORS_BRUTTOENERGIE = COLORS_BRUTTOENERGIE;
}
