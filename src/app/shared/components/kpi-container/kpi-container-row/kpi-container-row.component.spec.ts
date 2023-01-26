/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KpiContainerRowComponent } from './kpi-container-row.component';

describe('KpiContainerRowComponent', () => {
    let component: KpiContainerRowComponent;
    let fixture: ComponentFixture<KpiContainerRowComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [KpiContainerRowComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(KpiContainerRowComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
