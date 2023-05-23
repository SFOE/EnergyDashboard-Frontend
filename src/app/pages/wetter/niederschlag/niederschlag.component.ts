import { Component, OnInit } from '@angular/core';
import { WetterService } from '../../../services/wetter/wetter.service';
import { WetterNiederschlagTrend } from '../../../core/models/wetter-niederschlag-trend';
import { COLOR_SPACE } from '../wetter.consts';

@Component({
    selector: 'bfe-niederschlag',
    templateUrl: './niederschlag.component.html',
    styleUrls: ['./niederschlag.component.scss']
})
export class NiederschlagComponent implements OnInit {
    readonly primaryColor = COLOR_SPACE;

    isLoading = true;
    trend: WetterNiederschlagTrend;

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
    }
}
