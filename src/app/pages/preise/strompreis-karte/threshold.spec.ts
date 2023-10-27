import { Threshold, calcThresholds } from './threshold.model';

describe('Threshold', () => {
    it('calculate thresholds in range', () => {
        var colors = ['green', 'blue', 'yellow', 'orange', 'red'];
        const res = calcThresholds(0, 100, colors);

        expect(res.length).toBe(colors.length);
        expect(res[0]).toEqual<Threshold>({ color: colors[0], value: 20 });
        expect(res[1]).toEqual<Threshold>({ color: colors[1], value: 40 });
        expect(res[2]).toEqual<Threshold>({ color: colors[2], value: 60 });
        expect(res[3]).toEqual<Threshold>({ color: colors[3], value: 80 });
        expect(res[4]).toEqual<Threshold>({ color: colors[4], value: 100 });
    });

    it('calculate thresholds in range - with floating numbers', () => {
        var colors = ['green', 'blue', 'yellow', 'orange', 'red'];
        const res = calcThresholds(10.5, 50.5, colors);

        expect(res.length).toBe(colors.length);
        expect(res[0]).toEqual<Threshold>({ color: colors[0], value: 18.5 });
        expect(res[1]).toEqual<Threshold>({ color: colors[1], value: 26.5 });
        expect(res[2]).toEqual<Threshold>({ color: colors[2], value: 34.5 });
        expect(res[3]).toEqual<Threshold>({ color: colors[3], value: 42.5 });
        expect(res[4]).toEqual<Threshold>({ color: colors[4], value: 50.5 });
    });

    it('round and cut values after the second decimal place', () => {
        var colors = ['green'];
        const res = calcThresholds(10.1111111111, 50.55555555555, colors);

        expect(res.length).toBe(colors.length);
        expect(res[0]).toEqual<Threshold>({ color: colors[0], value: 50.56 });
    });
});
