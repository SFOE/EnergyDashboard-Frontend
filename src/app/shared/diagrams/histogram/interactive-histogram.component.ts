import { AfterViewInit, Component, EventEmitter, Output } from '@angular/core';
import { Selection } from 'd3';
import { binarySearch, initMouseListenerOnValueDomain } from '../utils';
import {
    BaseHistogramComponent,
    HistogramEntry,
    middleOfDay
} from './base-histogram.component';

export interface HistogramElFocusEvent<
    T extends HistogramEntry = HistogramEntry
> {
    source: DOMPoint;
    data: T;
}

@Component({ template: '' })
export abstract class InteractiveHistogramComponent<T extends HistogramEntry>
    extends BaseHistogramComponent<T>
    implements AfterViewInit
{
    @Output()
    readonly elFocus = new EventEmitter<HistogramElFocusEvent<T>>();

    @Output()
    readonly elBlur = new EventEmitter<HistogramElFocusEvent<T>>();

    @Output()
    readonly diagramLeave = new EventEmitter<void>();

    protected abstract valueDomainRect: Selection<
        SVGRectElement,
        void,
        null,
        undefined
    >;

    override ngAfterViewInit() {
        super.ngAfterViewInit();
        if (this.platform.isBrowser) {
            initMouseListenerOnValueDomain(
                this.onDestroy,
                this.doc,
                this.svg.svgEl,
                this.valueDomainRect.nodes()[0],
                this.mapSvgPointToDomainData.bind(this),
                (a, b) => !!a && !!b && a[0] === b[0],
                this.mapToEventAndTooltipData.bind(this),
                this.setElIntoFocus.bind(this),
                this.setElOutFocus.bind(this),
                this.focusLost.bind(this)
            );
        }
    }

    protected mapSvgPointToDomainData(
        point: DOMPoint
    ): undefined | [number, T] {
        const targetDate = this.scaleTimeX.invert(point.x);
        const item = binarySearch(this.data, targetDate);
        return item
            ? [<number>this.scaleTimeX(middleOfDay(item.date)), item]
            : undefined;
    }

    protected abstract mapToEventAndTooltipData([x, item]: [number, T]): [
        DOMPoint,
        T
    ];

    protected setElIntoFocus([source, data]: [DOMPoint, T]) {
        this.elFocus.emit({ source, data });
    }

    protected setElOutFocus([source, data]: [DOMPoint, T]) {
        this.elBlur.emit({ source, data });
    }

    protected focusLost() {
        this.diagramLeave.emit();
    }
}
