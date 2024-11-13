import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { QueryParamService } from 'src/app/services/queryparams/queryparams.service';
import { NavBoardService } from '../header/nav-board/nav-board.service';
import { AppBannerService } from './app-banner.service';

@Component({
    selector: 'bfe-app-banner',
    templateUrl: './app-banner.component.html',
    styleUrls: ['./app-banner.component.scss']
})
export class AppBannerComponent implements OnInit {
    showBanner = false;
    isNavBoardOpen = this.navBoardService.isOpen$;

    private readonly platformId = inject(PLATFORM_ID);

    constructor(
        private appBannerService: AppBannerService,
        private navBoardService: NavBoardService,
        private queryParamService: QueryParamService
    ) {}

    ngOnInit(): void {
        if (!isPlatformBrowser(this.platformId)) return;
        if (this.queryParamService.isAppView()) return;

        this.showBanner = this.appBannerService.shouldBannerBeShown();
    }

    dismissBanner() {
        this.appBannerService.dismissBanner();
        this.showBanner = false;
    }

    getDeviceStylingClass() {
        const store = this.appBannerService.getAppStore();
        const modifierClass = `app-banner--${store}`;
        return modifierClass;
    }

    getStoreURL() {
        return this.appBannerService.getStoreURL();
    }

    getAppIconPath() {
        return 'assets/icon/energyinfoswiss_app_icon.svg';
    }
}
