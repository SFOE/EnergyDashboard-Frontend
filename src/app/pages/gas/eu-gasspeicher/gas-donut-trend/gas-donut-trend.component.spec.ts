import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GasDonutTrendComponent } from './gas-donut-trend.component';

describe('GasDonutTrendComponent', () => {
    let component: GasDonutTrendComponent;
    let fixture: ComponentFixture<GasDonutTrendComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [GasDonutTrendComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(GasDonutTrendComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
