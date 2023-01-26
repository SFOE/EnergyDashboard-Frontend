import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduktionStrommixDonutMarsComponent } from './produktion-strommix-donut-mars.component';

describe('ProduktionStrommixDonutMarsComponent', () => {
    let component: ProduktionStrommixDonutMarsComponent;
    let fixture: ComponentFixture<ProduktionStrommixDonutMarsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ProduktionStrommixDonutMarsComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(ProduktionStrommixDonutMarsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
