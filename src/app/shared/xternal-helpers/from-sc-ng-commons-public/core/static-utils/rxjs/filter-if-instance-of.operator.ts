import { OperatorFunction } from 'rxjs';
import { filter } from 'rxjs/operators';

export type Newable<T> = new (...args: any[]) => T;

export function filterIfInstanceOf<A, I extends A>(
    clazz: Newable<I>
): OperatorFunction<A, I> {
    return <any>filter<A>((obj) => obj instanceof clazz);
}
