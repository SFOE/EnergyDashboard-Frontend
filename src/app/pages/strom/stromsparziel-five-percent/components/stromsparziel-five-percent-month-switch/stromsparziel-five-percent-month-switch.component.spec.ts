/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StromsparzielFivePercentMonthSwitchComponent} from './stromsparziel-five-percent-month-switch.component';

describe('StromsparzielFivePercentMonthSwitchComponent', () => {
    let component: StromsparzielFivePercentMonthSwitchComponent;
    let fixture: ComponentFixture<StromsparzielFivePercentMonthSwitchComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [StromsparzielFivePercentMonthSwitchComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(
            StromsparzielFivePercentMonthSwitchComponent
        );
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
