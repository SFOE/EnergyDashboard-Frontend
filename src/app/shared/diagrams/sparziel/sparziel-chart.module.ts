import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18NextModule } from 'angular-i18next';
import { SparzielChartComponent } from './sparziel-chart.component';
import { SparzielChartTooltipComponent } from './sparziel-chart-tooltip/sparziel-chart-tooltip.component';

@NgModule({
    imports: [CommonModule, I18NextModule],
    declarations: [SparzielChartComponent, SparzielChartTooltipComponent],
    exports: [SparzielChartComponent]
})
export class SparzielChartModule {}
