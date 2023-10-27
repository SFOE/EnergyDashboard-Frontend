import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18NextModule } from 'angular-i18next';
import { QueryParamService } from '../services/queryparams/queryparams.service';
import { MainApplicationComponent } from './main-application.component';
describe('MainApplicationComponent', () => {
    let component: MainApplicationComponent;
    let fixture: ComponentFixture<MainApplicationComponent>;

    class QueryParamServiceMock {
        isAppView(): boolean {
            return true;
        }
    }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [I18NextModule.forRoot()],
            declarations: [MainApplicationComponent],
            providers: [
                {
                    provide: QueryParamService,
                    useClass: QueryParamServiceMock
                }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(MainApplicationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
