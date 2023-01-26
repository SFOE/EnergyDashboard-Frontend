/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPriceRowComponent } from './dashboard-price-row.component';

describe('DashboardPriceRowComponent', () => {
    let component: DashboardPriceRowComponent;
    let fixture: ComponentFixture<DashboardPriceRowComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DashboardPriceRowComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardPriceRowComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
