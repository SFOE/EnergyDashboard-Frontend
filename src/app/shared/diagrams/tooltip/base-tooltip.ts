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

const TOOLTIP_POINT_OFFSET = 12;
const TOOLTIP_VIEWPORT_PADDING = 16; // minimal distance from the viewport end

export interface TooltipElementFocusEvent<T> {
    source: DOMPoint;
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

    @ViewChild('tooltip') tooltip: ElementRef;

    data?: T;

    ngOnChanges(changes: SimpleChanges): void {
        if (!!changes['event'] && this.event && this.tooltip) {
            const { source, data } = this.event;
            this.data = data;
            const tooltipElement = this.tooltip.nativeElement;

            // calculate how much space the tooltip takes up and decide which side to display it
            const viewportWidth = window.innerWidth;
            const remaingSpaceRight =
                viewportWidth -
                (source.x +
                    tooltipElement.clientWidth +
                    TOOLTIP_VIEWPORT_PADDING);
            const displayRight = remaingSpaceRight > 0;

            tooltipElement.style.top = `${
                source.y - tooltipElement.clientHeight / 2
            }px`;
            const tooltipXPosition = displayRight
                ? source.x + TOOLTIP_POINT_OFFSET
                : source.x -
                  this.tooltip.nativeElement.clientWidth -
                  TOOLTIP_POINT_OFFSET;
            tooltipElement.style.left = `${tooltipXPosition}px`;
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
}
