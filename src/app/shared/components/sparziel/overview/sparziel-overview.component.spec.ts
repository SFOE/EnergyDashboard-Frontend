/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SparzielOverviewComponent } from './sparziel-overview.component';

describe('SparzielOverviewComponent', () => {
    let component: SparzielOverviewComponent;
    let fixture: ComponentFixture<SparzielOverviewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SparzielOverviewComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SparzielOverviewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
