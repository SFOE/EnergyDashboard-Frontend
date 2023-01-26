import { Component, OnInit } from '@angular/core';
import { map, Observable, startWith } from 'rxjs';
import { Context } from '../../core/models/context.enum';
import {
    DashboardGasData,
    DashboardStromData,
    sortOrderDashboardGasData
} from '../../core/models/dashboard';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { COLOR_GAS, COLOR_STROM } from '../../shared/commons/colors.const';
import { DashboardPriceRowModel } from './dashboard-price-row/dashboard-price-row.component';
import { DashboardRowModel } from './dashboard-row/dashboard-row.component';
import { gasTextMap, stromTextMap, TextMapEntry } from './dashboard.rows.model';

@Component({
    selector: 'bfe-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    context = Context;
    stromModels$: Observable<DashboardRowModel[]>;
    gasModels$: Observable<DashboardRowModel[]>;
    wetterModels$: Observable<DashboardRowModel[]>;
    priceModels$: Observable<DashboardPriceRowModel[]>;

    constructor(private dashboardService: DashboardService) {}

    ngOnInit(): void {
        this.stromModels$ = this.dashboardService
            .getStromData()
            .pipe(
                map(this.mapStromDataToRow),
                startWith(this.getLoadingModels(stromTextMap))
            );
        this.gasModels$ = this.dashboardService
            .getGasData()
            .pipe(
                map(this.mapGasDataToRow),
                startWith(this.getLoadingModels(gasTextMap))
            );
        this.wetterModels$ = this.dashboardService.getWetterModels();
        this.priceModels$ = this.dashboardService.getPriceData();
    }

    private mapStromDataToRow(data: DashboardStromData): DashboardRowModel[] {
        const color = COLOR_STROM;
        return Object.entries(data).map(([key, entry]) => ({
            titleDynamicKey: stromTextMap[key].titleDynamicKey,
            subTitleDynamicKey: stromTextMap[key].subTitleDynamicKey,
            data: {
                ...stromTextMap[key].data,
                ...entry,
                color
            },
            loading: false
        }));
    }

    private mapGasDataToRow(data: DashboardGasData): DashboardRowModel[] {
        const color = COLOR_GAS;
        return Object.entries(data)
            .sort(
                ([keyA, entryA], [keyB, entryB]) =>
                    sortOrderDashboardGasData[keyA] -
                    sortOrderDashboardGasData[keyB]
            )
            .map(([key, entry]) => ({
                titleDynamicKey: gasTextMap[key].titleDynamicKey,
                subTitleDynamicKey: gasTextMap[key].subTitleDynamicKey,
                data: {
                    ...gasTextMap[key].data,
                    ...entry,
                    color
                },
                loading: false
            }));
    }

    private getLoadingModels(textMap: {
        [key: string]: TextMapEntry;
    }): DashboardRowModel[] {
        return Object.values(textMap).map((entry) => ({
            titleDynamicKey: entry.titleDynamicKey,
            subTitleDynamicKey: entry.subTitleDynamicKey,
            loading: true
        }));
    }
}
