import { Component, OnInit } from '@angular/core';
import { COLOR_SPACE } from '../wetter.consts';
import { WetterNiederschlagTrend } from '../../../core/models/wetter-niederschlag-trend';
import { WetterSchneereservenTrend } from '../../../core/models/wetter-schneereserven-trend';
import { WetterService } from '../../../services/wetter/wetter.service';

@Component({
    selector: 'bfe-schneereserven',
    templateUrl: './schneereserven.component.html',
    styleUrls: ['./schneereserven.component.scss']
})
export class SchneereservenComponent implements OnInit {
    readonly primaryColor = COLOR_SPACE;

    isLoading: boolean = true;
    trend: WetterSchneereservenTrend;

    constructor(private wetterService: WetterService) {}

    ngOnInit(): void {
        this.wetterService.getSchneereservenTrend().subscribe({
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
