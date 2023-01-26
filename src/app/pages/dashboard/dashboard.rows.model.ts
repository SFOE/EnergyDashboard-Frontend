import { DashboardRowModelData } from './dashboard-row/dashboard-row.component';

export interface TextMapEntry {
    titleDynamicKey: string;
    subTitleDynamicKey?: string;
    data: Partial<DashboardRowModelData>;
}

export const stromTextMap: {
    [key: string]: TextMapEntry;
} = {
    aktuellerVerbrauch: {
        titleDynamicKey: 'uebersicht_strom_verbrauch.titel',
        subTitleDynamicKey: 'uebersicht_strom_verbrauch.subtitel',
        data: {
            valuePostfix: 'GWh',
            valuePostfixSubtextKey: 'dashboard.uebersicht.per-day'
        }
    },
    gesamtProduktion: {
        titleDynamicKey: 'uebersicht_strom_produktion.titel',
        subTitleDynamicKey: 'uebersicht_strom_produktion.subtitel',
        data: {
            valuePostfix: 'GWh',
            valuePostfixSubtextKey: 'dashboard.uebersicht.per-day'
        }
    },
    speicherfuellstand: {
        titleDynamicKey: 'uebersicht_strom_speicherfüllstand-seen.titel',
        subTitleDynamicKey: 'uebersicht_strom_speicherfüllstand-seen.subtitel',
        data: {
            valuePostfix: '%',
            valuePostfixSubtextKey: 'dashboard.uebersicht.yesterday'
        }
    },
    nettoImport: {
        titleDynamicKey: 'uebersicht_strom_import.titel',
        subTitleDynamicKey: 'uebersicht_strom_import.subtitel',
        data: {
            valuePostfix: 'GWh',
            valuePostfixSubtextKey: 'dashboard.uebersicht.per-day'
        }
    },
    nettoExport: {
        titleDynamicKey: 'uebersicht_strom_export.titel',
        subTitleDynamicKey: 'uebersicht_strom_export.subtitel',
        data: {
            valuePostfix: 'GWh',
            valuePostfixSubtextKey: 'dashboard.uebersicht.per-day'
        }
    },
    aktuelleGesamteinsparung: {
        titleDynamicKey: 'uebersicht_strom_gesamteinsparung.titel',
        subTitleDynamicKey: 'uebersicht_strom_gesamteinsparung.subtitel',
        data: {
            valuePostfix: '%',
            valuePostfixSubtextKey: 'dashboard.uebersicht.since-1-10'
        }
    }
};

export const gasTextMap: { [key: string]: TextMapEntry } = {
    aktuellerVerbrauch: {
        titleDynamicKey: 'uebersicht_gas_verbrauch.titel',
        subTitleDynamicKey: 'uebersicht_gas_verbrauch.subtitel',
        data: {
            valuePostfix: 'GWh',
            valuePostfixSubtextKey: 'dashboard.uebersicht.per-month',
            valueSubtextKey: 'dashboard.uebersicht.gas.verbrauch.value-subtext'
        }
    },
    fuellstandNachbarlaender: {
        titleDynamicKey: 'uebersicht_gas_fuellstand-nachbarlaender.titel',
        subTitleDynamicKey: 'uebersicht_gas_fuellstand-nachbarlaender.subtitel',
        data: {
            valuePostfix: '%'
        }
    },
    nettoImport: {
        titleDynamicKey: 'uebersicht_gas_import.titel',
        subTitleDynamicKey: 'uebersicht_gas_import.subtitel',
        data: {
            valuePostfix: 'GWh',
            valuePostfixSubtextKey: 'dashboard.uebersicht.per-day',
            valueSubtextKey: 'dashboard.uebersicht.gas.import.value-subtext'
        }
    },
    aktuelleGesamteinsparung: {
        titleDynamicKey: 'uebersicht_gas_gesamteinsparung.titel',
        subTitleDynamicKey: 'uebersicht_gas_gesamteinsparung.subtitel',
        data: {
            valuePostfix: '%',
            valuePostfixSubtextKey: 'dashboard.uebersicht.since-1-10'
        }
    }
};
