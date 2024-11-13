const LAST_UPDATE_MONTH = 7;

export const getEnergieverbrauchLastUpdateDate = (lastEntryDate: Date) => {
    const updateYear = lastEntryDate.getFullYear() + 1;
    return new Date(updateYear, LAST_UPDATE_MONTH - 1);
};
