import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AktuellesWetterComponent } from './aktuelles-wetter.component';

describe('AktuellesWetterComponent', () => {
    let component: AktuellesWetterComponent;
    let fixture: ComponentFixture<AktuellesWetterComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AktuellesWetterComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(AktuellesWetterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
