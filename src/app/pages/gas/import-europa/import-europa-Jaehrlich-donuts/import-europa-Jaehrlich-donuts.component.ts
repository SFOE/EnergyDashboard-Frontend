import {
    Component,
    ElementRef,
    HostListener,
    OnInit,
    ViewChild
} from '@angular/core';
import { TranslationService } from '../../../../core/i18n/translation.service';
import {
    GasImportEuropaJaehrlichAreas,
    GasImportEuropaJaehrlichEntries
} from '../../../../core/models/gas/gas-import-eruopa-jaehrlich';
import { GasService } from '../../../../services/gas/gas.service';
import { DonutChartEntry } from '../../../../shared/diagrams/full-donut/full-donut.model';
import {
    GasImportEuropaChartIndex,
    GasImportEuropaColors
} from '../import-europa.consts';

@Component({
    selector: 'bfe-import-europa-Jaehrlich-donuts',
    templateUrl: './import-europa-Jaehrlich-donuts.component.html',
    styleUrls: ['./import-europa-Jaehrlich-donuts.component.scss']
})
export class GasImportEuropaDonutComponent implements OnInit {
    lastFiveProductionEntries: DonutChartEntry[][];
    lastUpdated?: Date;
    measuringUnit: string =
        this.translationService.returnTranslation('commons.unit.mioM3');

    readonly chartColors = GasImportEuropaColors;
    readonly chartIndex = GasImportEuropaChartIndex;

    @ViewChild('currentChartSection') currentSectionRef: ElementRef;
    @ViewChild('historicChartSection') historicSectionRef: ElementRef;
    @ViewChild('chartRowContainer') chartRowRef: ElementRef;
    currentChartDimension: number = 0;
    historicChartDimension: number = 0;
    private readonly maxChartDimension = 245;

    currentYear = new Date().getFullYear();
    isLoading: boolean = true;
    selectedDataIndex: number | null = null;
    stichdatum: Date = new Date();

    constructor(
        private gasService: GasService,
        private translationService: TranslationService
    ) {}

    ngOnInit(): void {
        this.gasService.getGasImportEuropaJaehrlich().subscribe((data) => {
            const keys = Object.keys(data);
            this.lastFiveProductionEntries = keys
                .sort((a, b) => Number(b) - Number(a))
                .map((key: any) =>
                    this.mapGasImportEuropaToChartEntry(data[key] as any)
                );
            this.waitForCurrentContainerAndResize();
            this.stichdatum = this.getStichdatum(data);
            this.isLoading = false;
        });
    }

    private getStichdatum(data: GasImportEuropaJaehrlichEntries): Date {
        const values: Date[] = [];
        for (const year in data) {
            const currentYear: GasImportEuropaJaehrlichAreas = data[year];
            for (const area in currentYear) {
                const areaKey = area as keyof GasImportEuropaJaehrlichAreas;
                const currentArea = currentYear[areaKey];
                if (currentArea['stand']) {
                    values.push(new Date(currentArea['stand']));
                }
            }
        }
        return new Date(Math.max(...values.map((date) => date.getTime())));
    }

    private mapGasImportEuropaToChartEntry(
        entry: GasImportEuropaJaehrlichAreas
    ): DonutChartEntry[] {
        return [
            {
                percentage: entry['Norway'].prozent,
                value: entry['Norway'].millM3,
                color: this.chartColors[this.chartIndex.NORWAY],
                labelKey: 'dashboard.gas.import-europa.region.norway'
            },
            {
                percentage: entry['Algeria'].prozent,
                value: entry['Algeria'].millM3,
                color: this.chartColors[this.chartIndex.ALGERIA],
                labelKey: 'dashboard.gas.import-europa.region.algeria'
            },
            {
                percentage: entry['Russia'].prozent,
                value: entry['Russia'].millM3,
                color: this.chartColors[this.chartIndex.RUSSIA],
                labelKey: 'dashboard.gas.import-europa.region.russia'
            },
            {
                percentage: entry['Azerbaijan'].prozent,
                value: entry['Azerbaijan'].millM3,
                color: this.chartColors[this.chartIndex.AZERBAIJAN],
                labelKey: 'dashboard.gas.import-europa.region.azerbaijan'
            },
            {
                percentage: entry['UK'].prozent,
                value: entry['UK'].millM3,
                color: this.chartColors[this.chartIndex.UK],
                labelKey: 'dashboard.gas.import-europa.region.uk'
            },
            {
                percentage: entry['LNG'].prozent,
                value: entry['LNG'].millM3,
                color: this.chartColors[this.chartIndex.LNG],
                labelKey: 'dashboard.gas.import-europa.region.lng'
            },
            {
                percentage: entry['Libya'].prozent,
                value: entry['Libya'].millM3,
                color: this.chartColors[this.chartIndex.LIBYA],
                labelKey: 'dashboard.gas.import-europa.region.libya'
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
                : chartRowContainer - this.currentChartDimension - 32;

        this.historicChartDimension = calculatedWidth / 2 - 16; // subtract 16px for gap
    }
    onReset(): void {
        this.selectedDataIndex = null;
    }
    onChartClick(dataIndex: number): void {
        this.selectedDataIndex =
            this.selectedDataIndex === dataIndex ? null : dataIndex;
    }
}
