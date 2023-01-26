import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreiseStromEndverbrauchComponent } from './preise-strom-endverbrauch.component';

describe('PreiseStromEndverbrauchComponent', () => {
    let component: PreiseStromEndverbrauchComponent;
    let fixture: ComponentFixture<PreiseStromEndverbrauchComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PreiseStromEndverbrauchComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(PreiseStromEndverbrauchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
