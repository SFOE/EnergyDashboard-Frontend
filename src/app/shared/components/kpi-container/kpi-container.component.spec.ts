/* tslint:disable:no-unused-variable */
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18NextModule } from 'angular-i18next';
import {
    mockActivatedRouteProvider,
    mockQueryParamServiceProvider
} from '../../../test/queryParamService.fixture';
import { CommonsModule } from '../../commons/commons.module';
import { SharedComponentsModule } from '../shared-components.module';
import { KpiContainerComponent } from './kpi-container.component';
describe('KpiContainerComponent', () => {
    let component: KpiContainerComponent;
    let fixture: ComponentFixture<KpiContainerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                I18NextModule.forRoot(),
                HttpClientTestingModule,
                CommonsModule,
                SharedComponentsModule
            ],
            declarations: [KpiContainerComponent],
            providers: [
                mockActivatedRouteProvider,
                mockQueryParamServiceProvider
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(KpiContainerComponent);
        component = fixture.componentInstance;
        component.footerConfig = {
            sourceDynamicKey: 'sourceDynamicKey',
            langtextDynamicKey: 'langtextDynamicKey'
        };
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
