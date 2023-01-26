import { Component, Input } from '@angular/core';

export interface TooltipRow {
    value: any;
    subfix: string;
}

@Component({
    selector: 'bfe-tooltip-row',
    templateUrl: './tooltip-row.component.html',
    styleUrls: ['./tooltip-row.component.scss']
})
export class TooltipRowComponent {
    @Input() dotColor: string;
    @Input() labelKey: string;
    @Input() firstRow?: TooltipRow;
    @Input() secondRow?: TooltipRow;
}
