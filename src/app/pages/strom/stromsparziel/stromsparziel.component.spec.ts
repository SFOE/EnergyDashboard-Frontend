import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18NextModule } from 'angular-i18next';
import { CommonsModule } from '../../../shared/commons/commons.module';
import { SharedComponentsModule } from '../../../shared/components/shared-components.module';
import { SparzielHistogramChartComponent } from '../../../shared/components/sparziel/histogram-chart/sparziel-histogram-chart.component';
import { MockHideableTextSectionComponent } from '../../../test/component.fixture';
import { mockActivatedRouteProvider } from '../../../test/queryParamService.fixture';
import { StromsparzielAktuellerMonatDetailsComponent } from './stromsparziel-aktueller-monat-details/stromsparziel-aktueller-monat-details.component';
import { StromsparzielMehrMindestverbrauchProMonatComponent } from './stromsparziel-mehr-mindestverbrauch-pro-monat/stromsparziel-mehr-mindestverbrauch-pro-monat.component';
import { StromsparzielNachBereichAktuellerMonatHistogramChartComponent } from './stromsparziel-nach-bereich-aktueller-monat-histogram-chart/stromsparziel-nach-bereich-aktueller-monat-histogram-chart.component';
import { StromsparzielNachBereichProMonatHistogramChartComponent } from './stromsparziel-nach-bereich-pro-monat-histogram-chart/stromsparziel-nach-bereich-pro-monat-histogram-chart.component';
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
                // StromModule
            ],
            declarations: [
                StromsparzielComponent,
                SparzielHistogramChartComponent,
                MockHideableTextSectionComponent,
                StromsparzielNachBereichProMonatHistogramChartComponent,
                StromsparzielAktuellerMonatDetailsComponent,
                StromsparzielNachBereichAktuellerMonatHistogramChartComponent,
                StromsparzielMehrMindestverbrauchProMonatComponent
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
