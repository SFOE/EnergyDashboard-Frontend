import { Component, Input } from '@angular/core';

@Component({
    selector: 'bfe-semi-donut-chart',
    templateUrl: './semi-donut.component.html',
    styleUrls: ['./semi-donut.component.scss']
})
export class SemiDonutComponent {
    @Input() percentage: number;
    @Input() value: number | null;
    @Input() unit: string;
    @Input() color: string;
}
