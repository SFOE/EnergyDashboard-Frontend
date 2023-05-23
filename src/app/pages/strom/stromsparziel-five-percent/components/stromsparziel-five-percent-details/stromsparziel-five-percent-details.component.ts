import { Component, OnInit } from '@angular/core';
import {
    COLOR_INDUSTRY,
    COLOR_KMU,
    COLOR_PRIVATE,
    COLOR_SAVED
} from '../../../strom.consts';
import { StromService } from '../../../../../services/strom/strom.service';
import { StromsparzielFivePercentEinsparungen } from '../../../../../core/models/strom-sparziel-five-percent.model';

@Component({
    selector: 'bfe-stromsparziel-five-percent-details',
    templateUrl: './stromsparziel-five-percent-details.component.html',
    styleUrls: ['./stromsparziel-five-percent-details.component.scss']
})
export class StromsparzielFivePercentDetailsComponent implements OnInit {
    readonly industryColor: string = COLOR_INDUSTRY;
    readonly privateColor: string = COLOR_PRIVATE;
    readonly kmuColor: string = COLOR_KMU;
    readonly savedColor: string = COLOR_SAVED;
    readonly savingsGoalGwh: number = 212;

    data: StromsparzielFivePercentEinsparungen;
    isLoading: boolean = true;
    isSavingsGoalReached: boolean;

    constructor(private stromService: StromService) {}

    ngOnInit(): void {
        this.stromService.getSparzielFivePercentEinsparungen().subscribe({
            next: (data) => {
                this.data = data;
                // this.data = {
                //     anteilIndustrie: -20,
                //     anteilPrivate: -50,
                //     anteilKMU: -30,
                //     totalSavingsGWh: 123
                // };
                this.isSavingsGoalReached =
                    this.data.anteilIndustrie +
                        this.data.anteilPrivate +
                        this.data.anteilKMU <
                    -203;
            },
            error: (error) => {
                console.error(error);
            },
            complete: () => {
                this.isLoading = false;
            }
        });
    }

    getSavingsHeight(): number {
        if (this.isSavingsGoalReached) {
            return 20;
        }

        const total = 203;

        const percentPrivate =
            (100 / total) * Math.abs(this.data.anteilPrivate);
        const percentIndustry =
            (100 / total) * Math.abs(this.data.anteilIndustrie);
        const percentKmu = (100 / total) * Math.abs(this.data.anteilKMU);

        const percent = 100 - percentPrivate - percentIndustry - percentKmu;
        return Math.round((160 / 100) * percent);
    }

    getPrivateHeight(): number {
        if (this.isSavingsGoalReached) {
            const total =
                this.data.anteilIndustrie +
                this.data.anteilPrivate +
                this.data.anteilKMU;

            const percent =
                (100 / Math.abs(total)) * Math.abs(this.data.anteilPrivate);
            return Math.round((140 / 100) * percent);
        }

        const total = this.savingsGoalGwh;

        const percent =
            (100 / Math.abs(total)) * Math.abs(this.data.anteilPrivate);
        return Math.round((160 / 100) * percent);
    }

    getIndustryHeight(): number {
        if (this.isSavingsGoalReached) {
            const total =
                this.data.anteilIndustrie +
                this.data.anteilPrivate +
                this.data.anteilKMU;

            const percent =
                (100 / Math.abs(total)) * Math.abs(this.data.anteilIndustrie);
            return Math.round((140 / 100) * percent);
        }

        const total = this.savingsGoalGwh;

        const percent =
            (100 / Math.abs(total)) * Math.abs(this.data.anteilIndustrie);
        return Math.round((160 / 100) * percent);
    }

    getKmuHeight(): number {
        if (this.isSavingsGoalReached) {
            const total =
                this.data.anteilIndustrie +
                this.data.anteilPrivate +
                this.data.anteilKMU;

            const percent =
                (100 / Math.abs(total)) * Math.abs(this.data.anteilKMU);
            return Math.round((140 / 100) * percent);
        }

        const total = this.savingsGoalGwh;

        const percent = (100 / Math.abs(total)) * Math.abs(this.data.anteilKMU);
        return Math.round((160 / 100) * percent);
    }

    getSavings(): number {
        const total =
            this.data.anteilIndustrie +
            this.data.anteilPrivate +
            this.data.anteilKMU;

        return Math.round((100 / -this.savingsGoalGwh) * total);
    }
}
