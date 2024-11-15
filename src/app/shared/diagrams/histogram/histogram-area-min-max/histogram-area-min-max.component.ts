import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import { TranslationService } from 'src/app/core/i18n/translation.service';
import {
    BrushSelectionComponent,
    getDefaultBrushLabelModifier
} from 'src/app/shared/components/brush-selection/brush-selection.component';
import { DateModel } from '../../../../core/models/base/date.model';
import { HistogramAreaChartEntry } from '../../../../core/models/charts';
import { LabelFilters, LabelFormatters } from '../../label.utils';
import { DateSpanSelection } from '../base-histogram.component';
import { LabelModifier } from '../base-histogram.model';
import { HistogramElFocusEvent } from '../interactive-histogram.component';

const DOMAIN_MIN_MAX_PADDING = 20;

export interface AreaMinMaxFocusEntry extends DateModel {
    positiveEntries: (number | null)[];
    negativeEntries: (number | null)[];
}

@Component({
    selector: 'bfe-histogram-area-min-max',
    templateUrl: './histogram-area-min-max.component.html',
    styleUrls: ['./histogram-area-min-max.component.scss']
})
export class HistogramAreaMinMaxComponent
    extends BrushSelectionComponent
    implements OnChanges
{
    @Input() positiveEntries: HistogramAreaChartEntry[];
    @Input() negativeEntries: HistogramAreaChartEntry[];
    @Input() colors: string[];
    @Input() focusPointColors: string[];
    @Input() areaOpacities: number | number[];
    @Input() margins: {
        top: number;
        bottom: number;
        left: number;
        right: number;
    };
    @Input() xLabelModifier: LabelModifier = {
        formatter: LabelFormatters.dateShort('de'),
        filter: LabelFilters.none()
    };
    @Input() xSubLabelModifier?: LabelModifier;
    @Input() brushSelectionStart?: Date;

    @ViewChild('diagramContainer', { read: ElementRef }) viewChild: ElementRef;

    @Output()
    readonly elFocus = new EventEmitter<
        HistogramElFocusEvent<AreaMinMaxFocusEntry>
    >();
    @Output() readonly diagramLeave = new EventEmitter<void>();
    @Output() readonly brushChanged = new EventEmitter<DateSpanSelection>();

    consolidatedChartEntries: HistogramAreaChartEntry[];
    filteredConsolidatedChartEntries: HistogramAreaChartEntry[];
    consolidatedColors: string[];
    consolidatedFocusPointColors: string[];
    brushXLabelModifier: LabelModifier;
    domainMax: number = 100;
    domainMin: number = 100;

    readonly yLabelFormatter = (value: number) => Math.abs(value).toString();

    constructor(translationService: TranslationService) {
        super();
        this.brushXLabelModifier =
            getDefaultBrushLabelModifier(translationService);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (!!changes['negativeEntries'] && !!this.negativeEntries) {
            if (this.positiveEntries.length === this.negativeEntries.length) {
                let consolidatedChartEntries = [] as HistogramAreaChartEntry[];
                this.negativeEntries.forEach((negativeEntry, index) => {
                    const positiveEntry = this.positiveEntries[index];
                    if (
                        negativeEntry.date.getTime() ===
                        positiveEntry.date.getTime()
                    ) {
                        const sumOfNegativeEntries = Math.abs(
                            negativeEntry.values.reduce(
                                (accumulator: number, current) =>
                                    (accumulator += current ?? 0),
                                0
                            )
                        );

                        consolidatedChartEntries.push({
                            date: negativeEntry.date,
                            values: [
                                ...negativeEntry.values,
                                sumOfNegativeEntries,
                                ...positiveEntry.values
                            ]
                        });
                    }
                });

                this.consolidatedChartEntries = consolidatedChartEntries;
                this.initializeBrushSelection(
                    this.consolidatedChartEntries,
                    this.brushSelectionStart
                );
            }
            this.domainMin =
                this.getMinValue(this.negativeEntries) - DOMAIN_MIN_MAX_PADDING;
        }
        if (!!changes['positiveEntries'] && !!this.positiveEntries) {
            this.domainMax =
                this.getMaxValue(this.positiveEntries) + DOMAIN_MIN_MAX_PADDING;
        }
        if (!!changes['colors']) {
            this.consolidatedColors = this.insertTransparentInMiddle(
                this.colors
            );
        }
        if (!!changes['focusPointColors']) {
            this.consolidatedFocusPointColors = this.focusPointColors;
        }
    }

    override onBrushUpdated(): void {
        this.filteredConsolidatedChartEntries = this.filterEntriesByBrush(
            this.consolidatedChartEntries
        );
        this.brushChanged.emit({ ...this.brushSelection });
    }

    private getMaxValue(entries: HistogramAreaChartEntry[]): number {
        let max = 0;
        entries.forEach((entry) => {
            const currentMax = entry.values.reduce(
                (accumulator: number, current) => (accumulator += current ?? 0),
                0
            );
            if (currentMax > max) {
                max = currentMax;
            }
        });
        return max;
    }

    private getMinValue(entries: HistogramAreaChartEntry[]): number {
        let min = 0;
        entries.forEach((entry) => {
            const currentMin = entry.values.reduce(
                (accumulator: number, current) => (accumulator += current ?? 0),
                0
            );
            if (currentMin < min) {
                min = currentMin;
            }
        });
        return min;
    }

    private insertTransparentInMiddle(colors: string[]): string[] {
        const middle = Math.round(this.colors.length / 2);
        return [
            ...colors.slice(0, middle),
            'transparent',
            ...colors.slice(middle)
        ];
    }

    emitFocusEntry(
        event: HistogramElFocusEvent<HistogramAreaChartEntry>
    ): void {
        const middleValueIndex = Math.round(event.data.values.length / 2);

        this.elFocus.emit({
            source: event.source,
            histogramComponent: this.viewChild,
            data: {
                date: event.data.date,
                positiveEntries: event.data.values.slice(
                    middleValueIndex,
                    event.data.values.length
                ),
                negativeEntries: event.data.values.slice(0, middleValueIndex)
            }
        });
    }
}
