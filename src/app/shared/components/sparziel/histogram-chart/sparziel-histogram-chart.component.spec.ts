/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SparzielHistogramChartComponent } from './sparziel-histogram-chart.component';

describe('SparzielHistogramChartComponent', () => {
    let component: SparzielHistogramChartComponent;
    let fixture: ComponentFixture<SparzielHistogramChartComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SparzielHistogramChartComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SparzielHistogramChartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
