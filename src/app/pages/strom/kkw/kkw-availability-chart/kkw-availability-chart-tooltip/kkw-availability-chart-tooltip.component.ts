import { Component, Input } from '@angular/core';
import { StromKkwVerfuegbarkeitHistogramDetailEntry } from '../../../../../services/strom/strom.model';
import { BaseTooltipComponent } from '../../../../../shared/diagrams/tooltip/base-tooltip';
import { kkwColors } from '../../../strom.consts';

@Component({
    selector: 'bfe-kkw-availability-chart-tooltip',
    templateUrl: './kkw-availability-chart-tooltip.component.html',
    styleUrls: [
        '../../../../../shared/diagrams/tooltip/base-tooltip.scss',
        './kkw-availability-chart-tooltip.component.scss'
    ]
})
export class KkwAvailabilityChartTooltipComponent extends BaseTooltipComponent<StromKkwVerfuegbarkeitHistogramDetailEntry> {
    @Input()
    showNumberOfOutages: boolean;

    kkwColors = kkwColors;

    plannedOutageColor = kkwColors.COLOR_KKW_OUTAGE_PLANNED;
    unplannedOutageColor = kkwColors.COLOR_KKW_OUTAGE_UNPLANNED;

    getPlannedOutagesCount(): number {
        return this.data?.outages.filter((e) => e.wasPlanned).length ?? 0;
    }

    getUnplannedOutagesCount(): number {
        return this.data?.outages.filter((e) => !e.wasPlanned).length ?? 0;
    }

    getOutagesToDisplay() {
        if (this.showNumberOfOutages) {
            return [];
        } else {
            return this.data?.outages;
        }
    }
}
