import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { I18NextModule } from 'angular-i18next';
import { CommonsModule } from '../../shared/commons/commons.module';
import { SharedComponentsModule } from '../../shared/components/shared-components.module';
import { DiagramLegendModule } from '../../shared/diagrams/diagram-legend/diagram-legend.module';
import { HistogramLineModule } from '../../shared/diagrams/histogram/histogram-line/histogram-line.module';
import { SemiDonutModule } from '../../shared/diagrams/semi-donut/semi-donut.module';
import { EuGasspeicherComponent } from './eu-gasspeicher/eu-gasspeicher.component';
import { GasDonutTrendComponent } from './eu-gasspeicher/gas-donut-trend/gas-donut-trend.component';
import { GasImportHistoricalValuesHistogramChartComponent } from './gas-import/gas-import-historical-values-histogram-chart/gas-import-historical-values-histogram-chart.component';
import { GasImportComponent } from './gas-import/gas-import.component';
import { GasRoutingModule } from './gas-routing.module';
import { GasComponent } from './gas.component';
import { GassparzielComponent } from './gassparziel/gassparziel.component';

import { SparzielModule } from '../../shared/components/sparziel/sparziel.module';
import { TrendModule } from '../../shared/components/trend/trend.module';
import { HistogramDetailModule } from '../../shared/diagrams/histogram/histogram-detail/histogram-detail.module';

@NgModule({
    declarations: [
        EuGasspeicherComponent,
        GasComponent,
        GasDonutTrendComponent,
        GasImportComponent,
        GasImportHistoricalValuesHistogramChartComponent,
        GassparzielComponent
    ],
    imports: [
        CommonModule,
        SharedComponentsModule,
        I18NextModule,
        GasRoutingModule,
        ReactiveFormsModule,
        DiagramLegendModule,
        CommonsModule,
        SemiDonutModule,
        HistogramLineModule,
        HistogramDetailModule,
        SparzielModule,
        TrendModule
    ]
})
export class GasModule {}
