import { Injectable } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { DataService } from '../../core/data/data.service';
import { HistogramLineEntry } from '../../shared/diagrams/histogram/histogram-line/histogram-line.component';
import {
    mapPreiseIndexiertToLineEntries,
    mapPreiseStromBoerseToLineEntries
} from './preise.util';

@Injectable({
    providedIn: 'root'
})
export class PreiseService {
    private cachedPreiseStromBoerse: Observable<HistogramLineEntry[]>;
    private cachedPreiseStromEndverbrauch: Observable<HistogramLineEntry[]>;
    private cachedPreiseGasBoerse: Observable<HistogramLineEntry[]>;
    private cachedPreiseGasEndverbrauch: Observable<HistogramLineEntry[]>;
    private cachedPreiseHeizoelEntwicklung: Observable<HistogramLineEntry[]>;
    private cachedPreiseTreibstoffBenzin: Observable<HistogramLineEntry[]>;
    private cachedPreiseTreibstoffDiesel: Observable<HistogramLineEntry[]>;
    private cachedPreiseBrennholzEndverbrauch: Observable<HistogramLineEntry[]>;
    private cachedPreiseFernwaermeEndverbrauch: Observable<
        HistogramLineEntry[]
    >;

    constructor(private dataService: DataService) {}

    getPreiseStromBoerse() {
        if (!this.cachedPreiseStromBoerse) {
            this.cachedPreiseStromBoerse = this.dataService
                .getPreiseStromBoerse()
                .pipe(
                    map((entries) => mapPreiseStromBoerseToLineEntries(entries))
                )
                .pipe(shareReplay(1));
        }
        return this.cachedPreiseStromBoerse;
    }

    getPreiseStromEndverbrauch() {
        if (!this.cachedPreiseStromEndverbrauch) {
            this.cachedPreiseStromEndverbrauch = this.dataService
                .getPreiseStromEndverbrauch()
                .pipe(
                    map((entries) => mapPreiseIndexiertToLineEntries(entries))
                )
                .pipe(shareReplay(1));
        }
        return this.cachedPreiseStromEndverbrauch;
    }

    getPreiseGasBoerse() {
        if (!this.cachedPreiseGasBoerse) {
            this.cachedPreiseGasBoerse = this.dataService
                .getPreiseGasBoerse()
                .pipe(
                    map((entries) => mapPreiseIndexiertToLineEntries(entries))
                )
                .pipe(shareReplay(1));
        }
        return this.cachedPreiseGasBoerse;
    }

    getPreiseGasEndverbrauch() {
        if (!this.cachedPreiseGasEndverbrauch) {
            this.cachedPreiseGasEndverbrauch = this.dataService
                .getPreiseGasEndverbrauch()
                .pipe(
                    map((entries) => mapPreiseIndexiertToLineEntries(entries))
                )
                .pipe(shareReplay(1));
        }
        return this.cachedPreiseGasEndverbrauch;
    }

    getPreiseHeizoelEntwicklung() {
        if (!this.cachedPreiseHeizoelEntwicklung) {
            this.cachedPreiseHeizoelEntwicklung = this.dataService
                .getPreiseHeizoelEntwicklung()
                .pipe(
                    map((entries) => mapPreiseIndexiertToLineEntries(entries))
                )
                .pipe(shareReplay(1));
        }
        return this.cachedPreiseHeizoelEntwicklung;
    }

    getPreiseTreibstoffBenzin() {
        if (!this.cachedPreiseTreibstoffBenzin) {
            this.cachedPreiseTreibstoffBenzin = this.dataService
                .getPreiseTreibstoffBenzin()
                .pipe(
                    map((entries) => mapPreiseIndexiertToLineEntries(entries))
                )
                .pipe(shareReplay(1));
        }
        return this.cachedPreiseTreibstoffBenzin;
    }

    getPreiseTreibstoffDiesel() {
        if (!this.cachedPreiseTreibstoffDiesel) {
            this.cachedPreiseTreibstoffDiesel = this.dataService
                .getPreiseTreibstoffDiesel()
                .pipe(
                    map((entries) => mapPreiseIndexiertToLineEntries(entries))
                )
                .pipe(shareReplay(1));
        }
        return this.cachedPreiseTreibstoffDiesel;
    }

    getPreiseBrennholzEndverbrauch() {
        if (!this.cachedPreiseBrennholzEndverbrauch) {
            this.cachedPreiseBrennholzEndverbrauch = this.dataService
                .getPreiseBrennholzEndverbrauch()
                .pipe(
                    map((entries) => mapPreiseIndexiertToLineEntries(entries))
                )
                .pipe(shareReplay(1));
        }
        return this.cachedPreiseBrennholzEndverbrauch;
    }

    getPreiseFernwaermeEndverbrauch() {
        if (!this.cachedPreiseFernwaermeEndverbrauch) {
            this.cachedPreiseFernwaermeEndverbrauch = this.dataService
                .getPreiseFernwaermeEndverbrauch()
                .pipe(
                    map((entries) => mapPreiseIndexiertToLineEntries(entries))
                )
                .pipe(shareReplay(1));
        }
        return this.cachedPreiseFernwaermeEndverbrauch;
    }
}
