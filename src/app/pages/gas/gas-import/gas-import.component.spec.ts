import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GasImportComponent } from './gas-import.component';

describe('GasImportComponent', () => {
    let component: GasImportComponent;
    let fixture: ComponentFixture<GasImportComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [GasImportComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(GasImportComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
