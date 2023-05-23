import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { I18NextModule } from 'angular-i18next';
import { CommonsModule } from '../../commons/commons.module';
import { SharedComponentsModule } from '../shared-components.module';

import { PageTitleComponent } from './page-title.component';

describe('PageTitleComponent', () => {
    let component: PageTitleComponent;
    let fixture: ComponentFixture<PageTitleComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                I18NextModule.forRoot(),
                RouterTestingModule,
                CommonsModule,
                SharedComponentsModule
            ],
            declarations: [PageTitleComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(PageTitleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
