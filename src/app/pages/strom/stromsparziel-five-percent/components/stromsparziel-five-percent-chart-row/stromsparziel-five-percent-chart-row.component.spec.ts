/* tslint:disable:no-unused-variable */
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {I18NextModule} from 'angular-i18next';
import {CommonsModule} from '../../../../../shared/commons/commons.module';

import {StromsparzielFivePercentChartRowComponent} from './stromsparziel-five-percent-chart-row.component';

describe('StromsparzielFivePercentChartRowComponent', () => {
    let component: StromsparzielFivePercentChartRowComponent;
    let fixture: ComponentFixture<StromsparzielFivePercentChartRowComponent>;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            declarations: [StromsparzielFivePercentChartRowComponent],
            imports: [CommonsModule, I18NextModule.forRoot()]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(
            StromsparzielFivePercentChartRowComponent
        );
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
