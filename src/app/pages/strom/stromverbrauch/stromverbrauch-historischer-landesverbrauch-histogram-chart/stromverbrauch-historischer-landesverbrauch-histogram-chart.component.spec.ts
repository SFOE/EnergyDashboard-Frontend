import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StromverbrauchHistorischerLandesverbrauchHistogramChartComponent } from './stromverbrauch-historischer-landesverbrauch-histogram-chart.component';

describe('StromverbrauchHistorischerLandesverbrauchHistogramChartComponent', () => {
    let component: StromverbrauchHistorischerLandesverbrauchHistogramChartComponent;
    let fixture: ComponentFixture<StromverbrauchHistorischerLandesverbrauchHistogramChartComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                StromverbrauchHistorischerLandesverbrauchHistogramChartComponent
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(
            StromverbrauchHistorischerLandesverbrauchHistogramChartComponent
        );
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
