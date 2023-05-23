import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainApplicationComponent } from './main-application.component';

describe('MainApplicationComponent', () => {
    let component: MainApplicationComponent;
    let fixture: ComponentFixture<MainApplicationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MainApplicationComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(MainApplicationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
