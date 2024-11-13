import { TestBed } from '@angular/core/testing';

import { AppBannerService } from './app-banner.service';
import { I18NextModule } from 'angular-i18next';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NavBoardService } from '../header/nav-board/nav-board.service';

describe('AppBannerService', () => {
    let service: AppBannerService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [I18NextModule.forRoot(), HttpClientTestingModule],
            providers: [NavBoardService]
        });
        service = TestBed.inject(AppBannerService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
