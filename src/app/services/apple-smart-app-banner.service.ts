import { PlatformLocation } from '@angular/common';
import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AppleSmartAppBannerService {
    constructor(
        private meta: Meta,
        private router: Router,
        private platformLocation: PlatformLocation
    ) {}

    initialize(): void {
        this.router.events
            .pipe(filter((event) => event instanceof NavigationEnd))
            .subscribe(() => this.updateMetaTag());
    }

    // Update the smart app banner meta tag with the current URL (Deep linking),
    // providing context to the native app.
    private updateMetaTag(): void {
        const currentUrl = this.platformLocation.href;
        const appId = environment.appleAppId;

        if (!appId) return;

        this.meta.updateTag({
            name: 'apple-itunes-app',
            content: `app-id=${appId}, app-argument=${currentUrl}`
        });
    }
}
