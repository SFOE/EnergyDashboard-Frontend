import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StromComponent } from './strom.component';

describe('StromComponent', () => {
    let component: StromComponent;
    let fixture: ComponentFixture<StromComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [StromComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(StromComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
