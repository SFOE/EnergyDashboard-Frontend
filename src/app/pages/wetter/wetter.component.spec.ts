import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { I18NextModule } from 'angular-i18next';
import { AppModule } from '../../app.module';
import { CommonsModule } from '../../shared/commons/commons.module';
import { SharedComponentsModule } from '../../shared/components/shared-components.module';

import { WetterComponent } from './wetter.component';

describe('WetterComponent', () => {
    let component: WetterComponent;
    let fixture: ComponentFixture<WetterComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                I18NextModule.forRoot(),
                CommonsModule,
                SharedComponentsModule,
                RouterTestingModule,
                AppModule
            ],
            declarations: [WetterComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(WetterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
