import { Component, Input, OnInit } from '@angular/core';
import { Context } from '../../../core/models/context.enum';
import { NavigationService } from '../../../services/navigation/navigation.service';
import {
    COLOR_GAS,
    COLOR_OEL,
    COLOR_STROM
} from '../../../shared/commons/colors.const';

import { PlatformParam } from '../../../core/navigation/query-params.const';
import { QueryParamService } from '../../../services/queryparams/queryparams.service';
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
    link?: string;
    loading: boolean;
}

@Component({
    selector: 'bfe-dashboard-price-row',
    templateUrl: './dashboard-price-row.component.html',
    styleUrls: ['./dashboard-price-row.component.scss']
})
export class DashboardPriceRowComponent implements OnInit {
    @Input() model: DashboardPriceRowModel;
    viewType: PlatformParam = PlatformParam.WEB;

    constructor(
        private navigationService: NavigationService,
        private queryParamService: QueryParamService
    ) {}

    ngOnInit(): void {
        this.viewType = this.queryParamService.getViewType();
    }

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

    navigateToLink(): void {
        if (this.model?.link) {
            this.navigationService.navigateToLink(
                this.model?.link,
                this.viewType
            );
        }
    }
}
