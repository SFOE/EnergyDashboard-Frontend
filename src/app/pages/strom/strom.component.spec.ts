import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { I18NextModule } from 'angular-i18next';
import { CommonsModule } from '../../shared/commons/commons.module';
import { SharedComponentsModule } from '../../shared/components/shared-components.module';

import { StromComponent } from './strom.component';

window.ResizeObserver =
    window.ResizeObserver ||
    jest.fn().mockImplementation(() => ({
        disconnect: jest.fn(),
        observe: jest.fn(),
        unobserve: jest.fn()
    }));

describe('StromComponent', () => {
    let component: StromComponent;
    let fixture: ComponentFixture<StromComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                I18NextModule.forRoot(),
                HttpClientTestingModule,
                CommonsModule,
                SharedComponentsModule,
                RouterTestingModule
            ],
            declarations: [StromComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(StromComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
