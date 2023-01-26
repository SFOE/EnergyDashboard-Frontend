import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, shareReplay } from 'rxjs';
import { DataService } from '../../core/data/data.service';
import { HistogramAreaChartEntry } from '../../core/models/charts';
import {
    SparzielAktuelleEinsparungEntryV2V3,
    SparzielEntry
} from '../../core/models/sparziel';
import {
    StromFuellstaendeChartEntriesByRegion,
    StromFuellstaendeSpeicherseenEntry
} from '../../core/models/strom-fuellstaende-speicherseen';
import { StromImportExportNetto } from '../../core/models/strom-import-export.netto';
import { StromVerbrauchLandesverbrauchMitPrognoseApi } from '../../core/models/strom-verbrauch.landesverbrauch-mit-prognose';
import { convertToDate } from '../../shared/static-utils/date-utils';
import {
    StromProductionData,
    StromProductionImportVerbrauchData
} from './strom.model';
import {
    mapSpeicherseeDtoToChartEntry,
    mapStromImportExportHistoricalValueToChartEntry,
    mapStromProductionImportVerbrauchDto,
    mapStromProductionToEntry,
    mapStromVerbrauchEndverbrauchToChartEntries,
    mapStromVerbrauchLandesverbrauchToChartEntries
} from './strom.util';

@Injectable({
    providedIn: 'root'
})
export class StromService {
    private cachedFuellstaendeSpeicherseen: Observable<StromFuellstaendeChartEntriesByRegion>;
    private cachedImportExportNetto: Observable<StromImportExportNetto>;
    private cachedImportExportHistoricalValues: Observable<
        HistogramAreaChartEntry[]
    >;
    private cachedStromVerbrauchLandesverbrauchMitPrognose: Observable<StromVerbrauchLandesverbrauchMitPrognoseApi>;
    private cachedStromverbrauchEndverbrauch: Observable<
        HistogramAreaChartEntry[]
    >;
    private cachedStromverbrauchLandesverbrauchVergleich: Observable<
        HistogramAreaChartEntry[]
    >;
    private cachedStromProduction$: Observable<StromProductionData>;
    private cachedStromProductionImportVerbrauch$: Observable<StromProductionImportVerbrauchData>;
    private cachedStromSparziel$: Observable<SparzielEntry>;
    private cachedStromSparzielAktuelleEinsparung$: Observable<
        SparzielAktuelleEinsparungEntryV2V3[]
    >;

    constructor(private http: HttpClient, private dataService: DataService) {}

    getFuellstaendeSpeicherseenChartEntries(): Observable<StromFuellstaendeChartEntriesByRegion> {
        if (!this.cachedFuellstaendeSpeicherseen) {
            this.cachedFuellstaendeSpeicherseen = this.dataService
                .getStromFuellstaendeSpeicherseen()
                .pipe(
                    map((data) => {
                        return Object.entries(data).reduce(
                            (accumulator, current) => {
                                const [key, data] = current;
                                const entries = data.entries.map(
                                    (dto: StromFuellstaendeSpeicherseenEntry) =>
                                        mapSpeicherseeDtoToChartEntry(dto)
                                );
                                accumulator[key] = {
                                    latestEntry: data.currentEntry,
                                    entries
                                };
                                return accumulator;
                            },
                            {} as StromFuellstaendeChartEntriesByRegion
                        );
                    }),
                    catchError((error) => {
                        console.error(error);
                        return of({} as StromFuellstaendeChartEntriesByRegion);
                    })
                );
        }

        return this.cachedFuellstaendeSpeicherseen;
    }

    getImportExportNetto(): Observable<StromImportExportNetto> {
        if (!this.cachedImportExportNetto) {
            this.cachedImportExportNetto = this.dataService
                .getStromImportExportNetto()
                .pipe(shareReplay(1));
        }
        return this.cachedImportExportNetto;
    }

    getImportExportHistoricalValues(): Observable<HistogramAreaChartEntry[]> {
        if (!this.cachedImportExportHistoricalValues) {
            this.cachedImportExportHistoricalValues = this.dataService
                .getStromImportExportHistoricalValues()
                .pipe(
                    map((entries) =>
                        entries.map((entry) =>
                            mapStromImportExportHistoricalValueToChartEntry(
                                entry
                            )
                        )
                    )
                )
                .pipe(shareReplay(1));
        }
        return this.cachedImportExportHistoricalValues;
    }

    getStromVerbrauchLandesverbrauchMitPrognose(): Observable<StromVerbrauchLandesverbrauchMitPrognoseApi> {
        if (!this.cachedStromVerbrauchLandesverbrauchMitPrognose) {
            this.cachedStromVerbrauchLandesverbrauchMitPrognose =
                this.dataService
                    .getStromVerbrauchLandesverbrauchMitPrognose()
                    .pipe(shareReplay(1));
        }
        return this.cachedStromVerbrauchLandesverbrauchMitPrognose;
    }

    getStromVerbrauchEndverbrauch(): Observable<HistogramAreaChartEntry[]> {
        if (!this.cachedStromverbrauchEndverbrauch) {
            this.cachedStromverbrauchEndverbrauch = this.dataService
                .getStromVerbrauchEndverbrauch()
                .pipe(
                    map((entries) =>
                        mapStromVerbrauchEndverbrauchToChartEntries(entries)
                    )
                )
                .pipe(shareReplay(1));
        }
        return this.cachedStromverbrauchEndverbrauch;
    }

    getStromVerbrauchLandesverbrauchVergleich(): Observable<
        HistogramAreaChartEntry[]
    > {
        if (!this.cachedStromverbrauchLandesverbrauchVergleich) {
            this.cachedStromverbrauchLandesverbrauchVergleich = this.dataService
                .getStromVerbrauchLandesverbrauchVergleich()
                .pipe(
                    map((entries) =>
                        mapStromVerbrauchLandesverbrauchToChartEntries(entries)
                    )
                )
                .pipe(shareReplay(1));
        }
        return this.cachedStromverbrauchLandesverbrauchVergleich;
    }

    getStromProduction(): Observable<StromProductionData> {
        if (!this.cachedStromProduction$) {
            this.cachedStromProduction$ = this.dataService
                .getStromProduction()
                .pipe(map(mapStromProductionToEntry), shareReplay(1));
        }
        return this.cachedStromProduction$;
    }

    getStromProductionImportVerbrauch(): Observable<StromProductionImportVerbrauchData> {
        if (!this.cachedStromProductionImportVerbrauch$) {
            this.cachedStromProductionImportVerbrauch$ = this.dataService
                .getStromProductionImportVerbrauch()
                .pipe(
                    map(mapStromProductionImportVerbrauchDto),
                    shareReplay(1)
                );
        }
        return this.cachedStromProductionImportVerbrauch$;
    }

    getSparziel(): Observable<SparzielEntry> {
        if (!this.cachedStromSparziel$) {
            this.cachedStromSparziel$ = this.dataService
                .getStromSparziel()
                .pipe(
                    map((data) => ({
                        ...data,
                        date: convertToDate(data.date)
                    })),
                    shareReplay(1)
                );
        }
        return this.cachedStromSparziel$;
    }

    getSparzielAktuelleEinsparungen(): Observable<
        SparzielAktuelleEinsparungEntryV2V3[]
    > {
        if (!this.cachedStromSparzielAktuelleEinsparung$) {
            this.cachedStromSparzielAktuelleEinsparung$ = this.dataService
                .getStromSparzielAktuelleEinsparung()
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
        return this.cachedStromSparzielAktuelleEinsparung$;
    }
}
