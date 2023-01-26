import { MonoTypeOperatorFunction } from 'rxjs';
import { filter } from 'rxjs/operators';
import { checkEventTargetFn } from './check-event-target.function';

export function filterEventTarget<T extends UIEvent>(
    target: Element,
    is: boolean = false
): MonoTypeOperatorFunction<T> {
    return filter<T>(checkEventTargetFn(target, is));
}
