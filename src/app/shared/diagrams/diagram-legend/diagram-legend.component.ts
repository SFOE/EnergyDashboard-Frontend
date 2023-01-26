import { Component, Input } from '@angular/core';

export interface DiagramLegendEntry {
    color: string;
    secondColor?: string;
    labelKey: string;
    labelKeyOptions?: object;
    type: 'area' | 'line' | 'dashed-line';
}

@Component({
    selector: 'bfe-diagram-legend',
    templateUrl: './diagram-legend.component.html',
    styleUrls: ['./diagram-legend.component.scss']
})
export class DiagramLegendComponent {
    @Input() entries: DiagramLegendEntry[];
    @Input() horizontal: boolean = true;
    @Input() secondLineEntries?: DiagramLegendEntry[];
}
