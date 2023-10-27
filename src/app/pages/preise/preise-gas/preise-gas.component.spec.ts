import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18NextModule } from 'angular-i18next';
import { CommonsModule } from '../../../shared/commons/commons.module';
import { SharedComponentsModule } from '../../../shared/components/shared-components.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { mockActivatedRouteProvider } from '../../../test/queryParamService.fixture';
import { PreiseGasComponent } from './preise-gas.component';

describe('PreiseGasComponent', () => {
    let component: PreiseGasComponent;
    let fixture: ComponentFixture<PreiseGasComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                I18NextModule.forRoot(),
                HttpClientTestingModule,
                CommonsModule,
                SharedComponentsModule
            ],
            declarations: [PreiseGasComponent],
            providers: [mockActivatedRouteProvider],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(PreiseGasComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
