import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18NextModule } from 'angular-i18next';
import { CommonsModule } from '../../commons/commons.module';
import { SharedComponentsModule } from '../shared-components.module';

import { ImportExportPerDayComponent } from './import-export-per-day.component';

describe('ImportExportPerDayComponent', () => {
    let component: ImportExportPerDayComponent;
    let fixture: ComponentFixture<ImportExportPerDayComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                I18NextModule.forRoot(),
                CommonsModule,
                SharedComponentsModule
            ],
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
