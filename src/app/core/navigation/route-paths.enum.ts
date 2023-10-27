export enum RoutePaths {
    DASHBOARD = '',
    DASHBOARD_OVERVIEW = 'dashboard',

    DASHBOARD_STROM = 'strom',
    DASHBOARD_STROM_FUELLSTAENDE_SPEICHERSEEN = 'fuellstaende-speicherseen',
    DASHBOARD_STROM_IMPORT_EXPORT = 'import-export',
    DASHBOARD_STROM_PRODUKTION = 'produktion',

    DASHBOARD_STROM_SPARZIEL = 'sparziel',
    DASHBOARD_STROM_STROMVERBRAUCH = 'stromverbrauch',
    DASHBOARD_STROM_KKW_CH = 'kkw-ch',
    DASHBOARD_STROM_KKW_FR = 'kkw-fr',
    DASHBOARD_STROM_MINDER_MEHRVERBRAUCH = 'minder-mehrverbrauch',

    DASHBOARD_GAS = 'gas',
    DASHBOARD_GAS_EU_GASSPEICHER = 'eu-gasspeicher',
    DASHBOARD_GAS_IMPORT = 'import',
    DASHBOARD_GAS_IMPORT_EUROPA = 'import-europa',
    DASHBOARD_GAS_SPARZIEL = 'sparziel',

    DASHBOARD_PREISE = 'preise',
    DASHBOARD_PREISE_STROM = 'strom',
    DASHBOARD_PREISE_STROM_KARTE_EUROPA = 'strom-karte',
    DASHBOARD_PREISE_GAS = 'gas',
    DASHBOARD_PREISE_OEL = 'oel',
    DASHBOARD_PREISE_TREIBSTOFF = 'treibstoff',
    DASHBOARD_PREISE_BRENNHOLZ = 'brennholz',
    DASHBOARD_PREISE_FERNWAERME = 'fernwaerme',

    DASHBOARD_WETTER = 'wetter',
    DASHBOARD_WETTER_AKTUELL = 'aktuell',
    DASHBOARD_WETTER_NIEDERSCHLAG = 'niederschlag',
    DASHBOARD_WETTER_SCHNEERESERVEN = 'schneereserven',
    DASHBOARD_WETTER_HEIZGRADTAGE = 'heizgradtage',

    DASHBOARD_AX = 'ax-statement',
    DASHBOARD_INTEGRATION_GUIDE = 'integration-guide',
    DASHBOARD_DATA_PROTECTION = 'data-protection',

    EMBED = 'embed'
}

export enum RoutePathFragments {
    FRAGMENT_STROM_VERBRAUCH_NACH_BEREICH = 'verbrauch-nach-bereich',
    FRAGMENT_STROM_VERBRAUCH_PRO_MONAT = 'verbrauch-pro-monat',
    FRAGMENT_STROM_VERBRAUCH_NACH_KUNDENGRUPPEN = 'verbrauch-nach-kundengruppen'
}
