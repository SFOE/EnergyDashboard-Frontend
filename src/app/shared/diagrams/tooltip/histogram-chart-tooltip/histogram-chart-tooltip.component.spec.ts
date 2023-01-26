/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HistogramChartTooltipComponent } from './histogram-chart-tooltip.component';

describe('FuellstandSpeicherseeTooltipComponent', () => {
    let component: HistogramChartTooltipComponent;
    let fixture: ComponentFixture<HistogramChartTooltipComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HistogramChartTooltipComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HistogramChartTooltipComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
