import { Injectable } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { DataService } from '../../core/data/data.service';
import { HistogramAreaChartEntry } from '../../core/models/charts';
import { FuellstandGasspeicherRegionWithChartEntries } from '../../core/models/gas-fuellstand-gasspeicher';
import { ImportExportEntry } from '../../core/models/import-export';
import {
    SparzielAktuelleEinsparungEntryV4,
    SparzielEntry
} from '../../core/models/sparziel';
import { convertToDate } from '../../shared/static-utils/date-utils';
import { mapGasImportHistoricalValueToChartEntry } from './gas.util';

@Injectable({
    providedIn: 'root'
})
export class GasService {
    private cachedGasImportKarte: Observable<ImportExportEntry>;
    private cachedGasImportHistoricalValues: Observable<
        HistogramAreaChartEntry[]
    >;
    private cachedFuellstandGasspeicherRegionWithChartEntries: Observable<FuellstandGasspeicherRegionWithChartEntries>;
    private cachedSparzielZiel: Observable<SparzielEntry>;
    private cachedSparzielAktuelleEinsparung: Observable<
        SparzielAktuelleEinsparungEntryV4[]
    >;

    constructor(private dataService: DataService) {}

    getGasImportKarte() {
        if (!this.cachedGasImportKarte) {
            this.cachedGasImportKarte = this.dataService
                .getGasImportKarte()
                .pipe(shareReplay(1));
        }
        return this.cachedGasImportKarte;
    }

    getGasImportHistoricalValues(): Observable<HistogramAreaChartEntry[]> {
        if (!this.cachedGasImportHistoricalValues) {
            this.cachedGasImportHistoricalValues = this.dataService
                .getGasImportHistoricalValues()
                .pipe(
                    map((entries) =>
                        entries.map((entry) =>
                            mapGasImportHistoricalValueToChartEntry(entry)
                        )
                    )
                )
                .pipe(shareReplay(1));
        }
        return this.cachedGasImportHistoricalValues;
    }

    getFuellstandGasspeicherChartEntries(): Observable<FuellstandGasspeicherRegionWithChartEntries> {
        this.cachedFuellstandGasspeicherRegionWithChartEntries =
            this.dataService
                .getAllGasFuellstandGasspeicher()
                .pipe(shareReplay(1));
        return this.cachedFuellstandGasspeicherRegionWithChartEntries;
    }

    getSparzielZiel(): Observable<SparzielEntry> {
        if (!this.cachedSparzielZiel) {
            this.cachedSparzielZiel = this.dataService
                .getGasSparzielZiel()
                .pipe(
                    map((data) => ({
                        ...data,
                        date: convertToDate(data.date.toString())
                    })),
                    shareReplay(1)
                );
        }
        return this.cachedSparzielZiel;
    }

    getSparzielAktuelleEinsparung(): Observable<
        SparzielAktuelleEinsparungEntryV4[]
    > {
        if (!this.cachedSparzielAktuelleEinsparung) {
            this.cachedSparzielAktuelleEinsparung = this.dataService
                .getGasSparzielAktuelleEinsparung()
                .pipe(
                    map((data) =>
                        data.map((entry) => ({
                            ...entry,
                            date: convertToDate(entry.date)
                        }))
                    ),
                    shareReplay(1)
                );
        }
        return this.cachedSparzielAktuelleEinsparung;
    }
}
