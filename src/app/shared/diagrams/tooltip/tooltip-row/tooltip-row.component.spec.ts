/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TooltipRowComponent } from './tooltip-row.component';

describe('TooltipRowComponent', () => {
    let component: TooltipRowComponent;
    let fixture: ComponentFixture<TooltipRowComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TooltipRowComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TooltipRowComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
