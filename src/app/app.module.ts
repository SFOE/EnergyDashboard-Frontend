import { OverlayModule } from '@angular/cdk/overlay';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeDe from '@angular/common/locales/de';
import localeEn from '@angular/common/locales/en';
import localeFr from '@angular/common/locales/fr';
import localeIt from '@angular/common/locales/it';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { I18NextModule } from 'angular-i18next';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { I18N_PROVIDERS } from './core/i18n/i18next';
import { NavBoardService } from './shared/components/header/nav-board/nav-board.service';
import { SharedComponentsModule } from './shared/components/shared-components.module';
import { FlyingFocusModule } from './shared/xternal-helpers/from-sc-ng-commons-public/components/flying-focus/flying-focus.module';
import { IconsModule } from './core/icons/icons.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

registerLocaleData(localeDe);
registerLocaleData(localeFr);
registerLocaleData(localeIt);
registerLocaleData(localeEn);

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule.withServerTransition({ appId: 'serverApp' }),
        I18NextModule.forRoot(),
        HttpClientModule,
        FontAwesomeModule,
        IconsModule,
        AppRoutingModule,
        SharedComponentsModule,
        OverlayModule,
        FlyingFocusModule
    ],
    providers: [I18N_PROVIDERS, NavBoardService]
})
export class AppModule {}
