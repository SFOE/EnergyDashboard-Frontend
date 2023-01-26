import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuellstaendeSpeicherseenComponent } from './fuellstaende-speicherseen.component';

describe('FuellstaendeSpeicherseenComponent', () => {
    let component: FuellstaendeSpeicherseenComponent;
    let fixture: ComponentFixture<FuellstaendeSpeicherseenComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FuellstaendeSpeicherseenComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(FuellstaendeSpeicherseenComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
