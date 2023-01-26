/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointsOfInterestLegendComponent } from './points-of-interest-legend.component';

describe('PointsOfInterestLegendComponent', () => {
    let component: PointsOfInterestLegendComponent;
    let fixture: ComponentFixture<PointsOfInterestLegendComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PointsOfInterestLegendComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PointsOfInterestLegendComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
