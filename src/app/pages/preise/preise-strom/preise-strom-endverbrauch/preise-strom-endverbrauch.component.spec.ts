import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18NextModule } from 'angular-i18next';
import { CommonsModule } from '../../../../shared/commons/commons.module';
import { SharedComponentsModule } from '../../../../shared/components/shared-components.module';

import { PreiseStromEndverbrauchComponent } from './preise-strom-endverbrauch.component';

describe('PreiseStromEndverbrauchComponent', () => {
    let component: PreiseStromEndverbrauchComponent;
    let fixture: ComponentFixture<PreiseStromEndverbrauchComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                I18NextModule.forRoot(),
                HttpClientTestingModule,
                CommonsModule,
                SharedComponentsModule
            ],
            declarations: [PreiseStromEndverbrauchComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(PreiseStromEndverbrauchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
