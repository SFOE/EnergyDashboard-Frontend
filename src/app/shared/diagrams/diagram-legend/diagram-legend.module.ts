import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiagramLegendComponent } from './diagram-legend.component';
import { I18NextModule } from 'angular-i18next';

@NgModule({
    imports: [CommonModule, I18NextModule],
    declarations: [DiagramLegendComponent],
    exports: [DiagramLegendComponent]
})
export class DiagramLegendModule {}
