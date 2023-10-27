import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18NextModule } from 'angular-i18next';
import { CommonsModule } from '../../../../shared/commons/commons.module';
import { SharedComponentsModule } from '../../../../shared/components/shared-components.module';
import { TrendModule } from '../../../../shared/components/trend/trend.module';
import { KkwAvailabilityChartTooltipComponent } from '../kkw-availability-chart/kkw-availability-chart-tooltip/kkw-availability-chart-tooltip.component';
import { KkwAvailabilityChartComponent } from '../kkw-availability-chart/kkw-availability-chart.component';
import { KkwProductionChartTooltipComponent } from '../kkw-production-chart/kkw-production-chart-tooltip/kkw-production-chart-tooltip.component';
import { KkwProductionChartComponent } from '../kkw-production-chart/kkw-production-chart.component';

import { mockActivatedRouteProvider } from '../../../../test/queryParamService.fixture';
import { KkwFrComponent } from './kkw-fr.component';

describe('KkwFrComponent', () => {
    let component: KkwFrComponent;
    let fixture: ComponentFixture<KkwFrComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                I18NextModule.forRoot(),
                HttpClientTestingModule,
                CommonsModule,
                SharedComponentsModule,
                TrendModule
            ],
            declarations: [
                KkwFrComponent,
                KkwProductionChartComponent,
                KkwProductionChartTooltipComponent,
                KkwAvailabilityChartComponent,
                KkwAvailabilityChartTooltipComponent
            ],
            providers: [mockActivatedRouteProvider]
        }).compileComponents();

        fixture = TestBed.createComponent(KkwFrComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
