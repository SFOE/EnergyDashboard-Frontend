import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportExportNetAreaChartComponent } from './import-export-net-area-chart.component';

describe('ImportExportNetAreaChartComponent', () => {
    let component: ImportExportNetAreaChartComponent;
    let fixture: ComponentFixture<ImportExportNetAreaChartComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ImportExportNetAreaChartComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(ImportExportNetAreaChartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
