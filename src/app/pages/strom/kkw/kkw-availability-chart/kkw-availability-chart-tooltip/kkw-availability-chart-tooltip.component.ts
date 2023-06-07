import { Component } from '@angular/core';
import { BaseTooltipComponent } from '../../../../../shared/diagrams/tooltip/base-tooltip';
import { kkwColors } from '../../../strom.consts';
import { StromKkwVerfuegbarkeitEntry } from '../../../../../services/strom/strom.model';
import { getAusfallColor } from '../../kkw.utils';

@Component({
    selector: 'bfe-kkw-availability-chart-tooltip',
    templateUrl: './kkw-availability-chart-tooltip.component.html',
    styleUrls: [
        '../../../../../shared/diagrams/tooltip/base-tooltip.scss',
        './kkw-availability-chart-tooltip.component.scss'
    ]
})
export class KkwAvailabilityChartTooltipComponent extends BaseTooltipComponent<StromKkwVerfuegbarkeitEntry> {
    kkwColors = kkwColors;

    getAusfallColor(wasPlanned: boolean): string {
        return getAusfallColor(wasPlanned);
    }
}
