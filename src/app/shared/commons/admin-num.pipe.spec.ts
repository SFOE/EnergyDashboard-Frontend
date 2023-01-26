import { AdminNumPipe } from './admin-num.pipe';

describe('admin-num.pip', () => {
    let pipe: AdminNumPipe;
    beforeEach(() => (pipe = new AdminNumPipe()));

    it('should transform', () => {
        expect(pipe.transform(50000)).toBe('50 000');
    });
    it('should handle only toFixed arg', () => {
        expect(pipe.transform(50000, 2)).toBe('50 000,00');
    });
    it('should handle only suffix arg', () => {
        expect(pipe.transform(50, '%')).toBe('50%');
    });
    it('should handle toFixed AND suffix args', () => {
        expect(pipe.transform(50, 2, '%')).toBe('50,00%');
    });
});
