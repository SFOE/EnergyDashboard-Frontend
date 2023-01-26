import { DOCUMENT, isPlatformServer } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Inject,
    OnInit,
    PLATFORM_ID
} from '@angular/core';
import { WindowRef } from '../../core/window/window-ref.service';
import { fromEvent } from 'rxjs';

const CRUCIAL_KEYS = [
    'Tab',
    'Enter',
    'Space',
    'Escape',
    'ArrowUp',
    'ArrowRight',
    'ArrowDown',
    'ArrowLeft'
];

/**
 * flying focus component - use component inside the root app-component
 *
 * appearance configurable through css custom properties:
 * ```css
 * :root {
 *   --sc-flying-focus-gap: -4px;
 *   --sc-flying-focus-box-shadow: 0 0 0 2px black;
 *   --sc-flying-focus-border-radius: 0;
 * }
 * ```
 */
@Component({
    selector: 'sc-flying-focus',
    template: '',
    styleUrls: ['./flying-focus.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlyingFocusComponent implements OnInit {
    readonly element: HTMLElement;

    private readonly docEl: HTMLElement;
    private readonly bodyEl: HTMLElement;
    private keyDownTime: number;
    private focusMoveTimeout: any;
    private readonly isBrowser: boolean;
    private readonly win: Window | null;
    constructor(
        @Inject(PLATFORM_ID) platformId: any,
        @Inject(DOCUMENT) doc: Document,
        windowRef: WindowRef,
        elRef: ElementRef<HTMLElement>
    ) {
        this.element = elRef.nativeElement;
        this.docEl = doc.documentElement;
        this.bodyEl = doc.body;
        this.isBrowser = !isPlatformServer(platformId);
        this.win = windowRef.nativeWindow;
    }

    ngOnInit() {
        if (this.isBrowser && this.win) {
            const opts: EventListenerOptions = { capture: true };

            fromEvent<KeyboardEvent>(this.docEl, 'keydown', opts).subscribe(
                this.onKeydown
            );

            fromEvent(this.docEl, 'focus', opts).subscribe(this.onFocus);

            fromEvent(this.docEl, 'mousedown', opts).subscribe(
                this.onMouseDown
            );

            fromEvent(this.win, 'blur').subscribe(this.onWindowBlur);
        }
    }

    private readonly onKeydown = (event: KeyboardEvent) => {
        const keyCode = event.code || event.key;
        // Show animation only upon Tab or Arrow keys press.
        this.keyDownTime = CRUCIAL_KEYS.includes(keyCode) ? Date.now() : 0;
    };

    private readonly onFocus = (event: Event) => {
        const target: HTMLElement = <any>event.target;
        if (target === this.element) {
            return;
        }
        if (!(Date.now() - this.keyDownTime < 50)) {
            return;
        }

        // if we have modals with focus set in a `ngAfterViewInit` method, we already get the onFocus event,
        // but the element is not yet rendered into the view. --> so we use a setTimeout
        this.focusMoveTimeout = setTimeout(() => {
            const offset = this.offsetOf(target);
            this.element.style.left = offset.left + 'px';
            this.element.style.top = offset.top + 'px';
            this.element.style.width = target.offsetWidth + 'px';
            this.element.style.height = target.offsetHeight + 'px';

            this.element.classList.add('--visible');
        });
    };

    private readonly onMouseDown = () => {
        this.keyDownTime = 0;
        this.onEnd();
    };

    private readonly onWindowBlur = () => {
        this.onEnd();
    };

    private onEnd = () => {
        clearTimeout(this.focusMoveTimeout);
        this.element.classList.remove('--visible');
        this.element.removeAttribute('style');
    };

    private offsetOf(elem: HTMLElement): { top: number; left: number } {
        const rect = elem.getBoundingClientRect();
        const clientLeft = this.docEl.clientLeft || this.bodyEl.clientLeft;
        const clientTop = this.docEl.clientTop || this.bodyEl.clientTop;
        const scrollLeft =
            this.win?.pageXOffset ??
            this.docEl.scrollLeft ??
            this.bodyEl.scrollLeft;
        const scrollTop =
            this.win?.pageYOffset ??
            this.docEl.scrollTop ??
            this.bodyEl.scrollTop;
        const left = rect.left + scrollLeft - clientLeft;
        const top = rect.top + scrollTop - clientTop;
        return {
            top: top || 0,
            left: left || 0
        };
    }
}
