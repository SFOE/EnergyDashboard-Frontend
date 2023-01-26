import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CommonsModule } from '../../../commons/commons.module';
import { D3SvgModule } from '../../../components/d3-svg/d3-svg.module';
import { HistogramLineRefInz14dComponent } from './histogram-line-ref-inz14d.component';
import { HistogramLineRefComponent } from './histogram-line-ref.component';
import { HistogramLineComponent } from './histogram-line.component';
import { I18NextModule } from 'angular-i18next';

@NgModule({
    imports: [CommonModule, D3SvgModule, CommonsModule, I18NextModule],
    declarations: [
        HistogramLineComponent,
        HistogramLineRefComponent,
        HistogramLineRefInz14dComponent
    ],
    exports: [
        HistogramLineComponent,
        HistogramLineRefComponent,
        HistogramLineRefInz14dComponent
    ]
})
export class HistogramLineModule {}
