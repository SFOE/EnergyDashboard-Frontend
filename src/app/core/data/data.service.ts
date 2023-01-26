import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
    StromProductionDto,
    StromProductionImportVerbrauchDto
} from '../../services/strom/strom.model';
import {
    DashboardGasDto,
    DashboardPriceDto,
    DashboardSpartipp,
    DashboardStromDto,
    DashboardWetterDto
} from '../models/dashboard';
import { DynamicTranslations } from '../models/dynamic-translations';
import { FuellstandGasspeicherRegionWithChartEntries } from '../models/gas-fuellstand-gasspeicher';
import { GasImportHistoricalValues } from '../models/gas-import.historical-values';
import { ImportExportEntry } from '../models/import-export';
import { PreiseIndexiert } from '../models/preise-indexiert.model';
import { PreiseStromBoerse } from '../models/preise-strom-boerse.model';
import {
    SparzielAktuelleEinsparungDtoV2V3,
    SparzielZielDto
} from '../models/sparziel';
import { StromFuellstaendeSpeicherseen } from '../models/strom-fuellstaende-speicherseen';
import { StromImportExportHistoricalValue } from '../models/strom-import-export.historical-values';
import { StromImportExportNetto } from '../models/strom-import-export.netto';
import { StromVerbrauchEndverbrauch } from '../models/strom-verbrauch.endverbrauch';
import { StromVerbrauchLandesverbrauchMitPrognoseApi } from '../models/strom-verbrauch.landesverbrauch-mit-prognose';
import { StromVerbrauchLandesverbrauchVergleich } from '../models/strom-verbrauch.landesverbrauch-vergleich';
import { WetterTemperaturAktuell } from '../models/wetter-temperatur-aktuell';
import { WetterTemperaturPrognose } from '../models/wetter-temperatur-prognose';
import { WetterTemperaturTrend } from '../models/wetter-temperatur-trend';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    readonly baseUrl = environment.baseUrl;

    readonly dashboardStromUrl = `${this.baseUrl}/dashboard/strom`;
    readonly dashboardGasUrl = `${this.baseUrl}/dashboard/gas`;
    readonly dashboardPriceUrl = `${this.baseUrl}/dashboard/preise`;
    readonly dashboardWetterUrl = `${this.baseUrl}/dashboard/wetter`;
    readonly dashboardSpartippsUrl = `${this.baseUrl}/dashboard/v2/spartipps`;

    readonly dynamicTranslationsUrl = `${this.baseUrl}/dynamic-translations`;

    readonly stromFuellstaendeSpeicherseenUrl = `${this.baseUrl}/v2/fuellungsgrad-speicherseen`;
    readonly stromImportExportNettoUrl = `${this.baseUrl}/strom-import-export/netto`;
    readonly stromImportExportHistoricalValuesUrl = `${this.baseUrl}/v2/strom-import-export/historical-values`;
    readonly stromVerbrauchLandesverbrauchMitPrognoseUrl = `${this.baseUrl}/v2/strom-verbrauch/landesverbrauch-mit-prognose`;
    readonly stromVerbrauchEndverbrauchUrl = `${this.baseUrl}/v2/strom-verbrauch/endverbrauch`;
    readonly stromVerbrauchLandesverbrauchVergleichUrl = `${this.baseUrl}/v2/strom-verbrauch/landesverbrauch-vergleich`;
    readonly stromProductionUrl = `${this.baseUrl}/strom-produktionsmix`;
    readonly stromProductionImportVerbrauchUrl = `${this.baseUrl}/strom-produktion-import-verbrauch`;
    readonly stromSparzielUrl = `${this.baseUrl}/strom-sparziel/ziel`;
    readonly stromSparzielAktuelleEinsparungUrl = `${this.baseUrl}/v2/strom-sparziel/aktuelle-einsparung`;

    readonly gasFuellstandGasspeicherUrl = `${this.baseUrl}/v2/fuellstand-gasspeicher`;
    readonly gasImportKarteUrl = `${this.baseUrl}/gas-import/karte`;
    readonly gasImportHistoricalValuesUrl = `${this.baseUrl}/v2/gas-import/historical-values`;
    readonly gasSparzielZielUrl = `${this.baseUrl}/v2/gas-sparziel/ziel`;
    readonly gasSparzielAktuelleEinsparungUrl = `${this.baseUrl}/v3/gas-sparziel/aktuelle-einsparung`;

    readonly preiseStromBoerseUrl = `${this.baseUrl}/preise/strom-boerse`;
    readonly preiseStromEndverbrauchUrl = `${this.baseUrl}/preise/strom-endverbrauch`;
    readonly preiseGasBoerseUrl = `${this.baseUrl}/preise/gas-boerse`;
    readonly preiseGasEndverbrauchUrl = `${this.baseUrl}/preise/gas-endverbrauch`;
    readonly preiseHeizoelEntwicklungUrl = `${this.baseUrl}/preise/heizoel-entwicklung`;
    readonly preiseTreibstoffBenzinUrl = `${this.baseUrl}/preise/treibstoff-bleifrei`;
    readonly preiseTreibstoffDieselUrl = `${this.baseUrl}/preise/treibstoff-diesel`;
    readonly preiseBrennholzEndverbrauchUrl = `${this.baseUrl}/preise/brennholz-endverbrauch`;
    readonly preiseFernwaermeEndverbrauchUrl = `${this.baseUrl}/preise/fernwaerme-endverbrauch`;

    readonly wetterTemperaturTrend = `${this.baseUrl}/wetter/temperatur-trend`;
    readonly wetterTemperaturAktuell = `${this.baseUrl}/wetter/temperatur-aktuell`;
    readonly wetterTemperaturPrognose = `${this.baseUrl}/wetter/temperatur-prognose`;

    constructor(private readonly httpClient: HttpClient) {}

    public getDashboardStrom(): Observable<DashboardStromDto> {
        return this.httpClient.get<DashboardStromDto>(this.dashboardStromUrl);
    }

    public getDashboardGas(): Observable<DashboardGasDto> {
        return this.httpClient.get<DashboardGasDto>(this.dashboardGasUrl);
    }

    public getDashboardPrice(): Observable<DashboardPriceDto> {
        return this.httpClient.get<DashboardPriceDto>(this.dashboardPriceUrl);
    }

    public getDashboardWetter(): Observable<DashboardWetterDto> {
        return this.httpClient.get<DashboardWetterDto>(this.dashboardWetterUrl);
    }

    public getDashboardSpartipps(): Observable<DashboardSpartipp[]> {
        return this.httpClient.get<DashboardSpartipp[]>(
            this.dashboardSpartippsUrl
        );
    }

    public dynamicTranslations(): Observable<DynamicTranslations> {
        return this.httpClient.get<DynamicTranslations>(
            this.dynamicTranslationsUrl
        );
    }

    public getStromFuellstaendeSpeicherseen(): Observable<StromFuellstaendeSpeicherseen> {
        return this.httpClient.get<StromFuellstaendeSpeicherseen>(
            this.stromFuellstaendeSpeicherseenUrl
        );
    }

    public getStromImportExportNetto(): Observable<StromImportExportNetto> {
        return this.httpClient.get<StromImportExportNetto>(
            this.stromImportExportNettoUrl
        );
    }

    public getStromImportExportHistoricalValues(): Observable<
        StromImportExportHistoricalValue[]
    > {
        return this.httpClient.get<StromImportExportHistoricalValue[]>(
            this.stromImportExportHistoricalValuesUrl
        );
    }

    public getStromVerbrauchLandesverbrauchMitPrognose(): Observable<StromVerbrauchLandesverbrauchMitPrognoseApi> {
        return this.httpClient.get<StromVerbrauchLandesverbrauchMitPrognoseApi>(
            this.stromVerbrauchLandesverbrauchMitPrognoseUrl
        );
    }

    public getStromVerbrauchEndverbrauch(): Observable<
        StromVerbrauchEndverbrauch[]
    > {
        return this.httpClient.get<StromVerbrauchEndverbrauch[]>(
            this.stromVerbrauchEndverbrauchUrl
        );
    }

    public getStromVerbrauchLandesverbrauchVergleich(): Observable<
        StromVerbrauchLandesverbrauchVergleich[]
    > {
        return this.httpClient.get<StromVerbrauchLandesverbrauchVergleich[]>(
            this.stromVerbrauchLandesverbrauchVergleichUrl
        );
    }

    public getStromProduction(): Observable<StromProductionDto> {
        return this.httpClient.get<StromProductionDto>(this.stromProductionUrl);
    }

    public getStromProductionImportVerbrauch(): Observable<StromProductionImportVerbrauchDto> {
        return this.httpClient.get<StromProductionImportVerbrauchDto>(
            this.stromProductionImportVerbrauchUrl
        );
    }

    public getStromSparziel(): Observable<SparzielZielDto> {
        return this.httpClient.get<SparzielZielDto>(this.stromSparzielUrl);
    }

    public getStromSparzielAktuelleEinsparung(): Observable<
        SparzielAktuelleEinsparungDtoV2V3[]
    > {
        return this.httpClient.get<SparzielAktuelleEinsparungDtoV2V3[]>(
            this.stromSparzielAktuelleEinsparungUrl
        );
    }

    public getGasImportKarte(): Observable<ImportExportEntry> {
        return this.httpClient.get<ImportExportEntry>(this.gasImportKarteUrl);
    }

    public getGasImportHistoricalValues(): Observable<
        GasImportHistoricalValues[]
    > {
        return this.httpClient.get<GasImportHistoricalValues[]>(
            this.gasImportHistoricalValuesUrl
        );
    }

    public getAllGasFuellstandGasspeicher(): Observable<FuellstandGasspeicherRegionWithChartEntries> {
        return this.httpClient.get<FuellstandGasspeicherRegionWithChartEntries>(
            this.gasFuellstandGasspeicherUrl
        );
    }

    public getGasSparzielZiel(): Observable<SparzielZielDto> {
        return this.httpClient.get<SparzielZielDto>(this.gasSparzielZielUrl);
    }

    public getGasSparzielAktuelleEinsparung(): Observable<
        SparzielAktuelleEinsparungDtoV2V3[]
    > {
        return this.httpClient.get<SparzielAktuelleEinsparungDtoV2V3[]>(
            this.gasSparzielAktuelleEinsparungUrl
        );
    }

    public getPreiseStromBoerse() {
        return this.httpClient.get<PreiseStromBoerse[]>(
            this.preiseStromBoerseUrl
        );
    }

    public getPreiseStromEndverbrauch() {
        return this.httpClient.get<PreiseIndexiert[]>(
            this.preiseStromEndverbrauchUrl
        );
    }

    public getPreiseGasBoerse() {
        return this.httpClient.get<PreiseIndexiert[]>(this.preiseGasBoerseUrl);
    }

    public getPreiseGasEndverbrauch() {
        return this.httpClient.get<PreiseIndexiert[]>(
            this.preiseGasEndverbrauchUrl
        );
    }

    public getPreiseHeizoelEntwicklung() {
        return this.httpClient.get<PreiseIndexiert[]>(
            this.preiseHeizoelEntwicklungUrl
        );
    }

    public getPreiseTreibstoffBenzin() {
        return this.httpClient.get<PreiseIndexiert[]>(
            this.preiseTreibstoffBenzinUrl
        );
    }

    public getPreiseTreibstoffDiesel() {
        return this.httpClient.get<PreiseIndexiert[]>(
            this.preiseTreibstoffDieselUrl
        );
    }

    public getPreiseBrennholzEndverbrauch() {
        return this.httpClient.get<PreiseIndexiert[]>(
            this.preiseBrennholzEndverbrauchUrl
        );
    }

    public getPreiseFernwaermeEndverbrauch() {
        return this.httpClient.get<PreiseIndexiert[]>(
            this.preiseFernwaermeEndverbrauchUrl
        );
    }

    public getWetterTrend() {
        return this.httpClient.get<WetterTemperaturTrend>(
            this.wetterTemperaturTrend
        );
    }

    public getWetterPrognose() {
        return this.httpClient.get<WetterTemperaturPrognose>(
            this.wetterTemperaturPrognose
        );
    }

    public getWetterAktuell() {
        return this.httpClient.get<WetterTemperaturAktuell>(
            this.wetterTemperaturAktuell
        );
    }
}
