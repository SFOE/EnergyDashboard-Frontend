import { Injectable } from '@angular/core';
import { map, Observable, shareReplay, startWith } from 'rxjs';
import { DataService } from '../../core/data/data.service';
import { TranslationService } from '../../core/i18n/translation.service';
import { Context } from '../../core/models/context.enum';
import {
    DashboardGasData,
    DashboardSpartippDisplay,
    DashboardStromData
} from '../../core/models/dashboard';
import { DashboardPriceRowModel } from '../../pages/dashboard/dashboard-price-row/dashboard-price-row.component';
import { DashboardRowModel } from '../../pages/dashboard/dashboard-row/dashboard-row.component';
import {
    getRandomSpartipp,
    mapGasDtoToData,
    mapPriceDtoToDataArray,
    mapStromDtoToData,
    mapWetterDtoToRowModels
} from './dashboard.util';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    private cachedStromData$: Observable<DashboardStromData>;
    private cachedGasData$: Observable<DashboardGasData>;
    private cachedWetterModels$: Observable<DashboardRowModel[]>;
    private cachedPriceData$: Observable<DashboardPriceRowModel[]>;
    private cachedSpartipps$: Observable<DashboardSpartippDisplay | undefined>;

    constructor(
        private dataService: DataService,
        private translateService: TranslationService
    ) {}

    getStromData(): Observable<DashboardStromData> {
        if (!this.cachedStromData$) {
            this.cachedStromData$ = this.dataService
                .getDashboardStrom()
                .pipe(map(mapStromDtoToData), shareReplay(1));
        }
        return this.cachedStromData$;
    }

    getGasData(): Observable<DashboardGasData> {
        if (!this.cachedGasData$) {
            this.cachedGasData$ = this.dataService
                .getDashboardGas()
                .pipe(map(mapGasDtoToData), shareReplay(1));
        }
        return this.cachedGasData$;
    }

    getWetterModels(): Observable<DashboardRowModel[]> {
        if (!this.cachedWetterModels$) {
            this.cachedWetterModels$ = this.dataService
                .getDashboardWetter()
                .pipe(
                    map(mapWetterDtoToRowModels),
                    shareReplay(1),
                    startWith(
                        mapWetterDtoToRowModels().map((model) => ({
                            ...model,
                            loading: true
                        }))
                    )
                );
        }
        return this.cachedWetterModels$;
    }

    getPriceData(): Observable<DashboardPriceRowModel[]> {
        if (!this.cachedPriceData$) {
            this.cachedPriceData$ = this.dataService.getDashboardPrice().pipe(
                map(mapPriceDtoToDataArray),
                shareReplay(1),
                startWith(
                    Object.keys(Context).map((context) => ({
                        context: context as Context,
                        loading: true
                    }))
                )
            );
        }
        return this.cachedPriceData$;
    }

    getRandomSpartipp(): Observable<DashboardSpartippDisplay | undefined> {
        if (!this.cachedSpartipps$) {
            this.cachedSpartipps$ = this.dataService
                .getDashboardSpartipps()
                .pipe(
                    map((data) =>
                        getRandomSpartipp(data, this.translateService.language)
                    ),
                    shareReplay(1)
                );
        }
        return this.cachedSpartipps$;
    }
}
