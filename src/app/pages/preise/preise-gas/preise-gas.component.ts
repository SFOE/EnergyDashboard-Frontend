import { Component, OnInit } from '@angular/core';
import { Context } from '../../../core/models/context.enum';
import { PreiseService } from '../../../services/preise/preise.service';
import { COLOR_GAS } from '../../../shared/commons/colors.const';
import { HistogramLineEntry } from '../../../shared/diagrams/histogram/histogram-line/histogram-line.component';

@Component({
    selector: 'bfe-preise-gas',
    templateUrl: './preise-gas.component.html',
    styleUrls: ['./preise-gas.component.scss']
})
export class PreiseGasComponent implements OnInit {
    readonly context = Context.GAS;
    readonly primaryColor = COLOR_GAS;

    currentEntryBoerse: HistogramLineEntry;
    chartDataBoerse: HistogramLineEntry[];
    isLoadingBoerse = true;

    currentEntryEndverbrauch: HistogramLineEntry;
    chartDataEndverbrauch: HistogramLineEntry[];
    isLoadingEndverbrauch = true;

    constructor(private preiseService: PreiseService) {}

    ngOnInit(): void {
        this.preiseService.getPreiseGasBoerse().subscribe({
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
    }
}
