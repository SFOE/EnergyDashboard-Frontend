/* tslint:disable:no-unused-variable */
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {I18NextModule} from 'angular-i18next';
import {CommonsModule} from '../../../../../shared/commons/commons.module';
import {
    StromsparzielFivePercentChartRowComponent
} from '../stromsparziel-five-percent-chart-row/stromsparziel-five-percent-chart-row.component';

import {StromsparzielFivePercentChartComponent} from './stromsparziel-five-percent-chart.component';

describe('StromsparzielFivePercentChartComponent', () => {
    let component: StromsparzielFivePercentChartComponent;
    let fixture: ComponentFixture<StromsparzielFivePercentChartComponent>;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            declarations: [
                StromsparzielFivePercentChartComponent,
                StromsparzielFivePercentChartRowComponent
            ],
            imports: [CommonsModule, I18NextModule.forRoot()]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(
            StromsparzielFivePercentChartComponent
        );
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
