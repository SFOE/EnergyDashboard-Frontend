import { Component, OnInit } from '@angular/core';
import { HistogramAreaChartEntry } from '../../../core/models/charts';
import { Context } from '../../../core/models/context.enum';
import { ImportExportEntry } from '../../../core/models/import-export';
import { Trend, TrendRating } from '../../../core/models/trend.enum';
import { GasService } from '../../../services/gas/gas.service';
import { COLOR_CONTEXT } from '../gas.consts';

@Component({
    selector: 'bfe-gas-import',
    templateUrl: './gas-import.component.html',
    styleUrls: ['./gas-import.component.scss']
})
export class GasImportComponent implements OnInit {
    currentEntry: ImportExportEntry = {
        date: new Date(),
        import: {
            at: 1337,
            de: 1337,
            fr: 1337,
            it: 1337
        },
        export: {
            at: 1337,
            de: 1337,
            fr: 1337,
            it: 1337
        },
        nettoImportCH: 1337,
        trend: Trend.NEUTRAL,
        trendRating: TrendRating.NEUTRAL
    };
    historicalValuesChartEntries: HistogramAreaChartEntry[];
    context = Context.GAS;

    isLoading: boolean = true;
    isLoadingHistoricalValues: boolean = true;
    primaryColor = COLOR_CONTEXT;

    constructor(private gasService: GasService) {}

    ngOnInit(): void {
        this.gasService.getGasImportHistoricalValues().subscribe({
            next: (chartEntries) => {
                this.historicalValuesChartEntries = chartEntries;
            },
            complete: () => (this.isLoadingHistoricalValues = false)
        });

        this.gasService.getGasImportKarte().subscribe({
            next: (entry) => {
                this.currentEntry = entry;
            },
            complete: () => (this.isLoading = false)
        });
    }
}
