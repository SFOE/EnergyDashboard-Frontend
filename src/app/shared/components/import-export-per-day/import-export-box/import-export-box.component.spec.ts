import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18NextModule } from 'angular-i18next';
import { CommonsModule } from '../../../commons/commons.module';
import { SharedComponentsModule } from '../../shared-components.module';

import { ImportExportBoxComponent } from './import-export-box.component';

describe('ImportExportBoxComponent', () => {
    let component: ImportExportBoxComponent;
    let fixture: ComponentFixture<ImportExportBoxComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                I18NextModule.forRoot(),
                CommonsModule,
                SharedComponentsModule
            ],
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
