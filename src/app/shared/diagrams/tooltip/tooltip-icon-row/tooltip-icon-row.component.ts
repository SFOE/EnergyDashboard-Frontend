import { Component, Input } from '@angular/core';
export interface TooltipRow {
    value: number | string | undefined | null;
    suffix: string;
}

type Shape = 'house' | 'buildings' | 'industry-windows';

@Component({
    selector: 'bfe-tooltip-icon-row',
    templateUrl: './tooltip-icon-row.component.html',
    styleUrls: ['./tooltip-icon-row.component.scss']
})
export class TooltipIconRowComponent {
    @Input() color: string = 'transparent';
    @Input() icon: Shape = 'house';
    @Input() label: string;
    @Input() data?: TooltipRow = { value: null, suffix: '' };
}
