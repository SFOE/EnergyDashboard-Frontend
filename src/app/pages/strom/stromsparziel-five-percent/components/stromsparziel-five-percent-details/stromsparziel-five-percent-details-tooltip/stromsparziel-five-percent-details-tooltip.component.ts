import { Component, Input } from '@angular/core';
import { StromsparzielFivePercentEinsparungen } from '../../../../../../core/models/strom-sparziel-five-percent.model';

@Component({
    selector: 'bfe-stromsparziel-five-percent-details-tooltip',
    templateUrl: './stromsparziel-five-percent-details-tooltip.component.html',
    styleUrls: ['./stromsparziel-five-percent-details-tooltip.component.scss']
})
export class StromsparzielFivePercentDetailsTooltipComponent {
    @Input()
    data: StromsparzielFivePercentEinsparungen;

    @Input()
    industryColor: string;

    @Input()
    kmuColor: string;

    @Input()
    privateColor: string;

    @Input()
    savingsGoalGwh: number;

    getKmuPercent(): number {
        return Math.abs(this.data.totalSavingKmuPercent);
    }

    getIndustryPercent(): number {
        return Math.abs(this.data.totalSavingIndustriePercent);
    }

    getPrivatePercent(): number {
        return Math.abs(this.data.totalSavingPrivatPercent);
    }

    getSavings(): number {
        return Math.round(this.data.totalSavingsGWh);
    }
}
