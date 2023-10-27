/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18NextModule } from 'angular-i18next';
import { CommonsModule } from '../../../../../shared/commons/commons.module';

import { StromsparzielFivePercentChartRowComponent } from './stromsparziel-five-percent-chart-row.component';
import { StromsparzielFivePercentPeakHoursEntry } from "../../../../../core/models/strom-sparziel-five-percent.model";

describe('StromsparzielFivePercentChartRowComponent', () => {
    let component: StromsparzielFivePercentChartRowComponent;
    let fixture: ComponentFixture<StromsparzielFivePercentChartRowComponent>;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            declarations: [StromsparzielFivePercentChartRowComponent],
            imports: [
                CommonsModule,
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
