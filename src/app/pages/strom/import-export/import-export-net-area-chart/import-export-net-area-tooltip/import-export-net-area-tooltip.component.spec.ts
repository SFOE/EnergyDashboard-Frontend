/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportExportNetAreaTooltipComponent } from './import-export-net-area-tooltip.component';

describe('ImportExportNetAreaTooltipComponent', () => {
    let component: ImportExportNetAreaTooltipComponent;
    let fixture: ComponentFixture<ImportExportNetAreaTooltipComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ImportExportNetAreaTooltipComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ImportExportNetAreaTooltipComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
