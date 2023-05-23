import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Context } from '../../../core/models/context.enum';
import { PreiseService } from '../../../services/preise/preise.service';
import { COLOR_GAS } from '../../../shared/commons/colors.const';
import { HistogramLineEntry } from '../../../shared/diagrams/histogram/histogram-line/histogram-line.component';
import { GasFuturesColors } from '../preise.consts';

@Component({
    selector: 'bfe-preise-gas',
    templateUrl: './preise-gas.component.html',
    styleUrls: ['./preise-gas.component.scss']
})
export class PreiseGasComponent implements OnInit {
    readonly context = Context.GAS;
    readonly primaryColor = COLOR_GAS;

    currentEntryBoerse: HistogramLineEntry;
    chartDataDayahead: HistogramLineEntry[];
    isLoadingBoerse = true;

    currentEntryEndverbrauch: HistogramLineEntry;
    chartDataEndverbrauch: HistogramLineEntry[];
    isLoadingEndverbrauch = true;

    chartDataFutures: Observable<HistogramLineEntry[]>;
    colorsFutures = [
        GasFuturesColors.MonthPlusOne,
        GasFuturesColors.MonthPlusTwo,
        GasFuturesColors.QuaterPlusOne,
        GasFuturesColors.QuaterPlusTwo,
        GasFuturesColors.YearPlusOne,
        GasFuturesColors.YearPlusTwo
    ];

    constructor(private preiseService: PreiseService) {}

    ngOnInit(): void {
        this.preiseService.getPreiseGasDayahead().subscribe({
            next: (data) => {
                this.chartDataDayahead = data;
                this.currentEntryBoerse = data[data.length - 1];
            },
            error: (error) => {
                console.error(error);
            },
            complete: () => {
                this.isLoadingBoerse = false;
            }
        });

        this.preiseService.getPreiseGasEndverbrauch().subscribe({
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

        this.chartDataFutures = this.preiseService.getPreiseGasFutures();
    }
}
