import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Language } from 'src/app/core/i18n/language.enum';
import { TranslationService } from '../../../../app/core/i18n/translation.service';
import {
    AppStore,
    MobileDeviceInformation
} from '../../static-utils/mobile-device-information';

const APP_BANNER_DISMISSAL_KEY = 'app-banner-dismissal-date';
// REMARK: Specified with the language query parameter for simplicity
const APP_STORE_URLS = {
    [AppStore.APP_STORE]:
        'https://apps.apple.com/ch/app/energyinfoswiss/id6469721367?l=',
    [AppStore.GOOGLE_PLAY]:
        'https://play.google.com/store/apps/details?id=ch.bfe.energyinfoswiss&hl='
};

@Injectable({
    providedIn: 'root'
})
export class AppBannerService {
    private readonly platformId = inject(PLATFORM_ID);
    private mobileDevice: MobileDeviceInformation;

    constructor(private translationService: TranslationService) {
        if (!isPlatformBrowser(this.platformId)) return;

        this.mobileDevice = new MobileDeviceInformation(navigator.userAgent);
    }

    getAppStore(): AppStore {
        return this.mobileDevice.getDeviceAppStore();
    }

    getStoreURL(): string {
        const language = this.translationService.language as Language;
        const store = this.getAppStore();
        const url = APP_STORE_URLS[store];
        return `${url}${language}`;
    }

    /** Checks whether the banner should be shown based on device type and prior actions. */
    shouldBannerBeShown(): boolean {
        return (
            !this.hasBannerBeenDismissed() &&
            this.mobileDevice.isMobileDevice() &&
            !this.mobileDevice.isUsingSafariBrowser()
        );
    }

    dismissBanner(): void {
        const nowTimestamp = Date.now().toString();
        sessionStorage.setItem(APP_BANNER_DISMISSAL_KEY, nowTimestamp);
    }

    private hasBannerBeenDismissed(): boolean {
        const dismissalTimestamp = sessionStorage.getItem(
            APP_BANNER_DISMISSAL_KEY
        );
        return !!dismissalTimestamp;
    }
}
