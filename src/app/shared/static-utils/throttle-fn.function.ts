// tslint:disable:only-arrow-functions

/**
 * throttle provided function by given timeout
 * -- all arguments are passed through
 */
export function throttleFn<FN extends (...args: any[]) => void, R>(
    fn: FN,
    timeout: number
): FN {
    let throttle = false;

    return <FN>function () {
        if (throttle) {
            return;
        } else {
            throttle = true;
            setTimeout(() => {
                throttle = false;
            }, timeout);
            fn(...arguments);
        }
    };
}
