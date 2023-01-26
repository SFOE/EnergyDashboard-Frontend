import { Component } from '@angular/core';
import { HistogramAreaChartEntry } from '../../../../../core/models/charts';
import {
    COLORS_STROM,
    COLOR_STROM
} from '../../../../../shared/commons/colors.const';
import { BaseTooltipComponent } from '../../../../../shared/diagrams/tooltip/base-tooltip';
import { ProduktionChartIndex } from '../produktion-verbrauch-histogram-chart.consts';

@Component({
    selector: 'bfe-produktion-verbrauch-historgram-chart-tooltip',
    templateUrl:
        './produktion-verbrauch-historgram-chart-tooltip.component.html',
    styleUrls: [
        './produktion-verbrauch-historgram-chart-tooltip.component.scss'
    ]
})
export class ProduktionVerbrauchHistogramTooltipComponent extends BaseTooltipComponent<HistogramAreaChartEntry> {
    readonly index = ProduktionChartIndex;
    readonly colors = COLORS_STROM;
    readonly colorStrom = COLOR_STROM;
}
