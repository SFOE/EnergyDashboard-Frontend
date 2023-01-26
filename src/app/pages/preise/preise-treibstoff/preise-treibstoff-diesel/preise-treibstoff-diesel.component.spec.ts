import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreiseTreibstoffDieselComponent } from './preise-treibstoff-diesel.component';

describe('PreiseTreibstoffDieselComponent', () => {
    let component: PreiseTreibstoffDieselComponent;
    let fixture: ComponentFixture<PreiseTreibstoffDieselComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PreiseTreibstoffDieselComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(PreiseTreibstoffDieselComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
