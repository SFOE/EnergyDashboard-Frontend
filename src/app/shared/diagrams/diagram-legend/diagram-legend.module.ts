import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18NextModule } from 'angular-i18next';
import { DiagramLegendComponent } from './diagram-legend.component';
import { DiagramLegendEntryComponent } from './legend-entry/legend-entry.component';

@NgModule({
    imports: [CommonModule, I18NextModule],
    declarations: [DiagramLegendComponent, DiagramLegendEntryComponent],
    exports: [DiagramLegendComponent]
})
export class DiagramLegendModule {}
