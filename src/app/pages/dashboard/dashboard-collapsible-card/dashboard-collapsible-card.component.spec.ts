/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DashboardCollapsibleCardComponent } from './dashboard-collapsible-card.component';

describe('DashboardCollapsibleCardComponent', () => {
    let component: DashboardCollapsibleCardComponent;
    let fixture: ComponentFixture<DashboardCollapsibleCardComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DashboardCollapsibleCardComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardCollapsibleCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
