import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18NextModule } from 'angular-i18next';

import { PreiseStromBoerseComponent } from './preise-strom-boerse.component';

describe('PreiseStromBoerseComponent', () => {
    let component: PreiseStromBoerseComponent;
    let fixture: ComponentFixture<PreiseStromBoerseComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [I18NextModule.forRoot(), HttpClientTestingModule],
            declarations: [PreiseStromBoerseComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(PreiseStromBoerseComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
