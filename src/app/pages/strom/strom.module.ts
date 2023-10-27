import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { I18NextModule } from 'angular-i18next';
import { TooltipModule } from 'src/app/shared/diagrams/tooltip/tooltip.module';
import { CommonsModule } from '../../shared/commons/commons.module';
import { SharedComponentsModule } from '../../shared/components/shared-components.module';
import { SparzielModule } from '../../shared/components/sparziel/sparziel.module';
import { TrendModule } from '../../shared/components/trend/trend.module';
import { BarDiagramModule } from '../../shared/diagrams/bars/bar.module';
import { DiagramLegendModule } from '../../shared/diagrams/diagram-legend/diagram-legend.module';
import { FullDonutModule } from '../../shared/diagrams/full-donut/full-donut.module';
import { HistogramAreaMinMaxModule } from '../../shared/diagrams/histogram/histogram-area-min-max/histogram-area-min-max.module';
import { HistogramAreaModule } from '../../shared/diagrams/histogram/histogram-area/histogram-area.module';
import { HistogramDetailModule } from '../../shared/diagrams/histogram/histogram-detail/histogram-detail.module';
import { HistogramLineModule } from '../../shared/diagrams/histogram/histogram-line/histogram-line.module';
import { FuellstaendeSpeicherseenChartTooltipComponent } from './fuellstaende-speicherseen/fuellstaende-speicherseen-chart-tooltip/fuellstaende-speicherseen-chart-tooltip.component';
import { FuellstaendeSpeicherseenComponent } from './fuellstaende-speicherseen/fuellstaende-speicherseen.component';
import { SpeicherseenRegionSelectComponent } from './fuellstaende-speicherseen/speicherseen-region-select/speicherseen-region-select.component';
import { ImportExportHistoricalValuesHistogramChartComponent } from './import-export/import-export-historical-values-histogram-chart/import-export-historical-values-histogram-chart.component';
import { ImportExportNetAreaChartComponent } from './import-export/import-export-net-area-chart/import-export-net-area-chart.component';
import { ImportExportNetAreaTooltipComponent } from './import-export/import-export-net-area-chart/import-export-net-area-tooltip/import-export-net-area-tooltip.component';
import { ImportExportComponent } from './import-export/import-export.component';
import { KkwAvailabilityChartTooltipComponent } from './kkw/kkw-availability-chart/kkw-availability-chart-tooltip/kkw-availability-chart-tooltip.component';
import { KkwAvailabilityChartComponent } from './kkw/kkw-availability-chart/kkw-availability-chart.component';
import { KkwChComponent } from './kkw/kkw-ch/kkw-ch.component';
import { KkwCurrentProductionDisplayComponent } from './kkw/kkw-current-production-display/kkw-current-production-display.component';
import { KkwFrComponent } from './kkw/kkw-fr/kkw-fr.component';
import { KkwProductionChartTooltipComponent } from './kkw/kkw-production-chart/kkw-production-chart-tooltip/kkw-production-chart-tooltip.component';
import { KkwProductionChartComponent } from './kkw/kkw-production-chart/kkw-production-chart.component';
import { StromMinderMehrverbrauchComponent } from './minder-mehrverbrauch/minder-mehrverbrauch.component';
import { ProduktionStrommixDonutMarsComponent } from './produktion/produktion-strommix-donut-mars/produktion-strommix-donut-mars.component';
import { ProduktionVerbrauchHistogramChartComponent } from './produktion/produktion-verbrauch-histogram-chart/produktion-verbrauch-histogram-chart.component';
import { ProduktionVerbrauchTooltipComponent } from './produktion/produktion-verbrauch-histogram-chart/produktion-verbrauch-tooltip/produktion-verbrauch-tooltip.component';
import { ProduktionComponent } from './produktion/produktion.component';
import { StromRoutingModule } from './strom-routing.module';
import { StromComponent } from './strom.component';
import { StromsparzielFivePercentChartRowComponent } from './stromsparziel-five-percent/components/stromsparziel-five-percent-chart-row/stromsparziel-five-percent-chart-row.component';
import { StromsparzielFivePercentChartComponent } from './stromsparziel-five-percent/components/stromsparziel-five-percent-chart/stromsparziel-five-percent-chart.component';
import { StromsparzielFivePercentDetailsTooltipComponent } from './stromsparziel-five-percent/components/stromsparziel-five-percent-details/stromsparziel-five-percent-details-tooltip/stromsparziel-five-percent-details-tooltip.component';
import { StromsparzielFivePercentDetailsComponent } from './stromsparziel-five-percent/components/stromsparziel-five-percent-details/stromsparziel-five-percent-details.component';
import { StromsparzielFivePercentMonthSwitchComponent } from './stromsparziel-five-percent/components/stromsparziel-five-percent-month-switch/stromsparziel-five-percent-month-switch.component';
import { StromsparzielFivePercentTooltip } from './stromsparziel-five-percent/components/stromsparziel-five-percent-tooltip/stromsparziel-five-percent-tooltip.component';
import { StromsparzielFivePercentComponent } from './stromsparziel-five-percent/stromsparziel-five-percent.component';
import { StromsparzielAktuellerMonatDetailsTooltipComponent } from './stromsparziel/stromsparziel-aktueller-monat-details/stromsparziel-aktueller-monat-details-tooltip/stromsparziel-aktueller-monat-details-tooltip.component';
import { StromsparzielAktuellerMonatDetailsComponent } from './stromsparziel/stromsparziel-aktueller-monat-details/stromsparziel-aktueller-monat-details.component';
import { StromsparzielMehrMindestverbrauchProMonatComponent } from './stromsparziel/stromsparziel-mehr-mindestverbrauch-pro-monat/stromsparziel-mehr-mindestverbrauch-pro-monat.component';
import { StromsparzielNachBereichAktuellerMonatHistogramChartTooltipComponent } from './stromsparziel/stromsparziel-nach-bereich-aktueller-monat-histogram-chart/stromsparziel-nach-bereich-aktueller-monat-histogram-chart-tooltip/stromsparziel-nach-bereich-aktueller-monat-histogram-chart-tooltip.component';
import { StromsparzielNachBereichAktuellerMonatHistogramChartComponent } from './stromsparziel/stromsparziel-nach-bereich-aktueller-monat-histogram-chart/stromsparziel-nach-bereich-aktueller-monat-histogram-chart.component';
import { StromsparzielNachBereichProMonatHistogramChartTooltipComponent } from './stromsparziel/stromsparziel-nach-bereich-pro-monat-histogram-chart/stromsparziel-nach-bereich-pro-monat-histogram-chart-tooltip/stromsparziel-nach-bereich-pro-monat-histogram-chart-tooltip.component';
import { StromsparzielNachBereichProMonatHistogramChartComponent } from './stromsparziel/stromsparziel-nach-bereich-pro-monat-histogram-chart/stromsparziel-nach-bereich-pro-monat-histogram-chart.component';
import { StromsparzielComponent } from './stromsparziel/stromsparziel.component';
import { StromverbrauchAktuellerEndverbrauchHistogramChartComponent } from './stromverbrauch/stromverbrauch-aktueller-endverbrauch-histogram-chart/stromverbrauch-aktueller-endverbrauch-histogram-chart.component';
import { StromverbrauchAktuellerLandesverbrauchHistogramChartComponent } from './stromverbrauch/stromverbrauch-aktueller-landesverbrauch-histogram-chart/stromverbrauch-aktueller-landesverbrauch-histogram-chart.component';
import { StromverbrauchChartTooltipComponent } from './stromverbrauch/stromverbrauch-chart-tooltip/stromverbrauch-chart-tooltip.component';
import { StromverbrauchHistorischerLandesverbrauchHistogramChartComponent } from './stromverbrauch/stromverbrauch-historischer-landesverbrauch-histogram-chart/stromverbrauch-historischer-landesverbrauch-histogram-chart.component';
import { StromverbrauchComponent } from './stromverbrauch/stromverbrauch.component';
import { DividerComponent } from '../../shared/components/divider/divider.component';
import { HideableTextSection } from '../../shared/components/hideable-text-section/hideable-text-section.component';
@NgModule({
    declarations: [
        FuellstaendeSpeicherseenComponent,
        FuellstaendeSpeicherseenChartTooltipComponent,
        SpeicherseenRegionSelectComponent,
        StromComponent,
        ImportExportComponent,
        ImportExportNetAreaChartComponent,
        ImportExportNetAreaTooltipComponent,
        ImportExportHistoricalValuesHistogramChartComponent,
        ProduktionComponent,
        ProduktionVerbrauchHistogramChartComponent,
        ProduktionStrommixDonutMarsComponent,
        ProduktionVerbrauchTooltipComponent,
        StromverbrauchComponent,
        StromverbrauchAktuellerLandesverbrauchHistogramChartComponent,
        StromverbrauchChartTooltipComponent,
        StromverbrauchAktuellerEndverbrauchHistogramChartComponent,
        StromverbrauchHistorischerLandesverbrauchHistogramChartComponent,
        StromsparzielComponent,
        StromsparzielFivePercentComponent,
        StromsparzielFivePercentChartComponent,
        StromsparzielFivePercentChartRowComponent,
        StromsparzielFivePercentTooltip,
        StromsparzielFivePercentMonthSwitchComponent,
        KkwProductionChartComponent,
        KkwProductionChartTooltipComponent,
        KkwAvailabilityChartComponent,
        KkwAvailabilityChartTooltipComponent,
        KkwFrComponent,
        KkwCurrentProductionDisplayComponent,
        KkwChComponent,
        StromsparzielNachBereichProMonatHistogramChartComponent,
        StromsparzielNachBereichAktuellerMonatHistogramChartComponent,
        StromsparzielAktuellerMonatDetailsComponent,
        StromsparzielNachBereichAktuellerMonatHistogramChartTooltipComponent,
        StromsparzielNachBereichProMonatHistogramChartTooltipComponent,
        StromsparzielAktuellerMonatDetailsTooltipComponent,
        StromsparzielFivePercentDetailsComponent,
        StromsparzielFivePercentDetailsTooltipComponent,
        StromsparzielMehrMindestverbrauchProMonatComponent,
        StromMinderMehrverbrauchComponent
    ],
    imports: [
        CommonModule,
        CommonsModule,
        StromRoutingModule,
        I18NextModule,
        SharedComponentsModule,
        HistogramLineModule,
        ReactiveFormsModule,
        DiagramLegendModule,
        HistogramAreaModule,
        HistogramAreaMinMaxModule,
        HistogramDetailModule,
        FullDonutModule,
        SparzielModule,
        TrendModule,
        FontAwesomeModule,
        BarDiagramModule,
        TooltipModule,
        DividerComponent,
        HideableTextSection
    ]
})
export class StromModule {}
