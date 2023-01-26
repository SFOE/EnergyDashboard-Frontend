import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StromverbrauchAktuellerLandesverbrauchHistogramChartComponent } from './stromverbrauch-aktueller-landesverbrauch-histogram-chart.component';

describe('StromverbrauchAktuellerLandesverbrauchHistogramChartComponent', () => {
    let component: StromverbrauchAktuellerLandesverbrauchHistogramChartComponent;
    let fixture: ComponentFixture<StromverbrauchAktuellerLandesverbrauchHistogramChartComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                StromverbrauchAktuellerLandesverbrauchHistogramChartComponent
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(
            StromverbrauchAktuellerLandesverbrauchHistogramChartComponent
        );
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
