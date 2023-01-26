import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KpiDateInfoSubtextComponent } from './kpi-date-info-subtext.component';

describe('KpiDateInfoSubtextComponent', () => {
    let component: KpiDateInfoSubtextComponent;
    let fixture: ComponentFixture<KpiDateInfoSubtextComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [KpiDateInfoSubtextComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(KpiDateInfoSubtextComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
