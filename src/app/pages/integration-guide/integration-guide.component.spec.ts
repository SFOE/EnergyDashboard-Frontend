import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegrationGuideComponent } from './integration-guide.component';
import {I18NextModule} from "angular-i18next";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

describe('IntegrationGuideComponent', () => {
    let component: IntegrationGuideComponent;
    let fixture: ComponentFixture<IntegrationGuideComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [I18NextModule.forRoot()],
            declarations: [IntegrationGuideComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(IntegrationGuideComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
