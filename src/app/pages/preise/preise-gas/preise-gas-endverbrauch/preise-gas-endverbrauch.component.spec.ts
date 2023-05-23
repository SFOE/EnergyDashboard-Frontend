import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18NextModule } from 'angular-i18next';

import { PreiseGasEndverbrauchComponent } from './preise-gas-endverbrauch.component';

describe('PreiseGasEndverbrauchComponent', () => {
    let component: PreiseGasEndverbrauchComponent;
    let fixture: ComponentFixture<PreiseGasEndverbrauchComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [I18NextModule.forRoot(), HttpClientTestingModule],
            declarations: [PreiseGasEndverbrauchComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(PreiseGasEndverbrauchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
