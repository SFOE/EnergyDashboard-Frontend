import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { I18NextModule } from 'angular-i18next';
import { CommonsModule } from '../../shared/commons/commons.module';
import { SharedComponentsModule } from '../../shared/components/shared-components.module';
import { DiagramLegendModule } from '../../shared/diagrams/diagram-legend/diagram-legend.module';
import { HistogramDetailModule } from '../../shared/diagrams/histogram/histogram-detail/histogram-detail.module';
import { HistogramLineModule } from '../../shared/diagrams/histogram/histogram-line/histogram-line.module';
import { SemiDonutModule } from '../../shared/diagrams/semi-donut/semi-donut.module';

import {
    // FaIconLibrary,
    FontAwesomeModule
} from '@fortawesome/angular-fontawesome';
import { FullDonutModule } from '../../shared/diagrams/full-donut/full-donut.module';
import { TooltipModule } from '../../shared/diagrams/tooltip/tooltip.module';
import { EuGasspeicherComponent } from './eu-gasspeicher/eu-gasspeicher.component';
import { GasDonutTrendComponent } from './eu-gasspeicher/gas-donut-trend/gas-donut-trend.component';
import { GasImportHistoricalValuesHistogramChartComponent } from './gas-import/gas-import-historical-values-histogram-chart/gas-import-historical-values-histogram-chart.component';
import { GasImportComponent } from './gas-import/gas-import.component';
import { GasRoutingModule } from './gas-routing.module';
import { GasComponent } from './gas.component';
import { GassparzielComponent } from './gassparziel/gassparziel.component';
import { GasImportEuropaDonutComponent } from './import-europa/import-europa-Jaehrlich-donuts/import-europa-Jaehrlich-donuts.component';
import { GasImportEuropaTaeglichChartComponent } from './import-europa/import-europa-taeglich-chart/import-europa-taeglich-chart.component';
import { GasImportEuropaTooltipComponent } from './import-europa/import-europa-taeglich-chart/import-europa-taeglich-tooltip/import-europa-taeglich-tooltip.component';
import { GasImportEuropaComponent } from './import-europa/import-europa.component';

import { IconsModule } from '../../core/icons/icons.module';
import { SparzielModule } from '../../shared/components/sparziel/sparziel.module';
import { TrendModule } from '../../shared/components/trend/trend.module';
import { HistogramAreaMinMaxModule } from '../../shared/diagrams/histogram/histogram-area-min-max/histogram-area-min-max.module';
import { HistogramAreaModule } from '../../shared/diagrams/histogram/histogram-area/histogram-area.module';
import { HideableTextSection } from '../../shared/components/hideable-text-section/hideable-text-section.component';
@NgModule({
    declarations: [
        EuGasspeicherComponent,
        GasComponent,
        GasDonutTrendComponent,
        GasImportComponent,
        GasImportHistoricalValuesHistogramChartComponent,
        GasImportEuropaTooltipComponent,
        GassparzielComponent,
        GasImportEuropaComponent,
        GasImportEuropaTaeglichChartComponent,
        GasImportEuropaDonutComponent
    ],
    imports: [
        CommonModule,
        SharedComponentsModule,
        I18NextModule,
        GasRoutingModule,
        ReactiveFormsModule,
        DiagramLegendModule,
        CommonsModule,
        IconsModule,
        SemiDonutModule,
        HistogramLineModule,
        HistogramDetailModule,
        DiagramLegendModule,
        HistogramAreaModule,
        HistogramAreaMinMaxModule,
        HistogramDetailModule,
        SparzielModule,
        FullDonutModule,
        TrendModule,
        FontAwesomeModule,
        TooltipModule,
        HideableTextSection
    ]
})
export class GasModule {}
