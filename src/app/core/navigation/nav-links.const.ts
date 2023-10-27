import { RoutePathFragments, RoutePaths } from './route-paths.enum';

export interface NavLink {
    path: string;
    labelKey: string;
}

export interface NavLinkParent extends NavLink {
    children?: NavLink[];
}

export const detailLinksStrom = [
    {
        labelKey: 'kpi-strom-1_landesverbrauch.titel',
        path: RoutePaths.DASHBOARD_STROM_STROMVERBRAUCH
    },
    {
        labelKey: 'kpi-strom-5_produktion.titel',
        path: RoutePaths.DASHBOARD_STROM_PRODUKTION
    },
    {
        labelKey: 'kpi-strom-6_kkw-ch.titel',
        path: RoutePaths.DASHBOARD_STROM_KKW_CH
    },
    {
        labelKey: 'kpi-strom-6_kkw-fr.titel',
        path: RoutePaths.DASHBOARD_STROM_KKW_FR
    },
    {
        labelKey: 'kpi-strom-11_fuellstand-speicherseen.titel',
        path: RoutePaths.DASHBOARD_STROM_FUELLSTAENDE_SPEICHERSEEN
    },
    {
        labelKey: 'kpi-strom-9_import-export.titel',
        path: RoutePaths.DASHBOARD_STROM_IMPORT_EXPORT
    },
    {
        labelKey: 'kpi-strom-3_minder-mehrverbrauch.titel',
        path: RoutePaths.DASHBOARD_STROM_MINDER_MEHRVERBRAUCH,
        children: [
            {
                labelKey: 'kpi-strom-3_minder-mehrverbrauch.pro-monat.titel',
                path: RoutePaths.DASHBOARD_STROM_MINDER_MEHRVERBRAUCH,
                fragment: RoutePathFragments.FRAGMENT_STROM_VERBRAUCH_PRO_MONAT
            },
            {
                labelKey:
                    'kpi-strom-3_minder-mehrverbrauch.nach-kundengruppen.titel',
                path: RoutePaths.DASHBOARD_STROM_MINDER_MEHRVERBRAUCH,
                fragment:
                    RoutePathFragments.FRAGMENT_STROM_VERBRAUCH_NACH_KUNDENGRUPPEN
            },
            {
                labelKey: 'kpi-strom-3_minder-mehrverbrauch.nach-bereich.titel',
                path: RoutePaths.DASHBOARD_STROM_MINDER_MEHRVERBRAUCH,
                fragment:
                    RoutePathFragments.FRAGMENT_STROM_VERBRAUCH_NACH_BEREICH
            }
        ]
    }
];

export const detailLinksGas = [
    {
        labelKey: 'kpi-gas-5_import.titel',
        path: RoutePaths.DASHBOARD_GAS_IMPORT
    },
    {
        labelKey: 'kpi-gas-5_import-europa.titel',
        path: RoutePaths.DASHBOARD_GAS_IMPORT_EUROPA
    },
    {
        labelKey: 'kpi-gas-7_fuellstand-gasspeicher.titel',
        path: RoutePaths.DASHBOARD_GAS_EU_GASSPEICHER
    },
    {
        labelKey: 'kpi-gas-3_gassparziel.titel',
        path: RoutePaths.DASHBOARD_GAS_SPARZIEL
    }
];

export const detailLinksPreise = [
    {
        labelKey: 'kpi-preise-8_strom_europa.titel',
        path: RoutePaths.DASHBOARD_PREISE_STROM_KARTE_EUROPA
    },
    {
        labelKey: 'kpi-preise-5_strom.titel',
        path: RoutePaths.DASHBOARD_PREISE_STROM
    },
    {
        labelKey: 'kpi-preise-3_gas.titel',
        path: RoutePaths.DASHBOARD_PREISE_GAS
    },
    {
        labelKey: 'kpi-preise-4_heizol.titel',
        path: RoutePaths.DASHBOARD_PREISE_OEL
    },
    {
        labelKey: 'kpi-preise-1_treibstoff.titel',
        path: RoutePaths.DASHBOARD_PREISE_TREIBSTOFF
    },
    {
        labelKey: 'kpi-preise-6_brennholz.titel',
        path: RoutePaths.DASHBOARD_PREISE_BRENNHOLZ
    },
    {
        labelKey: 'kpi-preise-7_fernwaerme.titel',
        path: RoutePaths.DASHBOARD_PREISE_FERNWAERME
    }
];

export const detailLinksWetter = [
    {
        labelKey: 'kpi-wetter-1_meteoswiss.titel',
        path: RoutePaths.DASHBOARD_WETTER_AKTUELL
    },
    {
        labelKey: 'kpi-wetter-3_niederschlag.titel',
        path: RoutePaths.DASHBOARD_WETTER_NIEDERSCHLAG
    },
    {
        labelKey: 'kpi-wetter-4_schneereserven.titel',
        path: RoutePaths.DASHBOARD_WETTER_SCHNEERESERVEN
    },
    {
        labelKey: 'kpi-wetter-5_heizgradtage.titel',
        path: RoutePaths.DASHBOARD_WETTER_HEIZGRADTAGE
    }
];

export const navigationLinks: NavLinkParent[] = [
    { path: RoutePaths.DASHBOARD_OVERVIEW, labelKey: 'navigation.overview' },
    {
        path: RoutePaths.DASHBOARD_STROM,
        labelKey: 'navigation.strom',
        children: detailLinksStrom
    },
    {
        path: RoutePaths.DASHBOARD_GAS,
        labelKey: 'navigation.gas',
        children: detailLinksGas
    },
    {
        path: RoutePaths.DASHBOARD_PREISE,
        labelKey: 'navigation.preise',
        children: detailLinksPreise
    },
    {
        path: RoutePaths.DASHBOARD_WETTER,
        labelKey: 'navigation.wetter',
        children: detailLinksWetter
    }
];
