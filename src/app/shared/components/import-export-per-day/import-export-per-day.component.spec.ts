import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportExportPerDayComponent } from './import-export-per-day.component';

describe('ImportExportPerDayComponent', () => {
    let component: ImportExportPerDayComponent;
    let fixture: ComponentFixture<ImportExportPerDayComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ImportExportPerDayComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(ImportExportPerDayComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
