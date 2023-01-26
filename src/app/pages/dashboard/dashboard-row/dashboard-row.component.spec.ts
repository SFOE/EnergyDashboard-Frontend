/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DashboardRowComponent } from './dashboard-row.component';

describe('DashboardRowComponent', () => {
    let component: DashboardRowComponent;
    let fixture: ComponentFixture<DashboardRowComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DashboardRowComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardRowComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
