import { Component, Input } from '@angular/core';

@Component({
    selector: 'bfe-kpi-footer',
    templateUrl: './kpi-footer.component.html',
    styleUrls: ['./kpi-footer.component.scss']
})
export class KpiFooterComponent {
    @Input() langtextKey: string;
    @Input() sourceKey: string;

    notImplemented(): void {
        alert('not implemented yet');
    }
}
