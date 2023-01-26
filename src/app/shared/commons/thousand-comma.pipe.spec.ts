import { ThousandCommaPipe } from './thousand-comma.pipe';

const HIGH_COMMA = '\u2019';

describe('thousand-comma.pipe', () => {
    let pipe: ThousandCommaPipe;

    beforeEach(() => (pipe = new ThousandCommaPipe()));

    it('should transform', () => {
        expect(pipe.transform(100000)).toBe(`100${HIGH_COMMA}000`);
    });

    it('should transform longer number', () => {
        expect(pipe.transform(100000000000)).toBe(
            `100${HIGH_COMMA}000${HIGH_COMMA}000${HIGH_COMMA}000`
        );
    });

    it('should transform number with decimal', () => {
        expect(pipe.transform(1000.1111)).toBe(`1${HIGH_COMMA}000.1111`);
    });

    it('should transform negative number', () => {
        expect(pipe.transform(-100000)).toBe(`-100${HIGH_COMMA}000`);
    });
});
