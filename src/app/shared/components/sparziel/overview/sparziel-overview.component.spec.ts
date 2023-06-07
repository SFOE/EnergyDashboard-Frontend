/* tslint:disable:no-unused-variable */
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {I18NextModule} from 'angular-i18next';
import {Trend, TrendRating} from '../../../../core/models/trend.enum';
import {CommonsModule} from '../../../commons/commons.module';
import {SparzielChartModule} from '../../../diagrams/sparziel/sparziel-chart.module';
import {SharedComponentsModule} from '../../shared-components.module';
import {TrendModule} from '../../trend/trend.module';

import {SparzielOverviewComponent} from './sparziel-overview.component';

describe('SparzielOverviewComponent', () => {
    let component: SparzielOverviewComponent;
    let fixture: ComponentFixture<SparzielOverviewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                I18NextModule.forRoot(),
                CommonsModule,
                SharedComponentsModule,
                TrendModule,
                SparzielChartModule
            ],
            declarations: [SparzielOverviewComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SparzielOverviewComponent);
        component = fixture.componentInstance;
        component.model = {
            sparzielEntry: {
                date: new Date(),
                kumulierteMonatlicheEinsparungGWh: 1,
                sparzielGWh: 1,
                standSparzielProzent: 1,
                standSparzielGeschaetztProzent: 1,
                standSparzielGemessenWitterungsbereinigtProzent: 1,
                trend: Trend.NEUTRAL,
                trendRating: TrendRating.NEUTRAL
            },
            trendLabelKey: 'trendLabelKey',
            color: 'color'
        };
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
