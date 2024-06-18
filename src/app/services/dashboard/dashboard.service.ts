import { Injectable } from '@angular/core';
import { map, Observable, shareReplay, startWith } from 'rxjs';
import { DataService } from '../../core/data/data.service';
import { TranslationService } from '../../core/i18n/translation.service';
import { Context } from '../../core/models/context.enum';
import {
    DashboardGasDto,
    DashboardSpartippDisplay,
    DashboardStromDto,
    DashboardWetterDto
} from '../../core/models/dashboard';
import { DashboardPriceRowModel } from '../../pages/dashboard/dashboard-price-row/dashboard-price-row.component';
import { DashboardRowModel } from '../../pages/dashboard/dashboard-row/dashboard-row.component';
import {
    mapGasDtoToRowModels,
    mapPriceDtoToDataArray,
    mapStromDtoToRowModels,
    mapWetterDtoToRowModels
} from './dashboard.util';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    private cachedStromData$: Observable<DashboardRowModel[]>;
    private cachedGasData$: Observable<DashboardRowModel[]>;
    private cachedWetterModels$: Observable<DashboardRowModel[]>;
    private cachedPriceData$: Observable<DashboardPriceRowModel[]>;
    private cachedSpartipps$: Observable<DashboardSpartippDisplay | undefined>;

    constructor(
        private dataService: DataService,
        private translateService: TranslationService
    ) {}

    getStromData(): Observable<DashboardRowModel[]> {
        if (!this.cachedStromData$) {
            this.cachedStromData$ = this.dataService.getDashboardStrom().pipe(
                map(mapStromDtoToRowModels),
                shareReplay(1),
                startWith(
                    mapStromDtoToRowModels(<DashboardStromDto>{}).map(
                        (model) => ({
                            ...model,
                            loading: true
                        })
                    )
                )
            );
        }
        return this.cachedStromData$;
    }

    getGasData(): Observable<DashboardRowModel[]> {
        if (!this.cachedGasData$) {
            this.cachedGasData$ = this.dataService.getDashboardGas().pipe(
                map(mapGasDtoToRowModels),
                shareReplay(1),
                startWith(
                    mapGasDtoToRowModels(<DashboardGasDto>{}).map((model) => ({
                        ...model,
                        loading: true
                    }))
                )
            );
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
                        mapWetterDtoToRowModels(<DashboardWetterDto>{}).map(
                            (model) => ({
                                ...model,
                                loading: true
                            })
                        )
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
}
