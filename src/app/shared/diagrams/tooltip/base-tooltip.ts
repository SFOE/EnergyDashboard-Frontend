import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    OnChanges,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import { D3SvgComponent } from '../../components/d3-svg/d3-svg.component';
import { Breakpoints } from '../../static-utils/breakpoints.enum';

const TOOLTIP_POINT_OFFSET = 12;
const TOOLTIP_VIEWPORT_PADDING = 16; // minimal distance from the viewport end

export interface TooltipElementFocusEvent<T> {
    source: DOMPoint;
    histogramComponent?: ElementRef;
    data: T;
}

export interface TooltipDiagramComponent {
    svg: D3SvgComponent;
}

@Component({ template: '', styleUrls: ['./base-tooltip.scss'] })
export abstract class BaseTooltipComponent<T>
    implements OnChanges, AfterViewInit
{
    @Input() event?: TooltipElementFocusEvent<T>;

    @Input() yCorrection?: number;

    @ViewChild('tooltip') tooltip: ElementRef;

    data?: T;

    constructor() {}

    ngOnChanges(changes: SimpleChanges): void {
        if (!!changes['event'] && this.event && this.tooltip) {
            const { source, data } = this.event;
            this.data = data;
            const tooltipElement = this.tooltip.nativeElement;

            if (
                this.isMobile() &&
                this.event?.histogramComponent?.nativeElement
            ) {
                const refElement = this.event.histogramComponent?.nativeElement;

                // This will wait for the next JavaScript event loop, giving Angular time to render the tooltip before calculating its size and position:
                setTimeout(() => {
                    const rect = refElement.getBoundingClientRect();
                    const middleRefElement = rect.left + rect.width / 2;

                    // calculate available space above and below the refElement
                    const spaceAbove = rect.top;
                    const spaceBelow = window.innerHeight - rect.bottom;

                    // decide where to display the tooltip
                    const displayBelow = spaceBelow > spaceAbove;

                    if (displayBelow) {
                        tooltipElement.style.top = `${rect.bottom}px`;
                    } else {
                        tooltipElement.style.top = `${
                            rect.top - tooltipElement.offsetHeight
                        }px`;
                    }

                    // align to the middle of the refElement
                    tooltipElement.style.left = `${
                        middleRefElement - tooltipElement.offsetWidth / 2
                    }px`;
                }, 0);
            } else {
                // calculate how much space the tooltip takes up and decide which side to display it
                const viewportWidth = window.innerWidth;
                const remaingSpaceRight =
                    viewportWidth -
                    (source.x +
                        tooltipElement.clientWidth +
                        TOOLTIP_VIEWPORT_PADDING);
                const displayRight = remaingSpaceRight > 0;

                const baseTop: number =
                    source.y - tooltipElement.clientHeight / 2;
                tooltipElement.style.top = `${
                    baseTop + (this.yCorrection || 0)
                }px`;

                const tooltipXPosition = displayRight
                    ? source.x + TOOLTIP_POINT_OFFSET
                    : source.x -
                      this.tooltip.nativeElement.clientWidth -
                      TOOLTIP_POINT_OFFSET;
                tooltipElement.style.left = `${tooltipXPosition}px`;
            }
        }
    }

    ngAfterViewInit(): void {
        if (!this.tooltip) {
            console.error(
                'BaseTooltipComponent',
                'unable to find tooltip ViewChild, add #tooltip to the tooltip container'
            );
        }
    }

    public isMobile(): boolean {
        return window.innerWidth < Breakpoints.MAX_SM;
    }
}
