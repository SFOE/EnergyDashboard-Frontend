import { Context } from '../../core/models/context.enum';
import {
    DashboardPriceDto,
    DashboardSpartipp,
    DashboardSpartippDisplay,
    DashboardWetterDto
} from '../../core/models/dashboard';
import { DashboardPriceRowModel } from '../../pages/dashboard/dashboard-price-row/dashboard-price-row.component';
import { DashboardRowModel } from '../../pages/dashboard/dashboard-row/dashboard-row.component';
import { COLOR_WETTER } from '../../shared/commons/colors.const';

export const mapWetterDtoToRowModels = (
    dto?: DashboardWetterDto
): DashboardRowModel[] => {
    return [
        {
            titleDynamicKey: 'uebersicht_wetter_aktuell.titel',
            subTitleDynamicKey: 'uebersicht_wetter_aktuell.subtitel',
            data: dto
                ? {
                      color: COLOR_WETTER,
                      value: dto.aktuelleTemperatur.value,
                      valuePostfix: '°C'
                  }
                : undefined,
            loading: false
        },
        {
            titleDynamicKey: 'uebersicht_wetter_prognose.titel',
            subTitleDynamicKey: 'uebersicht_wetter_prognose.subtitel',
            data: dto
                ? {
                      color: COLOR_WETTER,
                      value: dto.prognoseTemperatur.value,
                      valuePostfix: '°C',
                      trend: dto.prognoseTemperatur.trend,
                      trendRating: dto.prognoseTemperatur.trendRating
                  }
                : undefined,
            loading: false
        },
        {
            titleDynamicKey: 'uebersicht_wetter_niederschlaege.titel',
            subTitleDynamicKey: 'uebersicht_wetter_niederschlaege.subtitel',
            data: dto
                ? {
                      color: COLOR_WETTER,
                      value: dto.niederschlaege.value,
                      valuePostfix: '%',
                      trend: dto.niederschlaege.trend,
                      trendRating: dto.niederschlaege.trendRating
                  }
                : undefined,
            loading: false
        },
        {
            titleDynamicKey: 'uebersicht_wetter_schneereserven.titel',
            subTitleDynamicKey: 'uebersicht_wetter_schneereserven.subtitel',
            data: dto
                ? {
                      color: COLOR_WETTER,
                      value: dto.schneereserven.value,
                      valuePostfix: 'mm',
                      trend: dto.schneereserven.trend,
                      trendRating: dto.schneereserven.trendRating
                  }
                : undefined,
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
