import { Component, OnInit } from '@angular/core';
import { HistogramAreaChartEntry } from '../../../core/models/charts';
import { Context } from '../../../core/models/context.enum';
import { ImportExportEntry } from '../../../core/models/import-export';
import { GasService } from '../../../services/gas/gas.service';
import { COLOR_CONTEXT } from '../gas.consts';

@Component({
    selector: 'bfe-gas-import',
    templateUrl: './gas-import.component.html',
    styleUrls: ['./gas-import.component.scss']
})
export class GasImportComponent implements OnInit {
    currentEntry: ImportExportEntry;
    historicalValuesChartEntries: HistogramAreaChartEntry[];
    context = Context.GAS;

    isLoading: boolean;
    isLoadingHistoricalValues: boolean;
    primaryColor = COLOR_CONTEXT;

    constructor(private gasService: GasService) {}

    ngOnInit(): void {
        this.isLoading = true;
        this.isLoadingHistoricalValues = true;
        this.gasService.getGasImportHistoricalValues().subscribe({
            next: (chartEntries) => {
                this.historicalValuesChartEntries = chartEntries;
                this.isLoadingHistoricalValues = false;
            },
            complete: () => (this.isLoadingHistoricalValues = false)
        });

        this.gasService.getGasImportKarte().subscribe({
            next: (entry) => {
                this.currentEntry = entry;
                this.isLoading = false;
            },
            complete: () => (this.isLoading = false)
        });
    }
}
