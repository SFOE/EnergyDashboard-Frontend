import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppBannerComponent } from './app-banner.component';
import { I18NextModule } from 'angular-i18next';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NavBoardService } from '../header/nav-board/nav-board.service';

describe('AppBannerComponent', () => {
    let component: AppBannerComponent;
    let fixture: ComponentFixture<AppBannerComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [AppBannerComponent],
            imports: [I18NextModule.forRoot(), HttpClientTestingModule],
            providers: [NavBoardService]
        });
        fixture = TestBed.createComponent(AppBannerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
