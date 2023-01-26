import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduktionComponent } from './produktion.component';

describe('ProduktionComponent', () => {
    let component: ProduktionComponent;
    let fixture: ComponentFixture<ProduktionComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ProduktionComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(ProduktionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
