import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18NextModule } from 'angular-i18next';
import { CommonsModule } from '../../../shared/commons/commons.module';
import { SharedComponentsModule } from '../../../shared/components/shared-components.module';

import { EuGasspeicherComponent } from './eu-gasspeicher.component';

describe('EuGasspeicherComponent', () => {
    let component: EuGasspeicherComponent;
    let fixture: ComponentFixture<EuGasspeicherComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                I18NextModule.forRoot(),
                HttpClientTestingModule,
                CommonsModule,
                SharedComponentsModule
            ],
            declarations: [EuGasspeicherComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(EuGasspeicherComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
