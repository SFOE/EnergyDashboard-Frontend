import { Component, OnInit } from '@angular/core';
import { StromsparzielFivePercentEinsparungen } from '../../../../../core/models/strom-sparziel-five-percent.model';
import { StromService } from '../../../../../services/strom/strom.service';
import {
    COLOR_INDUSTRY,
    COLOR_KMU,
    COLOR_PRIVATE,
    COLOR_SAVED
} from '../../../strom.consts';

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
                //     totalSavingIndustriePercent: -20,
                //     totalSavingPrivatPercent: -50,
                //     totalSavingKmuPercent: -30,
                //     totalSavingsGWh: 123
                // };
            },
            error: (error) => {
                console.error(error);
            },
            complete: () => {
                this.isLoading = false;
            }
        });
    }

    getPrivateHeight(): number {
        let percent = Math.abs(this.data.totalSavingPrivatPercent);
        return Math.round((140 / 100) * percent);
    }

    getIndustryHeight(): number {
        const percent = Math.abs(this.data.totalSavingIndustriePercent);
        return Math.round((140 / 100) * percent);
    }

    getKmuHeight(): number {
        const percent = Math.abs(this.data.totalSavingKmuPercent);
        return Math.round((140 / 100) * percent);
    }

    getSavings(): number {
        return Math.round(this.data.totalSavingsGWh);
    }
}
