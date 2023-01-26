import { defer, MonoTypeOperatorFunction, Observable, throwError } from 'rxjs';

/**
 * the provided function is executed once the the observable is subscribed
 */
export function setup<T>(callbackFn: () => void): MonoTypeOperatorFunction<T> {
    return (source: Observable<T>) =>
        defer(() => {
            try {
                callbackFn();
            } catch (err) {
                return throwError(err);
            }
            return source;
        });
}
