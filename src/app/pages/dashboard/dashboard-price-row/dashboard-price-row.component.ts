import { Component, Input } from '@angular/core';
import { Context } from '../../../core/models/context.enum';
import {
    COLOR_GAS,
    COLOR_OEL,
    COLOR_STROM
} from '../../../shared/commons/colors.const';

export interface DashboardPriceRowModel {
    context: Context;
    subTitleDynamicKey?: string;
    data?: {
        price: number;
        valuePostfix: string;
        currency?: string;
        valueTopTextKey?: string;
        valueBottomTextKey?: string;
    };
    loading: boolean;
}

@Component({
    selector: 'bfe-dashboard-price-row',
    templateUrl: './dashboard-price-row.component.html',
    styleUrls: ['./dashboard-price-row.component.scss']
})
export class DashboardPriceRowComponent {
    @Input() model: DashboardPriceRowModel;

    getContextColor(context: Context): string {
        switch (context) {
            case Context.STROM:
                return COLOR_STROM;
            case Context.GAS:
                return COLOR_GAS;
            case Context.OEL:
            case Context.BENZIN:
            case Context.DIESEL:
                return COLOR_OEL;
            default:
                return 'black';
        }
    }
}
