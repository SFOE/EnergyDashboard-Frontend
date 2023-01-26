import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreiseStromComponent } from './preise-strom.component';

describe('PreiseStromComponent', () => {
    let component: PreiseStromComponent;
    let fixture: ComponentFixture<PreiseStromComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PreiseStromComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(PreiseStromComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
