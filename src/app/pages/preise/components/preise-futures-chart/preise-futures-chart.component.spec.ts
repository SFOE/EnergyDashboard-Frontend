/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreiseFuturesChartComponent } from './preise-futures-chart.component';
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { I18NextModule } from "angular-i18next";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CommonsModule } from "../../../../shared/commons/commons.module";
import { Observable, of } from "rxjs";
import { HistogramLineEntry } from "../../../../shared/diagrams/histogram/histogram-line/histogram-line.component";

describe('PreiseFuturesChartComponent', () => {
    let component: PreiseFuturesChartComponent;
    let fixture: ComponentFixture<PreiseFuturesChartComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                I18NextModule.forRoot(),
                CommonsModule,
                HttpClientTestingModule
            ],
            declarations: [PreiseFuturesChartComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        const entry: HistogramLineEntry = {
            date: new Date(),
            values: Array(),
            band: null
        }
        const entries = Array(entry);
        const chartData$: Observable<HistogramLineEntry[]> = of(entries);

        fixture = TestBed.createComponent(PreiseFuturesChartComponent);
        component = fixture.componentInstance;
        component.chartData = chartData$;
        component.colors = ["red", "blue"];
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
