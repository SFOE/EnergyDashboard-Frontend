/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DashboardNotAvailableComponent } from './dashboard-not-available.component';

describe('DashboardNotAvailableComponent', () => {
    let component: DashboardNotAvailableComponent;
    let fixture: ComponentFixture<DashboardNotAvailableComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DashboardNotAvailableComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardNotAvailableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
