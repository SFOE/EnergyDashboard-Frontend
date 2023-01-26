import { DiagramLegendEntry } from '../../../../shared/diagrams/diagram-legend/diagram-legend.component';
import { ImportExportConsts } from '../../strom.consts';

export enum CountryIndex {
    DE = 0,
    AT = 1,
    IT = 2,
    FR = 3
}

export const ImportExportCountries = [
    {
        key: 'commons.all',
        value: [
            CountryIndex.DE,
            CountryIndex.AT,
            CountryIndex.IT,
            CountryIndex.FR
        ]
    },
    {
        key: 'commons.country.germany',
        value: [CountryIndex.DE]
    },
    {
        key: 'commons.country.austria',
        value: [CountryIndex.AT]
    },
    {
        key: 'commons.country.italy',
        value: [CountryIndex.IT]
    },
    {
        key: 'commons.country.france',
        value: [CountryIndex.FR]
    }
];

export const legendImportEntries: DiagramLegendEntry[] = [
    {
        color: ImportExportConsts.import.DE,
        labelKey: 'DE',
        type: 'area'
    },
    {
        color: ImportExportConsts.import.AT,
        labelKey: 'AT',
        type: 'area'
    },
    {
        color: ImportExportConsts.import.IT,
        labelKey: 'IT',
        type: 'area'
    },
    {
        color: ImportExportConsts.import.FR,
        labelKey: 'FR',
        type: 'area'
    }
];

export const legendExportEntries: DiagramLegendEntry[] = [
    {
        color: ImportExportConsts.export.DE,
        labelKey: 'DE',
        type: 'area'
    },
    {
        color: ImportExportConsts.export.AT,
        labelKey: 'AT',
        type: 'area'
    },

    {
        color: ImportExportConsts.export.IT,
        labelKey: 'IT',
        type: 'area'
    },
    {
        color: ImportExportConsts.export.FR,
        labelKey: 'FR',
        type: 'area'
    }
];
