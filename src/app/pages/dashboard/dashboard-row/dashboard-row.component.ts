import { Component, Input, OnInit } from '@angular/core';
import { Trend, TrendRating } from '../../../core/models/trend.enum';
import { NavigationService } from '../../../services/navigation/navigation.service';
import { QueryParamService } from '../../../services/queryparams/queryparams.service';

import { PlatformParam } from '../../../core/navigation/query-params.const';
export interface DashboardRowModelData {
    color: string;
    value: number;
    valuePostfix: string;
    valuePostfixSubtextKey?: string;
    valueSubtextKey?: string;
    trend?: Trend;
    trendRating?: TrendRating;
}

export interface DashboardRowModel {
    titleDynamicKey: string;
    subTitleDynamicKey?: string;
    data?: DashboardRowModelData;
    link?: string;
    loading: boolean;
}

@Component({
    selector: 'bfe-dashboard-row',
    templateUrl: './dashboard-row.component.html',
    styleUrls: ['./dashboard-row.component.scss']
})
export class DashboardRowComponent implements OnInit {
    @Input() model: DashboardRowModel;
    viewType: PlatformParam = PlatformParam.WEB;

    constructor(
        private navigationService: NavigationService,
        private queryParamService: QueryParamService
    ) {}
    ngOnInit(): void {
        this.viewType = this.queryParamService.getViewType();
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
