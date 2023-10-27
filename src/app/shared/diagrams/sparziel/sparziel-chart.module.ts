import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18NextModule } from 'angular-i18next';
import { CommonsModule } from '../../commons/commons.module';
import { SharedComponentsModule } from '../../components/shared-components.module';
import { HistogramDetailModule } from '../histogram/histogram-detail/histogram-detail.module';
import { TooltipModule } from '../tooltip/tooltip.module';
import { SparzielChartTooltipComponent } from './sparziel-chart-tooltip/sparziel-chart-tooltip.component';
import { SparzielChartComponent } from './sparziel-chart.component';

@NgModule({
    declarations: [SparzielChartComponent, SparzielChartTooltipComponent],
    exports: [SparzielChartComponent],
    imports: [
        CommonModule,
        I18NextModule,
        HistogramDetailModule,
        SharedComponentsModule,
        TooltipModule,
        CommonsModule
    ]
})
export class SparzielChartModule {}
