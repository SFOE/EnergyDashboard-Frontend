import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import { ComponentRef, Inject, Injectable, Injector } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { filterIfInstanceOf } from '../../../static-utils/filter-if-instance-of.operator';
import { NavBoardRef } from './nav-board-ref';
import { NavBoardComponent } from './nav-board.component';

@Injectable()
export class NavBoardService {
    readonly isOpen$: Observable<boolean>;

    get isOpen() {
        return !!this.ref;
    }

    private ref: NavBoardRef | null = null;
    private readonly isOpenSubject = new ReplaySubject<boolean>(1);

    constructor(
        private overlay: Overlay,
        private readonly router: Router,
        @Inject(DOCUMENT) private readonly doc: Document
    ) {
        this.isOpen$ = this.isOpenSubject.asObservable();
    }

    readonly toggle = (injector: Injector) => {
        return this.isOpen ? this.close() : this.open(injector);
    };

    readonly close = () => {
        if (this.ref) {
            this.ref.close();
        }
        this.ref = null;
        this.isOpenSubject.next(false);
    };

    private readonly open = (injector: Injector) => {
        const overlayRef = this.overlay.create(this.getOverlayConfig());
        const containerPortal = new ComponentPortal(
            NavBoardComponent,
            null,
            injector
        );
        const componentRef: ComponentRef<NavBoardComponent> =
            overlayRef.attach(containerPortal);
        this.ref = new NavBoardRef(overlayRef, componentRef.instance, this.doc);
        overlayRef.backdropClick().subscribe(this.close);
        this.router.events
            .pipe(takeUntil(this.ref.close$), filterIfInstanceOf(NavigationEnd))
            .subscribe(this.close);
        this.isOpenSubject.next(true);
    };

    private getOverlayConfig(): OverlayConfig {
        const positionStrategy = this.overlay.position().global().left('0');

        return new OverlayConfig({
            hasBackdrop: true,
            backdropClass: 'bfe-nav-board-backdrop',
            panelClass: 'bfe-nav-board-panel',
            width: '100%',
            scrollStrategy: this.overlay.scrollStrategies.block(),
            positionStrategy
        });
    }
}
