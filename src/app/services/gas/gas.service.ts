import { Injectable } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { DataService } from '../../core/data/data.service';
import { HistogramAreaChartEntry } from '../../core/models/charts';
import { FuellstandGasspeicherRegionWithChartEntries } from '../../core/models/gas/gas-fuellstand-gasspeicher';
import { GasImportEuropaJaehrlichEntries } from '../../core/models/gas/gas-import-eruopa-jaehrlich';
import { GasImportEuropaTrend } from '../../core/models/gas/gas-import-eruopa-trend';
import { ImportExportEntry } from '../../core/models/import-export';
import {
    SparzielAktuelleEinsparungEntryV5,
    SparzielEntry
} from '../../core/models/sparziel';
// import { DonutChartEntry } from '../../shared/diagrams/full-donut/full-donut.model';
import { convertToDate } from '../../shared/static-utils/date-utils';
import {
    mapGasImportEuropaTaeglichToChartEntry,
    mapGasImportHistoricalValueToChartEntry
} from './gas.util';
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
        SparzielAktuelleEinsparungEntryV5[]
    >;
    private cachedGasImportEuropaTrend: Observable<GasImportEuropaTrend>;

    private cachedGasImportEuropaTaeglich: Observable<
        HistogramAreaChartEntry[]
    >;
    private cachedGasImportEuropaJaerlich: Observable<GasImportEuropaJaehrlichEntries>;

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
        SparzielAktuelleEinsparungEntryV5[]
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

    getGasImportEuropaTaeglich(): Observable<HistogramAreaChartEntry[]> {
        if (!this.cachedGasImportEuropaTaeglich) {
            this.cachedGasImportEuropaTaeglich = this.dataService
                .getGasImportEuropaTaeglich()
                .pipe(
                    map((entries) =>
                        entries
                            .filter((obj) =>
                                Object.values(obj).every(
                                    (value) => value !== null
                                )
                            )
                            .map((entry) =>
                                mapGasImportEuropaTaeglichToChartEntry(entry)
                            )
                    ),
                    shareReplay(1)
                );
        }
        return this.cachedGasImportEuropaTaeglich;
    }

    getGasImportEuropaJaehrlich(): Observable<GasImportEuropaJaehrlichEntries> {
        if (!this.cachedGasImportEuropaJaerlich) {
            this.cachedGasImportEuropaJaerlich = this.dataService
                .getGasImportEuropaJaehrlich()
                .pipe(shareReplay(1));
        }
        return this.cachedGasImportEuropaJaerlich;
    }

    getGasImportEuropaTrend(): Observable<GasImportEuropaTrend> {
        if (!this.cachedGasImportEuropaTrend) {
            this.cachedGasImportEuropaTrend = this.dataService
                .getGasImportEuropaTrend()
                .pipe(shareReplay(1));
        }
        return this.cachedGasImportEuropaTrend;
    }
}
