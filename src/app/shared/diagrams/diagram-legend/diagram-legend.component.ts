import { Component, EventEmitter, Input, Output } from '@angular/core';
export interface DiagramLegendEntry {
    color: string;
    secondColor?: string;
    labelKey: string;
    labelKeyOptions?: object;
    type: 'area' | 'line' | 'dashed-line' | 'diagonal' | 'dot';
    key?: number;
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
    @Input() selectedDataIndex?: number | null = null;
    @Input() isInteractive?: boolean = false;
    @Output() clickEventEmitter = new EventEmitter<number>();

    onEntryClick(key: number | undefined) {
        if (key !== undefined) {
            this.clickEventEmitter.emit(key);
        }
    }
}
