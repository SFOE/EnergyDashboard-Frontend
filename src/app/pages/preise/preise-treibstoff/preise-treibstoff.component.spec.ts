import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreiseTreibstoffComponent } from './preise-treibstoff.component';

describe('PreiseTreibstoffComponent', () => {
    let component: PreiseTreibstoffComponent;
    let fixture: ComponentFixture<PreiseTreibstoffComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PreiseTreibstoffComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(PreiseTreibstoffComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
