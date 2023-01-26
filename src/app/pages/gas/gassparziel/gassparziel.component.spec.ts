import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GassparzielComponent } from './gassparziel.component';

describe('GassparzielComponent', () => {
    let component: GassparzielComponent;
    let fixture: ComponentFixture<GassparzielComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [GassparzielComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(GassparzielComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
