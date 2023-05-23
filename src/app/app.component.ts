import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { I18NEXT_SERVICE, ITranslationService } from 'angular-i18next';
import { GoogleAnalyticsService } from './services/google-analytics.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor(
        @Inject(DOCUMENT) private document: Document,
        @Inject(I18NEXT_SERVICE) private i18NextService: ITranslationService,
        googleAnalyticsService: GoogleAnalyticsService
    ) {
        googleAnalyticsService.initialize();
    }

    ngOnInit(): void {
        this.document.documentElement.lang = this.i18NextService.language;
    }
}
