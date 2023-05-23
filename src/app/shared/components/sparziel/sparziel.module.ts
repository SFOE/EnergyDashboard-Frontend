import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18NextModule } from 'angular-i18next';
import { CommonsModule } from '../../commons/commons.module';
import { DiagramLegendModule } from '../../diagrams/diagram-legend/diagram-legend.module';
import { HistogramDetailModule } from '../../diagrams/histogram/histogram-detail/histogram-detail.module';
import { SparzielChartModule } from '../../diagrams/sparziel/sparziel-chart.module';
import { SharedComponentsModule } from '../shared-components.module';
import { TrendModule } from '../trend/trend.module';
import { SparzielHistogramChartComponent } from './histogram-chart/sparziel-histogram-chart.component';
import { SparzielChartTooltipComponent } from './histogram-chart/tooltip/sparziel-chart-tooltip.component';
import { SparzielOverviewComponent } from './overview/sparziel-overview.component';

@NgModule({
    declarations: [
        SparzielOverviewComponent,
        SparzielHistogramChartComponent,
        SparzielChartTooltipComponent
    ],
    imports: [
        CommonModule,
        I18NextModule,
        SharedComponentsModule,
        SparzielChartModule,
        CommonsModule,
        HistogramDetailModule,
        DiagramLegendModule,
        TrendModule
    ],
    exports: [
        SparzielOverviewComponent,
        SparzielHistogramChartComponent,
        SparzielChartTooltipComponent
    ]
})
export class SparzielModule {}
