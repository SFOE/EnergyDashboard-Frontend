import { Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';
import {
    AfterViewInit,
    Directive,
    ElementRef,
    Inject,
    Input,
    OnDestroy
} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { WindowRef } from '../xternal-helpers/from-sc-ng-commons-public/core/window/window-ref.service';

export interface IntersectionConfig {
    offset: number;
}

@Directive({
    selector: '[bfeIntersection]',
    exportAs: 'bfeIntersection'
})
export class IntersectionDirective implements AfterViewInit, OnDestroy {
    @Input()
    bfeIntersection?: IntersectionConfig;

    readonly isIntersecting$: Observable<boolean>;

    readonly element: HTMLElement;

    private div: HTMLElement;

    private readonly observer: IntersectionObserver | undefined;
    private readonly isIntersectingSubject = new BehaviorSubject<boolean>(true);

    /** {@link DetailFilterComponent} extends this class */
    constructor(
        winRef: WindowRef,
        @Inject(DOCUMENT) private readonly doc: Document,
        platform: Platform,
        elRef: ElementRef
    ) {
        this.element = elRef.nativeElement;
        this.isIntersecting$ = this.isIntersectingSubject.asObservable();
        if (
            platform.isBrowser &&
            winRef.nativeWindow &&
            'IntersectionObserver' in winRef.nativeWindow
        ) {
            const opts: IntersectionObserverInit = { threshold: [0, 1] };
            this.observer = new IntersectionObserver(this.onIntersection, opts);
        }
    }

    ngAfterViewInit() {
        this.div = this.doc.createElement('DIV');
        this.div.style.height = '1px';
        this.div.style.width = '1px';
        this.div.style.pointerEvents = 'none';
        this.div.style.position = 'absolute';
        this.div.style.top = `${-(this.bfeIntersection?.offset || 0)}px`;
        const outerDiv = this.doc.createElement('DIV');
        outerDiv.style.position = 'relative';
        outerDiv.insertBefore(this.div, null);
        const parent = this.element.parentElement;
        if (parent) {
            parent.insertBefore(outerDiv, this.element);
        }
        if (this.observer) {
            this.observer.observe(this.div);
        }
    }

    ngOnDestroy() {
        if (this.observer) {
            // is undefined on ssr
            this.observer.unobserve(this.div);
            this.observer.disconnect();
        }
    }

    protected readonly onIntersection: IntersectionObserverCallback = (
        entries
    ) => {
        if (entries[0].intersectionRatio === 0) {
            this.isIntersectingSubject.next(false);
        } else if (entries[0].intersectionRatio === 1) {
            this.isIntersectingSubject.next(true);
        }
        // since height is 1px, another case does basically not exist
    };
}
