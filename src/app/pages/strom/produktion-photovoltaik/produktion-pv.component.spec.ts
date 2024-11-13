import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18NextModule } from 'angular-i18next';
import { CommonsModule } from '../../../shared/commons/commons.module';
import { SharedComponentsModule } from '../../../shared/components/shared-components.module';
import { MockHideableTextSectionComponent } from '../../../test/component.fixture';
import { mockActivatedRouteProvider } from '../../../test/queryParamService.fixture';
import { ProduktionPvComponent } from './produktion-pv.component';

describe('ProduktionPvComponent', () => {
    let component: ProduktionPvComponent;
    let fixture: ComponentFixture<ProduktionPvComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                I18NextModule.forRoot(),
                HttpClientTestingModule,
                CommonsModule,
                SharedComponentsModule
            ],
            providers: [mockActivatedRouteProvider],
            declarations: [
                ProduktionPvComponent,
                MockHideableTextSectionComponent
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ProduktionPvComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
