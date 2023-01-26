import { Pipe, PipeTransform } from '@angular/core';

const HIGH_COMMA = '\u2019';

@Pipe({
    name: 'thousandComma'
})
export class ThousandCommaPipe implements PipeTransform {
    transform(value: number): string {
        return this.commaSeparateNumber(value);
    }

    private commaSeparateNumber(value: number) {
        // remove sign if negative
        var sign = 1;
        if (value < 0) {
            sign = -1;
            value = -value;
        }

        // trim the number decimal point if it exists
        let num = value.toString().includes('.')
            ? value.toString().split('.')[0]
            : value.toString();

        while (/(\d+)(\d{3})/.test(num.toString())) {
            num = num
                .toString()
                .replace(/(\d+)(\d{3})/, '$1' + HIGH_COMMA + '$2');
        }

        // readd decimal point
        if (value.toString().includes('.')) {
            num = num + '.' + value.toString().split('.')[1];
        }

        return sign < 0 ? '-' + num : num;
    }
}
