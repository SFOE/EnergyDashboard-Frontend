import {
    AfterViewInit,
    Directive,
    ElementRef,
    Input,
    OnChanges,
    SimpleChanges
} from '@angular/core';

@Directive({ selector: '[bfeSvgAnimate]' })
export class SvgAnimateDirective implements OnChanges, AfterViewInit {
    /** state input in form {selector:state} - will be animated when state == true */
    @Input('bfeSvgAnimate')
    states: Record<string, boolean> | null;

    readonly element: HTMLElement;

    constructor(elementRef: ElementRef<HTMLElement>) {
        this.element = elementRef.nativeElement;
    }

    ngOnChanges(changes: SimpleChanges) {
        this.apply();
    }

    ngAfterViewInit() {
        this.apply();
    }

    private apply() {
        Object.entries(this.states || {})
            .filter(([, state]) => !!state)
            .map(([selector]) => this.element.querySelector(selector))
            .filter(
                (el): el is SVGAnimateElement & { beginElement: () => void } =>
                    !!el && 'beginElement' in el
            )
            .forEach((el) => el.beginElement());
    }
}
