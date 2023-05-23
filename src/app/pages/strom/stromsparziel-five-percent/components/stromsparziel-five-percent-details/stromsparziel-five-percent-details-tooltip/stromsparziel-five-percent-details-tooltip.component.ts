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
        const total = this.savingsGoalGwh;
        return (100 / total) * Math.abs(this.data.anteilKMU);
    }

    getIndustryPercent(): number {
        const total = this.savingsGoalGwh;
        return (100 / total) * Math.abs(this.data.anteilIndustrie);
    }

    getPrivatePercent(): number {
        const total = this.savingsGoalGwh;
        return (100 / total) * Math.abs(this.data.anteilPrivate);
    }

    getSavings(): number {
        const total =
            this.data.anteilIndustrie +
            this.data.anteilPrivate +
            this.data.anteilKMU;

        return Math.round((100 / -this.savingsGoalGwh) * total);
    }
}
