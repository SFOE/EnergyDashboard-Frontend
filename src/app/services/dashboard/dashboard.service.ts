import { Injectable } from '@angular/core';
import { map, Observable, shareReplay, startWith } from 'rxjs';
import { DataService } from '../../core/data/data.service';
import { TranslationService } from '../../core/i18n/translation.service';
import { Context } from '../../core/models/context.enum';
import {
    DashboardGas,
    DashboardSpartippDisplay,
    DashboardStrom
} from '../../core/models/dashboard';
import { DashboardPriceRowModel } from '../../pages/dashboard/dashboard-price-row/dashboard-price-row.component';
import { DashboardRowModel } from '../../pages/dashboard/dashboard-row/dashboard-row.component';
import {
    getRandomSpartipp,
    mapPriceDtoToDataArray,
    mapWetterDtoToRowModels
} from './dashboard.util';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    private cachedStromData$: Observable<DashboardStrom>;
    private cachedGasData$: Observable<DashboardGas>;
    private cachedWetterModels$: Observable<DashboardRowModel[]>;
    private cachedPriceData$: Observable<DashboardPriceRowModel[]>;
    private cachedSpartipps$: Observable<DashboardSpartippDisplay | undefined>;

    constructor(
        private dataService: DataService,
        private translateService: TranslationService
    ) {}

    getStromData(): Observable<DashboardStrom> {
        if (!this.cachedStromData$) {
            this.cachedStromData$ = this.dataService
                .getDashboardStrom()
                .pipe(shareReplay(1));
        }
        return this.cachedStromData$;
    }

    getGasData(): Observable<DashboardGas> {
        if (!this.cachedGasData$) {
            this.cachedGasData$ = this.dataService
                .getDashboardGas()
                .pipe(shareReplay(1));
        }
        return this.cachedGasData$;
    }

    getWetterModels(): Observable<DashboardRowModel[]> {
        if (!this.cachedWetterModels$) {
            this.cachedWetterModels$ = this.dataService
                .getDashboardWetterV2()
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
