import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextTitleComponent } from './context-title.component';

describe('ContextTitleComponent', () => {
    let component: ContextTitleComponent;
    let fixture: ComponentFixture<ContextTitleComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ContextTitleComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(ContextTitleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
