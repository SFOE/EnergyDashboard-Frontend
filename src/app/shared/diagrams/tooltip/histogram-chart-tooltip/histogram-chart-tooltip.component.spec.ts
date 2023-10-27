/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedComponentsModule } from '../../../../shared/components/shared-components.module';

import { HistogramChartTooltipComponent } from './histogram-chart-tooltip.component';

describe('FuellstandSpeicherseeTooltipComponent', () => {
    let component: HistogramChartTooltipComponent;
    let fixture: ComponentFixture<HistogramChartTooltipComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SharedComponentsModule],
            declarations: [HistogramChartTooltipComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HistogramChartTooltipComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
