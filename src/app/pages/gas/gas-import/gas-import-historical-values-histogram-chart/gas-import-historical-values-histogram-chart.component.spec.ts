import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18NextModule } from 'angular-i18next';
import { CommonsModule } from '../../../../shared/commons/commons.module';
import { SharedComponentsModule } from '../../../../shared/components/shared-components.module';
import { DiagramLegendModule } from '../../../../shared/diagrams/diagram-legend/diagram-legend.module';

import { GasImportHistoricalValuesHistogramChartComponent } from './gas-import-historical-values-histogram-chart.component';

describe('GasImportHistoricalValuesHistogramChartComponent', () => {
    let component: GasImportHistoricalValuesHistogramChartComponent;
    let fixture: ComponentFixture<GasImportHistoricalValuesHistogramChartComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                I18NextModule.forRoot(),
                HttpClientTestingModule,
                DiagramLegendModule,
                CommonsModule,
                SharedComponentsModule
            ],
            declarations: [GasImportHistoricalValuesHistogramChartComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(
            GasImportHistoricalValuesHistogramChartComponent
        );
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
