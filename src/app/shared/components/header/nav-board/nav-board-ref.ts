import { OverlayRef } from '@angular/cdk/overlay';
import { Observable, Subject } from 'rxjs';
import { NavBoardComponent } from './nav-board.component';

export class NavBoardRef {
    readonly close$: Observable<void>;
    private readonly closeSubject = new Subject<void>();

    constructor(
        private overlayRef: OverlayRef,
        private navBoard: NavBoardComponent,
        private readonly doc: Document
    ) {
        this.close$ = this.closeSubject.asObservable();
        const root = this.doc.documentElement;
        root.style.top = '0px';
    }

    readonly close = () => {
        this.overlayRef.detachBackdrop();
        this.closeSubject.next();
        this.closeSubject.complete();
        this.overlayRef.dispose();
    };
}
