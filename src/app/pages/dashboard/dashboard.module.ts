import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
    FaIconLibrary,
    FontAwesomeModule
} from '@fortawesome/angular-fontawesome';
import {
    faExclamationCircle,
    faTemperatureHigh
} from '@fortawesome/free-solid-svg-icons';
import { I18NextModule } from 'angular-i18next';
import { CommonsModule } from '../../shared/commons/commons.module';
import { SharedComponentsModule } from '../../shared/components/shared-components.module';
import { TrendModule } from '../../shared/components/trend/trend.module';
import { DashboardCollapsibleCardComponent } from './dashboard-collapsible-card/dashboard-collapsible-card.component';
import { DashboardKpiX1Component } from './dashboard-kpi-x1/dashboard-kpi-x1.component';
import { DashboardNotAvailableComponent } from './dashboard-not-available/dashboard-not-available.component';
import { DashboardPriceRowComponent } from './dashboard-price-row/dashboard-price-row.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardRowComponent } from './dashboard-row/dashboard-row.component';
import { DashboardComponent } from './dashboard.component';

@NgModule({
    declarations: [
        DashboardComponent,
        DashboardKpiX1Component,
        DashboardRowComponent,
        DashboardPriceRowComponent,
        DashboardNotAvailableComponent,
        DashboardCollapsibleCardComponent
    ],
    exports: [DashboardComponent],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        SharedComponentsModule,
        I18NextModule,
        CommonsModule,
        FontAwesomeModule,
        TrendModule
    ]
})
export class DashboardModule {
    constructor(library: FaIconLibrary) {
        library.addIcons(faExclamationCircle, faTemperatureHigh);
    }
}
