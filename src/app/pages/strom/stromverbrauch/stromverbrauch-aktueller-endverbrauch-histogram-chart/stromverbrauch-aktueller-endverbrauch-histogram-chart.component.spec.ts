import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18NextModule } from 'angular-i18next';
import { CommonsModule } from '../../../../shared/commons/commons.module';
import { SharedComponentsModule } from '../../../../shared/components/shared-components.module';

import { StromverbrauchAktuellerEndverbrauchHistogramChartComponent } from './stromverbrauch-aktueller-endverbrauch-histogram-chart.component';

describe('StromverbrauchAktuellerEndverbrauchHistogramChartComponent', () => {
    let component: StromverbrauchAktuellerEndverbrauchHistogramChartComponent;
    let fixture: ComponentFixture<StromverbrauchAktuellerEndverbrauchHistogramChartComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                I18NextModule.forRoot(),
                HttpClientTestingModule,
                CommonsModule,
                SharedComponentsModule
            ],
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
