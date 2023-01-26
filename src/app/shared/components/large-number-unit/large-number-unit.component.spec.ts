/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LargeNumberUnitComponent } from './large-number-unit.component';

describe('LargeNumberUnitComponent', () => {
    let component: LargeNumberUnitComponent;
    let fixture: ComponentFixture<LargeNumberUnitComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LargeNumberUnitComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LargeNumberUnitComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
