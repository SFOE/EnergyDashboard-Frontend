import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18NextModule } from 'angular-i18next';
import { CommonsModule } from '../../../../shared/commons/commons.module';
import { SharedComponentsModule } from '../../../../shared/components/shared-components.module';

import { AktuellesWetterAktuelleTemperaturHistogramChartComponent } from './aktuelles-wetter-aktuelle-temperatur-histogram-chart.component';

describe('AktuellesWetterHistogramChartComponent', () => {
    let component: AktuellesWetterAktuelleTemperaturHistogramChartComponent;
    let fixture: ComponentFixture<AktuellesWetterAktuelleTemperaturHistogramChartComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                I18NextModule.forRoot(),
                HttpClientTestingModule,
                CommonsModule,
                SharedComponentsModule
            ],
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
