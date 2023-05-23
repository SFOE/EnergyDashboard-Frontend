import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18NextModule } from 'angular-i18next';
import { CommonsModule } from '../../../../shared/commons/commons.module';
import { SharedComponentsModule } from '../../../../shared/components/shared-components.module';

import { StromverbrauchHistorischerLandesverbrauchHistogramChartComponent } from './stromverbrauch-historischer-landesverbrauch-histogram-chart.component';

describe('StromverbrauchHistorischerLandesverbrauchHistogramChartComponent', () => {
    let component: StromverbrauchHistorischerLandesverbrauchHistogramChartComponent;
    let fixture: ComponentFixture<StromverbrauchHistorischerLandesverbrauchHistogramChartComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                I18NextModule.forRoot(),
                HttpClientTestingModule,
                CommonsModule,
                SharedComponentsModule
            ],
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
