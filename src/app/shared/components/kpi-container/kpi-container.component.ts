import { Component, Input } from '@angular/core';

export interface KpiFooterConfig {
    sourceDynamicKey: string;
    langtextDynamicKey: string;
}

@Component({
    selector: 'bfe-kpi-container',
    templateUrl: './kpi-container.component.html',
    styleUrls: ['./kpi-container.component.scss']
})
export class KpiContainerComponent {
    @Input()
    titleKeyDynamic: string;

    @Input()
    isLoading: boolean = false;

    @Input()
    footerConfig: KpiFooterConfig;

    constructor() {}
}
