import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { environment } from '../../environments/environment';

declare let gtag: Function;

@Injectable({
    providedIn: 'root'
})
export class GoogleAnalyticsService {
    constructor(
        private router: Router,
        @Inject(PLATFORM_ID) private platformId: any
    ) {}

    public initialize() {
        if (environment.gaTrackingId && isPlatformBrowser(this.platformId)) {
            this.injectGoogleAnalyticsTag();

            this.router.events.subscribe((event) => {
                if (event instanceof NavigationEnd) {
                    gtag('event', 'page_view', {
                        page_path: event.urlAfterRedirects
                    });
                }
            });
        }
    }

    injectGoogleAnalyticsTag() {
        // register google tag manager
        const gTagManagerScript = document.createElement('script');
        gTagManagerScript.async = true;
        gTagManagerScript.src = `https://www.googletagmanager.com/gtag/js?id=${environment.gaTrackingId}`;
        document.head.appendChild(gTagManagerScript);

        // register google analytics
        const gaScript = document.createElement('script');
        gaScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag() { dataLayer.push(arguments); }
      gtag('js', new Date());
      gtag('config', '${environment.gaTrackingId}');
    `;
        document.head.appendChild(gaScript);

        gtag('config', environment.gaTrackingId, {
            send_page_view: false
        });
    }
}
