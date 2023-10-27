import { Component, Input } from '@angular/core';
export interface TooltipRow {
    value: number | string | undefined | null;
    suffix: string;
}

type Shape = 'dot' | 'area' | 'line' | 'dashed-line' | 'none';

@Component({
    selector: 'bfe-tooltip-row',
    templateUrl: './tooltip-row.component.html',
    styleUrls: ['./tooltip-row.component.scss']
})
export class TooltipRowComponent {
    @Input() color: string = 'transparent';
    @Input() shape: Shape = 'dot';
    @Input() label: string;
    @Input() data?: TooltipRow = { value: null, suffix: '' };
    @Input() dataCol2?: TooltipRow;
    @Input() dataCol3?: TooltipRow;
    @Input() colNumber?: number = 1;
    @Input() active?: boolean = false;

    getBackgroundColor() {
        return this.color && this.shape === 'dashed-line'
            ? 'transparent'
            : this.color;
    }
    getBorderColor() {
        return this.color && this.shape === 'dashed-line'
            ? this.color
            : 'transparent';
    }

    showDataCol1() {
        return (
            (this.data?.value !== null && this.data?.value !== undefined) ||
            this.dataCol2?.value ||
            this.dataCol3?.value ||
            [1, 2, 3].includes(this.colNumber || 0)
        );
    }
    showDataCol2() {
        return (
            (this.dataCol2?.value !== null &&
                this.dataCol2?.value !== undefined) ||
            this.dataCol3?.value ||
            [2, 3].includes(this.colNumber || 0)
        );
    }
    showDataCol3() {
        return (
            (this.dataCol3?.value !== null &&
                this.dataCol3?.value !== undefined) ||
            [3].includes(this.colNumber || 0)
        );
    }
}
