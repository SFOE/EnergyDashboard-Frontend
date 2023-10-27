import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18NextModule } from 'angular-i18next';
import {
    mockActivatedRouteProvider,
    mockRouterProvider
} from '../../test/queryParamService.fixture';
import { EmbedComponent } from './embed.component';

describe('EmbedComponent', () => {
    let component: EmbedComponent;
    let fixture: ComponentFixture<EmbedComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [I18NextModule.forRoot()],
            declarations: [EmbedComponent],
            providers: [mockActivatedRouteProvider, mockRouterProvider],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(EmbedComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
