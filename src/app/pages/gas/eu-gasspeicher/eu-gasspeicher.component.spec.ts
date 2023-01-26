import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EuGasspeicherComponent } from './eu-gasspeicher.component';

describe('EuGasspeicherComponent', () => {
    let component: EuGasspeicherComponent;
    let fixture: ComponentFixture<EuGasspeicherComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EuGasspeicherComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(EuGasspeicherComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
