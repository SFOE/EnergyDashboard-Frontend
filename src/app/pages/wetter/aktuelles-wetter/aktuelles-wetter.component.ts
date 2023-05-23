import { Component, OnInit } from '@angular/core';
import {
    WetterTemperaturTrend,
    WetterTemperaturTrendEntry
} from '../../../core/models/wetter-temperatur-trend';
import { WetterService } from '../../../services/wetter/wetter.service';
import { COLOR_SPACE, DEFAULT_REGION } from '../wetter.consts';

@Component({
    selector: 'bfe-aktuelles-wetter',
    templateUrl: './aktuelles-wetter.component.html',
    styleUrls: ['./aktuelles-wetter.component.scss']
})
export class AktuellesWetterComponent implements OnInit {
    readonly primaryColor = COLOR_SPACE;
    isLoading = false;

    trend: WetterTemperaturTrend;

    currentTrend: WetterTemperaturTrendEntry;

    currentRegion: string;

    constructor(private wetterService: WetterService) {}

    ngOnInit(): void {
        this.wetterService.getWetterTrend().subscribe({
            next: (data) => {
                this.trend = data;
                this.changeRegion(DEFAULT_REGION);
            },
            error: (error) => {
                console.error(error);
            },
            complete: () => {
                this.isLoading = false;
            }
        });
    }

    changeRegion(region: string): void {
        this.currentRegion = region;

        if (this.trend?.values?.hasOwnProperty(region)) {
            this.currentTrend = this.trend.values[region];
        }
    }
}
