import { isDefined } from '../xternal-helpers/from-c19-commons/utils/is-defined.function';

const ZERO_WIDTH_NBSP = String.fromCharCode(8288);

export function replaceHyphenWithEnDash(
    value: string,
    replaceSpaces?: boolean
): string {
    if (!isDefined(value) || typeof value !== 'string') {
        return value;
    }
    if (replaceSpaces) {
        value = value.replace(/\s/g, '');
    }
    return value.replace(/-/g, `${ZERO_WIDTH_NBSP}–${ZERO_WIDTH_NBSP}`);
}
