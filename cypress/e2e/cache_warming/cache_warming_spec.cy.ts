import { RoutePaths } from '../../../src/app/core/navigation/route-paths.enum';

const getPath = (base: RoutePaths, detail: RoutePaths) => {
    return `${base}/${detail}`;
};

const getStromPath = (detail: RoutePaths) => {
    return getPath(RoutePaths.DASHBOARD_STROM, detail);
};
const getGasPath = (detail: RoutePaths) => {
    return getPath(RoutePaths.DASHBOARD_GAS, detail);
};
const getPreisePath = (detail: RoutePaths) => {
    return getPath(RoutePaths.DASHBOARD_PREISE, detail);
};
const getWetterPath = (detail: RoutePaths) => {
    return getPath(RoutePaths.DASHBOARD_WETTER, detail);
};

describe('Cache warming', () => {
    const pagesList = [
        RoutePaths.DASHBOARD,
        RoutePaths.DASHBOARD_OVERVIEW,

        RoutePaths.DASHBOARD_STROM,
        getStromPath(RoutePaths.DASHBOARD_STROM_FUELLSTAENDE_SPEICHERSEEN),
        getStromPath(RoutePaths.DASHBOARD_STROM_IMPORT_EXPORT),
        getStromPath(RoutePaths.DASHBOARD_STROM_PRODUKTION),
        getStromPath(RoutePaths.DASHBOARD_STROM_STROMVERBRAUCH),
        getStromPath(RoutePaths.DASHBOARD_STROM_MINDER_MEHRVERBRAUCH),
        getStromPath(RoutePaths.DASHBOARD_STROM_KKW_CH),
        getStromPath(RoutePaths.DASHBOARD_STROM_KKW_FR),

        RoutePaths.DASHBOARD_GAS,
        getGasPath(RoutePaths.DASHBOARD_GAS_EU_GASSPEICHER),
        getGasPath(RoutePaths.DASHBOARD_GAS_IMPORT),
        getGasPath(RoutePaths.DASHBOARD_GAS_SPARZIEL),

        RoutePaths.DASHBOARD_PREISE,
        getPreisePath(RoutePaths.DASHBOARD_PREISE_STROM),
        getPreisePath(RoutePaths.DASHBOARD_PREISE_GAS),
        getPreisePath(RoutePaths.DASHBOARD_PREISE_OEL),
        getPreisePath(RoutePaths.DASHBOARD_PREISE_TREIBSTOFF),
        getPreisePath(RoutePaths.DASHBOARD_PREISE_BRENNHOLZ),
        getPreisePath(RoutePaths.DASHBOARD_PREISE_FERNWAERME),

        RoutePaths.DASHBOARD_WETTER,
        getWetterPath(RoutePaths.DASHBOARD_WETTER_AKTUELL),
        getWetterPath(RoutePaths.DASHBOARD_WETTER_NIEDERSCHLAG),
        getWetterPath(RoutePaths.DASHBOARD_WETTER_SCHNEERESERVEN),

        RoutePaths.DASHBOARD_AX,
        RoutePaths.DASHBOARD_INTEGRATION_GUIDE,
        RoutePaths.EMBED
    ];

    pagesList.forEach((page) => {
        it(`should warm cache for ${page}`, () => {
            cy.visit(`https://energiedashboard.admin.ch/${page}`);
        });
    });
});
