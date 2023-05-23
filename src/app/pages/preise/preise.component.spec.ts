import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { I18NextModule } from 'angular-i18next';
import { AppModule } from '../../app.module';
import { CommonsModule } from '../../shared/commons/commons.module';
import { SharedComponentsModule } from '../../shared/components/shared-components.module';

import { PreiseComponent } from './preise.component';

describe('PreiseComponent', () => {
    let component: PreiseComponent;
    let fixture: ComponentFixture<PreiseComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                I18NextModule.forRoot(),
                CommonsModule,
                SharedComponentsModule,
                RouterTestingModule,
                AppModule
            ],
            declarations: [PreiseComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(PreiseComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
