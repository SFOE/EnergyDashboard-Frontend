import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { DataService } from '../../core/data/data.service';
import { HistogramAreaChartEntry } from '../../core/models/charts';
import {
    WetterTemperaturAktuell,
    WetterTemperaturAktuellEntry
} from '../../core/models/wetter-temperatur-aktuell';
import {
    WetterTemperaturPrognose,
    WetterTemperaturPrognoseEntry
} from '../../core/models/wetter-temperatur-prognose';
import { WetterTemperaturTrend } from '../../core/models/wetter-temperatur-trend';
import { WetterNiederschlagTrend } from '../../core/models/wetter-niederschlag-trend';
import { WetterNiederschlagAktuellEntry } from '../../core/models/wetter-niederschlag-aktuell';
import { HistogramDetailEntry } from '../../shared/diagrams/histogram/histogram-detail/histogram-detail.component';
import { convertToDate } from 'src/app/shared/static-utils/date-utils';
import { WetterSchneereservenAktuellEntry } from '../../core/models/wetter-schneereserven-aktuell';
import { WetterSchneereservenTrend } from '../../core/models/wetter-schneereserven-trend';

@Injectable({
    providedIn: 'root'
})
export class WetterService {
    private cachedWetterTrend: Observable<WetterTemperaturTrend>;
    private cachedWetterPrognose: Observable<WetterTemperaturPrognose>;
    private cachedWetterAktuell: Observable<WetterTemperaturAktuell>;

    private cachedNiederschlagTrend: Observable<WetterNiederschlagTrend>;
    private cachedNiederschlagAktuell: Observable<
        WetterNiederschlagAktuellEntry[]
    >;

    private cachedSchneereservenTrend: Observable<WetterSchneereservenTrend>;
    private cachedSchneereservenAktell: Observable<
        WetterSchneereservenAktuellEntry[]
    >;

    constructor(private dataService: DataService) {}

    getWetterTrend() {
        if (!this.cachedWetterTrend) {
            this.cachedWetterTrend = this.dataService
                .getWetterTrend()
                .pipe(shareReplay(1));
        }
        return this.cachedWetterTrend;
    }

    getNiederschlagTrend() {
        if (!this.cachedNiederschlagTrend) {
            this.cachedNiederschlagTrend = this.dataService
                .getNiederschlagTrend()
                .pipe(shareReplay(1));
        }
        return this.cachedNiederschlagTrend;
    }

    getNiederschlagAktuell() {
        if (!this.cachedNiederschlagAktuell) {
            this.cachedNiederschlagAktuell = this.dataService
                .getNiederschlagAktuell()
                .pipe(shareReplay(1));
        }
        return this.cachedNiederschlagAktuell;
    }

    getWetterPrognose() {
        if (!this.cachedWetterPrognose) {
            this.cachedWetterPrognose = this.dataService
                .getWetterPrognose()
                .pipe(shareReplay(1));
        }
        return this.cachedWetterPrognose;
    }

    getWetterAktuell() {
        if (!this.cachedWetterAktuell) {
            this.cachedWetterAktuell = this.dataService
                .getWetterAktuell()
                .pipe(shareReplay(1));
        }
        return this.cachedWetterAktuell;
    }

    getSchneereservenTrend() {
        if (!this.cachedSchneereservenTrend) {
            this.cachedSchneereservenTrend = this.dataService
                .getSchneereservenTrend()
                .pipe(shareReplay(1));
        }
        return this.cachedSchneereservenTrend;
    }

    getSchneereservenAktuell() {
        if (!this.cachedSchneereservenAktell) {
            this.cachedSchneereservenAktell = this.dataService
                .getSchneereservenAktuell()
                .pipe(shareReplay(1));
        }
        return this.cachedSchneereservenAktell;
    }

    mapWetterPrognoseToHistogramEntries(
        data: WetterTemperaturPrognoseEntry[]
    ): HistogramAreaChartEntry[] {
        return data.map((dto: WetterTemperaturPrognoseEntry) => ({
            values: [
                dto.lufttemperaturTagesmittelNorm,
                dto.lufttemperaturPrognose,
                dto.fiveYearMax,
                dto.fiveYearMin
            ],
            date: new Date(dto.date),
            band: {
                upper: dto.fiveYearMax,
                lower: dto.fiveYearMin
            },
            tooltipInformation: {
                differenzMittelwert: dto.differenzNorm,
                differenzMin: dto.differenzMin,
                differenzMax: dto.differenzMax
            }
        }));
    }

    mapWetterAktuellToHistogramEntries(
        data: WetterTemperaturAktuellEntry[]
    ): HistogramAreaChartEntry[] {
        return data.map((dto: WetterTemperaturAktuellEntry) => ({
            values: [
                dto.lufttemperaturTagesmittelNorm,
                dto.lufttemperaturTagesmittel,
                dto.fiveYearMax,
                dto.fiveYearMin
            ],
            date: new Date(dto.date),
            band: {
                upper: dto.fiveYearMax,
                lower: dto.fiveYearMin
            },
            tooltipInformation: {
                differenzMittelwert: dto.differenzNorm,
                differenzMin: dto.differenzMin,
                differenzMax: dto.differenzMax
            }
        }));
    }

    mapNiederschlagAktuellToHistogramEntries(
        data: WetterNiederschlagAktuellEntry[]
    ): HistogramDetailEntry[] {
        return data.map((dto: WetterNiederschlagAktuellEntry) => {
            return {
                date: convertToDate(dto.date.toString()),
                barValues: [dto.niederschlagGemessen],
                barLineValue: null,
                hiddenValues: [],
                lineValues: [100],
                exists: true
            };
        });
    }
}
