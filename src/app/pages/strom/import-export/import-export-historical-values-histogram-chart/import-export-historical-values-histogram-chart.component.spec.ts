import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportExportHistoricalValuesHistogramChartComponent } from './import-export-historical-values-histogram-chart.component';

describe('ImportExportHistoricalValuesHistogramChartComponent', () => {
    let component: ImportExportHistoricalValuesHistogramChartComponent;
    let fixture: ComponentFixture<ImportExportHistoricalValuesHistogramChartComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ImportExportHistoricalValuesHistogramChartComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(
            ImportExportHistoricalValuesHistogramChartComponent
        );
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
