import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataProtectionComponent } from './data-protection.component';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {I18NextModule} from "angular-i18next";

describe('DataProtectionComponent', () => {
    let component: DataProtectionComponent;
    let fixture: ComponentFixture<DataProtectionComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [I18NextModule.forRoot()],
            declarations: [DataProtectionComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(DataProtectionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges()
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
