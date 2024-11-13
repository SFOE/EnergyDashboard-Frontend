import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistogramAreaMinMaxComponent } from './histogram-area-min-max.component';
import { HistogramAreaModule } from '../histogram-area/histogram-area.module';
import { SharedComponentsModule } from "../../../components/shared-components.module";

@NgModule({
    declarations: [HistogramAreaMinMaxComponent],
    exports: [HistogramAreaMinMaxComponent],
    imports: [CommonModule, HistogramAreaModule, SharedComponentsModule]
})
export class HistogramAreaMinMaxModule {}
