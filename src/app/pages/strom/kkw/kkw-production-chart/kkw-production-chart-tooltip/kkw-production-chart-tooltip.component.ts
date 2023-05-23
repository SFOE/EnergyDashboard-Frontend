import { Component } from '@angular/core';
import { StromKkwAusfall } from '../../../../../services/strom/strom.model';
import { HistogramLineEntry } from '../../../../../shared/diagrams/histogram/histogram-line/histogram-line.component';
import { BaseTooltipComponent } from '../../../../../shared/diagrams/tooltip/base-tooltip';
import { kkwColors } from '../../../strom.consts';
import { getAusfallColor } from '../../kkw.utils';

export interface ProductionChartTooltipData extends HistogramLineEntry {
    ausfaelle?: StromKkwAusfall[];
}

@Component({
    selector: 'bfe-kkw-production-chart-tooltip',
    templateUrl: './kkw-production-chart-tooltip.component.html',
    styleUrls: [
        '../../../../../shared/diagrams/tooltip/base-tooltip.scss',
        './kkw-production-chart-tooltip.component.scss'
    ]
})
export class KkwProductionChartTooltipComponent extends BaseTooltipComponent<ProductionChartTooltipData> {
    kkwColors = kkwColors;

    getAusfallColor(wasPlanned: boolean): string {
        return getAusfallColor(wasPlanned);
    }
}
