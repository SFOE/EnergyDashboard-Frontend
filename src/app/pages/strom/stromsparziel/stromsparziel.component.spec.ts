import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StromsparzielComponent } from './stromsparziel.component';

describe('GassparzielComponent', () => {
    let component: StromsparzielComponent;
    let fixture: ComponentFixture<StromsparzielComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [StromsparzielComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(StromsparzielComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
