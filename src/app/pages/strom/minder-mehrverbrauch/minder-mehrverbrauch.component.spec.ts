import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18NextModule } from 'angular-i18next';
import { CommonsModule } from '../../../shared/commons/commons.module';
import { SharedComponentsModule } from '../../../shared/components/shared-components.module';
import { SparzielHistogramChartComponent } from '../../../shared/components/sparziel/histogram-chart/sparziel-histogram-chart.component';

import { mockActivatedRouteProvider } from '../../../test/queryParamService.fixture';
import { StromMinderMehrverbrauchComponent } from './minder-mehrverbrauch.component';

describe('GassparzielComponent', () => {
    let component: StromMinderMehrverbrauchComponent;
    let fixture: ComponentFixture<StromMinderMehrverbrauchComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                I18NextModule.forRoot(),
                HttpClientTestingModule,
                CommonsModule,
                SharedComponentsModule
            ],
            declarations: [
                StromMinderMehrverbrauchComponent,
                SparzielHistogramChartComponent
            ],
            providers: [mockActivatedRouteProvider]
        }).compileComponents();

        fixture = TestBed.createComponent(StromMinderMehrverbrauchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
