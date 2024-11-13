import { DateModel } from './base/date.model';

export interface StromWinterproduktionImportExportEntry extends DateModel {
    stromverbrauch: number;
    eigenproduktion: number;
    nettoimporte: number;
    nettoimporte_bfe: number | null;
    heizgradtage: number | null;
}

export interface StromWinterproduktionImportExportMapped extends DateModel {
    stromverbrauch: number;
    import: number | null;
    export: number | null;
    diff_ep_ni: number | null;
    nettoimporte_bfe: number | null;
    heizgradtage: number | null;
}
