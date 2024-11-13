import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntkoppelungEndenergieverbrauchBipChartTooltipComponent } from './entkoppelung-endenergieverbrauch-bip-chart-tooltip.component';

describe('EntkoppelungEndenergieverbrauchBipChartTooltipComponent', () => {
    let component: EntkoppelungEndenergieverbrauchBipChartTooltipComponent;
    let fixture: ComponentFixture<EntkoppelungEndenergieverbrauchBipChartTooltipComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                EntkoppelungEndenergieverbrauchBipChartTooltipComponent
            ]
        });
        fixture = TestBed.createComponent(
            EntkoppelungEndenergieverbrauchBipChartTooltipComponent
        );
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
