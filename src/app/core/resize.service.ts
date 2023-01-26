import { Platform } from '@angular/cdk/platform';
import { Injectable, OnDestroy } from '@angular/core';
import { WindowRef } from '../shared/xternal-helpers/from-sc-ng-commons-public/core/window/window-ref.service';
import { setup } from '../shared/xternal-helpers/from-sc-ng-commons-public/core/static-utils/rxjs/setup.operator';
import { NEVER, Observable, Subject } from 'rxjs';
import { filter, finalize } from 'rxjs/operators';
import { ResizeObserver as ResizeObserverPolyfill } from '@juggle/resize-observer';
// https://stackoverflow.com/questions/56457935/typescript-error-property-x-does-not-exist-on-type-window
// https://bobbyhadz.com/blog/typescript-property-does-not-exist-on-type-window we access a property that does not exist on the Window interface. To solve the error, extend the Window interface in a .d.ts file and add the property you intend to access on the window object.

@Injectable({ providedIn: 'root' })
export class ResizeService implements OnDestroy {
    private readonly observer: ResizeObserver | null;
    private readonly eventSubject = new Subject<ResizeObserverEntry>();

    constructor(windowRef: WindowRef, platform: Platform) {
        if (platform.isBrowser && windowRef.nativeWindow) {
            const RO =
                (windowRef.nativeWindow as any).ResizeObserver ||
                ResizeObserverPolyfill;
            this.observer = new RO(this.onResize);
        } else {
            this.observer = null;
        }
    }

    observe(element: Element): Observable<any> {
        if (this.observer) {
            return this.eventSubject.asObservable().pipe(
                // setup fn called when subscribed
                setup(() => this.observer?.observe(element)),
                filter((ev) => ev.target === element),
                // finalize fn called when completed
                finalize(() => this.observer?.unobserve(element))
            );
        } else {
            return NEVER;
        }
    }

    ngOnDestroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }

    private readonly onResize: ResizeObserverCallback = (entries) => {
        entries.map((entry) => this.eventSubject.next(entry));
    };
}
