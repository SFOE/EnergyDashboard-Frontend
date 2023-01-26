import { Component, Input } from '@angular/core';

@Component({
    selector: 'bfe-large-number-unit',
    templateUrl: './large-number-unit.component.html',
    styleUrls: ['./large-number-unit.component.scss']
})
export class LargeNumberUnitComponent {
    @Input() number: number | null;
    @Input() alignTextRightSide: boolean = false;

    @Input() unit: string;
    @Input() subUnit?: string;
    @Input() unitText?: string;

    @Input() color: string;
}
