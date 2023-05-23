import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { NumberUtils } from '../../static-utils/number-utils';

export interface BarDiagramEntry {
    value: number;
    absoluteValue?: number; // if set this value overrides the value label
    color?: string;
    labelKey: string;
    icon?: {
        faIcon: IconProp;
        color: string;
    };
}

@Component({
    selector: 'bfe-bar-diagram',
    templateUrl: './bar-diagram.component.html',
    styleUrls: ['./bar-diagram.component.scss']
})
export class BarDiagramComponent implements OnChanges {
    @Input() height: number = 125;
    @Input() data: BarDiagramEntry[] = [];
    @Input() valueSubfix?: string;
    @Input() yAxisSubfix?: string;

    maxValue: number = 0;

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['data']) {
            const maxDataValue = Math.max(
                ...this.data.map((entry) => entry.value)
            );
            this.maxValue = NumberUtils.roundUpToFive(
                maxDataValue % 5 === 0 ? maxDataValue + 5 : maxDataValue
            );
        }
    }

    calculateBarHeight(percentage: number): string {
        const calculatedWidth = (Math.abs(percentage) / this.maxValue) * 100;
        return `height: ${calculatedWidth}%`;
    }
}
