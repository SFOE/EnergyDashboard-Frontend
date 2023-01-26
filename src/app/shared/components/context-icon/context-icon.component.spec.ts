/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ContextIconComponent } from './context-icon.component';

describe('ContextIconComponent', () => {
    let component: ContextIconComponent;
    let fixture: ComponentFixture<ContextIconComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ContextIconComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ContextIconComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
