import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Input,
    OnDestroy,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { select, Selection } from 'd3';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil, tap, throttleTime } from 'rxjs/operators';
import { ResizeService } from '../../../core/resize.service';

const addressablePatternByElIdFn = (elId: string) => `url(#${elId})`;

interface FillStrokePattern {
    attrId: string;
    fillColor: string;
    strokeColor: string;
    strokeWidth: number;
    width: number;
    height: number;
}

@Component({
    selector: 'bfe-d3-svg',
    template: `
        <div
            class="d3-svg"
            [style.--d3-svg-min-h]="minHeight || 'none'"
            [style.--d3-svg-max-h]="maxHeight || 'none'"
            [style.--d3-svg-ratio-w]="ratio && ratio[0]"
            [style.--d3-svg-ratio-h]="ratio && ratio[1]"
            [style.--d3-svg-margin-bottom]="marginBottom"
            [style.--d3-svg-overflow]="overflow"
        >
            <svg #svgElRef preserveAspectRatio="xMidYMid meet">
                <defs>
                    <filter
                        [attr.id]="elIds.whiteStroke"
                        filterUnits="userSpaceOnUse"
                        x="0"
                        y="0"
                        width="100%"
                        height="100%"
                    >
                        <feDropShadow
                            dx="1"
                            dy="0"
                            flood-color="#ffffff"
                            stdDeviation="0"
                            flood-opacity="1"
                        ></feDropShadow>
                        <feDropShadow
                            dx="-1"
                            dy="0"
                            flood-color="#ffffff"
                            stdDeviation="0"
                            flood-opacity="1"
                        ></feDropShadow>
                        <feDropShadow
                            dx="0"
                            dy="1"
                            flood-color="#ffffff"
                            stdDeviation="0"
                            flood-opacity="1"
                        ></feDropShadow>
                        <feDropShadow
                            dx="0"
                            dy="-1"
                            flood-color="#ffffff"
                            stdDeviation="0"
                            flood-opacity="1"
                        ></feDropShadow>
                    </filter>
                    <filter
                        [attr.id]="elIds.dropShadow"
                        filterUnits="userSpaceOnUse"
                        x="0"
                        y="0"
                        width="100%"
                        height="100%"
                    >
                        <feDropShadow
                            dx="0"
                            dy="0"
                            [attr.stdDeviation]="1 / currentZoomLevel"
                            flood-color="#000000"
                        />
                    </filter>
                    <pattern
                        *ngFor="let fillStrokePattern of fillStrokePatterns"
                        [attr.id]="fillStrokePattern.attrId"
                        patternUnits="userSpaceOnUse"
                        [attr.width]="fillStrokePattern.width"
                        [attr.height]="fillStrokePattern.height"
                        [attr.patternTransform]="
                            'scale(' + 1 / currentZoomLevel + ') rotate(45)'
                        "
                    >
                        <rect
                            x="0"
                            y="0"
                            [attr.width]="fillStrokePattern.width"
                            [attr.height]="fillStrokePattern.height"
                            [attr.fill]="fillStrokePattern.fillColor"
                        />
                        <line
                            x1="0"
                            y="0"
                            x2="0"
                            y2="4"
                            [attr.stroke]="fillStrokePattern.strokeColor"
                            [attr.stroke-width]="fillStrokePattern.strokeWidth"
                        />
                    </pattern>
                    <pattern
                        [attr.id]="patternWithId('patternDots')"
                        patternTransform="rotate(0)"
                        x="0"
                        y="0"
                        width="4"
                        height="4"
                        patternUnits="userSpaceOnUse"
                        patternContentUnits="userSpaceOnUse"
                    >
                        <circle
                            id="pattern-circle"
                            cx="2"
                            cy="2"
                            r="1"
                            fill="#FFFFFF"
                        ></circle>
                    </pattern>
                    <pattern
                        [attr.id]="patternWithId('patternDotsBar')"
                        patternTransform="rotate(0)"
                        x="0"
                        y="0"
                        width="4"
                        height="4"
                        patternUnits="userSpaceOnUse"
                        patternContentUnits="userSpaceOnUse"
                    >
                        <rect
                            x="0"
                            y="0"
                            width="4"
                            height="4"
                            [attr.fill]="this.patternBgColor"
                        />
                        <circle
                            id="pattern-circle"
                            cx="2"
                            cy="2"
                            r="1"
                            fill="#FFFFFF"
                        ></circle>
                    </pattern>
                    <mask
                        [attr.id]="elIds.inaccurateDataMask"
                        x="0"
                        y="0"
                        width="1"
                        height="1"
                    >
                        <rect
                            x="0"
                            y="0"
                            width="100%"
                            height="100%"
                            [attr.fill]="
                                'url(#' + elIds.inaccurateDataPattern + ')'
                            "
                        />
                    </mask>
                    <mask [attr.id]="elIds.domainDataMask">
                        <rect
                            x="0"
                            y="0"
                            width="100%"
                            height="100%"
                            #domainDataMaskRectElRef
                            fill="#FFF"
                        ></rect>
                    </mask>
                </defs>
            </svg>
        </div>
    `,
    styleUrls: ['./d3-svg.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class D3SvgComponent implements AfterViewInit, OnDestroy {
    private static instanceCounter = 0;
    readonly instanceNum = ++D3SvgComponent.instanceCounter;

    readonly elIds = {
        noDataFill: `noData${this.instanceNum}`,
        whiteStroke: `whiteStroke${this.instanceNum}`,
        dropShadow: `dropShadow${this.instanceNum}`,
        inaccurateDataPattern: `inaccurateDataPattern${this.instanceNum}`,
        inaccurateDataMask: `inaccurateDataFill${this.instanceNum}`,
        domainDataMask: `domainDataMask${this.instanceNum}`
    };

    readonly noDataFill = addressablePatternByElIdFn(this.elIds.noDataFill);
    readonly whiteStroke = addressablePatternByElIdFn(this.elIds.whiteStroke);
    readonly dropShadow = addressablePatternByElIdFn(this.elIds.dropShadow);
    readonly inaccurateDataMask = addressablePatternByElIdFn(
        this.elIds.inaccurateDataMask
    );
    readonly domainDataMask = addressablePatternByElIdFn(
        this.elIds.domainDataMask
    );

    @Input()
    ratio?: [number, number] | null = [5, 3];

    @Input()
    currentZoomLevel = 1;

    @Input()
    minHeight?: string | null | undefined;

    @Input()
    maxHeight?: string | null | undefined;

    @Input()
    marginBottom = '0px';

    @Input()
    patternBgColor?: string | null | undefined;

    @ViewChild('svgElRef')
    readonly svgElRef: ElementRef<SVGSVGElement>;

    @ViewChild('domainDataMaskRectElRef')
    readonly domainDataMaskRectElRef: ElementRef<SVGRectElement>;

    svgEl: SVGSVGElement;

    svg: Selection<SVGSVGElement, void, null, undefined>;

    width: number;

    height: number;

    readonly element: HTMLElement;

    readonly fillStrokePatterns: FillStrokePattern[] = [
        {
            attrId: this.elIds.noDataFill,
            fillColor: '#FFFFFF',
            strokeColor: '#B0B0B0',
            width: 4,
            height: 4,
            strokeWidth: 2
        },
        {
            attrId: this.elIds.inaccurateDataPattern,
            fillColor: '#FFFFFF',
            strokeColor: '#999999',
            width: 4,
            height: 4,
            strokeWidth: 2
        }
    ];

    get overflow(): string {
        return this.marginBottom === '0px' ? 'hidden' : 'visible';
    }

    get isVisible(): boolean {
        // easy solution to check if element is not `display:none`
        return this.element.offsetParent !== null;
    }

    readonly repaint$: Observable<void>;

    private readonly onDestroy = new Subject<void>();

    constructor(
        elementRef: ElementRef,
        resizeService: ResizeService,
        private readonly cd: ChangeDetectorRef
    ) {
        this.element = elementRef.nativeElement;
        this.repaint$ = resizeService.observe(this.element).pipe(
            takeUntil(this.onDestroy),
            throttleTime(400, undefined, { leading: true, trailing: true }),
            filter(() => this.isVisible),
            tap(this.updateDimensions),
            tap(this.updateViewBox)
        );
    }

    ngAfterViewInit() {
        this.svgEl = this.svgElRef.nativeElement;
        this.svg = select(this.svgEl);
    }

    ngOnDestroy(): void {
        this.onDestroy.next();
        this.onDestroy.complete();
    }

    patternWithId(name: string): string {
        return `${name}${this.instanceNum}`;
    }

    customFillStrokePattern(
        childId: string,
        pattern: Partial<FillStrokePattern>
    ): string {
        const childElId = `${this.patternWithId(
            'fillStrokePattern'
        )}.${childId}`;
        if (!this.fillStrokePatterns.find((p) => p.attrId === childElId)) {
            const originPattern = this.fillStrokePatterns[0];
            const newPattern: FillStrokePattern = {
                ...originPattern,
                ...pattern,
                attrId: childElId
            };
            this.fillStrokePatterns.push(newPattern);
            this.cd.markForCheck();
        }

        return addressablePatternByElIdFn(childElId);
    }

    private readonly updateDimensions = () => {
        this.width = this.svgEl.clientWidth;
        this.height = this.svgEl.clientHeight;
    };

    private readonly updateViewBox = () => {
        this.svgEl.setAttribute(
            'viewBox',
            [0, 0, this.width, this.height].join(' ')
        );
        this.domainDataMaskRectElRef.nativeElement.setAttribute(
            'width',
            String(this.width)
        );
        this.domainDataMaskRectElRef.nativeElement.setAttribute(
            'height',
            String(this.height)
        );
    };
}
