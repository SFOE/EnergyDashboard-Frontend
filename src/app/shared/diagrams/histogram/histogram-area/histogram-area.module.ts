import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { D3SvgModule } from '../../../components/d3-svg/d3-svg.module';
import { HistogramAreaStackComponent } from './histogram-area-stack.component';
import { HistogramAreaComponent } from './histogram-area.component';
import { HistogramAreaStackWithForecastComponent } from './histogram-area-stack-with-forecast.component';

@NgModule({
    imports: [CommonModule, D3SvgModule],
    declarations: [
        HistogramAreaComponent,
        HistogramAreaStackComponent,
        HistogramAreaStackWithForecastComponent
    ],
    exports: [
        HistogramAreaComponent,
        HistogramAreaStackComponent,
        HistogramAreaStackWithForecastComponent
    ]
})
export class HistogramAreaModule {}
