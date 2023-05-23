import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18NextModule } from 'angular-i18next';
import { CommonsModule } from '../../../shared/commons/commons.module';
import { SharedComponentsModule } from '../../../shared/components/shared-components.module';
import { StromsparzielFivePercentChartRowComponent } from './components/stromsparziel-five-percent-chart-row/stromsparziel-five-percent-chart-row.component';
import { StromsparzielFivePercentChartComponent } from './components/stromsparziel-five-percent-chart/stromsparziel-five-percent-chart.component';

import { StromsparzielFivePercentComponent } from './stromsparziel-five-percent.component';

describe('GassparzielComponent', () => {
    let component: StromsparzielFivePercentComponent;
    let fixture: ComponentFixture<StromsparzielFivePercentComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                I18NextModule.forRoot(),
                HttpClientTestingModule,
                CommonsModule,
                SharedComponentsModule
            ],
            declarations: [
                StromsparzielFivePercentComponent,
                StromsparzielFivePercentChartComponent,
                StromsparzielFivePercentChartRowComponent
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(StromsparzielFivePercentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
