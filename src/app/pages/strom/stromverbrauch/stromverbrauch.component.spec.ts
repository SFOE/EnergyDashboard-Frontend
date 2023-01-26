import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StromverbrauchComponent } from './stromverbrauch.component';

describe('StromverbrauchComponent', () => {
    let component: StromverbrauchComponent;
    let fixture: ComponentFixture<StromverbrauchComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [StromverbrauchComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(StromverbrauchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
