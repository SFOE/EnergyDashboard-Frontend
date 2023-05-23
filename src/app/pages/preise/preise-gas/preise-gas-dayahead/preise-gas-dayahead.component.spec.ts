import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18NextModule } from 'angular-i18next';

import { PreiseGasDayaheadComponent } from './preise-gas-dayahead.component';

describe('PreiseGasDayaheadComponent', () => {
    let component: PreiseGasDayaheadComponent;
    let fixture: ComponentFixture<PreiseGasDayaheadComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [I18NextModule.forRoot(), HttpClientTestingModule],
            declarations: [PreiseGasDayaheadComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(PreiseGasDayaheadComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
