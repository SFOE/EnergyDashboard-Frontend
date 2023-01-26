import { Component, OnInit } from '@angular/core';
import { Context } from '../../../core/models/context.enum';
import { PreiseService } from '../../../services/preise/preise.service';
import { COLOR_OEL } from '../../../shared/commons/colors.const';
import { HistogramLineEntry } from '../../../shared/diagrams/histogram/histogram-line/histogram-line.component';

@Component({
    selector: 'bfe-preise-treibstoff',
    templateUrl: './preise-treibstoff.component.html',
    styleUrls: ['./preise-treibstoff.component.scss']
})
export class PreiseTreibstoffComponent implements OnInit {
    readonly Context = Context;
    readonly primaryColor = COLOR_OEL;
    chartDataBenzin: HistogramLineEntry[];
    currentEntryBenzin: HistogramLineEntry;
    chartDataDiesel: HistogramLineEntry[];
    currentEntryDiesel: HistogramLineEntry;

    isLoadingBenzin = true;
    isLoadingDiesel = true;

    constructor(private preiseService: PreiseService) {}

    ngOnInit(): void {
        this.preiseService.getPreiseTreibstoffBenzin().subscribe({
            next: (data) => {
                this.chartDataBenzin = data;
                this.currentEntryBenzin = data[data.length - 1];
            },
            error: (error) => {
                console.error(error);
            },
            complete: () => {
                this.isLoadingBenzin = false;
            }
        });

        this.preiseService.getPreiseTreibstoffDiesel().subscribe({
            next: (data) => {
                this.chartDataDiesel = data;
                this.currentEntryDiesel = data[data.length - 1];
            },
            error: (error) => {
                console.error(error);
            },
            complete: () => {
                this.isLoadingDiesel = false;
            }
        });
    }
}
