import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, shareReplay } from 'rxjs';
import { DataService } from '../../core/data/data.service';
import { HistogramAreaChartEntry } from '../../core/models/charts';
import {
    SparzielAktuelleEinsparungEntryV4,
    SparzielEntry,
    SparzielNachBereichAktuellerMonat,
    SparzielNachBereichProMonat,
    SparzielZielNachBereichAktuellerMonat
} from '../../core/models/sparziel';
import {
    StromFuellstaendeChartEntriesByRegion,
    StromFuellstaendeSpeicherseenEntry
} from '../../core/models/strom-fuellstaende-speicherseen';
import { StromImportExportNetto } from '../../core/models/strom-import-export.netto';
import { StromVerbrauchLandesverbrauchMitPrognoseApi } from '../../core/models/strom-verbrauch.landesverbrauch-mit-prognose';
import { convertToDate } from '../../shared/static-utils/date-utils';
import {
    StromKkwProductionData,
    StromKkwVerfuegbarkeitData,
    StromProductionData,
    StromProductionImportVerbrauchData
} from './strom.model';
import {
    mapSpeicherseeDtoToChartEntry,
    mapStromImportExportHistoricalValueToChartEntry,
    mapStromKkwAusfaelle,
    mapStromKkwProductionDtoToEntry,
    mapStromProductionImportVerbrauchDto,
    mapStromProductionToEntry,
    mapStromVerbrauchEndverbrauchToChartEntries,
    mapStromVerbrauchLandesverbrauchToChartEntries
} from './strom.util';
import {
    StromsparzielFivePercentEinsparungen,
    StromsparzielFivePercentPeakHoursModel
} from '../../core/models/strom-sparziel-five-percent.model';

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
        SparzielAktuelleEinsparungEntryV4[]
    >;
    private cachedStromSparzielFivePercentPeakstunden$: Observable<
        StromsparzielFivePercentPeakHoursModel[]
    >;
    private cachedStromSparzielFivePercentEinsparungen$: Observable<StromsparzielFivePercentEinsparungen>;
    private cachedStromSparzielNachBereichProMonat$: Observable<
        SparzielNachBereichProMonat[]
    >;
    private cachedStromSparzielNachBereichAktuellerMonat$: Observable<
        SparzielNachBereichAktuellerMonat[]
    >;
    private cachedStromSparzielZielNachBereichAktuellerMonat$: Observable<SparzielZielNachBereichAktuellerMonat>;
    private cachedStromKkwProduktionCh$: Observable<StromKkwProductionData>;
    private cachedStromKkwProduktionFr$: Observable<StromKkwProductionData>;
    private cachedStromKkwVerfuegbarkeitCh$: Observable<StromKkwVerfuegbarkeitData>;
    private cachedStromKkwVerfuegbarkeitFr$: Observable<StromKkwVerfuegbarkeitData>;

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
                        date: convertToDate(data.date.toString())
                    })),
                    shareReplay(1)
                );
        }
        return this.cachedStromSparziel$;
    }

    getSparzielAktuelleEinsparungen(): Observable<
        SparzielAktuelleEinsparungEntryV4[]
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

    getSparzielNachBereichProMonat(): Observable<
        SparzielNachBereichProMonat[]
    > {
        if (!this.cachedStromSparzielNachBereichProMonat$) {
            this.cachedStromSparzielNachBereichProMonat$ = this.dataService
                .getStromNachBereichProMonat()
                .pipe(
                    map((data) =>
                        data.map((entry) => ({
                            ...entry,
                            date: convertToDate(entry.date.toString())
                        }))
                    ),
                    shareReplay(1)
                );
        }
        return this.cachedStromSparzielNachBereichProMonat$;
    }

    getSparzielZielNachBereichAktuellerMonat(): Observable<SparzielZielNachBereichAktuellerMonat> {
        if (!this.cachedStromSparzielZielNachBereichAktuellerMonat$) {
            this.cachedStromSparzielZielNachBereichAktuellerMonat$ =
                this.dataService
                    .getSparzielZielNachBereichAktuellerMonat()
                    .pipe(
                        map(
                            (entry) => ({
                                ...entry,
                                date: convertToDate(entry.date.toString())
                            }),
                            shareReplay(1)
                        )
                    );
        }
        return this.cachedStromSparzielZielNachBereichAktuellerMonat$;
    }

    getSparzielNachBereichAktuellerMonat(): Observable<
        SparzielNachBereichAktuellerMonat[]
    > {
        if (!this.cachedStromSparzielNachBereichAktuellerMonat$) {
            this.cachedStromSparzielNachBereichAktuellerMonat$ =
                this.dataService.getStromNachBereichAktuellerMonat().pipe(
                    map((data) =>
                        data.map((entry) => ({
                            ...entry,
                            date: convertToDate(entry.date.toString())
                        }))
                    ),
                    shareReplay(1)
                );
        }
        return this.cachedStromSparzielNachBereichAktuellerMonat$;
    }

    getSparzielFivePercentPeakstunden(): Observable<
        StromsparzielFivePercentPeakHoursModel[]
    > {
        if (!this.cachedStromSparzielFivePercentPeakstunden$) {
            this.cachedStromSparzielFivePercentPeakstunden$ = this.dataService
                .getStromSparziel5PercentPeakHours()
                .pipe(shareReplay(1));
        }

        return this.cachedStromSparzielFivePercentPeakstunden$;
    }

    getSparzielFivePercentEinsparungen(): Observable<StromsparzielFivePercentEinsparungen> {
        if (!this.cachedStromSparzielFivePercentEinsparungen$) {
            this.cachedStromSparzielFivePercentEinsparungen$ = this.dataService
                .getStromSparziel5PercentEinsparungen()
                .pipe(shareReplay(1));
        }

        return this.cachedStromSparzielFivePercentEinsparungen$;
    }

    getKkwProductionCh(): Observable<StromKkwProductionData> {
        if (!this.cachedStromKkwProduktionCh$) {
            this.cachedStromKkwProduktionCh$ = this.dataService
                .getStromKkwProduktionCh()
                .pipe(
                    map((data) => {
                        const ausfaelle = mapStromKkwAusfaelle(data.ausfaelle);
                        return {
                            entries: data.entries.map((entry) =>
                                mapStromKkwProductionDtoToEntry(
                                    entry,
                                    ausfaelle
                                )
                            ),
                            ausfaelle
                        };
                    }),
                    shareReplay(1)
                );
        }

        return this.cachedStromKkwProduktionCh$;
    }

    getKkwProductionFr(): Observable<StromKkwProductionData> {
        if (!this.cachedStromKkwProduktionFr$) {
            this.cachedStromKkwProduktionFr$ = this.dataService
                .getStromKkwProduktionFr()
                .pipe(
                    map((data) => {
                        const ausfaelle = mapStromKkwAusfaelle(data.ausfaelle);
                        return {
                            entries: data.entries.map((entry) =>
                                mapStromKkwProductionDtoToEntry(
                                    entry,
                                    ausfaelle,
                                    true
                                )
                            ),
                            ausfaelle
                        };
                    }),
                    shareReplay(1)
                );
        }

        return this.cachedStromKkwProduktionFr$;
    }

    getKkwVerfuegbarkeitCh(): Observable<StromKkwVerfuegbarkeitData> {
        if (!this.cachedStromKkwVerfuegbarkeitCh$) {
            this.cachedStromKkwVerfuegbarkeitCh$ = this.dataService
                .getStromKkwVerfuegbarkeitCh()
                .pipe(
                    map((data) => this.mapKkwVerfuegbarkeit(data)),
                    shareReplay(1)
                );
        }

        return this.cachedStromKkwVerfuegbarkeitCh$;
    }

    getKkwVerfuegbarkeitFr(): Observable<StromKkwVerfuegbarkeitData> {
        if (!this.cachedStromKkwVerfuegbarkeitFr$) {
            this.cachedStromKkwVerfuegbarkeitFr$ = this.dataService
                .getStromKkwVerfuegbarkeitFr()
                .pipe(
                    map((data) => this.mapKkwVerfuegbarkeit(data)),
                    shareReplay(1)
                );
        }

        return this.cachedStromKkwVerfuegbarkeitFr$;
    }

    mapKkwVerfuegbarkeit(data: StromKkwVerfuegbarkeitData) {
        let entry: StromKkwVerfuegbarkeitData = {
            entries: data.entries.map((u) => ({
                ...u,
                date: convertToDate(u.date.toString())
            })),
            ausfaelle: []
        };

        // Filter out duplicate outages
        const seen = new Set();

        for (const item of data.ausfaelle) {
            item.endDate = convertToDate(item.endDate.toString());
            item.startDate = convertToDate(item.startDate.toString());

            if (item.productionPlant && item.productionPlant.length !== 0) {
                item.productionPlant =
                    item.productionPlant.charAt(0).toUpperCase() +
                    item.productionPlant.slice(1);
            }

            const key =
                item.productionPlant +
                '|' +
                item.endDate.toISOString() +
                '|' +
                item.startDate.toISOString();
            if (!seen.has(key)) {
                seen.add(key);
                entry.ausfaelle.push(item);
            }
        }

        return entry;
    }
}
