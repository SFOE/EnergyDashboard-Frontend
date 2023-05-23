/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PreiseFuturesChartComponent} from './preise-futures-chart.component';

describe('PreiseFuturesChartComponent', () => {
    let component: PreiseFuturesChartComponent;
    let fixture: ComponentFixture<PreiseFuturesChartComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PreiseFuturesChartComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PreiseFuturesChartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
