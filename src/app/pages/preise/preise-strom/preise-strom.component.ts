import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Context } from '../../../core/models/context.enum';
import { PreiseService } from '../../../services/preise/preise.service';
import { COLOR_STROM } from '../../../shared/commons/colors.const';
import { HistogramLineEntry } from '../../../shared/diagrams/histogram/histogram-line/histogram-line.component';
import { StromFuturesColors } from '../preise.consts';

@Component({
    selector: 'bfe-preise-strom',
    templateUrl: './preise-strom.component.html',
    styleUrls: ['./preise-strom.component.scss']
})
export class PreiseStromComponent implements OnInit {
    readonly context = Context.STROM;
    readonly primaryColor = COLOR_STROM;

    currentEntryBoerse: HistogramLineEntry;
    chartDataBoerse: HistogramLineEntry[];
    isLoadingBoerse = true;

    currentEntryEndverbrauch: HistogramLineEntry;
    chartDataEndverbrauch: HistogramLineEntry[];
    isLoadingEndverbrauch = true;

    chartDataFutures: Observable<HistogramLineEntry[]>;
    colorsFutures = [
        StromFuturesColors.MonthPlusOne,
        StromFuturesColors.MonthPlusTwo,
        StromFuturesColors.QuaterPlusOne,
        StromFuturesColors.QuaterPlusTwo,
        StromFuturesColors.YearPlusOne,
        StromFuturesColors.YearPlusTwo
    ];

    constructor(private preiseService: PreiseService) {}

    ngOnInit(): void {
        this.preiseService.getPreiseStromBoerse().subscribe({
            next: (data) => {
                this.chartDataBoerse = data;
                this.currentEntryBoerse = data[data.length - 1];
            },
            error: (error) => {
                console.error(error);
            },
            complete: () => {
                this.isLoadingBoerse = false;
            }
        });

        this.preiseService.getPreiseStromEndverbrauch().subscribe({
            next: (data) => {
                this.chartDataEndverbrauch = data;
                this.currentEntryEndverbrauch = data[data.length - 1];
            },
            error: (error) => {
                console.error(error);
            },
            complete: () => {
                this.isLoadingEndverbrauch = false;
            }
        });

        this.chartDataFutures = this.preiseService.getPreiseStromFutures();
    }
}
