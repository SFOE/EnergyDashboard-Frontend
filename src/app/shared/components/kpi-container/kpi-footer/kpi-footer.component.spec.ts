/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18NextModule } from 'angular-i18next';
import { CommonsModule } from '../../../commons/commons.module';
import { SharedComponentsModule } from '../../shared-components.module';

import { KpiFooterComponent } from './kpi-footer.component';

describe('KpiFooterComponent', () => {
    let component: KpiFooterComponent;
    let fixture: ComponentFixture<KpiFooterComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                I18NextModule.forRoot(),
                CommonsModule,
                SharedComponentsModule
            ],
            declarations: [KpiFooterComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(KpiFooterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
