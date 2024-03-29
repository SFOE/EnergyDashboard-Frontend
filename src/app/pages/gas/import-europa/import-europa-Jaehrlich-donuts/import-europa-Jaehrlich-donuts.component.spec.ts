import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { I18NextModule } from 'angular-i18next';
import { CommonsModule } from '../../../../shared/commons/commons.module';
import { SharedComponentsModule } from '../../../../shared/components/shared-components.module';
import { MockHideableTextSectionComponent } from '../../../../test/component.fixture';
import { GasImportEuropaDonutComponent } from './import-europa-Jaehrlich-donuts.component';

describe('GasImportEuropaDonutComponent', () => {
    let component: GasImportEuropaDonutComponent;
    let fixture: ComponentFixture<GasImportEuropaDonutComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                I18NextModule.forRoot(),
                HttpClientTestingModule,
                CommonsModule,
                SharedComponentsModule,
                FontAwesomeModule
            ],
            declarations: [
                GasImportEuropaDonutComponent,
                MockHideableTextSectionComponent
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(GasImportEuropaDonutComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
