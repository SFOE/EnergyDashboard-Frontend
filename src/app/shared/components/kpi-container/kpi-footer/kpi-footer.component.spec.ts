/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KpiFooterComponent } from './kpi-footer.component';

describe('KpiFooterComponent', () => {
    let component: KpiFooterComponent;
    let fixture: ComponentFixture<KpiFooterComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [KpiFooterComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(KpiFooterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
