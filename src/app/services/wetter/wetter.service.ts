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

@Injectable({
    providedIn: 'root'
})
export class WetterService {
    private cachedWetterTrend: Observable<WetterTemperaturTrend>;
    private cachedWetterPrognose: Observable<WetterTemperaturPrognose>;
    private cachedWetterAktuell: Observable<WetterTemperaturAktuell>;

    constructor(private dataService: DataService) {}

    getWetterTrend() {
        if (!this.cachedWetterTrend) {
            this.cachedWetterTrend = this.dataService
                .getWetterTrend()
                .pipe()
                .pipe(shareReplay(1));
        }
        return this.cachedWetterTrend;
    }

    getWetterPrognose() {
        if (!this.cachedWetterPrognose) {
            this.cachedWetterPrognose = this.dataService
                .getWetterPrognose()
                .pipe()
                .pipe(shareReplay(1));
        }
        return this.cachedWetterPrognose;
    }

    getWetterAktuell() {
        if (!this.cachedWetterAktuell) {
            this.cachedWetterAktuell = this.dataService
                .getWetterAktuell()
                .pipe()
                .pipe(shareReplay(1));
        }
        return this.cachedWetterAktuell;
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
            date: new Date(dto.datum),
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
            date: new Date(dto.datum),
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
}
