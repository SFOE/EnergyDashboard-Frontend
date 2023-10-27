/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KpiContainerRowComponent } from './kpi-container-row.component';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {I18NextModule} from "angular-i18next";

describe('KpiContainerRowComponent', () => {
    let component: KpiContainerRowComponent;
    let fixture: ComponentFixture<KpiContainerRowComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [I18NextModule.forRoot()],
            declarations: [KpiContainerRowComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
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
