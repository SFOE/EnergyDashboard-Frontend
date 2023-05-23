import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18NextModule } from 'angular-i18next';

import { PreiseTreibstoffDieselComponent } from './preise-treibstoff-diesel.component';

describe('PreiseTreibstoffDieselComponent', () => {
    let component: PreiseTreibstoffDieselComponent;
    let fixture: ComponentFixture<PreiseTreibstoffDieselComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [I18NextModule.forRoot(), HttpClientTestingModule],
            declarations: [PreiseTreibstoffDieselComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(PreiseTreibstoffDieselComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
