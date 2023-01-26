import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreiseHolzComponent } from './preise-holz.component';

describe('PreiseBrennholzComponent', () => {
    let component: PreiseHolzComponent;
    let fixture: ComponentFixture<PreiseHolzComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PreiseHolzComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(PreiseHolzComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
