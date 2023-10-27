import {
    Component,
    ElementRef,
    HostListener,
    OnInit,
    ViewChild
} from '@angular/core';
import { StromProductionEntry } from '../../../../services/strom/strom.model';
import { StromService } from '../../../../services/strom/strom.service';
import { DonutChartEntry } from '../../../../shared/diagrams/full-donut/full-donut.model';
import {
    StromProduktionChartIndex,
    StromProduktionColors
} from '../produktion.consts';
@Component({
    selector: 'bfe-produktion-strommix-donut-mars',
    templateUrl: './produktion-strommix-donut-mars.component.html',
    styleUrls: ['./produktion-strommix-donut-mars.component.scss']
})
export class ProduktionStrommixDonutMarsComponent implements OnInit {
    lastFiveProductionEntries: DonutChartEntry[][];
    lastUpdated?: Date;

    readonly chartColors = StromProduktionColors;
    readonly chartIndex = StromProduktionChartIndex;

    @ViewChild('currentChartSection') currentSectionRef: ElementRef;
    @ViewChild('historicChartSection') historicSectionRef: ElementRef;
    @ViewChild('chartRowContainer') chartRowRef: ElementRef;
    @ViewChild('legend') legendRef: ElementRef;
    currentChartDimension: number = 0;
    historicChartDimension: number = 0;
    private readonly maxChartDimension = 250;

    currentYear = new Date().getFullYear();
    loading: boolean = true;
    selectedDataIndex: number | null = null;

    constructor(private stromService: StromService) {}

    ngOnInit(): void {
        this.stromService.getStromProduction().subscribe((data) => {
            this.lastUpdated = data.lastUpdate;
            this.lastFiveProductionEntries = data.entries
                .sort((a, b) => b.year - a.year)
                .map((entry: any) =>
                    this.mapProductionEntryToChartEntry(entry as any)
                );
            this.waitForCurrentContainerAndResize();
            this.loading = false;
        });
    }

    private mapProductionEntryToChartEntry(
        entry: StromProductionEntry
    ): DonutChartEntry[] {
        return [
            {
                percentage: entry.anteilKernkraft,
                value: entry.kumuliertKernkraft,
                color: this.chartColors[this.chartIndex.KERNKRAFT],
                labelKey: 'dashboard.strom.produktion.type.kernkraft'
            },
            {
                percentage: entry.anteilWind,
                value: entry.kumuliertWind,
                color: this.chartColors[this.chartIndex.WIND],
                labelKey: 'dashboard.strom.produktion.type.wind'
            },
            {
                percentage: entry.anteilFlusskraft,
                value: entry.kumuliertFlusskraft,
                color: this.chartColors[this.chartIndex.FLUSSKRAFT],
                labelKey: 'dashboard.strom.produktion.type.flusskraft'
            },
            {
                percentage: entry.anteilThermische,
                value: entry.kumuliertThermische,
                color: this.chartColors[this.chartIndex.THERMISCHE],
                labelKey: 'dashboard.strom.produktion.type.thermische'
            },
            {
                percentage: entry.anteilSpeicherkraft,
                value: entry.kumuliertSpeicherkraft,
                color: this.chartColors[this.chartIndex.SPEICHERKRAFT],
                labelKey: 'dashboard.strom.produktion.type.speicherkraft'
            },
            {
                percentage: entry.anteilPhotovoltaik,
                value: entry.kumuliertPhotovoltaik,
                color: this.chartColors[this.chartIndex.PHOTOVOLTAIK],
                labelKey: 'dashboard.strom.produktion.type.photovoltaik'
            }
        ];
    }

    private waitForCurrentContainerAndResize(): void {
        const interval = setInterval(() => {
            if (!!this.currentSectionRef) {
                this.onResize();
                clearInterval(interval);
            }
        }, 100);
    }

    @HostListener('window:resize', ['$event'])
    onResize() {
        const currentChartSectionWidth =
            this.currentSectionRef.nativeElement.clientWidth;
        this.currentChartDimension =
            currentChartSectionWidth < this.maxChartDimension
                ? currentChartSectionWidth
                : this.maxChartDimension;

        // Calculate historic chart dimension
        const chartRowContainer = this.chartRowRef.nativeElement.clientWidth;
        const historicChartSectionWidth =
            this.historicSectionRef.nativeElement.clientWidth;

        const calculatedWidth =
            historicChartSectionWidth === chartRowContainer
                ? historicChartSectionWidth
                : chartRowContainer - this.currentChartDimension - 64;

        this.historicChartDimension = calculatedWidth / 2 - 32; // subtract 16px for gap
    }

    onReset(): void {
        this.selectedDataIndex = null;
    }
    onSelect(dataIndex: number): void {
        this.selectedDataIndex =
            this.selectedDataIndex === dataIndex ? null : dataIndex;
    }
}
