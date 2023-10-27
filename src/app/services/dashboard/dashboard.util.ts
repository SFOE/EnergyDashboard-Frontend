import { Context } from '../../core/models/context.enum';
import {
    DashboardGasDto,
    DashboardPriceDto,
    DashboardSpartipp,
    DashboardSpartippDisplay,
    DashboardStromDto,
    DashboardWetterDto
} from '../../core/models/dashboard';
import { RoutePaths } from '../../core/navigation/route-paths.enum';
import { DashboardPriceRowModel } from '../../pages/dashboard/dashboard-price-row/dashboard-price-row.component';
import { DashboardRowModel } from '../../pages/dashboard/dashboard-row/dashboard-row.component';
import {
    COLOR_GAS,
    COLOR_STROM,
    COLOR_WETTER
} from '../../shared/commons/colors.const';

export const mapWetterDtoToRowModels = (
    dto: DashboardWetterDto
): DashboardRowModel[] => {
    return [
        {
            titleDynamicKey: 'uebersicht_wetter_aktuell.titel',
            subTitleDynamicKey: 'uebersicht_wetter_aktuell.subtitel',
            data: {
                color: COLOR_WETTER,
                valuePostfix: '°C',
                ...dto.aktuelleTemperatur
            },
            link: `${RoutePaths.DASHBOARD_WETTER}/${RoutePaths.DASHBOARD_WETTER_AKTUELL}`,
            loading: false
        },
        {
            titleDynamicKey: 'uebersicht_wetter_prognose.titel',
            subTitleDynamicKey: 'uebersicht_wetter_prognose.subtitel',
            data: {
                color: COLOR_WETTER,
                valuePostfix: '°C',
                ...dto.prognoseTemperatur
            },
            link: `${RoutePaths.DASHBOARD_WETTER}/${RoutePaths.DASHBOARD_WETTER_AKTUELL}`,
            loading: false
        },
        {
            titleDynamicKey: 'uebersicht_wetter_niederschlaege.titel',
            subTitleDynamicKey: 'uebersicht_wetter_niederschlaege.subtitel',
            data: {
                color: COLOR_WETTER,
                valuePostfix: '%',
                ...dto.niederschlaege
            },
            link: `${RoutePaths.DASHBOARD_WETTER}/${RoutePaths.DASHBOARD_WETTER_NIEDERSCHLAG}`,
            loading: false
        },
        {
            titleDynamicKey: 'uebersicht_wetter_schneereserven.titel',
            subTitleDynamicKey: 'uebersicht_wetter_schneereserven.subtitel',
            data: {
                color: COLOR_WETTER,
                valuePostfix: 'mm',
                ...dto.schneereserven
            },
            link: `${RoutePaths.DASHBOARD_WETTER}/${RoutePaths.DASHBOARD_WETTER_SCHNEERESERVEN}`,
            loading: false
        },
        {
            titleDynamicKey: 'uebersicht_wetter_heizgradtage.dashboard.titel',
            subTitleDynamicKey:
                'uebersicht_wetter_heizgradtage.dashboard.subtitel',
            data: {
                color: COLOR_WETTER,
                valuePostfix: 'HGT',
                ...dto.heizgradtage
            },
            link: `${RoutePaths.DASHBOARD_WETTER}/${RoutePaths.DASHBOARD_WETTER_HEIZGRADTAGE}`,
            loading: false
        }
    ];
};

export const mapPriceDtoToDataArray = (
    dto: DashboardPriceDto
): DashboardPriceRowModel[] => {
    return [
        {
            context: Context.STROM,
            subTitleDynamicKey: 'uebersicht_preise_strom.subtitel',
            data: {
                price: dto.stromBoerse.value,
                valuePostfix: 'MWh',
                currency: 'EUR',
                valueTopTextKey: 'dashboard.uebersicht.strom.preise.price-info',
                valueBottomTextKey: 'commons.updated-daily'
            },
            link: `${RoutePaths.DASHBOARD_PREISE}/${RoutePaths.DASHBOARD_PREISE_STROM_KARTE_EUROPA}`,
            loading: false
        },
        {
            context: Context.GAS,
            subTitleDynamicKey: 'uebersicht_preise_gas.subtitel',
            data: {
                price: dto.gasBoerse.value,
                valuePostfix: 'MWh',
                currency: 'EUR',
                valueTopTextKey: 'dashboard.uebersicht.gas.preise.price-info',
                valueBottomTextKey: 'commons.updated-daily'
            },
            link: `${RoutePaths.DASHBOARD_PREISE}/${RoutePaths.DASHBOARD_PREISE_GAS}`,
            loading: false
        },
        {
            context: Context.OEL,
            subTitleDynamicKey: 'uebersicht_preise_heizoel.subtitel',
            data: {
                price: dto.heizoelEntwicklung.value,
                valuePostfix: '%',
                valueTopTextKey: 'dashboard.uebersicht.index.preise.price-info',
                valueBottomTextKey: 'commons.updated-monthly'
            },
            link: `${RoutePaths.DASHBOARD_PREISE}/${RoutePaths.DASHBOARD_PREISE_OEL}`,
            loading: false
        },
        {
            context: Context.DIESEL,
            subTitleDynamicKey: 'uebersicht_preise_diesel.subtitel',
            data: {
                price: dto.treibstoffDiesel.value,
                valuePostfix: '%',
                valueTopTextKey: 'dashboard.uebersicht.index.preise.price-info',
                valueBottomTextKey: 'commons.updated-monthly'
            },
            link: `${RoutePaths.DASHBOARD_PREISE}/${RoutePaths.DASHBOARD_PREISE_TREIBSTOFF}`,
            loading: false
        },
        {
            context: Context.BENZIN,
            subTitleDynamicKey: 'uebersicht_preise_benzin.subtitel',
            data: {
                price: dto.treibstoffBenzin.value,
                valuePostfix: '%',
                valueTopTextKey: 'dashboard.uebersicht.index.preise.price-info',
                valueBottomTextKey: 'commons.updated-monthly'
            },
            link: `${RoutePaths.DASHBOARD_PREISE}/${RoutePaths.DASHBOARD_PREISE_TREIBSTOFF}`,
            loading: false
        }
    ];
};

export const mapStromDtoToRowModels = (
    dto: DashboardStromDto
): DashboardRowModel[] => {
    dto;
    return [
        {
            titleDynamicKey: 'uebersicht_strom_verbrauch.titel',
            subTitleDynamicKey: 'uebersicht_strom_verbrauch.subtitel',
            data: {
                color: COLOR_STROM,
                valuePostfix: 'GWh',
                valuePostfixSubtextKey: 'dashboard.uebersicht.per-day',
                ...dto.aktuellerVerbrauch
            },
            link: `${RoutePaths.DASHBOARD_STROM}/${RoutePaths.DASHBOARD_STROM_STROMVERBRAUCH}`,
            loading: false
        },
        {
            titleDynamicKey: 'uebersicht_strom_produktion.titel',
            subTitleDynamicKey: 'uebersicht_strom_produktion.subtitel',
            data: {
                color: COLOR_STROM,
                valuePostfix: 'GWh',
                valuePostfixSubtextKey: 'dashboard.uebersicht.per-day',
                ...dto.gesamtProduktion
            },
            link: `${RoutePaths.DASHBOARD_STROM}/${RoutePaths.DASHBOARD_STROM_PRODUKTION}`,
            loading: false
        },
        {
            titleDynamicKey: 'uebersicht_strom_speicherfüllstand-seen.titel',
            subTitleDynamicKey:
                'uebersicht_strom_speicherfüllstand-seen.subtitel',
            data: {
                color: COLOR_STROM,
                valuePostfix: '%',
                valuePostfixSubtextKey: 'dashboard.uebersicht.yesterday',
                ...dto.speicherfuellstand
            },
            link: `${RoutePaths.DASHBOARD_STROM}/${RoutePaths.DASHBOARD_STROM_FUELLSTAENDE_SPEICHERSEEN}`,
            loading: false
        },
        {
            titleDynamicKey: 'uebersicht_strom_import.titel',
            subTitleDynamicKey: 'uebersicht_strom_import.subtitel',
            data: {
                color: COLOR_STROM,
                valuePostfix: 'GWh',
                valuePostfixSubtextKey: 'dashboard.uebersicht.per-day',
                ...dto.nettoImport
            },
            link: `${RoutePaths.DASHBOARD_STROM}/${RoutePaths.DASHBOARD_STROM_IMPORT_EXPORT}`,
            loading: false
        },
        {
            titleDynamicKey: 'uebersicht_strom_export.titel',
            subTitleDynamicKey: 'uebersicht_strom_export.subtitel',
            data: {
                color: COLOR_STROM,
                valuePostfix: 'GWh',
                valuePostfixSubtextKey: 'dashboard.uebersicht.per-day',
                ...dto.nettoExport
            },
            link: `${RoutePaths.DASHBOARD_STROM}/${RoutePaths.DASHBOARD_STROM_IMPORT_EXPORT}`,
            loading: false
        },
        {
            titleDynamicKey: 'uebersicht_strom_mehr-minderverbrauch.titel',
            subTitleDynamicKey:
                'uebersicht_strom_mehr-minderverbrauch.subtitel',
            data: {
                color: COLOR_STROM,
                valuePostfix: '%',
                valuePostfixSubtextKey: 'dashboard.uebersicht.since-1-10',
                ...dto.aktuelleGesamteinsparung
            },
            link: `${RoutePaths.DASHBOARD_STROM}/${RoutePaths.DASHBOARD_STROM_MINDER_MEHRVERBRAUCH}`,
            loading: false
        }
    ];
};

export const mapGasDtoToRowModels = (
    dto: DashboardGasDto
): DashboardRowModel[] => {
    return [
        {
            titleDynamicKey: 'uebersicht_gas_import.titel',
            subTitleDynamicKey: 'uebersicht_gas_import.subtitel',
            data: {
                color: COLOR_GAS,
                valuePostfix: 'GWh',
                valuePostfixSubtextKey: 'dashboard.uebersicht.per-day',
                valueSubtextKey:
                    'dashboard.uebersicht.gas.import.value-subtext',
                ...dto.nettoImport
            },
            link: `${RoutePaths.DASHBOARD_GAS}/${RoutePaths.DASHBOARD_GAS_IMPORT}`,
            loading: false
        },
        {
            titleDynamicKey: 'uebersicht_gas_verbrauch.titel',
            subTitleDynamicKey: 'uebersicht_gas_verbrauch.subtitel',
            data: {
                color: COLOR_GAS,
                valuePostfix: 'GWh',
                valuePostfixSubtextKey: 'dashboard.uebersicht.per-month',
                valueSubtextKey:
                    'dashboard.uebersicht.gas.verbrauch.value-subtext',
                ...dto.aktuellerVerbrauch
            },
            link: `${RoutePaths.DASHBOARD_GAS}/${RoutePaths.DASHBOARD_GAS_IMPORT}`,
            loading: false
        },
        {
            titleDynamicKey: 'uebersicht_gas_import-europa.titel',
            subTitleDynamicKey: 'uebersicht_gas_import-europa.subtitel',
            data: {
                color: COLOR_GAS,
                valuePostfix: 'commons.unit.mioM3',
                valuePostfixSubtextKey: 'dashboard.uebersicht.per-day',
                ...dto.importEuropa
            },
            link: `${RoutePaths.DASHBOARD_GAS}/${RoutePaths.DASHBOARD_GAS_IMPORT_EUROPA}`,
            loading: false
        },
        {
            titleDynamicKey: 'uebersicht_gas_fuellstand-nachbarlaender.titel',
            subTitleDynamicKey:
                'uebersicht_gas_fuellstand-nachbarlaender.subtitel',
            data: {
                color: COLOR_GAS,
                valuePostfix: '%',
                ...dto.fuellstandNachbarlaender
            },
            link: `${RoutePaths.DASHBOARD_GAS}/${RoutePaths.DASHBOARD_GAS_EU_GASSPEICHER}`,
            loading: false
        },
        {
            titleDynamicKey: 'uebersicht_gas_mehr-minderverbrauch.titel',
            subTitleDynamicKey: 'uebersicht_gas_mehr-minderverbrauch.subtitel',
            data: {
                color: COLOR_GAS,
                valuePostfix: '%',
                valuePostfixSubtextKey: 'dashboard.uebersicht.since-1-10',
                ...dto.aktuelleGesamteinsparung
            },
            link: `${RoutePaths.DASHBOARD_GAS}/${RoutePaths.DASHBOARD_GAS_SPARZIEL}`,
            loading: false
        }
    ];
};

const numberOfImages = {
    heizen: 3,
    wasser: 1,
    elektro: 2
};

const getRandomNumber = (max: number, min: number = 0): number =>
    Math.floor(Math.random() * max + min);

export const getRandomSpartipp = (
    spartipps: DashboardSpartipp[],
    language: string
): DashboardSpartippDisplay | undefined => {
    const randomTippNumber = getRandomNumber(Object.keys(spartipps).length - 1);
    const selectedSpartipp: DashboardSpartipp = spartipps[randomTippNumber];
    if (selectedSpartipp.hasOwnProperty(language)) {
        return {
            ...selectedSpartipp[language as 'de' | 'fr' | 'it' | 'en'],
            imageUrl: `/assets/images/spartipps/${selectedSpartipp.image.toLowerCase()}`
        };
    }

    return undefined;
};
