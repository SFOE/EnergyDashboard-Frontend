import Chance from 'chance';
import { HistogramDetailEntry } from '../shared/diagrams/histogram/histogram-detail/histogram-detail.component';
import { HistogramLineEntry } from '../shared/diagrams/histogram/histogram-line/histogram-line.component';

const chance = new Chance();

const integerOptions = { min: 10, max: 1000 };

export const MockHistogramDetailEntry = () =>
    <HistogramDetailEntry>{
        date: chance.date(),
        barValues: [
            chance.integer(integerOptions),
            chance.integer(integerOptions),
            chance.integer(integerOptions)
        ],
        lineValues: [
            chance.integer(integerOptions),
            chance.integer(integerOptions),
            chance.integer(integerOptions)
        ]
    };

export const MockHistogramLineEntry = (
    options: {
        dateOptions?: Chance.DateOptions;
    } = {}
) =>
    <HistogramLineEntry>{
        date: chance.date(options.dateOptions ?? {}),
        values: [
            chance.integer(integerOptions),
            chance.integer(integerOptions),
            chance.integer(integerOptions)
        ]
    };
