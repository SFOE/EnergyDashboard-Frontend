/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18NextModule } from 'angular-i18next';
import { IconsModule } from '../../../../../core/icons/icons.module';
import { StromsparzielFivePercentPeakHoursEntry } from '../../../../../core/models/strom-sparziel-five-percent.model';
import { CommonsModule } from '../../../../../shared/commons/commons.module';
import { SharedComponentsModule } from '../../../../../shared/components/shared-components.module';
import { TooltipModule } from '../../../../../shared/diagrams/tooltip/tooltip.module';
import { MockHideableTextSectionComponent } from '../../../../../test/component.fixture';
import { StromsparzielFivePercentTooltip } from '../stromsparziel-five-percent-tooltip/stromsparziel-five-percent-tooltip.component';
import { StromsparzielFivePercentChartRowComponent } from './stromsparziel-five-percent-chart-row.component';

describe('StromsparzielFivePercentChartRowComponent', () => {
    let component: StromsparzielFivePercentChartRowComponent;
    let fixture: ComponentFixture<StromsparzielFivePercentChartRowComponent>;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            declarations: [
                StromsparzielFivePercentChartRowComponent,
                StromsparzielFivePercentTooltip,
                MockHideableTextSectionComponent
            ],
            imports: [
                CommonsModule,
                IconsModule,
                TooltipModule,
                SharedComponentsModule,
                I18NextModule.forRoot()
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        const entry: StromsparzielFivePercentPeakHoursEntry = {
            weekday: 2,
            hour: 2,
            savedPercent: 2,
            anteilPrivate: 2,
            anteilKMU: 2,
            anteilIndustrie: 2
        };
        const entries: StromsparzielFivePercentPeakHoursEntry[] = Array(entry);

        fixture = TestBed.createComponent(
            StromsparzielFivePercentChartRowComponent
        );
        component = fixture.componentInstance;
        component.entries = entries;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
