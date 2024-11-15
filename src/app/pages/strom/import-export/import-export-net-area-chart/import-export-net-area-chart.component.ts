import {
    Component,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { differenceInDays } from 'date-fns';
import { DateSpanSelection } from 'src/app/shared/diagrams/histogram/base-histogram.component';
import { TranslationService } from '../../../../core/i18n/translation.service';
import { ImportExportEntry } from '../../../../core/models/import-export';
import { StromImportExportNettoEntry } from '../../../../core/models/strom-import-export.netto';
import { LabelModifier } from '../../../../shared/diagrams/histogram/base-histogram.model';
import {
    AreaMinMaxFocusEntry,
    HistogramAreaMinMaxComponent
} from '../../../../shared/diagrams/histogram/histogram-area-min-max/histogram-area-min-max.component';
import { HistogramAreaEntry } from '../../../../shared/diagrams/histogram/histogram-area/histogram-area.component';
import { HistogramElFocusEvent } from '../../../../shared/diagrams/histogram/interactive-histogram.component';
import {
    LabelFilters,
    LabelFormatters
} from '../../../../shared/diagrams/label.utils';
import { ArrayUtils } from '../../../../shared/static-utils/array-utils';
import { oneWeekInMilliseconds } from '../../../../shared/static-utils/date-utils';
import { ImportExportConsts } from '../../strom.consts';
import {
    ImportExportCountries,
    legendExportEntries,
    legendImportEntries
} from './import-export-net-area-chart.consts';

const EXTENDED_LABEL_MIN_DAYS = 84;

@Component({
    selector: 'bfe-import-export-net-area-chart',
    templateUrl: './import-export-net-area-chart.component.html',
    styleUrls: ['./import-export-net-area-chart.component.scss']
})
export class ImportExportNetAreaChartComponent implements OnChanges, OnInit {
    @Input() entries: StromImportExportNettoEntry[];
    @Input() currentEntry: ImportExportEntry;
    @ViewChild(HistogramAreaMinMaxComponent)
    child!: HistogramAreaMinMaxComponent;

    stromImports: HistogramAreaEntry[];
    stromExports: HistogramAreaEntry[];

    readonly countries = ImportExportCountries;
    readonly countrySelectionControl = new FormControl([0, 1, 2, 3]);
    labelModifier: LabelModifier;
    subLabelModifier?: LabelModifier;
    tooltipEvent?: HistogramElFocusEvent<AreaMinMaxFocusEntry>;

    // save all data for filtering purposes
    private allData: {
        // allTime will be needed once we implement time filtering
        allTime: {
            stromImports: HistogramAreaEntry[];
            stromExports: HistogramAreaEntry[];
        };
        selectedPeriod: {
            stromImports: HistogramAreaEntry[];
            stromExports: HistogramAreaEntry[];
        };
    };
    twoWeeksBackFromToday = new Date(Date.now() - oneWeekInMilliseconds * 4);

    importLegendEntries = legendImportEntries;
    exportLegendEntries = legendExportEntries;
    colors = [
        ...Object.values(ImportExportConsts.export),
        ...Object.values(ImportExportConsts.import)
    ];
    focusPointColors = [
        ...Object.values(ImportExportConsts.export),
        ...Object.values(ImportExportConsts.import)
    ];

    constructor(private translationService: TranslationService) {
        this.labelModifier = {
            formatter: LabelFormatters.monthAndDay(translationService.language),
            filter: LabelFilters.firstDayOfWeek()
        };
    }

    ngOnInit(): void {
        this.countrySelectionControl.valueChanges.subscribe((value) => {
            if (!!value) {
                this.stromImports = this.filterDataBySelection(
                    this.allData.selectedPeriod.stromImports,
                    value
                );
                this.stromExports = this.filterDataBySelection(
                    this.allData.selectedPeriod.stromExports,
                    value
                );
                this.importLegendEntries = ArrayUtils.filterByIndex(
                    legendImportEntries,
                    value
                );
                this.exportLegendEntries = ArrayUtils.filterByIndex(
                    legendExportEntries,
                    value
                );
                this.setColors(value);
            }
        });
    }

    setColors(selectedIndex?: number[]) {
        const imports = Object.values(ImportExportConsts.export);
        const exports = Object.values(ImportExportConsts.import);
        if (selectedIndex?.length === 1) {
            this.colors = [
                ...imports.filter((_, index) => selectedIndex.includes(index)),
                ...exports.filter((_, index) => selectedIndex.includes(index))
            ];
            this.focusPointColors = [
                ...imports.filter((_, index) => selectedIndex.includes(index)),
                ...exports.filter((_, index) => selectedIndex.includes(index))
            ];
        } else {
            this.colors = [...imports, ...exports];
            this.focusPointColors = [...imports, ...exports];
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (!!changes['entries'] && !!this.entries) {
            const allTime = this.prepareImportExportData(this.entries);
            this.stromImports = allTime.stromImports;
            this.stromExports = allTime.stromExports;
            this.allData = {
                allTime,
                selectedPeriod: {
                    stromImports: this.stromImports,
                    stromExports: this.stromExports
                }
            };
        }
    }

    onBrushChanged(brushSelection: DateSpanSelection) {
        const { labelModifier, subLabelModifier } =
            this.getLabelModifiers(brushSelection);
        this.labelModifier = labelModifier;
        this.subLabelModifier = subLabelModifier;
    }

    private prepareImportExportData(data: StromImportExportNettoEntry[]): {
        stromImports: HistogramAreaEntry[];
        stromExports: HistogramAreaEntry[];
    } {
        const splitedData = {
            stromImports: [] as HistogramAreaEntry[],
            stromExports: [] as HistogramAreaEntry[]
        };
        data.forEach((current) => {
            splitedData.stromImports.push({
                date: new Date(current.date),
                values: Object.values(current.import)
            });
            splitedData.stromExports.push({
                date: new Date(current.date),
                values: this.negateValues(Object.values(current.export))
            });
        });
        return splitedData;
    }

    private negateValues(values: number[]): number[] {
        return values.map((value) => -value);
    }

    private filterDataBySelection(
        entries: HistogramAreaEntry[],
        positionsToKeep: number[]
    ): HistogramAreaEntry[] {
        return entries.map((entry) => ({
            ...entry,
            values: entry.values.filter((_, index) =>
                positionsToKeep.includes(index)
            )
        }));
    }

    private getLabelModifiers({ start, end }: DateSpanSelection): {
        labelModifier: LabelModifier;
        subLabelModifier?: LabelModifier;
    } {
        const data = this.entries;
        const lang = this.translationService.language;
        const useExtendedLabel =
            differenceInDays(end, start) > EXTENDED_LABEL_MIN_DAYS;

        const labelModifier = useExtendedLabel
            ? {
                  formatter: LabelFormatters.firstOfMonthOnly(data, lang),
                  filter: LabelFilters.firstOfMonthOnly({
                      excludeFirst: true,
                      excludeLast: true
                  })
              }
            : {
                  formatter: LabelFormatters.monthAndDay(lang),
                  filter: LabelFilters.firstDayOfWeek()
              };

        const subLabelModifier = useExtendedLabel
            ? {
                  formatter: LabelFormatters.yearFull(lang),
                  filter: LabelFilters.januaryAndDecember()
              }
            : undefined;

        return { labelModifier, subLabelModifier };
    }

    showLineChartTooltip(event: HistogramElFocusEvent<AreaMinMaxFocusEntry>) {
        this.tooltipEvent = event;
    }

    hideTooltip(): void {
        this.tooltipEvent = undefined;
    }
}
