import { Component, Input, OnDestroy, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
    selector: 'bfe-overview-card',
    templateUrl: './overview-card.component.html',
    styleUrls: ['./overview-card.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class OverviewCardComponent implements OnDestroy {
    @Input()
    subtitle: string;

    @Input()
    titleKey: string;

    @Input()
    titleKeySecondLine?: string;

    @Input()
    sourceDate: Date | null;

    @Input()
    sourceKey: string | null = 'commons.source.bfe';

    @Input()
    moreLinkArgs: string[];

    @Input()
    moreLinkQueryParams?: Record<string, string> | null;

    @Input()
    warnKey?: string | null;

    @Input()
    isLoading: boolean = false;

    /**
     * modified from {@link OverviewCardInfoDirective}
     */
    hasToggledInfos: boolean;

    /**
     * modified from {@link OverviewCardInfoDirective}
     */
    hasToggledWarnings: boolean;

    readonly showInfo$: Observable<boolean>;

    private readonly showInfoSubject = new BehaviorSubject(false);

    constructor() {
        this.showInfo$ = this.showInfoSubject.asObservable();
    }

    toggleInfo() {
        this.showInfoSubject.next(!this.showInfoSubject.value);
    }

    hideInfo() {
        if (this.showInfoSubject.value) {
            this.showInfoSubject.next(false);
        }
    }

    ngOnDestroy() {
        this.showInfoSubject.complete();
    }
}
