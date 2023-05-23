import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18NextModule } from 'angular-i18next';
import { CommonsModule } from '../../../../shared/commons/commons.module';
import { SharedComponentsModule } from '../../../../shared/components/shared-components.module';

import { AktuellesWetterPrognoseHistogramChartComponent } from './aktuelles-wetter-prognose-histogram-chart.component';

describe('AktuellesWetterPrognoseHistogramChartComponent', () => {
    let component: AktuellesWetterPrognoseHistogramChartComponent;
    let fixture: ComponentFixture<AktuellesWetterPrognoseHistogramChartComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                I18NextModule.forRoot(),
                HttpClientTestingModule,
                CommonsModule,
                SharedComponentsModule
            ],
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
