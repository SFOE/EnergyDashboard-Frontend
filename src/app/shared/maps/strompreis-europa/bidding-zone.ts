export enum BiddingZone {
    DK_1 = 'DK1',
    DK_2 = 'DK2',
    NO_1 = 'NO1',
    NO_2 = 'NO2',
    NO_3 = 'NO3',
    NO_4 = 'NO4',
    NO_5 = 'NO5',
    SE_1 = 'SE1',
    SE_2 = 'SE2',
    SE_3 = 'SE3',
    SE_4 = 'SE4'
}

export function resolveZoneByKey(zone: string): string {
    let res = zone.toLocaleUpperCase();
    const z = Object.entries(BiddingZone).find(([_, val]) => val === res);

    if (z) {
        res = z[0];
    }

    return res;
}

export function resolveZoneByValue(zone: string): string {
    let res = zone.toLocaleUpperCase();
    const z = Object.entries(BiddingZone).find(([key, _]) => key === res);

    if (z) {
        res = z[1];
    }

    return res;
}
