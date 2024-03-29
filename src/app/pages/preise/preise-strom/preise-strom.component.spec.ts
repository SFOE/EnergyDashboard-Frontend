import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18NextModule } from 'angular-i18next';
import { CommonsModule } from '../../../shared/commons/commons.module';
import { SharedComponentsModule } from '../../../shared/components/shared-components.module';
import { MockHideableTextSectionComponent } from '../../../test/component.fixture';
import { mockActivatedRouteProvider } from '../../../test/queryParamService.fixture';
import { PreiseFuturesChartComponent } from '../components/preise-futures-chart/preise-futures-chart.component';
import { PreiseStromComponent } from './preise-strom.component';

describe('PreiseStromComponent', () => {
    let component: PreiseStromComponent;
    let fixture: ComponentFixture<PreiseStromComponent>;

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
                PreiseStromComponent,
                PreiseFuturesChartComponent,
                MockHideableTextSectionComponent
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(PreiseStromComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
