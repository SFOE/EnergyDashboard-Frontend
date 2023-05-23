/* tslint:disable:no-unused-variable */
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {I18NextModule} from 'angular-i18next';
import {CommonsModule} from '../../commons/commons.module';
import {SharedComponentsModule} from '../shared-components.module';

import {KpiContainerComponent} from './kpi-container.component';

describe('KpiContainerComponent', () => {
    let component: KpiContainerComponent;
    let fixture: ComponentFixture<KpiContainerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                I18NextModule.forRoot(),
                CommonsModule,
                SharedComponentsModule
            ],
            declarations: [KpiContainerComponent]
        }).compileComponents();
    });

    beforeEach(() => {
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
