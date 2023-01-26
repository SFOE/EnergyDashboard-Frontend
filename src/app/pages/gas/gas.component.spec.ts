import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GasComponent } from './gas.component';

describe('GasComponent', () => {
    let component: GasComponent;
    let fixture: ComponentFixture<GasComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [GasComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(GasComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
