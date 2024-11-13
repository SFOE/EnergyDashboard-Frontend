export enum AppStore {
    /** Apple's App Store */
    APP_STORE = 'apple',
    /** Google Play (Play Store) */
    GOOGLE_PLAY = 'play'
}

export class MobileDeviceInformation {
    constructor(public userAgent: string) {}

    isMobileDevice(): boolean {
        return /Mobile/.test(this.userAgent);
    }

    getDeviceAppStore(): AppStore {
        if (this.isIOS()) return AppStore.APP_STORE;
        else return AppStore.GOOGLE_PLAY;
    }

    /** Check whether the user agent corresponds to an iOS or iPadOS device */
    isIOS(): boolean {
        const userAgent = this.userAgent;
        const isIOS = /iPhone|iPod/.test(userAgent);
        // UserAgent is influenced by if "Request Desktop Website" is turned on
        // By default it is on.
        const maxTouchPoints = navigator.maxTouchPoints;
        const isIPadInMobileMode = /iPad/.test(userAgent);
        const isIPadInDesktopMode =
            /Intel Mac/.test(userAgent) &&
            !!maxTouchPoints &&
            maxTouchPoints > 2;
        const isIPadOS = isIPadInMobileMode || isIPadInDesktopMode;

        return isIOS || isIPadOS;
    }

    isUsingSafariBrowser(): boolean {
        const userAgent = this.userAgent;
        // Safari detection is tricky and requires a process of elimination currently
        const isSafari =
            /WebKit/.test(userAgent) && !/CriOS|Chrome/.test(userAgent);
        return isSafari;
    }
}
