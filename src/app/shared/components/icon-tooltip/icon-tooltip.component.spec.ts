/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconTooltipComponent } from './icon-tooltip.component';

describe('IconTooltipComponent', () => {
    let component: IconTooltipComponent;
    let fixture: ComponentFixture<IconTooltipComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [IconTooltipComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(IconTooltipComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
