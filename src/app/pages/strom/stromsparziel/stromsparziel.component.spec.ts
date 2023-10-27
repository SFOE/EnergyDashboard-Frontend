import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18NextModule } from 'angular-i18next';
import { CommonsModule } from '../../../shared/commons/commons.module';
import { SharedComponentsModule } from '../../../shared/components/shared-components.module';
import { SparzielHistogramChartComponent } from '../../../shared/components/sparziel/histogram-chart/sparziel-histogram-chart.component';

import { mockActivatedRouteProvider } from '../../../test/queryParamService.fixture';
import { StromsparzielComponent } from './stromsparziel.component';

describe('GassparzielComponent', () => {
    let component: StromsparzielComponent;
    let fixture: ComponentFixture<StromsparzielComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                I18NextModule.forRoot(),
                HttpClientTestingModule,
                CommonsModule,
                SharedComponentsModule
            ],
            declarations: [
                StromsparzielComponent,
                SparzielHistogramChartComponent
            ],
            providers: [mockActivatedRouteProvider]
        }).compileComponents();

        fixture = TestBed.createComponent(StromsparzielComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
