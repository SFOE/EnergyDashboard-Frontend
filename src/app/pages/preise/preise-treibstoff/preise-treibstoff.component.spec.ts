import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18NextModule } from 'angular-i18next';
import { AppModule } from '../../../app.module';
import { CommonsModule } from '../../../shared/commons/commons.module';
import { SharedComponentsModule } from '../../../shared/components/shared-components.module';

import { PreiseTreibstoffComponent } from './preise-treibstoff.component';

describe('PreiseTreibstoffComponent', () => {
    let component: PreiseTreibstoffComponent;
    let fixture: ComponentFixture<PreiseTreibstoffComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                I18NextModule.forRoot(),
                AppModule,
                HttpClientTestingModule,
                CommonsModule,
                SharedComponentsModule
            ],
            declarations: [PreiseTreibstoffComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(PreiseTreibstoffComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
