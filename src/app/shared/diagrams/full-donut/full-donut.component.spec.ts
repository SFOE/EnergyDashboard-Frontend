/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FullDonutComponent } from './full-donut.component';

describe('FullDonutComponent', () => {
    let component: FullDonutComponent;
    let fixture: ComponentFixture<FullDonutComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FullDonutComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FullDonutComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
