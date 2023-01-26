import { Component, OnInit } from '@angular/core';
import { HistogramAreaChartEntry } from '../../../core/models/charts';
import { Context } from '../../../core/models/context.enum';
import { ImportExportEntry } from '../../../core/models/import-export';
import { StromImportExportNettoEntry } from '../../../core/models/strom-import-export.netto';
import { StromService } from '../../../services/strom/strom.service';
import { COLOR_CONTEXT } from '../strom.consts';

@Component({
    selector: 'bfe-import-export',
    templateUrl: './import-export.component.html',
    styleUrls: ['./import-export.component.scss']
})
export class ImportExportComponent implements OnInit {
    readonly stromColor = COLOR_CONTEXT;

    nettoChartEntries: StromImportExportNettoEntry[];
    currentEntry: ImportExportEntry;
    historicalValuesChartEntries: HistogramAreaChartEntry[];
    context = Context.STROM;

    isLoading: boolean = true;

    constructor(private stromService: StromService) {}

    ngOnInit(): void {
        this.stromService.getImportExportHistoricalValues().subscribe({
            next: (chartEntries) => {
                this.historicalValuesChartEntries = chartEntries;
            }
        });

        this.stromService.getImportExportNetto().subscribe({
            next: ({ currentEntry, entries }) => {
                this.nettoChartEntries = entries;
                this.currentEntry = currentEntry;
                this.isLoading = false;
            },
            complete: () => (this.isLoading = false)
        });
    }
}
