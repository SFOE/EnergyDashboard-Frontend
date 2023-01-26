import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18NextModule } from 'angular-i18next';
import { SparzielChartComponent } from './sparziel-chart.component';

@NgModule({
    imports: [CommonModule, I18NextModule],
    declarations: [SparzielChartComponent],
    exports: [SparzielChartComponent]
})
export class SparzielChartModule {}
