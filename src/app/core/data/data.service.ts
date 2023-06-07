import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
    StromKkwProductionDataDto,
    StromKkwVerfuegbarkeitDto,
    StromProductionDto,
    StromProductionImportVerbrauchDto
} from '../../services/strom/strom.model';
import {
    DashboardGas,
    DashboardPriceDto,
    DashboardSpartipp,
    DashboardStrom,
    DashboardWetterDto
} from '../models/dashboard';
import { DynamicTranslations } from '../models/dynamic-translations';
import { FuellstandGasspeicherRegionWithChartEntries } from '../models/gas-fuellstand-gasspeicher';
import { GasImportHistoricalValues } from '../models/gas-import.historical-values';
import { ImportExportEntry } from '../models/import-export';
import { PreiseFuturesDto } from '../models/preise-futures.model';
import { PreiseIndexiert } from '../models/preise-indexiert.model';
import { PreiseStromBoerse } from '../models/preise-strom-boerse.model';
import {
    SparzielAktuelleEinsparungDtoV4,
    SparzielNachBereichAktuellerMonat,
    SparzielNachBereichProMonat,
    SparzielZielDtoV4,
    SparzielZielNachBereichAktuellerMonat
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
import { WetterNiederschlagTrend } from '../models/wetter-niederschlag-trend';
import { WetterNiederschlagAktuellEntry } from '../models/wetter-niederschlag-aktuell';
import { WetterSchneereservenAktuellEntry } from '../models/wetter-schneereserven-aktuell';
import { WetterSchneereservenTrend } from '../models/wetter-schneereserven-trend';
import {
    StromsparzielFivePercentEinsparungen,
    StromsparzielFivePercentPeakHoursModel
} from '../models/strom-sparziel-five-percent.model';
import { WetterNiederschlagKartenMonths } from '../models/wetter-niederschlag-karten-months';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    readonly baseUrl = environment.baseUrl;

    readonly dashboardStromUrl = `${this.baseUrl}/dashboard/strom`;
    readonly dashboardGasUrl = `${this.baseUrl}/dashboard/gas`;
    readonly dashboardPriceUrl = `${this.baseUrl}/dashboard/preise`;
    readonly dashboardWetterUrl = `${this.baseUrl}/dashboard/wetter`;
    readonly dashboardWetterV2Url = `${this.baseUrl}/v2/dashboard/wetter`;
    readonly dashboardSpartippsUrl = `${this.baseUrl}/v2/dashboard/spartipps`;

    readonly dynamicTranslationsUrl = `${this.baseUrl}/dynamic-translations`;

    readonly stromFuellstaendeSpeicherseenUrl = `${this.baseUrl}/v2/fuellungsgrad-speicherseen`;
    readonly stromImportExportNettoUrl = `${this.baseUrl}/strom-import-export/netto`;
    readonly stromImportExportHistoricalValuesUrl = `${this.baseUrl}/v2/strom-import-export/historical-values`;
    readonly stromVerbrauchLandesverbrauchMitPrognoseUrl = `${this.baseUrl}/v2/strom-verbrauch/landesverbrauch-mit-prognose`;
    readonly stromVerbrauchEndverbrauchUrl = `${this.baseUrl}/v2/strom-verbrauch/endverbrauch`;
    readonly stromVerbrauchLandesverbrauchVergleichUrl = `${this.baseUrl}/v2/strom-verbrauch/landesverbrauch-vergleich`;
    readonly stromProductionUrl = `${this.baseUrl}/strom-produktionsmix`;
    readonly stromProductionImportVerbrauchUrl = `${this.baseUrl}/strom-produktion-import-verbrauch`;
    readonly stromSparzielUrl = `${this.baseUrl}/v4/strom-sparziel/ziel`;
    readonly stromSparzielAktuelleEinsparungUrl = `${this.baseUrl}/v4/strom-sparziel/aktuelle-einsparung`;
    readonly stromSparzielNachBereichProMonat = `${this.baseUrl}/v2/strom-sparziel/einsparung-pro-monat-kundengruppe`;
    readonly stromSparzielZielNachBereichAktuellerMonat = `${this.baseUrl}/strom-sparziel/ziel-aktueller-monat-kundengruppe`;
    readonly stromSparzielNachBereichAktuellerMonat = `${this.baseUrl}/strom-sparziel/einsparung-aktueller-monat-kundengruppe`;
    readonly stromSparziel5PercentPeakHours = `${this.baseUrl}/strom-sparziel/5-percent-peak-h`;
    readonly stromSparziel5PercentEinsparungen = `${this.baseUrl}/strom-sparziel/5-percent-einsparungen`;
    readonly stromStromKkwProductionChUrl = `${this.baseUrl}/strom-kkw/produktion-ch`;
    readonly stromStromKkwProductionFrUrl = `${this.baseUrl}/strom-kkw/produktion-fr`;
    readonly stromStromKkwVerfuegbarkeitChUrl = `${this.baseUrl}/strom-kkw/verfuegbarkeit-ch`;
    readonly stromStromKkwVerfuegbarkeitFrUrl = `${this.baseUrl}/strom-kkw/verfuegbarkeit-fr`;

    readonly gasFuellstandGasspeicherUrl = `${this.baseUrl}/v2/fuellstand-gasspeicher`;
    readonly gasImportKarteUrl = `${this.baseUrl}/gas-import/karte`;
    readonly gasImportHistoricalValuesUrl = `${this.baseUrl}/v2/gas-import/historical-values`;
    readonly gasSparzielZielUrl = `${this.baseUrl}/v4/gas-sparziel/ziel`;
    readonly gasSparzielAktuelleEinsparungUrl = `${this.baseUrl}/v4/gas-sparziel/aktuelle-einsparung`;

    readonly preiseStromBoerseUrl = `${this.baseUrl}/preise/strom-boerse`;
    readonly preiseStromEndverbrauchUrl = `${this.baseUrl}/preise/strom-endverbrauch`;
    readonly preiseStromFuturesUrl = `${this.baseUrl}/preise/strom-futures`;
    readonly preiseGasDayaheadUrl = `${this.baseUrl}/preise/gas-dayahead`;
    readonly preiseGasEndverbrauchUrl = `${this.baseUrl}/preise/gas-endverbrauch`;
    readonly preiseGasFuturesUrl = `${this.baseUrl}/preise/gas-futures`;
    readonly preiseHeizoelEntwicklungUrl = `${this.baseUrl}/preise/heizoel-entwicklung`;
    readonly preiseTreibstoffBenzinUrl = `${this.baseUrl}/preise/treibstoff-bleifrei`;
    readonly preiseTreibstoffDieselUrl = `${this.baseUrl}/preise/treibstoff-diesel`;
    readonly preiseBrennholzEndverbrauchUrl = `${this.baseUrl}/preise/brennholz-endverbrauch`;
    readonly preiseFernwaermeEndverbrauchUrl = `${this.baseUrl}/preise/fernwaerme-endverbrauch`;

    readonly wetterTemperaturTrend = `${this.baseUrl}/v2/wetter/temperatur-trend`;
    readonly wetterTemperaturAktuell = `${this.baseUrl}/wetter/temperatur-aktuell`;
    readonly wetterTemperaturPrognose = `${this.baseUrl}/wetter/temperatur-prognose`;
    readonly wetterNiederschlag = `${this.baseUrl}/v2/wetter/niederschlag`;
    readonly wetterNiederschlagTrend = `${this.baseUrl}/v2/wetter/niederschlag-trend`;
    readonly wetterNiederschlagKartenMonths = `${this.baseUrl}/wetter/niederschlag-bilder-daten`;
    readonly wetterSchneereservenTrend = `${this.baseUrl}/wetter/schneereserven-trend`;
    readonly wetterSchneereservenAktuell = `${this.baseUrl}/wetter/schneereserven`;

    constructor(private readonly httpClient: HttpClient) {}

    public getDashboardStrom(): Observable<DashboardStrom> {
        return this.httpClient.get<DashboardStrom>(this.dashboardStromUrl);
    }

    public getDashboardGas(): Observable<DashboardGas> {
        return this.httpClient.get<DashboardGas>(this.dashboardGasUrl);
    }

    public getDashboardPrice(): Observable<DashboardPriceDto> {
        return this.httpClient.get<DashboardPriceDto>(this.dashboardPriceUrl);
    }

    public getDashboardWetter(): Observable<DashboardWetterDto> {
        return this.httpClient.get<DashboardWetterDto>(this.dashboardWetterUrl);
    }

    public getDashboardWetterV2(): Observable<DashboardWetterDto> {
        return this.httpClient.get<DashboardWetterDto>(
            this.dashboardWetterV2Url
        );
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

    public getStromSparziel(): Observable<SparzielZielDtoV4> {
        return this.httpClient.get<SparzielZielDtoV4>(this.stromSparzielUrl);
    }

    public getStromSparzielAktuelleEinsparung(): Observable<
        SparzielAktuelleEinsparungDtoV4[]
    > {
        return this.httpClient.get<SparzielAktuelleEinsparungDtoV4[]>(
            this.stromSparzielAktuelleEinsparungUrl
        );
    }

    public getStromSparziel5PercentPeakHours(): Observable<
        StromsparzielFivePercentPeakHoursModel[]
    > {
        return this.httpClient.get<StromsparzielFivePercentPeakHoursModel[]>(
            this.stromSparziel5PercentPeakHours
        );
    }

    public getStromSparziel5PercentEinsparungen(): Observable<StromsparzielFivePercentEinsparungen> {
        return this.httpClient.get<StromsparzielFivePercentEinsparungen>(
            this.stromSparziel5PercentEinsparungen
        );
    }

    public getStromNachBereichProMonat(): Observable<
        SparzielNachBereichProMonat[]
    > {
        return this.httpClient.get<SparzielNachBereichProMonat[]>(
            this.stromSparzielNachBereichProMonat
        );
    }

    public getSparzielZielNachBereichAktuellerMonat(): Observable<SparzielZielNachBereichAktuellerMonat> {
        return this.httpClient.get<SparzielZielNachBereichAktuellerMonat>(
            this.stromSparzielZielNachBereichAktuellerMonat
        );
    }

    public getStromNachBereichAktuellerMonat(): Observable<
        SparzielNachBereichAktuellerMonat[]
    > {
        return this.httpClient.get<SparzielNachBereichAktuellerMonat[]>(
            this.stromSparzielNachBereichAktuellerMonat
        );
    }

    public getStromKkwProduktionCh(): Observable<StromKkwProductionDataDto> {
        return this.httpClient.get<StromKkwProductionDataDto>(
            this.stromStromKkwProductionChUrl
        );
    }

    public getStromKkwProduktionFr(): Observable<StromKkwProductionDataDto> {
        return this.httpClient.get<StromKkwProductionDataDto>(
            this.stromStromKkwProductionFrUrl
        );
    }

    public getStromKkwVerfuegbarkeitCh(): Observable<StromKkwVerfuegbarkeitDto> {
        return this.httpClient.get<StromKkwVerfuegbarkeitDto>(
            this.stromStromKkwVerfuegbarkeitChUrl
        );
    }

    public getStromKkwVerfuegbarkeitFr(): Observable<StromKkwVerfuegbarkeitDto> {
        return this.httpClient.get<StromKkwVerfuegbarkeitDto>(
            this.stromStromKkwVerfuegbarkeitFrUrl
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

    public getGasSparzielZiel(): Observable<SparzielZielDtoV4> {
        return this.httpClient.get<SparzielZielDtoV4>(this.gasSparzielZielUrl);
    }

    public getGasSparzielAktuelleEinsparung(): Observable<
        SparzielAktuelleEinsparungDtoV4[]
    > {
        return this.httpClient.get<SparzielAktuelleEinsparungDtoV4[]>(
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

    public getPreiseStromFutures() {
        return this.httpClient.get<PreiseFuturesDto[]>(
            this.preiseStromFuturesUrl
        );
    }

    public getPreiseGasDayahead() {
        return this.httpClient.get<PreiseIndexiert[]>(
            this.preiseGasDayaheadUrl
        );
    }

    public getPreiseGasEndverbrauch() {
        return this.httpClient.get<PreiseIndexiert[]>(
            this.preiseGasEndverbrauchUrl
        );
    }

    public getPreiseGasFutures() {
        return this.httpClient.get<PreiseFuturesDto[]>(
            this.preiseGasFuturesUrl
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

    public getNiederschlagTrend() {
        return this.httpClient.get<WetterNiederschlagTrend>(
            this.wetterNiederschlagTrend
        );
    }

    public getNiederschlagAktuell(): Observable<
        WetterNiederschlagAktuellEntry[]
    > {
        return this.httpClient.get<WetterNiederschlagAktuellEntry[]>(
            this.wetterNiederschlag
        );
    }

    public getNiederschlagKartenMonths(): Observable<WetterNiederschlagKartenMonths> {
        return this.httpClient.get<WetterNiederschlagKartenMonths>(
            this.wetterNiederschlagKartenMonths
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

    public getSchneereservenTrend() {
        return this.httpClient.get<WetterSchneereservenTrend>(
            this.wetterSchneereservenTrend
        );
    }

    public getSchneereservenAktuell() {
        return this.httpClient.get<WetterSchneereservenAktuellEntry[]>(
            this.wetterSchneereservenAktuell
        );
    }
}
