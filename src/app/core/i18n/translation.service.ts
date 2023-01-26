import { Inject, Injectable } from '@angular/core';
import { I18NEXT_SERVICE, ITranslationService } from 'angular-i18next';
import { DataService } from '../data/data.service';
import { TranslationKeys } from '../models/dynamic-translations';

@Injectable({
    providedIn: 'root'
})
export class TranslationService {
    constructor(
        @Inject(I18NEXT_SERVICE) private i18NextService: ITranslationService,
        private readonly dataService: DataService
    ) {
        this.dataService.dynamicTranslations().subscribe({
            next: (translations) => {
                this.addDynamicResource('de', translations.de);
                this.addDynamicResource('fr', translations.fr);
                this.addDynamicResource('it', translations.it);
                this.addDynamicResource('en', translations.en);
            },
            error: (err) => {
                console.log(
                    `Translations could not be loaded ${JSON.stringify(err)}`
                );
            }
        });
    }

    public get language(): string {
        return this.i18NextService.language;
    }

    public exists(key: string): boolean {
        return this.i18NextService.exists(key);
    }

    public returnTranslation(key: string): string {
        return this.i18NextService.t(key);
    }

    public changeLanguage(language: string) {
        if (language !== this.i18NextService.language) {
            this.i18NextService.changeLanguage(language).then((x) => {
                console.log(`changed language to: ${language}`);
                document.location.reload();
            });
        }
        console.log(`changing language to: ${language}`);
    }

    private addDynamicResource(language: string, entries: TranslationKeys) {
        this.i18NextService.addResources(language, 'dynamic', entries);
    }
}