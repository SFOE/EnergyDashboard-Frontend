import { NumberUtils } from './number-utils';

describe('roundUpToFive', () => {
    it('should map positive number correctly', () => {
        let expected: number;
        let result: number;

        expected = 5;
        result = NumberUtils.roundUpToFive(1);
        expect(result).toBe(expected);

        expected = 15;
        result = NumberUtils.roundUpToFive(11);
        expect(result).toBe(expected);

        expected = 30;
        result = NumberUtils.roundUpToFive(29);
        expect(result).toBe(expected);
    });
});
