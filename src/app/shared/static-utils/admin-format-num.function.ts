// import { isDefined } from '@c19/commons'
import { isDefined } from '../xternal-helpers/from-c19-commons/utils/is-defined.function';

// the actual minus sign (− which is longer) than the normal hyphen
export const MINUS_SIGN = '−';
export const PLUS_SIGN = '+';

/**
 * format numbers according to admin.ch
 * @param val number or null
 * @param toFixed adds zero to achieve the set decimal length
 * @param suffix will only be added if number is actually defined
 * @param forceSign prefix with + when positive
 * @returns formatted number or - if null
 */
export function adminFormatNum(
    val: number | null | undefined,
    toFixed?: number,
    suffix: string = '',
    forceSign = false
): string {
    if (typeof val !== 'number') {
        return '-';
    }
    const regexRes =
        /^-?(\d+)\.?(\d+)?$/.exec(
            isDefined(toFixed) ? val.toFixed(toFixed) : val.toString()
        ) || [];
    const int = regexRes[1];
    let p0: string;
    // thousand split only if min 5 digits (>=10 000)
    if (int.length > 4) {
        // r = amount digits at the start which is not a complete group-of-3
        const r = int.length % 3;
        const intParts = int.slice(r, int.length).match(/.{3}/g) || [];
        if (r) {
            // @ts-ignore
            intParts.unshift(int.slice(0, r));
        }
        p0 = intParts.join(' ');
    } else {
        p0 = int;
    }
    // regexRes[2] is the decimal part
    const num = regexRes[2] ? `${p0},${regexRes[2]}` : p0;

    return `${
        val < 0 ? MINUS_SIGN : forceSign && val > 0 ? PLUS_SIGN : ''
    }${num}${suffix}`;
}
