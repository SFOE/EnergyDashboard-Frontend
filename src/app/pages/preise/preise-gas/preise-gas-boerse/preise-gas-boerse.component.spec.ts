import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreiseGasBoerseComponent } from './preise-gas-boerse.component';

describe('PreiseGasBoerseComponent', () => {
    let component: PreiseGasBoerseComponent;
    let fixture: ComponentFixture<PreiseGasBoerseComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PreiseGasBoerseComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(PreiseGasBoerseComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
