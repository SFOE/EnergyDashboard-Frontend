import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonsModule } from '../../../commons/commons.module';
import { D3SvgModule } from '../../../components/d3-svg/d3-svg.module';
import { HistogramDetailComponent } from './histogram-detail.component';
import { I18NextModule } from 'angular-i18next';
import { HistogramDetailImportExportComponent } from './histogram-detail-import-export.component';
import { HistogramDetailGroupedComponent } from './histogram-detail-grouped.component';

@NgModule({
    declarations: [
        HistogramDetailComponent,
        HistogramDetailImportExportComponent,
        HistogramDetailGroupedComponent
    ],
    imports: [CommonModule, D3SvgModule, CommonsModule, I18NextModule],
    exports: [
        HistogramDetailComponent,
        HistogramDetailImportExportComponent,
        HistogramDetailGroupedComponent
    ]
})
export class HistogramDetailModule {}
