import {
    AfterContentChecked,
    AfterContentInit,
    AfterViewInit,
    Component,
    DoCheck,
    ElementRef,
    Inject,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResizedEvent } from 'angular-resize-event';
import { BehaviorSubject, Observable } from 'rxjs';
import { Context } from '../../../core/models/context.enum';
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
export class MasterDetailComponent {
    contextMargin?: string;

    readonly context?: Context;
    readonly items: MasterDetailMenuItem[];
    readonly alertTemplate?: TemplateRef<any>;

    readonly currentMenuItem = new BehaviorSubject<MasterDetailMenuItem | null>(
        null
    );
    activeMenuItemIndex: Observable<number>;

    constructor(
        private readonly router: Router,
        private readonly route: ActivatedRoute,
        @Inject(MASTER_DETAIL_DATA) private readonly data: MasterDetailData
    ) {
        this.context = data.space;
        this.items = data.items;
        this.alertTemplate = data.alertTemplate;
    }

    changeRoute(event: Event) {
        const value = (event.target as HTMLSelectElement).value;

        this.router.navigate([value], { relativeTo: this.route });
    }

    isActiveRoute(item: MasterDetailMenuItem): boolean {
        if (!item) {
            return false;
        }

        let matchesRoute = false;
        item.pathArgs.forEach((arg) => {
            matchesRoute = matchesRoute || this.router.url.includes(arg);
        });

        return matchesRoute;
    }

    onDetailContainerResized(event: ResizedEvent): void {
        if (window.innerWidth > Breakpoints.MIN_MD) {
            this.contextMargin = `${event.newRect.height}px`;
        }
    }
}
