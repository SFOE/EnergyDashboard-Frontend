import {
    Component,
    ElementRef,
    HostListener,
    OnInit,
    ViewChild
} from '@angular/core';
import { StromProductionEntry } from '../../../../services/strom/strom.model';
import { StromService } from '../../../../services/strom/strom.service';
import { COLORS_STROM } from '../../../../shared/commons/colors.const';
import { DonutChartEntry } from '../../../../shared/diagrams/full-donut/full-donut.model';

@Component({
    selector: 'bfe-produktion-strommix-donut-mars',
    templateUrl: './produktion-strommix-donut-mars.component.html',
    styleUrls: ['./produktion-strommix-donut-mars.component.scss']
})
export class ProduktionStrommixDonutMarsComponent implements OnInit {
    lastFiveProductionEntries: DonutChartEntry[][];
    lastUpdated?: Date;

    ColorsStrom = COLORS_STROM;

    @ViewChild('currentChartSection') currentSectionRef: ElementRef;
    @ViewChild('legend') legendRef: ElementRef;
    currentChartDimension: number = 0;
    historicChartDimension: number = 0;
    private readonly maxChartDimension = 230;

    currentYear = new Date().getFullYear();
    loading: boolean = true;

    constructor(private stromService: StromService) {}

    ngOnInit(): void {
        this.stromService.getStromProduction().subscribe((data) => {
            this.lastUpdated = data.lastUpdate;
            this.lastFiveProductionEntries = data.entries
                .sort((a, b) => b.year - a.year)
                .map(this.mapProductionEntryToChartEntry);
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
                color: COLORS_STROM.KERNKRAFT,
                labelKey: 'dashboard.strom.produktion.type.kernkraft'
            },
            {
                percentage: entry.anteilWind,
                value: entry.kumuliertWind,
                color: COLORS_STROM.WIND,
                labelKey: 'dashboard.strom.produktion.type.wind'
            },
            {
                percentage: entry.anteilFlusskraft,
                value: entry.kumuliertFlusskraft,
                color: COLORS_STROM.FLUSSKRAFT,
                labelKey: 'dashboard.strom.produktion.type.flusskraft'
            },
            {
                percentage: entry.anteilThermische,
                value: entry.kumuliertThermische,
                color: COLORS_STROM.THERMISCHE,
                labelKey: 'dashboard.strom.produktion.type.thermische'
            },
            {
                percentage: entry.anteilSpeicherkraft,
                value: entry.kumuliertSpeicherkraft,
                color: COLORS_STROM.SPEICHERKRAFT,
                labelKey: 'dashboard.strom.produktion.type.speicherkraft'
            },
            {
                percentage: entry.anteilPhotovoltaik,
                value: entry.kumuliertPhotovoltaik,
                color: COLORS_STROM.PHOTOVOLTAIK,
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
        const currentContainerWidth =
            this.currentSectionRef.nativeElement.clientWidth;
        const calculatedWidth =
            currentContainerWidth - this.legendRef.nativeElement.clientWidth;
        this.currentChartDimension =
            calculatedWidth < this.maxChartDimension
                ? calculatedWidth
                : this.maxChartDimension;

        //current container and historic container width should be equal
        this.historicChartDimension = currentContainerWidth / 2 - 16; // subtract 16px for gap
    }
}
