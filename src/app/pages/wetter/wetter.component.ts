import { Component, OnInit } from '@angular/core';
import { Context } from '../../core/models/context.enum';
import { detailLinksWetter } from '../../core/navigation/nav-links.const';
import {
    MasterDetailConfiguration,
    MasterDetailMenuItem
} from '../../shared/components/master-detail/master-detail-configuration.model';

@Component({
    selector: 'bfe-wetter',
    templateUrl: './wetter.component.html',
    styleUrls: ['./wetter.component.scss']
})
export class WetterComponent implements OnInit {
    masterDetailConfig: MasterDetailConfiguration<MasterDetailMenuItem>;
    context = Context;
    constructor() {}

    ngOnInit(): void {
        this.masterDetailConfig = {
            context: Context.WETTER,
            menuItems: detailLinksWetter.map((link) => ({
                title: link.labelKey,
                pathArgs: [link.path],
                isNew: link.isNew
            }))
        };
    }
}
