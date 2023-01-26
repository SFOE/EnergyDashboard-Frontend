import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionalDynamicLangtextComponent } from './optional-dynamic-langtext.component';

describe('OptionalDynamicTextComponent', () => {
    let component: OptionalDynamicLangtextComponent;
    let fixture: ComponentFixture<OptionalDynamicLangtextComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [OptionalDynamicLangtextComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(OptionalDynamicLangtextComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
