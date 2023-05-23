import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegrationGuideComponent } from './integration-guide.component';

describe('IntegrationGuideComponent', () => {
    let component: IntegrationGuideComponent;
    let fixture: ComponentFixture<IntegrationGuideComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [IntegrationGuideComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(IntegrationGuideComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
