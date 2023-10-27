import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18NextModule } from 'angular-i18next';
import {
    mockActivatedRouteProvider,
    mockQueryParamServiceProvider
} from '../../../test/queryParamService.fixture';
import { InfoPageComponent } from './info-page.component';
describe('InfoPageComponent', () => {
    let component: InfoPageComponent;
    let fixture: ComponentFixture<InfoPageComponent>;

    class QueryParamServiceMock {
        isAppView(): boolean {
            return false;
        }
    }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [I18NextModule.forRoot()],
            declarations: [InfoPageComponent],
            providers: [
                mockActivatedRouteProvider,
                mockQueryParamServiceProvider
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(InfoPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
