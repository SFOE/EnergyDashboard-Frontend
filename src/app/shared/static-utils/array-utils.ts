const filterByIndex = <T>(array: T[], indexToFilter: number[]) => {
    return array.filter((_value, index) => indexToFilter.includes(index));
};

const findLastIndex = <T>(array: T[], predicate: (element: T) => boolean) => {
    const maxIndex = array.length - 1;
    const reversedIndex = [...array].reverse().findIndex(predicate);
    return Math.abs(maxIndex - reversedIndex);
};

export const ArrayUtils = {
    filterByIndex,
    findLastIndex
};
