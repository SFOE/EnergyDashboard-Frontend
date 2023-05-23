import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18NextModule } from 'angular-i18next';
import { CommonsModule } from '../../../shared/commons/commons.module';
import { SharedComponentsModule } from '../../../shared/components/shared-components.module';

import { GassparzielComponent } from './gassparziel.component';

describe('GassparzielComponent', () => {
    let component: GassparzielComponent;
    let fixture: ComponentFixture<GassparzielComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                I18NextModule.forRoot(),
                HttpClientTestingModule,
                CommonsModule,
                SharedComponentsModule
            ],
            declarations: [GassparzielComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(GassparzielComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
