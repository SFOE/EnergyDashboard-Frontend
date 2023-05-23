const filterByIndex = <T>(array: T[], indexToFilter: number[]) => {
    return array.filter((_value, index) => indexToFilter.includes(index));
};

const findLastIndex = <T>(array: T[], predicate: (element: T) => boolean) => {
    const maxIndex = array.length - 1;
    const reversedIndex = [...array].reverse().findIndex(predicate);
    return Math.abs(maxIndex - reversedIndex);
};

const range = (start: number, end: number) => {
    const length = end - start;
    return Array.from({ length }, (_, i) => start + i);
};

const sumUp = (arr: Array<number | null | undefined>): number =>
    arr.reduce((accumulator: number, current) => {
        const valueToAdd: number = current ?? 0;
        return accumulator + valueToAdd;
    }, 0);

export const ArrayUtils = {
    filterByIndex,
    findLastIndex,
    range,
    sumUp
};
