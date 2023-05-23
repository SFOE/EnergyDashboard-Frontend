import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18NextModule } from 'angular-i18next';
import { CommonsModule } from '../../commons/commons.module';
import { SharedComponentsModule } from '../shared-components.module';

import { OptionalDynamicLangtextComponent } from './optional-dynamic-langtext.component';

describe('OptionalDynamicTextComponent', () => {
    let component: OptionalDynamicLangtextComponent;
    let fixture: ComponentFixture<OptionalDynamicLangtextComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                I18NextModule.forRoot(),
                HttpClientTestingModule,
                CommonsModule,
                SharedComponentsModule
            ],
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
