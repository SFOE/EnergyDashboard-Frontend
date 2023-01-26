export interface DynamicTranslations {
    de: TranslationKeys;
    fr: TranslationKeys;
    it: TranslationKeys;
    en: TranslationKeys;
}

export type TranslationKeys = {
    [key: string]: string;
};
