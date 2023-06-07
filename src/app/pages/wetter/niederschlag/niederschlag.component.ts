import { Component, OnInit } from '@angular/core';
import { WetterService } from '../../../services/wetter/wetter.service';
import { WetterNiederschlagTrend } from '../../../core/models/wetter-niederschlag-trend';
import { COLOR_SPACE } from '../wetter.consts';
import { monthToTranslationKey } from '../../../shared/static-utils/date-utils';

@Component({
    selector: 'bfe-niederschlag',
    templateUrl: './niederschlag.component.html',
    styleUrls: ['./niederschlag.component.scss']
})
export class NiederschlagComponent implements OnInit {
    readonly primaryColor = COLOR_SPACE;

    isLoading = true;
    trend: WetterNiederschlagTrend;
    currentMonthTranslationKey: string;
    lastMonthTranslationKey: string;

    constructor(private wetterService: WetterService) {}

    ngOnInit(): void {
        this.wetterService.getNiederschlagTrend().subscribe({
            next: (data) => {
                this.trend = data;
            },
            error: (error) => {
                console.error(error);
            },
            complete: () => {
                this.isLoading = false;
            }
        });

        const currentMonthIndex = new Date().getMonth();
        this.currentMonthTranslationKey =
            monthToTranslationKey(currentMonthIndex);
        this.lastMonthTranslationKey =
            currentMonthIndex === 0
                ? monthToTranslationKey(11)
                : monthToTranslationKey(currentMonthIndex - 1);
    }
}
