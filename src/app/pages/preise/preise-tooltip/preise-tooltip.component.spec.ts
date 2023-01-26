import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreiseTooltipComponent } from './preise-tooltip.component';

describe('PreiseTooltipComponent', () => {
    let component: PreiseTooltipComponent;
    let fixture: ComponentFixture<PreiseTooltipComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PreiseTooltipComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(PreiseTooltipComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
