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
    DashboardGasDto,
    DashboardPriceDto,
    DashboardSpartipp,
    DashboardStromDto,
    DashboardWetterDto
} from '../models/dashboard';
import { DynamicTranslations } from '../models/dynamic-translations';
import { FuellstandGasspeicherRegionWithChartEntries } from '../models/gas/gas-fuellstand-gasspeicher';
import { GasImportEuropaJaehrlichEntries } from '../models/gas/gas-import-eruopa-jaehrlich';
import { GasImportEuropaTaeglichEntry } from '../models/gas/gas-import-eruopa-taeglich';
import { GasImportEuropaTrend } from '../models/gas/gas-import-eruopa-trend';
import { GasImportHistoricalValues } from '../models/gas/gas-import.historical-values';
import { ImportExportEntry } from '../models/import-export';
import { PreiseFuturesDto } from '../models/preise-futures.model';
import { PreiseIndexiert } from '../models/preise-indexiert.model';
import { PreiseStromBoerse } from '../models/preise-strom-boerse.model';
import { PreiseStromEuropaTrend } from '../models/preise-strom-europa-trend.model';
import { PreiseStromEuropa } from '../models/preise-strom-europa.model';
import {
    SparzielAktuelleEinsparungDtoV5,
    SparzielNachBereichAktuellerMonat,
    SparzielNachBereichProMonat,
    SparzielZielDtoV5,
    SparzielZielNachBereichAktuellerMonat
} from '../models/sparziel';
import { StromFuellstaendeSpeicherseen } from '../models/strom-fuellstaende-speicherseen';
import { StromImportExportHistoricalValue } from '../models/strom-import-export.historical-values';
import { StromImportExportNetto } from '../models/strom-import-export.netto';
import {
    StromsparzielFivePercentEinsparungen,
    StromsparzielFivePercentPeakHoursModel
} from '../models/strom-sparziel-five-percent.model';
import { StromVerbrauchEndverbrauch } from '../models/strom-verbrauch.endverbrauch';
import { StromVerbrauchLandesverbrauchMitPrognoseApi } from '../models/strom-verbrauch.landesverbrauch-mit-prognose';
import { StromVerbrauchLandesverbrauchVergleich } from '../models/strom-verbrauch.landesverbrauch-vergleich';
import { WetterHeizgradtageTabelleDaten } from '../models/wetter-heizgradtage-tabelle-daten';
import { WetterHeizgradtageTrend } from '../models/wetter-heizgradtage-trend';
import { WetterHeizgradtageZeitreihe } from '../models/wetter-heizgradtage-zeitreihe';
import { WetterNiederschlagAktuellEntry } from '../models/wetter-niederschlag-aktuell';
import { WetterNiederschlagKartenMonths } from '../models/wetter-niederschlag-karten-months';
import { WetterNiederschlagTrend } from '../models/wetter-niederschlag-trend';
import { WetterSchneereservenAktuellEntry } from '../models/wetter-schneereserven-aktuell';
import { WetterSchneereservenTrend } from '../models/wetter-schneereserven-trend';
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
    readonly dashboardWetterV2Url = `${this.baseUrl}/dashboard/v2/wetter`;
    readonly dashboardSpartippsUrl = `${this.baseUrl}/dashboard/v2/spartipps`;

    readonly dynamicTranslationsUrl = `${this.baseUrl}/dashboard/dynamic-translations`;

    readonly stromFuellstaendeSpeicherseenUrl = `${this.baseUrl}/strom/v2/fuellungsgrad-speicherseen`;
    readonly stromImportExportNettoUrl = `${this.baseUrl}/strom/strom-import-export/netto`;
    readonly stromImportExportHistoricalValuesUrl = `${this.baseUrl}/strom/v2/strom-import-export/historical-values`;
    readonly stromVerbrauchLandesverbrauchMitPrognoseUrl = `${this.baseUrl}/strom/v2/strom-verbrauch/landesverbrauch-mit-prognose`;
    readonly stromVerbrauchEndverbrauchUrl = `${this.baseUrl}/strom/v2/strom-verbrauch/endverbrauch`;
    readonly stromVerbrauchLandesverbrauchVergleichUrl = `${this.baseUrl}/strom/v2/strom-verbrauch/landesverbrauch-vergleich`;
    readonly stromProductionUrl = `${this.baseUrl}/strom/strom-produktionsmix`;
    readonly stromProductionImportVerbrauchUrl = `${this.baseUrl}/strom/strom-produktion-import-verbrauch`;
    readonly stromSparzielUrl = `${this.baseUrl}/strom/v5/strom-sparziel/ziel`;
    readonly stromSparzielAktuelleEinsparungUrl = `${this.baseUrl}/strom/v5/strom-sparziel/aktuelle-einsparung`;
    readonly stromSparzielNachBereichProMonat = `${this.baseUrl}/strom/v2/strom-sparziel/einsparung-pro-monat-kundengruppe`;
    readonly stromSparzielZielNachBereichAktuellerMonat = `${this.baseUrl}/strom/strom-sparziel/ziel-aktueller-monat-kundengruppe`;
    readonly stromSparzielNachBereichAktuellerMonat = `${this.baseUrl}/strom/strom-sparziel/einsparung-aktueller-monat-kundengruppe`;
    readonly stromSparziel5PercentPeakHours = `${this.baseUrl}/strom/strom-sparziel/5-percent-peak-h`;
    readonly stromSparziel5PercentEinsparungen = `${this.baseUrl}/strom/v2/strom-sparziel/5-percent-einsparungen`;
    readonly stromStromKkwProductionChUrl = `${this.baseUrl}/strom/strom-kkw/produktion-ch`;
    readonly stromStromKkwProductionFrUrl = `${this.baseUrl}/strom/strom-kkw/produktion-fr`;
    readonly stromStromKkwVerfuegbarkeitChUrl = `${this.baseUrl}/strom/strom-kkw/verfuegbarkeit-ch`;
    readonly stromStromKkwVerfuegbarkeitFrUrl = `${this.baseUrl}/strom/strom-kkw/verfuegbarkeit-fr`;

    readonly gasFuellstandGasspeicherUrl = `${this.baseUrl}/gas/v2/fuellstand-gasspeicher`;
    readonly gasImportKarteUrl = `${this.baseUrl}/gas/gas-import/karte`;
    readonly gasImportHistoricalValuesUrl = `${this.baseUrl}/gas/v2/gas-import/historical-values`;
    readonly gasSparzielZielUrl = `${this.baseUrl}/gas/v5/gas-sparziel/ziel`;
    readonly gasSparzielAktuelleEinsparungUrl = `${this.baseUrl}/gas/v5/gas-sparziel/aktuelle-einsparung`;
    readonly gasImportEuropaTaeglichUrl = `${this.baseUrl}/gas/gas-import-europa/taeglich`;
    readonly gasImportEuropaJaehrlichUrl = `${this.baseUrl}/gas/gas-import-europa/jaehrlich`;
    readonly gasImportEuropaTrendUrl = `${this.baseUrl}/gas/gas-import-europa/trend`;

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
    readonly preiseStromEuropaUrl = `${this.baseUrl}/preise/strom-europa`;
    readonly preiseStromEuropaTrendUrl = `${this.baseUrl}/preise/strom-europa-trend`;

    readonly wetterTemperaturTrend = `${this.baseUrl}/wetter/v2/temperatur-trend`;
    readonly wetterTemperaturAktuell = `${this.baseUrl}/wetter/temperatur-aktuell`;
    readonly wetterTemperaturPrognose = `${this.baseUrl}/wetter/temperatur-prognose`;
    readonly wetterNiederschlag = `${this.baseUrl}/wetter/v2/niederschlag`;
    readonly wetterNiederschlagTrend = `${this.baseUrl}/wetter/v2/niederschlag-trend`;
    readonly wetterNiederschlagKartenMonths = `${this.baseUrl}/wetter/niederschlag-bilder-daten`;
    readonly wetterSchneereservenTrend = `${this.baseUrl}/wetter/schneereserven-trend`;
    readonly wetterSchneereservenAktuell = `${this.baseUrl}/wetter/schneereserven`;
    readonly wetterHeizgradtageZeitreihe = `${this.baseUrl}/wetter/heizgradtage-zeitreihe`;
    readonly wetterHeizgradtageTabelleDaten = `${this.baseUrl}/wetter/heizgradtage-tabelle-daten`;
    readonly wetterHeizgradtageTrend = `${this.baseUrl}/wetter/heizgradtage-trend`;

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

    public getStromSparziel(): Observable<SparzielZielDtoV5> {
        return this.httpClient.get<SparzielZielDtoV5>(this.stromSparzielUrl);
    }

    public getStromSparzielAktuelleEinsparung(): Observable<
        SparzielAktuelleEinsparungDtoV5[]
    > {
        return this.httpClient.get<SparzielAktuelleEinsparungDtoV5[]>(
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

    public getGasSparzielZiel(): Observable<SparzielZielDtoV5> {
        return this.httpClient.get<SparzielZielDtoV5>(this.gasSparzielZielUrl);
    }

    public getGasSparzielAktuelleEinsparung(): Observable<
        SparzielAktuelleEinsparungDtoV5[]
    > {
        return this.httpClient.get<SparzielAktuelleEinsparungDtoV5[]>(
            this.gasSparzielAktuelleEinsparungUrl
        );
    }

    public getGasImportEuropaTaeglich(): Observable<
        GasImportEuropaTaeglichEntry[]
    > {
        return this.httpClient.get<GasImportEuropaTaeglichEntry[]>(
            this.gasImportEuropaTaeglichUrl
        );
    }
    public getGasImportEuropaJaehrlich(): Observable<GasImportEuropaJaehrlichEntries> {
        return this.httpClient.get<GasImportEuropaJaehrlichEntries>(
            this.gasImportEuropaJaehrlichUrl
        );
    }
    public getGasImportEuropaTrend(): Observable<GasImportEuropaTrend> {
        return this.httpClient.get<GasImportEuropaTrend>(
            this.gasImportEuropaTrendUrl
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

    public getPreiseStromEuropa() {
        return this.httpClient.get<PreiseStromEuropa[]>(
            this.preiseStromEuropaUrl
        );
    }

    public getPreiseStromEuropaTrend() {
        return this.httpClient.get<PreiseStromEuropaTrend>(
            this.preiseStromEuropaTrendUrl
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

    public getHeizgradtageZeitreihe() {
        return this.httpClient.get<WetterHeizgradtageZeitreihe>(
            this.wetterHeizgradtageZeitreihe
        );
    }

    public getHeizgradtageTabelleDaten() {
        return this.httpClient.get<WetterHeizgradtageTabelleDaten>(
            this.wetterHeizgradtageTabelleDaten
        );
    }

    public getHeizgradtageTrend() {
        return this.httpClient.get<WetterHeizgradtageTrend>(
            this.wetterHeizgradtageTrend
        );
    }
}
