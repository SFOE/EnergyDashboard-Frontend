import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, shareReplay } from 'rxjs';
import { StromEntkoppelungEndenergieverbrauchBIP } from 'src/app/core/models/strom-entkoppelung-endenergieverbrauch-bip';
import { EnergieverbrauchMitPrognoseData } from 'src/app/core/models/strom-verbrauch.energieverbrauch-mit-prognose';
import { EndenergieverbrauchMitPrognoseData } from 'src/app/core/models/energie-verbrauch.endenergieverbrauch-mit-prognose';
import { DataService } from '../../core/data/data.service';
import { HistogramAreaChartEntry } from '../../core/models/charts';
import {
    SparzielAktuelleEinsparungEntryV5,
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
import { StromProduktionPvEntry } from '../../core/models/strom-produktion-pv';
import { StromProduktionPvTrend } from '../../core/models/strom-produktion-pv-trend';
import {
    StromsparzielFivePercentEinsparungen,
    StromsparzielFivePercentPeakHoursModel
} from '../../core/models/strom-sparziel-five-percent.model';
import { StromVerbrauchLandesverbrauchMitPrognoseApi } from '../../core/models/strom-verbrauch.landesverbrauch-mit-prognose';
import { HistogramDetailEntry } from '../../shared/diagrams/histogram/histogram-detail/histogram-detail.component';
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
    mapStromKkwVerfuegbarkeitDtoToEntry,
    mapStromProductionImportVerbrauchDto,
    mapStromProductionToEntry,
    mapStromVerbrauchEndverbrauchToChartEntries,
    mapEnergieverbrauchMitPrognoseDto,
    mapEndenergieverbrauchMitPrognoseDto,
    mapStromVerbrauchLandesverbrauchToChartEntries
} from './strom.util';

import { StromWinterproduktionTrend } from '../../core/models/strom-winterproduktion-trend';
import {
    StromWinterproduktionImportExportMapped,
    StromWinterproduktionImportExportEntry
} from '../../core/models/strom-winterproduktion.import-export';
import { StromWinterproduktionEinzelneEnergietraegerEntry } from '../../core/models/strom-winterproduktion.einzelne-energietraeger';
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
    private cachedEnergieverbrauchMitPrognose: Observable<EnergieverbrauchMitPrognoseData>;
    private cachedEndenergieverbrauchMitPrognose: Observable<EndenergieverbrauchMitPrognoseData>;
    private cachedStromProduction$: Observable<StromProductionData>;
    private cachedStromProductionImportVerbrauch$: Observable<StromProductionImportVerbrauchData>;
    private cachedStromSparziel$: Observable<SparzielEntry>;
    private cachedStromSparzielAktuelleEinsparung$: Observable<
        SparzielAktuelleEinsparungEntryV5[]
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
    private cachedProduktionPv: Observable<StromProduktionPvEntry[]>;
    private cachedProduktionPvTrend: Observable<StromProduktionPvTrend>;
    private cachedEntkoppelungEndenergieverbrauchBIP$: Observable<
        StromEntkoppelungEndenergieverbrauchBIP[]
    >;
    private cachedWinterproduktionTrend: Observable<StromWinterproduktionTrend>;
    private cachedWinterproduktionImportExport: Observable<
        StromWinterproduktionImportExportEntry[]
    >;
    private cachedWinterproduktionEinzelneEnergietraeger: Observable<
        StromWinterproduktionEinzelneEnergietraegerEntry[]
    >;

    constructor(
        private http: HttpClient,
        private dataService: DataService
    ) {}

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

    getEnergieverbrauchMitPrognose(): Observable<EnergieverbrauchMitPrognoseData> {
        if (!this.cachedEnergieverbrauchMitPrognose) {
            this.cachedEnergieverbrauchMitPrognose = this.dataService
                .getEnergieverbrauchMitPrognose()
                .pipe(map(mapEnergieverbrauchMitPrognoseDto), shareReplay(1));
        }
        return this.cachedEnergieverbrauchMitPrognose;
    }

    getEndenergieverbrauchMitPrognose(): Observable<EndenergieverbrauchMitPrognoseData> {
        if (!this.cachedEndenergieverbrauchMitPrognose) {
            this.cachedEndenergieverbrauchMitPrognose = this.dataService
                .getEndenergieverbrauchMitPrognose()
                .pipe(
                    map(mapEndenergieverbrauchMitPrognoseDto),
                    shareReplay(1)
                );
        }
        return this.cachedEndenergieverbrauchMitPrognose;
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
        SparzielAktuelleEinsparungEntryV5[]
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
                    map((data) => {
                        const ausfaelle = mapStromKkwAusfaelle(data.ausfaelle);
                        return {
                            entries: data.entries.map((entry) =>
                                mapStromKkwVerfuegbarkeitDtoToEntry(
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

        return this.cachedStromKkwVerfuegbarkeitCh$;
    }

    getKkwVerfuegbarkeitFr(): Observable<StromKkwVerfuegbarkeitData> {
        if (!this.cachedStromKkwVerfuegbarkeitFr$) {
            this.cachedStromKkwVerfuegbarkeitFr$ = this.dataService
                .getStromKkwVerfuegbarkeitFr()
                .pipe(
                    map((data) => {
                        const ausfaelle = mapStromKkwAusfaelle(data.ausfaelle);
                        return {
                            entries: data.entries.map((entry) =>
                                mapStromKkwVerfuegbarkeitDtoToEntry(
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

        return this.cachedStromKkwVerfuegbarkeitFr$;
    }

    getProduktionPv() {
        if (!this.cachedProduktionPv) {
            this.cachedProduktionPv = this.dataService
                .getProduktionPv()
                .pipe(shareReplay(1));
        }
        return this.cachedProduktionPv;
    }

    getProduktionPvTrend() {
        if (!this.cachedProduktionPvTrend) {
            this.cachedProduktionPvTrend = this.dataService
                .getProduktionPvTrend()
                .pipe(shareReplay(1));
        }
        return this.cachedProduktionPvTrend;
    }

    mapProduktionPvToHistogramEntries(
        data: StromProduktionPvEntry[]
    ): HistogramDetailEntry[] {
        return data.map((dto: StromProduktionPvEntry) => {
            return {
                date: convertToDate(dto.date.toString()),
                barValues: [dto.stromProduktion],
                barLineValue: null,
                hiddenValues: [],
                lineValues: [],
                exists: true
            };
        });
    }

    getEntkoppelungEndenergieverbrauchBIP() {
        if (!this.cachedEntkoppelungEndenergieverbrauchBIP$) {
            this.cachedEntkoppelungEndenergieverbrauchBIP$ = this.dataService
                .getEntkoppelungEndenergieverbrauchBIP()
                .pipe(shareReplay(1));
        }

        return this.cachedEntkoppelungEndenergieverbrauchBIP$;
    }

    getWinterproduktionTrend() {
        if (!this.cachedWinterproduktionTrend) {
            this.cachedWinterproduktionTrend = this.dataService
                .getWinterproduktionTrend()
                .pipe(shareReplay(1));
        }
        return this.cachedWinterproduktionTrend;
    }

    getWinterproduktionImportExport() {
        if (!this.cachedWinterproduktionImportExport) {
            this.cachedWinterproduktionImportExport = this.dataService
                .getWinterproduktionImportExport()
                .pipe(shareReplay(1));
        }
        return this.cachedWinterproduktionImportExport;
    }

    mapWinterproduktionImportExportToHistogramEntries(
        data: StromWinterproduktionImportExportMapped[]
    ): HistogramDetailEntry[] {
        return data.map((dto: StromWinterproduktionImportExportMapped) => {
            return {
                date: convertToDate(dto.date.toString()),
                barValues: [
                    dto.stromverbrauch,
                    dto.import,
                    dto.export,
                    dto.diff_ep_ni
                ],
                barLineValue: null,
                hiddenValues: [dto.nettoimporte_bfe],
                lineValues: [dto.heizgradtage],
                exists: true
            };
        });
    }

    getWinterproduktionEinzelneEnergietraeger() {
        if (!this.cachedWinterproduktionEinzelneEnergietraeger) {
            this.cachedWinterproduktionEinzelneEnergietraeger = this.dataService
                .getWinterproduktionEinzelneEnergietraeger()
                .pipe(shareReplay(1));
        }
        return this.cachedWinterproduktionEinzelneEnergietraeger;
    }

    mapWinterproduktionEinzelneEnergietraegerToHistogramEntries(
        data: StromWinterproduktionEinzelneEnergietraegerEntry[]
    ): HistogramDetailEntry[] {
        return data.map(
            (dto: StromWinterproduktionEinzelneEnergietraegerEntry) => {
                return {
                    date: convertToDate(dto.date.toString()),
                    barValues: [
                        Math.round(dto.kernkraft),
                        Math.round(dto.thermische),
                        dto.flusskraft ? Math.round(dto.flusskraft) : null,
                        dto.speicherkraft
                            ? Math.round(dto.speicherkraft)
                            : null,
                        dto.wind ? Math.round(dto.wind) : null,
                        dto.pv ? Math.round(dto.pv) : null
                    ],
                    barLineValue: null,
                    hiddenValues: [],
                    lineValues: [],
                    exists: true
                };
            }
        );
    }
}
