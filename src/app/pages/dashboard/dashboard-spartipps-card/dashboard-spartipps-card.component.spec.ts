/* tslint:disable:no-unused-variable */
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {I18NextModule} from 'angular-i18next';

import {DashboardSpartippsCardComponent} from './dashboard-spartipps-card.component';

describe('DashboardSpartippsCardComponent', () => {
    let component: DashboardSpartippsCardComponent;
    let fixture: ComponentFixture<DashboardSpartippsCardComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [I18NextModule.forRoot(), HttpClientTestingModule],
            declarations: [DashboardSpartippsCardComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardSpartippsCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
