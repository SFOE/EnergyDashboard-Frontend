import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GasImportHistoricalValuesHistogramChartComponent } from './gas-import-historical-values-histogram-chart.component';

describe('GasImportHistoricalValuesHistogramChartComponent', () => {
    let component: GasImportHistoricalValuesHistogramChartComponent;
    let fixture: ComponentFixture<GasImportHistoricalValuesHistogramChartComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
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
