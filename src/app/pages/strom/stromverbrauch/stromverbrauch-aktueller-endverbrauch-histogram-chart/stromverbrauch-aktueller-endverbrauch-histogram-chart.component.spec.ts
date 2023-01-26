import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StromverbrauchAktuellerEndverbrauchHistogramChartComponent } from './stromverbrauch-aktueller-endverbrauch-histogram-chart.component';

describe('StromverbrauchAktuellerEndverbrauchHistogramChartComponent', () => {
    let component: StromverbrauchAktuellerEndverbrauchHistogramChartComponent;
    let fixture: ComponentFixture<StromverbrauchAktuellerEndverbrauchHistogramChartComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                StromverbrauchAktuellerEndverbrauchHistogramChartComponent
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(
            StromverbrauchAktuellerEndverbrauchHistogramChartComponent
        );
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
