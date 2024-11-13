import { TranslationService } from 'src/app/core/i18n/translation.service';
import {
    BrushSelectionConfig,
    DateSpanSelection
} from 'src/app/shared/diagrams/histogram/base-histogram.component';
import {
    HistogramEntry,
    LabelModifier
} from 'src/app/shared/diagrams/histogram/base-histogram.model';
import {
    LabelFilters,
    LabelFormatters
} from 'src/app/shared/diagrams/label.utils';

const DEFAULT_BRUSH: DateSpanSelection = {
    start: new Date(0),
    end: new Date()
};

export const getDefaultBrushLabelModifier = (
    translationService: TranslationService
): LabelModifier => {
    return {
        formatter: LabelFormatters.yearFull(translationService.language),
        filter: LabelFilters.january({
            excludeFirst: true,
            excludeLast: true
        })
    };
};

export abstract class BrushSelectionComponent {
    readonly brushSelection: DateSpanSelection = { ...DEFAULT_BRUSH };
    readonly brushSelectionConfig: BrushSelectionConfig = {
        minDifferenceInDays: 14
    };
    readonly brushDefaultMargins = {
        top: 0,
        right: 15,
        left: 15,
        bottom: 20
    };
    readonly brushDefaultHeight = 80;

    constructor() {}

    /** Callback for when the brush selection was updated. */
    onBrushUpdated() {}

    updateBrushSelection(dateSpan: DateSpanSelection) {
        this.brushSelection.start = dateSpan.start;
        this.brushSelection.end = dateSpan.end;
        this.onBrushUpdated();
    }

    initializeBrushSelection<E extends HistogramEntry>(
        entries: E[],
        startDate?: Date,
        endDate?: Date
    ) {
        const dates = entries
            .map(({ date }) => date)
            .sort((a, b) => a.getTime() - b.getTime());
        const minDate = dates.at(0)!;
        const maxDate = dates.at(-1)!;
        const brush: DateSpanSelection = {
            start: startDate ?? minDate,
            end: endDate ?? maxDate
        };
        this.updateBrushSelection(brush);
    }

    filterEntriesByBrush<E extends HistogramEntry>(entries: E[]) {
        return entries.filter(
            ({ date }) =>
                this.brushSelection.start <= date &&
                this.brushSelection.end >= date
        );
    }
}
