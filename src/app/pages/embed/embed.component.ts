import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PlatformParam } from '../../core/navigation/query-params.const';
@Component({
    selector: 'bfe-embed',
    templateUrl: './embed.component.html',
    styleUrls: ['./embed.component.scss']
})
export class EmbedComponent implements OnInit {
    constructor(
        private readonly router: Router,
        private readonly route: ActivatedRoute
    ) {}
    ngOnInit(): void {
        this.router.navigate(this.route.snapshot.url, {
            relativeTo: this.route,
            queryParams: { viewtype: PlatformParam.EMBED }
        });
    }
}
