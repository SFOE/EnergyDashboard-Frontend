import { resolveZoneByKey, resolveZoneByValue } from './bidding-zone';

describe('BiddingZone', () => {
    it('should resolve by key', () => {
        const res = resolveZoneByKey('NO1');
        expect(res).toBe('NO_1');
    });

    it('should resolve by value', () => {
        const res = resolveZoneByValue('DK_1');
        expect(res).toBe('DK1');
    });
});
