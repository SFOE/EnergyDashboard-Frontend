import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { I18NextModule } from 'angular-i18next';
import { AppModule } from '../../../app.module';
import { CommonsModule } from '../../../shared/commons/commons.module';
import { SharedComponentsModule } from '../../../shared/components/shared-components.module';
import { MockHideableTextSectionComponent } from '../../../test/component.fixture';
import { AktuellesWetterAktuelleTemperaturHistogramChartComponent } from './aktuelles-wetter-aktuelle-temperatur-histogram-chart/aktuelles-wetter-aktuelle-temperatur-histogram-chart.component';
import { AktuellesWetterPrognoseHistogramChartComponent } from './aktuelles-wetter-prognose-histogram-chart/aktuelles-wetter-prognose-histogram-chart.component';
import { AktuellesWetterRegionSelectComponent } from './aktuelles-wetter-region-select/aktuelles-wetter-region-select.component';
import { AktuellesWetterComponent } from './aktuelles-wetter.component';

describe('AktuellesWetterComponent', () => {
    let component: AktuellesWetterComponent;
    let fixture: ComponentFixture<AktuellesWetterComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                I18NextModule.forRoot(),
                HttpClientTestingModule,
                AppModule,
                CommonsModule,
                SharedComponentsModule,
                ReactiveFormsModule
            ],
            declarations: [
                AktuellesWetterComponent,
                AktuellesWetterRegionSelectComponent,
                AktuellesWetterAktuelleTemperaturHistogramChartComponent,
                AktuellesWetterPrognoseHistogramChartComponent,
                MockHideableTextSectionComponent
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(AktuellesWetterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
