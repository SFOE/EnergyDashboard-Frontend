import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18NextModule } from 'angular-i18next';
import { CommonsModule } from '../../../shared/commons/commons.module';
import { SharedComponentsModule } from '../../../shared/components/shared-components.module';
import { SparzielHistogramChartComponent } from '../../../shared/components/sparziel/histogram-chart/sparziel-histogram-chart.component';
import { DiagramLegendModule } from '../../../shared/diagrams/diagram-legend/diagram-legend.module';
import { MockHideableTextSectionComponent } from '../../../test/component.fixture';
import { mockActivatedRouteProvider } from '../../../test/queryParamService.fixture';
import { StromsparzielFivePercentDetailsComponent } from '../stromsparziel-five-percent/components/stromsparziel-five-percent-details/stromsparziel-five-percent-details.component';
import { StromsparzielFivePercentComponent } from '../stromsparziel-five-percent/stromsparziel-five-percent.component';
import { StromsparzielAktuellerMonatDetailsComponent } from '../stromsparziel/stromsparziel-aktueller-monat-details/stromsparziel-aktueller-monat-details.component';
import { StromsparzielMehrMindestverbrauchProMonatComponent } from '../stromsparziel/stromsparziel-mehr-mindestverbrauch-pro-monat/stromsparziel-mehr-mindestverbrauch-pro-monat.component';
import { StromsparzielNachBereichAktuellerMonatHistogramChartTooltipComponent } from '../stromsparziel/stromsparziel-nach-bereich-aktueller-monat-histogram-chart/stromsparziel-nach-bereich-aktueller-monat-histogram-chart-tooltip/stromsparziel-nach-bereich-aktueller-monat-histogram-chart-tooltip.component';
import { StromsparzielNachBereichAktuellerMonatHistogramChartComponent } from '../stromsparziel/stromsparziel-nach-bereich-aktueller-monat-histogram-chart/stromsparziel-nach-bereich-aktueller-monat-histogram-chart.component';
import { StromsparzielNachBereichProMonatHistogramChartComponent } from '../stromsparziel/stromsparziel-nach-bereich-pro-monat-histogram-chart/stromsparziel-nach-bereich-pro-monat-histogram-chart.component';
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
                SharedComponentsModule,
                DiagramLegendModule
            ],
            declarations: [
                StromMinderMehrverbrauchComponent,
                SparzielHistogramChartComponent,
                MockHideableTextSectionComponent,
                StromsparzielFivePercentComponent,
                StromsparzielNachBereichProMonatHistogramChartComponent,
                StromsparzielAktuellerMonatDetailsComponent,
                StromsparzielFivePercentDetailsComponent,
                StromsparzielMehrMindestverbrauchProMonatComponent,
                StromsparzielNachBereichAktuellerMonatHistogramChartComponent,
                StromsparzielNachBereichAktuellerMonatHistogramChartTooltipComponent
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
