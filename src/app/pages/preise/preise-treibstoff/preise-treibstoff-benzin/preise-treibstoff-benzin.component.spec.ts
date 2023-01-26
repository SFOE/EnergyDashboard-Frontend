import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreiseTreibstoffBenzinComponent } from './preise-treibstoff-benzin.component';

describe('PreiseTreibstoffBenzinComponent', () => {
    let component: PreiseTreibstoffBenzinComponent;
    let fixture: ComponentFixture<PreiseTreibstoffBenzinComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
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
