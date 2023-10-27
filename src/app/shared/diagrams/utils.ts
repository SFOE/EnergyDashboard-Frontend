import { ScaleLinear, ScaleTime, Selection } from 'd3';
import { differenceInDays, isSameDay } from 'date-fns';
import { Observable, fromEvent, merge } from 'rxjs';
import {
    distinctUntilChanged,
    filter,
    map,
    switchMap,
    takeUntil
} from 'rxjs/operators';
import { D3SvgComponent } from '../components/d3-svg/d3-svg.component';
import { middleOfDay } from '../static-utils/date-utils';
import { filterEventTarget } from '../static-utils/filter-event-target.operator';
import { isDefined } from '../xternal-helpers/from-c19-commons/utils/is-defined.function';
import { tapLast } from '../xternal-helpers/from-sc-ng-commons-public/core/static-utils/rxjs/tap-last.operator';
import { tapPrevious } from '../xternal-helpers/from-sc-ng-commons-public/core/static-utils/rxjs/tap-previous.operator';
import {
    HistogramBandEntry,
    HistogramEntry
} from './histogram/base-histogram.model';
import { HistogramAreaEntry } from './histogram/histogram-area/histogram-area.component';

export const checkIntersectLeft = (
    start: ClientRect,
    left: ClientRect,
    margin: number = 0
) => {
    return start.right + margin >= left.left;
};

// /**
//  * intialize the observable subscription for "scrubbing" over a chart/histogram
//  * then maps mouse/touch hovers to data entries and calls focus/blur the visual chart entries
//  *
//  * @param unsubscriber - the ngOnDestroy observable from the component
//  * @param doc - the Document
//  * @param svg - the SVG
//  * @param overlayElement - an element for registerign the events (mouse-/touch enter/move/leave)
//  * @param mapSvgPointToData - function which maps the dom point to a data entry
//  * @param equalityCheck - checkFunction which returns true if two data entries are the same
//  * @param mapDataToFocusData - function which maps a data-entry to all necessary info needed for the focus functions
//  * @param setElIntoFocus - function to set the focus called with the `mapDataToFocusData` return value
//  * @param setElOutOfFocus - function to remove the focus called with the `mapDataToFocusData` return value
//  * @param cleanUpOnFocusLoss - function called after mouse leaves the overlay element
//  */
export function initMouseListenerOnValueDomain<T, U>(
    unsubscriber: Observable<any>,
    doc: Document,
    svg: SVGSVGElement,
    overlayElement: Element,
    mapSvgPointToData: (point: DOMPoint) => T | undefined,
    equalityCheck: (a: T | undefined, b: T | undefined) => boolean,
    mapDataToFocusData: (val: T) => U,
    setElIntoFocus: (val: U) => void,
    setElOutOfFocus: (val: U) => void,
    cleanUpOnFocusLoss: () => void
) {
    const [enter$, move$, leave$] = getEventObservablesForElement(
        overlayElement,
        doc
    );

    // basic: when enter$ emits, read all moving$ values until leave$ emits a value
    // concept: as long the mouse/touch is within the valueDomain, we show a tooltip
    enter$
        .pipe(
            takeUntil(unsubscriber),
            switchMap(() =>
                move$.pipe(
                    takeUntil(leave$),
                    map((ev) => mapPointerEventToDomPoint(svg, ev)),
                    map(mapSvgPointToData),
                    // distinctUntilChanged needs to be within this pipe
                    //  otherwise when leaving and entering (mouse) the valueDomain at the same place
                    //  the tooltip wouldn't be shown again
                    distinctUntilChanged(equalityCheck),
                    filter(isDefined),
                    map(mapDataToFocusData),
                    // mouse/touch left the valueDomain ==> setElOutFocus
                    tapLast(setElOutOfFocus),
                    tapLast(cleanUpOnFocusLoss) // --specific
                )
            ),
            // before setting the next el into focus, move the previous out of focus
            tapPrevious(setElOutOfFocus)
        )
        .subscribe(setElIntoFocus);
}

export function getEventObservablesForElement(el: Element, doc: Document) {
    // merge mouse and touch together
    const enter$ = merge(
        fromEvent<MouseEvent>(el, 'mouseenter'),
        fromEvent<TouchEvent>(el, 'touchstart', { passive: true })
    );
    const move$ = merge(
        fromEvent<MouseEvent>(el, 'mousemove'),
        fromEvent<TouchEvent>(el, 'touchmove', { passive: true })
    );
    const leave$ = merge(
        fromEvent<MouseEvent>(el, 'mouseleave'),
        fromEvent<TouchEvent>(doc.documentElement, 'touchstart', {
            passive: true
        }).pipe(filterEventTarget(el, false))
    );
    return [enter$, move$, leave$] as const;
}

export function mapPointerEventToDomPoint(
    svg: SVGSVGElement,
    event: MouseEvent | TouchEvent
): DOMPoint {
    const point = svg.createSVGPoint();
    point.x =
        event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
    point.y =
        event instanceof MouseEvent ? event.clientY : event.touches[0].clientY;
    return point.matrixTransform((<DOMMatrix>svg.getScreenCTM()).inverse());
}

export function calcDomainEnd(range: number, tickCount: number): number {
    // calculate an initial guess at step size
    const tempStep = range / tickCount;

    // get the magnitude of the step size
    const mag = Math.floor(Math.log10(tempStep));
    const magPow = Math.pow(10, mag);

    // calculate most significant digit of the new step size
    let magMsd = tempStep / magPow + 0.5;

    // promote the MSD to either 1, 2, or 5
    if (magMsd > 5.0) {
        magMsd = 10.0;
    } else if (magMsd > 2.0) {
        magMsd = 5.0;
    } else if (magMsd > 1.0) {
        magMsd = 2.0;
    }

    const stepSize = magMsd * magPow;
    return Math.ceil(range / stepSize) * stepSize;
}

export function hexToRgb(hex: string): [number, number, number] {
    let h = hex.replace('#', '');
    let bigint: number;
    switch (h.length) {
        // @ts-ignore allow fallthrough to handle hex trancparency
        case 8:
            h = h.slice(0, 6);
        case 6:
            bigint = parseInt(h, 16);
            break;
        // @ts-ignore allow fallthrough to handle hex trancparency
        case 4:
            h = h.slice(0, 3);
        case 3:
            bigint = parseInt(
                h
                    .split('')
                    .map((d) => d + d)
                    .join(''),
                16
            );
            break;
        default:
            throw new Error(`${hex} is not a valid hex color`);
    }
    return [
        (bigint >> 16) & 255, // tslint:disable-line:no-bitwise
        (bigint >> 8) & 255, // tslint:disable-line:no-bitwise
        bigint & 255 // tslint:disable-line:no-bitwise
    ];
}

export function rgbToHex([r, g, b]: [number, number, number]): string {
    // tslint:disable-next-line:no-bitwise
    return (
        '#' + ((1 << 24) + (+r << 16) + (+g << 8) + +b).toString(16).slice(1)
    );
}

export function createRangePathArea(
    data: HistogramBandEntry[],
    scaleX: ScaleTime<number, number>,
    scaleY: ScaleLinear<number, number>
): string {
    const nonNull = data.filter((v) => isDefined(v.band));
    if (nonNull.length === 0) {
        return '';
    }
    const points = [
        // tslint:disable-next-line:no-non-null-assertion
        ...nonNull.map((v) => [v.date, v.band!.upper] as const),
        // tslint:disable-next-line:no-non-null-assertion
        ...nonNull.map((v) => [v.date, v.band!.lower] as const).reverse()
    ].map(([xVal, yVal]) => `${scaleX(middleOfDay(xVal))},${scaleY(yVal)}`);
    return `M${points.shift()} L${points.join(' L')} Z`;
}

export function defineSteppedGradient(
    gradient: Selection<SVGLinearGradientElement, void, null, undefined>,
    yScale: ScaleLinear<number, number>,
    ranges: number[],
    colors: string[],
    margin: { top: number; bottom: number },
    svg: D3SvgComponent
) {
    if (colors.length <= ranges.length) {
        throw new Error('exactly one more color than range is needed');
    }
    const maxY = yScale.domain()[1];

    const data = ranges
        .map((r, ix) => [
            [(maxY - r) / maxY, colors[ix]] as const,
            [(maxY - r) / maxY, colors[ix + 1]] as const
        ])
        .reduce((u, i) => [...u, ...i], [])
        .reverse();

    gradient
        .attr('x1', 0)
        .attr('x2', 0)
        .attr('y1', margin.top)
        .attr('y2', svg.height - margin.bottom)
        .selectAll('stop')
        .data(data)
        .join('stop')
        .attr('offset', ([v]) => v)
        .attr('stop-color', ([_, c]) => c);
}

/*!
 * Get the contrasting color for any hex color
 * (c) 2019 Chris Ferdinandi, MIT License, https://gomakethings.com
 * Derived from work by Brian Suda, https://24ways.org/2010/calculating-color-contrast/
 * @param  {String} A hexcolor value
 * @return {String} The contrasting color (black or white)
 */
export const getContrastingColor = (hexcolor: string) => {
    // If a leading # is provided, remove it
    if (hexcolor.slice(0, 1) === '#') {
        hexcolor = hexcolor.slice(1);
    }

    // If a three-character hexcode, make six-character
    if (hexcolor.length === 3) {
        hexcolor = hexcolor
            .split('')
            .map(function (hex) {
                return hex + hex;
            })
            .join('');
    }

    // Convert to RGB value
    var r = parseInt(hexcolor.substring(0, 2), 16);
    var g = parseInt(hexcolor.substring(2, 4), 16);
    var b = parseInt(hexcolor.substring(4, 6), 16);

    // Get YIQ ratio
    var yiq = (r * 299 + g * 587 + b * 114) / 1000;

    // Check contrast
    return yiq >= 128 ? 'black' : 'white';
};

export const binarySearch = <T extends HistogramEntry>(
    array: T[],
    targetDate: Date
): T | undefined => {
    var midpoint = Math.floor(array.length / 2);

    if (isSameDay(array[midpoint].date, targetDate)) {
        return array[midpoint];
    }

    if (array.length === 2) {
        return Math.abs(differenceInDays(array[0].date, targetDate)) <
            Math.abs(differenceInDays(array[1].date, targetDate))
            ? array[0]
            : array[1];
    }

    if (array.length === 1) {
        return array[0];
    }

    if (array[midpoint].date.getTime() > targetDate.getTime()) {
        return binarySearch(array.slice(0, midpoint), targetDate);
    } else if (array[midpoint].date.getTime() < targetDate.getTime()) {
        return binarySearch(array.slice(midpoint), targetDate);
    }

    return undefined;
};

export const filterHistogramAreaEntryByDate = (
    entries: HistogramAreaEntry[],
    start: Date,
    end?: Date
): HistogramAreaEntry[] => {
    let endIndex = entries.length;
    if (end) {
        endIndex = entries.findIndex(
            (entry) => entry.date.getTime() < end.getTime()
        );
    }
    const startIndex = entries.findIndex(
        (entry) => entry.date.getTime() > start.getTime()
    );
    return entries.slice(startIndex, endIndex);
};
