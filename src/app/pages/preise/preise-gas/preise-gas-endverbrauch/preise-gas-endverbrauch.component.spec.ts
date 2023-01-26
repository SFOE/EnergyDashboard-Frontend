import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreiseGasEndverbrauchComponent } from './preise-gas-endverbrauch.component';

describe('PreiseGasEndverbrauchComponent', () => {
    let component: PreiseGasEndverbrauchComponent;
    let fixture: ComponentFixture<PreiseGasEndverbrauchComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PreiseGasEndverbrauchComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(PreiseGasEndverbrauchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
