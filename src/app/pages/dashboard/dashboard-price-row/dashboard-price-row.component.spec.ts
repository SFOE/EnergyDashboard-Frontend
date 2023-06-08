/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18NextModule } from 'angular-i18next';
import { Context } from '../../../core/models/context.enum';
import { CommonsModule } from '../../../shared/commons/commons.module';
import { SharedComponentsModule } from '../../../shared/components/shared-components.module';

import { DashboardPriceRowComponent } from './dashboard-price-row.component';

describe('DashboardPriceRowComponent', () => {
    let component: DashboardPriceRowComponent;
    let fixture: ComponentFixture<DashboardPriceRowComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                I18NextModule.forRoot(),
                CommonsModule,
                SharedComponentsModule
            ],
            declarations: [DashboardPriceRowComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardPriceRowComponent);
        component = fixture.componentInstance;
        component.model = {
            context: Context.STROM,
            loading: false
        };
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
