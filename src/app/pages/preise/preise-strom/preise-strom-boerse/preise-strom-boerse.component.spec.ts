import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreiseStromBoerseComponent } from './preise-strom-boerse.component';

describe('PreiseStromBoerseComponent', () => {
    let component: PreiseStromBoerseComponent;
    let fixture: ComponentFixture<PreiseStromBoerseComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PreiseStromBoerseComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(PreiseStromBoerseComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
