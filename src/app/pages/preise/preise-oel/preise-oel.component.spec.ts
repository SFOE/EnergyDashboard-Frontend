import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreiseOelComponent } from './preise-oel.component';

describe('PreiseOelComponent', () => {
    let component: PreiseOelComponent;
    let fixture: ComponentFixture<PreiseOelComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PreiseOelComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(PreiseOelComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
