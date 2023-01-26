import { Component, Input } from '@angular/core';
import { Trend, TrendRating } from '../../../core/models/trend.enum';

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
    loading: boolean;
}

@Component({
    selector: 'bfe-dashboard-row',
    templateUrl: './dashboard-row.component.html',
    styleUrls: ['./dashboard-row.component.scss']
})
export class DashboardRowComponent {
    @Input() model: DashboardRowModel;
}
