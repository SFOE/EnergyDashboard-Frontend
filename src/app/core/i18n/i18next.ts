import { APP_INITIALIZER, LOCALE_ID } from '@angular/core';
import { I18NEXT_SERVICE, ITranslationService } from 'angular-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

declare var require: any;

export function appInit(i18next: ITranslationService) {
    return () => {
        i18next.use<any>(LanguageDetector).init({
            // supportedLngs: ['de', 'fr', 'it', 'en'],
            supportedLngs: ['de', 'fr', 'it', 'en', 'cimode'],
            fallbackLng: 'de',
            debug: false,
            resources: {
                de: { translation: require('./translations/de.json') },
                fr: { translation: require('./translations/fr.json') },
                it: { translation: require('./translations/it.json') },
                en: { translation: require('./translations/en.json') }
            },
            returnEmptyString: false,
            ns: ['translation', 'dynamic'],
            // lang detection plugin options
            detection: {
                // order and from where user language should be detected
                order: ['cookie', 'querystring', 'navigator'],

                // keys or params to lookup language from
                lookupCookie: 'lang',

                // cache user language on
                caches: ['cookie'],
                excludeCacheFor: [],

                // optional expire and domain for set cookie
                cookieMinutes: 10080 // 7 days
                // cookieDomain: I18NEXT_LANG_COOKIE_DOMAIN
            }
        });
    };
}

export function localeIdFactory(i18next: ITranslationService) {
    return i18next.language;
}

export const I18N_PROVIDERS = [
    {
        provide: APP_INITIALIZER,
        useFactory: appInit,
        deps: [I18NEXT_SERVICE],
        multi: true
    },
    {
        provide: LOCALE_ID,
        deps: [I18NEXT_SERVICE],
        useFactory: localeIdFactory
    }
];
