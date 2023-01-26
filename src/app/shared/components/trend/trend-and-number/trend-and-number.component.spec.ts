/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendAndNumberComponent } from './trend-and-number.component';

describe('TrendAndNumberComponent', () => {
    let component: TrendAndNumberComponent;
    let fixture: ComponentFixture<TrendAndNumberComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TrendAndNumberComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TrendAndNumberComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
