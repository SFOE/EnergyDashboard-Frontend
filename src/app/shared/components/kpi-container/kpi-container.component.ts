import { Component, Input } from '@angular/core';
import { QueryParamService } from '../../../services/queryparams/queryparams.service';
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
    appView: boolean = false;
    @Input()
    titleKeyDynamic: string;

    @Input()
    isLoading: boolean | null = false;

    @Input()
    footerConfig: KpiFooterConfig;

    constructor(private queryParamService: QueryParamService) {}

    ngOnInit(): void {
        this.appView = this.queryParamService.isAppView();
    }
}
