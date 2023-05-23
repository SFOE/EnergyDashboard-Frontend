/* tslint:disable:no-unused-variable */
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {I18NextModule} from 'angular-i18next';

import {StatusAmpelComponent} from './status-ampel.component';

describe('StatusAmpelComponent', () => {
    let component: StatusAmpelComponent;
    let fixture: ComponentFixture<StatusAmpelComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [I18NextModule.forRoot(), HttpClientTestingModule],
            declarations: [StatusAmpelComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StatusAmpelComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
