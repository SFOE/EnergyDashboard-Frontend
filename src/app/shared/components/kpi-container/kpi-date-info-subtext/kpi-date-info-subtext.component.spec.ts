import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18NextModule } from 'angular-i18next';

import { KpiDateInfoSubtextComponent } from './kpi-date-info-subtext.component';

describe('KpiDateInfoSubtextComponent', () => {
    let component: KpiDateInfoSubtextComponent;
    let fixture: ComponentFixture<KpiDateInfoSubtextComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [I18NextModule.forRoot()],
            declarations: [KpiDateInfoSubtextComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(KpiDateInfoSubtextComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
