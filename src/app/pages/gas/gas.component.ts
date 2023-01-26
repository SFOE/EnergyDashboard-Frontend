import { Component, OnInit } from '@angular/core';
import { Context } from '../../core/models/context.enum';
import { detailLinksGas } from '../../core/navigation/nav-links.const';
import {
    MasterDetailConfiguration,
    MasterDetailMenuItem
} from '../../shared/components/master-detail/master-detail-configuration.model';

@Component({
    selector: 'bfe-gas',
    templateUrl: './gas.component.html',
    styleUrls: ['./gas.component.scss']
})
export class GasComponent implements OnInit {
    masterDetailConfig: MasterDetailConfiguration<MasterDetailMenuItem>;
    context = Context;

    constructor() {}

    ngOnInit(): void {
        this.masterDetailConfig = {
            context: Context.GAS,
            menuItems: detailLinksGas.map((link) => ({
                title: link.labelKey,
                pathArgs: [link.path]
            }))
        };
    }
}
