import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18NextModule } from 'angular-i18next';

import { PreiseTreibstoffBenzinComponent } from './preise-treibstoff-benzin.component';

describe('PreiseTreibstoffBenzinComponent', () => {
    let component: PreiseTreibstoffBenzinComponent;
    let fixture: ComponentFixture<PreiseTreibstoffBenzinComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [I18NextModule.forRoot(), HttpClientTestingModule],
            declarations: [PreiseTreibstoffBenzinComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(PreiseTreibstoffBenzinComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
