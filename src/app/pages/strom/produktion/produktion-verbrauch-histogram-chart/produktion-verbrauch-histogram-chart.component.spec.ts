import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduktionVerbrauchHistogramChartComponent } from './produktion-verbrauch-histogram-chart.component';

describe('ProduktionVerbrauchHistogramChartComponent', () => {
    let component: ProduktionVerbrauchHistogramChartComponent;
    let fixture: ComponentFixture<ProduktionVerbrauchHistogramChartComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ProduktionVerbrauchHistogramChartComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(
            ProduktionVerbrauchHistogramChartComponent
        );
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
