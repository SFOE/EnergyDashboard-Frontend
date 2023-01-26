import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportExportBoxComponent } from './import-export-box.component';

describe('ImportExportBoxComponent', () => {
    let component: ImportExportBoxComponent;
    let fixture: ComponentFixture<ImportExportBoxComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ImportExportBoxComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(ImportExportBoxComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
