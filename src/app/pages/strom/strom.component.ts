import { Component, OnInit } from '@angular/core';
import { Context } from '../../core/models/context.enum';
import { detailLinksStrom } from '../../core/navigation/nav-links.const';
import {
    MasterDetailConfiguration,
    MasterDetailMenuItem
} from '../../shared/components/master-detail/master-detail-configuration.model';

@Component({
    selector: 'bfe-strom',
    templateUrl: './strom.component.html',
    styleUrls: ['./strom.component.scss']
})
export class StromComponent implements OnInit {
    masterDetailConfig: MasterDetailConfiguration<MasterDetailMenuItem>;
    context = Context;

    constructor() {}

    ngOnInit(): void {
        this.masterDetailConfig = {
            context: Context.STROM,
            menuItems: detailLinksStrom.map((link) => ({
                title: link.labelKey,
                pathArgs: [link.path]
            }))
        };
    }
}
