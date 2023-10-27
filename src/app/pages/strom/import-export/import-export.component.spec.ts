import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18NextModule } from 'angular-i18next';
import { CommonsModule } from '../../../shared/commons/commons.module';
import { SharedComponentsModule } from '../../../shared/components/shared-components.module';
import { mockActivatedRouteProvider } from '../../../test/queryParamService.fixture';
import { ImportExportComponent } from './import-export.component';

describe('ImportExportComponent', () => {
    let component: ImportExportComponent;
    let fixture: ComponentFixture<ImportExportComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                I18NextModule.forRoot(),
                HttpClientTestingModule,
                CommonsModule,
                SharedComponentsModule
            ],
            providers: [mockActivatedRouteProvider],
            declarations: [ImportExportComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(ImportExportComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
