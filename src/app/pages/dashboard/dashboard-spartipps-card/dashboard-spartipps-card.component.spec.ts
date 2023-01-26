/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSpartippsCardComponent } from './dashboard-spartipps-card.component';

describe('DashboardSpartippsCardComponent', () => {
    let component: DashboardSpartippsCardComponent;
    let fixture: ComponentFixture<DashboardSpartippsCardComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DashboardSpartippsCardComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardSpartippsCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
