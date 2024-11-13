import { Component, OnInit } from '@angular/core';
import { Context } from '../../core/models/context.enum';
import { detailLinksPreise } from '../../core/navigation/nav-links.const';
import {
    MasterDetailConfiguration,
    MasterDetailMenuItem
} from '../../shared/components/master-detail/master-detail-configuration.model';

@Component({
    selector: 'bfe-preise',
    templateUrl: './preise.component.html',
    styleUrls: ['./preise.component.scss']
})
export class PreiseComponent implements OnInit {
    masterDetailConfig: MasterDetailConfiguration<MasterDetailMenuItem>;
    context = Context;

    constructor() {}

    ngOnInit(): void {
        this.masterDetailConfig = {
            context: Context.PREISE,
            menuItems: detailLinksPreise.map((link) => ({
                title: link.labelKey,
                pathArgs: [link.path],
                isNew: link.isNew
            }))
        };
    }
}
