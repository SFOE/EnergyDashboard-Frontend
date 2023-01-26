import {
    Component,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges
} from '@angular/core';
import * as d3 from 'd3';
import { COLOR_STROM } from '../../commons/colors.const';
import { getContrastingColor } from '../utils';
import { DonutChartEntry } from './full-donut.model';

@Component({
    selector: 'bfe-full-donut-chart',
    templateUrl: './full-donut.component.html',
    styleUrls: ['./full-donut.component.scss']
})
export class FullDonutComponent implements OnInit, OnChanges {
    @Input() data: DonutChartEntry[];
    @Input() entryIndex: string[];
    @Input() postfix: string;
    @Input() allDataKey: string = 'commons.all';
    @Input() dimension = 300;

    private margin = { top: 0, right: 0, bottom: 0, left: 0 };
    private svg: any;

    chartid = Math.random().toString(36).substring(2, 7);
    selectedData?: DonutChartEntry;
    allDataSelected: boolean = true;
    private allDataSelectedEntry?: DonutChartEntry;

    ngOnInit(): void {
        this.allDataSelectedEntry = this.createSelectedDataForAll();
        this.selectedData = this.allDataSelectedEntry;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['dimension']) {
            this.clearChart();
            this.createSvg();
            this.drawChart();
        }
    }

    private createSelectedDataForAll(): DonutChartEntry {
        return {
            percentage: 100,
            value: Math.round(
                this.data.reduce(
                    (accumulator, current) => (accumulator += current.value),
                    0
                )
            ),
            color: COLOR_STROM,
            labelKey: 'dashboard.strom.produktion.total-production'
        };
    }

    private createSvg(): void {
        this.svg = d3
            .select(`figure#donut${this.chartid}`)
            .append('svg')
            .attr('viewBox', `0 0 ${this.dimension} ${this.dimension}`)
            .append('g')
            .attr(
                'transform',
                'translate(' +
                    this.dimension / 2 +
                    ',' +
                    this.dimension / 2 +
                    ')'
            );
    }

    private clearChart(): void {
        d3.select(`figure#donut${this.chartid} > svg`).remove();
    }

    private drawChart(): void {
        // Compute the position of each group on the pie:
        var pie = d3
            .pie<DonutChartEntry>()
            .sort(null)
            .value((d) => {
                return d.percentage;
            });
        var data_ready = pie(this.data);

        // The arc generator
        const radius =
            Math.min(this.dimension, this.dimension) / 2 - this.margin.left;
        var arc = d3
            .arc()
            .innerRadius(radius * 0.5) // This is the size of the donut hole
            .outerRadius(radius * 0.9);

        this.svg
            .selectAll('allSlices')
            .data(data_ready)
            .enter()
            .append('path')
            .attr('d', arc)
            .attr('fill', (d: { data: DonutChartEntry }) => d.data.color)
            .attr('stroke', (d: { data: DonutChartEntry }) => d.data.color)
            .style('stroke-width', '0.7px')
            .style('cursor', 'pointer')
            .on('click', (_event: any, d: { data: DonutChartEntry }) =>
                this.handleClickEvent(d.data)
            )
            .on('mouseover', (mouseoverEvent: { target: HTMLElement }) => {
                mouseoverEvent.target.style.opacity = '0.75';
            })
            .on('mouseleave', (mouseoverEvent: { target: HTMLElement }) => {
                mouseoverEvent.target.style.opacity = '1';
            });

        // Add the annotations
        this.svg
            .selectAll('allSlices')
            .data(data_ready)
            .enter()
            .append('text')
            .text((d: { data: DonutChartEntry }) => {
                return this.formatLabel(d.data.percentage);
            })
            .attr('transform', function (d: d3.DefaultArcObject) {
                return 'translate(' + arc.centroid(d) + ')';
            })
            .style('text-anchor', 'middle')
            .style('font-size', this.dimension * 0.06 + 'px') // 6% of the chart width/height
            .style('cursor', 'pointer')
            .style('pointer-events', 'none')
            .style('font-weight', '700')
            .style('fill', (d: { data: DonutChartEntry }) =>
                getContrastingColor(d.data.color)
            );
    }

    private handleClickEvent(entry: DonutChartEntry): void {
        this.allDataSelected = this.selectedData?.value === entry.value;
        if (this.allDataSelected) {
            this.selectedData = this.allDataSelectedEntry;
        } else {
            this.selectedData = entry;
        }
    }

    private formatLabel(percentage: number): string {
        const roundedPercentage = Math.round(percentage);

        return roundedPercentage > 0
            ? roundedPercentage + '%'
            : percentage + '%';
    }
}
