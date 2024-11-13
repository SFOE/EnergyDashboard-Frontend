import { DateModel } from '../../core/models/base/date.model';
import { nb } from 'date-fns/locale';

interface missingEntriesInfo {
    nbrOfMissingEntries: number;
    lastDate: Date;
}

const calculateEmptyEntries = <T extends DateModel[]>(
    data: T
): missingEntriesInfo => {
    const lastDate: Date = new Date(data[data.length - 1].date);
    const lastMonth: number = lastDate.getMonth();
    const marchMonth: number = 2; // march is the 3rd month -> index 2

    let nbrOfMissingEntries: number = 0;

    // if the last month is not march, calculate the number of missing entries for the current winter
    if (lastMonth !== marchMonth) {
        nbrOfMissingEntries =
            lastMonth > marchMonth
                ? 12 - (lastMonth - marchMonth)
                : marchMonth - lastMonth;
    }

    return { nbrOfMissingEntries, lastDate };
};

export const addExtraEntries = <T extends DateModel>(
    data: T[],
    createNewEntry: (currentDate: Date) => T
): { data: T[]; xTicks: Date[] } => {
    // Initialize xTicks with the first date
    let xTicks: Date[] = [new Date(data[0].date)];

    let dataClone: T[] = [...data];

    for (let i = 0; i < dataClone.length - 1; i++) {
        const currentDate: Date = new Date(dataClone[i].date);
        const nextDate: Date = new Date(dataClone[i + 1].date);

        const monthsDifference: number =
            (nextDate.getFullYear() - currentDate.getFullYear()) * 12 +
            (nextDate.getMonth() - currentDate.getMonth());

        // If months are not consecutive, add an extra entry
        if (monthsDifference !== 1) {
            xTicks.push(nextDate);

            // Create a new entry using the provided createNewEntry function
            const newEntry = createNewEntry(currentDate);

            // Insert the new entry
            dataClone.splice(i + 1, 0, newEntry);

            // Skip over the newly added entry
            i++;
        }
    }

    const { nbrOfMissingEntries, lastDate } = calculateEmptyEntries(dataClone);

    // Add calculated number of empty entries
    for (let i = 0; i < nbrOfMissingEntries; i++) {
        const newDate = new Date(
            lastDate.getFullYear(),
            lastDate.getMonth() + 1 + i,
            16
        );
        dataClone.push(createNewEntry(newDate));
    }

    return { data: dataClone, xTicks };
};
