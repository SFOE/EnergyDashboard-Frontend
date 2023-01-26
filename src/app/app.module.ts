import { OverlayModule } from '@angular/cdk/overlay';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeDe from '@angular/common/locales/de';
import localeEn from '@angular/common/locales/en';
import localeFr from '@angular/common/locales/fr';
import localeIt from '@angular/common/locales/it';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
    FaIconLibrary,
    FontAwesomeModule
} from '@fortawesome/angular-fontawesome';
import {
    faBars,
    faChevronRight,
    faClose,
    faCoins,
    faDroplet,
    faExternalLink,
    faExternalLinkAlt,
    faExternalLinkSquareAlt,
    faUniversalAccess,
    IconDefinition
} from '@fortawesome/free-solid-svg-icons';
import faBrennholz from '../assets/icon/custom-icon/fa-brennholz';
import faFernwaerme from '../assets/icon/custom-icon/fa-fernwaerme';
import { faSunCloud } from '@fortawesome/pro-solid-svg-icons';
import { faEnvelope as farEnvelope } from '@fortawesome/free-regular-svg-icons';
import { I18NextModule } from 'angular-i18next';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { I18N_PROVIDERS } from './core/i18n/i18next';
import { NavBoardService } from './shared/components/header/nav-board/nav-board.service';
import { SharedComponentsModule } from './shared/components/shared-components.module';
import { FlyingFocusModule } from './shared/xternal-helpers/from-sc-ng-commons-public/components/flying-focus/flying-focus.module';
import { AxStatementComponent } from './pages/ax-statement/ax-statement.component';

registerLocaleData(localeDe);
registerLocaleData(localeFr);
registerLocaleData(localeIt);
registerLocaleData(localeEn);

@NgModule({
    declarations: [AppComponent, AxStatementComponent],
    imports: [
        BrowserModule.withServerTransition({ appId: 'serverApp' }),
        I18NextModule.forRoot(),
        HttpClientModule,
        AppRoutingModule,
        SharedComponentsModule,
        OverlayModule,
        FontAwesomeModule,
        HttpClientModule,
        FlyingFocusModule
    ],
    providers: [I18N_PROVIDERS, NavBoardService]
})
export class AppModule {
    constructor(library: FaIconLibrary) {
        // Add an icon to the library for convenient access in other components
        library.addIcons(faExternalLinkAlt);
        library.addIcons(faExternalLink);
        library.addIcons(faExternalLinkSquareAlt);
        library.addIcons(faClose);
        library.addIcons(faBars);
        library.addIcons(faChevronRight);
        library.addIcons(faCoins);
        library.addIcons(faDroplet);
        library.addIcons(faUniversalAccess);
        library.addIcons(faSunCloud as IconDefinition);
        library.addIcons(farEnvelope as IconDefinition);
        library.addIcons(faBrennholz as IconDefinition);
        library.addIcons(faFernwaerme as IconDefinition);
    }
}
