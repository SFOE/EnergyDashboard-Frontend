import { DateModel } from '../../core/models/base/date.model';

export const createDateMappingFunctions = (
    originalToAdjustedMap: Map<string, Date>,
    adjustedToOriginalMap: Map<string, Date>
) => {
    const adjustDatesWithMapping = <T extends DateModel>(data: T[]): T[] => {
        let currentDate: Date = new Date('2019-01-01');

        return data.map((entry: T) => {
            const adjustedDate: Date = new Date(currentDate);
            currentDate.setMonth(currentDate.getMonth() + 1);

            originalToAdjustedMap.set(
                new Date(entry.date).toISOString(),
                adjustedDate
            );
            adjustedToOriginalMap.set(
                adjustedDate.toISOString(),
                new Date(entry.date)
            );

            return {
                ...entry,
                date: adjustedDate
            };
        });
    };

    const getAdjustedDate = (originalDate: Date): Date => {
        const adjustedDate: Date | undefined = originalToAdjustedMap.get(
            originalDate.toISOString()
        );
        return adjustedDate !== undefined ? adjustedDate : originalDate;
    };

    const getOriginalDate = (adjustedDate: Date): Date => {
        const originalDate: Date | undefined = adjustedToOriginalMap.get(
            adjustedDate.toISOString()
        );
        return originalDate !== undefined ? originalDate : adjustedDate;
    };

    return {
        adjustDatesWithMapping,
        getAdjustedDate,
        getOriginalDate
    };
};
