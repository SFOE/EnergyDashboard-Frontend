/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18NextModule } from 'angular-i18next';

import { TooltipDiffDividerComponent } from './tooltip-diff-divider.component';

describe('TooltipRowComponent', () => {
    let component: TooltipDiffDividerComponent;
    let fixture: ComponentFixture<TooltipDiffDividerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [I18NextModule.forRoot()],
            declarations: [TooltipDiffDividerComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TooltipDiffDividerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
