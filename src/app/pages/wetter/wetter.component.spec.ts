import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WetterComponent } from './wetter.component';

describe('WetterComponent', () => {
    let component: WetterComponent;
    let fixture: ComponentFixture<WetterComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [WetterComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(WetterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
