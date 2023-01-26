/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { KpiContainerComponent } from './kpi-container.component';

describe('KpiContainerComponent', () => {
    let component: KpiContainerComponent;
    let fixture: ComponentFixture<KpiContainerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [KpiContainerComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(KpiContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
