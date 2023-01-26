import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { D3SvgModule } from '../../../components/d3-svg/d3-svg.module';
import { HistogramAreaStackComponent } from './histogram-area-stack.component';
import { HistogramAreaComponent } from './histogram-area.component';

@NgModule({
    imports: [CommonModule, D3SvgModule],
    declarations: [HistogramAreaComponent, HistogramAreaStackComponent],
    exports: [HistogramAreaComponent, HistogramAreaStackComponent]
})
export class HistogramAreaModule {}
