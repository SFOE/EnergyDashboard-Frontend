import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AktuellesWetterAktuelleTemperaturHistogramChartComponent } from './aktuelles-wetter-aktuelle-temperatur-histogram-chart.component';

describe('AktuellesWetterHistogramChartComponent', () => {
    let component: AktuellesWetterAktuelleTemperaturHistogramChartComponent;
    let fixture: ComponentFixture<AktuellesWetterAktuelleTemperaturHistogramChartComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                AktuellesWetterAktuelleTemperaturHistogramChartComponent
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(
            AktuellesWetterAktuelleTemperaturHistogramChartComponent
        );
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
