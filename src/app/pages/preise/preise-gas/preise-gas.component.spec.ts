import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreiseGasComponent } from './preise-gas.component';

describe('PreiseGasComponent', () => {
    let component: PreiseGasComponent;
    let fixture: ComponentFixture<PreiseGasComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PreiseGasComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(PreiseGasComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
