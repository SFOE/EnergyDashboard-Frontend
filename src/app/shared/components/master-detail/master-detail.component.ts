import {
    Component,
    Inject,
    OnInit,
    TemplateRef,
    ViewEncapsulation
} from '@angular/core';
import { ActivatedRoute, IsActiveMatchOptions, Router } from '@angular/router';

import { ViewportScroller } from '@angular/common';
import { NgxResizeResult } from 'ngx-resize';
import { BehaviorSubject, Observable } from 'rxjs';
import { Context } from '../../../core/models/context.enum';
import { QueryParamService } from '../../../services/queryparams/queryparams.service';
import { Breakpoints } from '../../static-utils/breakpoints.enum';
import { MasterDetailMenuItem } from './master-detail-configuration.model';
import { MASTER_DETAIL_DATA } from './master-detail-data.token';
import { MasterDetailData } from './master-detail-data.type';

@Component({
    selector: 'bfe-master-detail',
    templateUrl: './master-detail.component.html',
    styleUrls: ['./master-detail.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MasterDetailComponent implements OnInit {
    contextMargin?: string;

    readonly context?: Context;
    readonly items: MasterDetailMenuItem[];
    readonly alertTemplate?: TemplateRef<any>;
    appView: boolean = false;

    readonly currentMenuItem = new BehaviorSubject<MasterDetailMenuItem | null>(
        null
    );
    activeMenuItemIndex: Observable<number>;
    activeFragment: string | null = null;
    readonly fragmentMatchOptions: IsActiveMatchOptions = {
        queryParams: 'ignored',
        matrixParams: 'exact',
        paths: 'exact',
        fragment: 'exact'
    };

    constructor(
        private readonly router: Router,
        private readonly route: ActivatedRoute,
        private viewportScroller: ViewportScroller,
        private queryParamService: QueryParamService,
        @Inject(MASTER_DETAIL_DATA) private readonly data: MasterDetailData
    ) {
        this.context = data.space;
        this.items = data.items;
        this.alertTemplate = data.alertTemplate;
    }
    ngOnInit(): void {
        this.appView = this.queryParamService.isAppView();
    }

    changeRoute(event: Event): void {
        const value: string = (event.target as HTMLSelectElement).value;
        this.router.navigate([value], { relativeTo: this.route });
    }

    isActiveRoute(item: MasterDetailMenuItem): boolean {
        if (!item) {
            return false;
        }
        let matchesRoute: boolean = false;
        item.pathArgs.forEach((arg): void => {
            matchesRoute = matchesRoute || this.router.url.includes(arg);
        });

        return matchesRoute;
    }

    isActiveFragment(fragment: string | undefined): boolean {
        const thisFragment = this.router.url.split('#')[0];
        return fragment !== undefined && thisFragment === fragment;
    }

    onResize(event: NgxResizeResult): void {
        if (window.innerWidth > Breakpoints.MIN_MD) {
            this.contextMargin = `${event.height}px`;
        }
    }
}
