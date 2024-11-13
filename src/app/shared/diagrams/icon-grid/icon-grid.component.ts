import { Component, ElementRef, Input, OnInit } from '@angular/core';
import * as d3 from 'd3';

function round(value: number, step: number) {
    step || (step = 1.0);
    const inv = 1.0 / step;
    return Math.round(value * inv) / inv;
}

@Component({
    selector: 'bfe-icon-grid',
    templateUrl: './icon-grid.component.html',
    styleUrls: ['./icon-grid.component.scss']
})
export class IconGridComponent implements OnInit {
    @Input() nbrElementsPerRow: number;
    @Input() rows: number[]; // number of elements per row
    @Input() iconColor: string = 'black';
    @Input() elementWidth: number;
    @Input() elementHeight: number;
    @Input() iconFunction: (
        x: number,
        y: number,
        fill: string,
        svg: any
    ) => void;

    private svg: any;
    private elementSpacing: number;
    private elementFieldWidth: number;
    private elementFieldHeight: number;
    private resizeObserver: ResizeObserver;

    calculatedHeight: string;

    constructor(private el: ElementRef) {}

    ngOnInit(): void {
        const parentDiv = this.el.nativeElement.querySelector(
            '.icon-grid-container'
        );

        // initialize ResizeObserver for the SVG
        const svgElement = this.el.nativeElement.querySelector('svg');
        this.resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                const { width, height } = entry.contentRect;
                // trigger resize when SVG size changes
                this.handleSvgResize(width);
            }
        });

        // observe SVG element for size changes
        if (svgElement) {
            this.resizeObserver.observe(svgElement);
        }

        // initial element size calculation
        this.updateElementSizes(parentDiv.offsetWidth);
        this.createSvg();
        this.drawGrid();
    }

    ngOnDestroy(): void {
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
        }
    }

    private updateElementSizes(containerWidth: number): void {
        const spacingValue =
            (containerWidth - this.nbrElementsPerRow * this.elementWidth) /
            (this.nbrElementsPerRow - 1);
        // make sure not negative
        this.elementSpacing = Math.max(0, round(spacingValue, 0.1));

        this.elementFieldWidth = this.elementWidth + this.elementSpacing;
        this.elementFieldHeight = this.elementHeight + this.elementSpacing;
    }

    private createSvg(): void {
        const svgHeight = this.rows.length * this.elementFieldHeight;

        this.svg = d3
            .select(this.el.nativeElement)
            .select('svg')
            .attr('width', '100%') // make it responsive to the parent
            .attr('height', svgHeight); // calculated based on number of rows

        // set height of parent div
        this.calculatedHeight = `${svgHeight}px`;
    }

    private drawGrid(): void {
        // clear canvas
        this.svg.selectAll('*').remove();

        const fill: string = this.iconColor;

        this.rows.forEach((count, rowIndex) => {
            for (let i = 0; i < count; i++) {
                const x: number = i * this.elementFieldWidth;
                const y: number = rowIndex * this.elementFieldHeight;

                this.iconFunction(x, y, fill, this.svg);
            }
        });
    }

    private handleSvgResize(newWidth: number): void {
        // recalculate element sizes based on SVG width
        this.updateElementSizes(newWidth);

        // adjust SVG sizing
        this.createSvg();

        // redraw grid with new sizes
        this.drawGrid();
    }
}
