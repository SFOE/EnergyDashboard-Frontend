import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AktuellesWetterPrognoseHistogramChartComponent } from './aktuelles-wetter-prognose-histogram-chart.component';

describe('AktuellesWetterPrognoseHistogramChartComponent', () => {
    let component: AktuellesWetterPrognoseHistogramChartComponent;
    let fixture: ComponentFixture<AktuellesWetterPrognoseHistogramChartComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AktuellesWetterPrognoseHistogramChartComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(
            AktuellesWetterPrognoseHistogramChartComponent
        );
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
