import { Component, Input } from '@angular/core';

@Component({
    selector: 'bfe-kpi-container-row',
    templateUrl: './kpi-container-row.component.html',
    styleUrls: ['./kpi-container-row.component.scss']
})
export class KpiContainerRowComponent {
    @Input() indented: boolean = false;
}
