import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { I18NextModule } from 'angular-i18next';
import { CommonsModule } from '../../shared/commons/commons.module';
import { SharedComponentsModule } from '../../shared/components/shared-components.module';
import { SparzielModule } from '../../shared/components/sparziel/sparziel.module';
import { TrendModule } from '../../shared/components/trend/trend.module';
import { DiagramLegendModule } from '../../shared/diagrams/diagram-legend/diagram-legend.module';
import { FullDonutModule } from '../../shared/diagrams/full-donut/full-donut.module';
import { HistogramAreaMinMaxModule } from '../../shared/diagrams/histogram/histogram-area-min-max/histogram-area-min-max.module';
import { HistogramAreaModule } from '../../shared/diagrams/histogram/histogram-area/histogram-area.module';
import { HistogramLineModule } from '../../shared/diagrams/histogram/histogram-line/histogram-line.module';
import { FuellstaendeSpeicherseenChartTooltipComponent } from './fuellstaende-speicherseen/fuellstaende-speicherseen-chart-tooltip/fuellstaende-speicherseen-chart-tooltip.component';
import { FuellstaendeSpeicherseenComponent } from './fuellstaende-speicherseen/fuellstaende-speicherseen.component';
import { SpeicherseenRegionSelectComponent } from './fuellstaende-speicherseen/speicherseen-region-select/speicherseen-region-select.component';
import { ImportExportHistoricalValuesHistogramChartComponent } from './import-export/import-export-historical-values-histogram-chart/import-export-historical-values-histogram-chart.component';
import { ImportExportNetAreaChartComponent } from './import-export/import-export-net-area-chart/import-export-net-area-chart.component';
import { ImportExportNetAreaTooltipRowComponent } from './import-export/import-export-net-area-chart/import-export-net-area-tooltip/import-export-net-area-tooltip-row.component';
import { ImportExportNetAreaTooltipComponent } from './import-export/import-export-net-area-chart/import-export-net-area-tooltip/import-export-net-area-tooltip.component';
import { ImportExportComponent } from './import-export/import-export.component';
import { ProduktionStrommixDonutMarsComponent } from './produktion/produktion-strommix-donut-mars/produktion-strommix-donut-mars.component';
import { ProduktionVerbrauchHistogramChartComponent } from './produktion/produktion-verbrauch-histogram-chart/produktion-verbrauch-histogram-chart.component';
import { ProduktionVerbrauchHistogramTooltipRowComponent } from './produktion/produktion-verbrauch-histogram-chart/produktion-verbrauch-historgram-chart-tooltip/produktion-verbrauch-historgram-chart-tooltip-row.component';
import { ProduktionVerbrauchHistogramTooltipComponent } from './produktion/produktion-verbrauch-histogram-chart/produktion-verbrauch-historgram-chart-tooltip/produktion-verbrauch-historgram-chart-tooltip.component';
import { ProduktionComponent } from './produktion/produktion.component';
import { StromRoutingModule } from './strom-routing.module';
import { StromComponent } from './strom.component';
import { StromsparzielComponent } from './stromsparziel/stromsparziel.component';
import { StromverbrauchAktuellerEndverbrauchHistogramChartComponent } from './stromverbrauch/stromverbrauch-aktueller-endverbrauch-histogram-chart/stromverbrauch-aktueller-endverbrauch-histogram-chart.component';
import { StromverbrauchAktuellerLandesverbrauchHistogramChartComponent } from './stromverbrauch/stromverbrauch-aktueller-landesverbrauch-histogram-chart/stromverbrauch-aktueller-landesverbrauch-histogram-chart.component';
import { StromverbrauchChartTooltipComponent } from './stromverbrauch/stromverbrauch-chart-tooltip/stromverbrauch-chart-tooltip.component';
import { StromverbrauchHistorischerLandesverbrauchHistogramChartComponent } from './stromverbrauch/stromverbrauch-historischer-landesverbrauch-histogram-chart/stromverbrauch-historischer-landesverbrauch-histogram-chart.component';
import { StromverbrauchComponent } from './stromverbrauch/stromverbrauch.component';

@NgModule({
    declarations: [
        FuellstaendeSpeicherseenComponent,
        FuellstaendeSpeicherseenChartTooltipComponent,
        SpeicherseenRegionSelectComponent,
        StromComponent,
        ImportExportComponent,
        ImportExportNetAreaChartComponent,
        ImportExportNetAreaTooltipComponent,
        ImportExportNetAreaTooltipRowComponent,
        ImportExportHistoricalValuesHistogramChartComponent,
        ProduktionComponent,
        ProduktionVerbrauchHistogramChartComponent,
        ProduktionStrommixDonutMarsComponent,
        ProduktionVerbrauchHistogramTooltipComponent,
        ProduktionVerbrauchHistogramTooltipRowComponent,
        StromverbrauchComponent,
        StromverbrauchAktuellerLandesverbrauchHistogramChartComponent,
        StromverbrauchChartTooltipComponent,
        StromverbrauchAktuellerEndverbrauchHistogramChartComponent,
        StromverbrauchHistorischerLandesverbrauchHistogramChartComponent,
        StromsparzielComponent
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
        FullDonutModule,
        SparzielModule,
        TrendModule
    ]
})
export class StromModule {}
