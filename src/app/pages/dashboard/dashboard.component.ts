import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Context } from '../../core/models/context.enum';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { QueryParamService } from '../../services/queryparams/queryparams.service';
import { DashboardPriceRowModel } from './dashboard-price-row/dashboard-price-row.component';
import { DashboardRowModel } from './dashboard-row/dashboard-row.component';
@Component({
    selector: 'bfe-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    @Input() embedMode: boolean = false;
    @Input() appView: boolean = false;
    context = Context;
    stromModels$: Observable<DashboardRowModel[]>;
    gasModels$: Observable<DashboardRowModel[]>;
    wetterModels$: Observable<DashboardRowModel[]>;
    priceModels$: Observable<DashboardPriceRowModel[]>;

    constructor(
        private dashboardService: DashboardService,
        private queryParamService: QueryParamService
    ) {}

    ngOnInit(): void {
        this.appView = this.queryParamService.isAppView();
        this.gasModels$ = this.dashboardService.getGasData();
        this.stromModels$ = this.dashboardService.getStromData();
        this.wetterModels$ = this.dashboardService.getWetterModels();
        this.priceModels$ = this.dashboardService.getPriceData();
    }
}
