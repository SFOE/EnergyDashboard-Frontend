import { Component, Input } from '@angular/core';
import { DiagramLegendEntry } from '../diagram-legend.component';

@Component({
    selector: 'bfe-diagram-legend-entry',
    templateUrl: './legend-entry.component.html',
    styleUrls: ['./legend-entry.component.scss']
})
export class DiagramLegendEntryComponent {
    @Input() entry: DiagramLegendEntry;
    @Input() active: boolean = false;
    isInteractive: boolean = false;

    getBackgroundColor() {
        return this.entry.color && this.entry.type === 'dot'
            ? this.entry.color
            : 'transparent';
    }
    getBorderColor() {
        return this.entry.color && this.entry.type === 'dot'
            ? 'transparent'
            : this.entry.color;
    }
}
