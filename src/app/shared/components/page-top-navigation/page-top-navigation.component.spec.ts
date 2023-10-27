import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { I18NextModule } from 'angular-i18next';
import { CommonsModule } from '../../commons/commons.module';
import { SharedComponentsModule } from '../shared-components.module';

import { PageTopNavigationComponent } from './page-top-navigation.component';

describe('PageTitleComponent', () => {
    let component: PageTopNavigationComponent;
    let fixture: ComponentFixture<PageTopNavigationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                I18NextModule.forRoot(),
                RouterTestingModule,
                CommonsModule,
                SharedComponentsModule
            ],
            declarations: [PageTopNavigationComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(PageTopNavigationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
