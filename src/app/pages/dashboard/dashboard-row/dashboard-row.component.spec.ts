/* tslint:disable:no-unused-variable */
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {I18NextModule} from 'angular-i18next';
import {AppModule} from '../../../app.module';
import {CommonsModule} from '../../../shared/commons/commons.module';
import {SharedComponentsModule} from '../../../shared/components/shared-components.module';
import {DashboardCollapsibleCardComponent} from '../dashboard-collapsible-card/dashboard-collapsible-card.component';
import {DashboardKpiX1Component} from '../dashboard-kpi-x1/dashboard-kpi-x1.component';
import {DashboardNotAvailableComponent} from '../dashboard-not-available/dashboard-not-available.component';
import {DashboardPriceRowComponent} from '../dashboard-price-row/dashboard-price-row.component';
import {DashboardSpartippsCardComponent} from '../dashboard-spartipps-card/dashboard-spartipps-card.component';

import {DashboardRowComponent} from './dashboard-row.component';

describe('DashboardRowComponent', () => {
    let component: DashboardRowComponent;
    let fixture: ComponentFixture<DashboardRowComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                I18NextModule.forRoot(),
                CommonsModule,
                SharedComponentsModule,
                FontAwesomeModule,
                AppModule
            ],
            declarations: [
                DashboardRowComponent,
                DashboardNotAvailableComponent,
                DashboardKpiX1Component,
                DashboardRowComponent,
                DashboardPriceRowComponent,
                DashboardCollapsibleCardComponent,
                DashboardSpartippsCardComponent
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardRowComponent);
        component = fixture.componentInstance;
        component.model = {
            loading: false,
            titleDynamicKey: 'titleDynamicKey'
        };
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
