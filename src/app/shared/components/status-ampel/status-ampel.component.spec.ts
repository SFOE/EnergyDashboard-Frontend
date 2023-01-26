/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StatusAmpelComponent } from './status-ampel.component';

describe('StatusAmpelComponent', () => {
    let component: StatusAmpelComponent;
    let fixture: ComponentFixture<StatusAmpelComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [StatusAmpelComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StatusAmpelComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
