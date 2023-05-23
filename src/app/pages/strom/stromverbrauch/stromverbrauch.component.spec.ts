import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18NextModule } from 'angular-i18next';
import { CommonsModule } from '../../../shared/commons/commons.module';
import { SharedComponentsModule } from '../../../shared/components/shared-components.module';

import { StromverbrauchComponent } from './stromverbrauch.component';

describe('StromverbrauchComponent', () => {
    let component: StromverbrauchComponent;
    let fixture: ComponentFixture<StromverbrauchComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                I18NextModule.forRoot(),
                HttpClientTestingModule,
                CommonsModule,
                SharedComponentsModule
            ],
            declarations: [StromverbrauchComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(StromverbrauchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
