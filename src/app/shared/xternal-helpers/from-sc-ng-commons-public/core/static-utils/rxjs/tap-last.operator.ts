// tslint:disable:max-classes-per-file
import {
    MonoTypeOperatorFunction,
    Observable,
    Operator,
    Subscriber,
    TeardownLogic
} from 'rxjs';

/**
 * SIMPLE tapLast operator. Executes the callback with the last emitted value before complete.
 */
export function tapLast<T>(
    callback: (val: T) => void
): MonoTypeOperatorFunction<T> {
    return function tapLatOperatorFunction(
        source: Observable<T>
    ): Observable<T> {
        return source.lift(new TapLastOperator(callback));
    };
}

class TapLastOperator<T> implements Operator<T, T> {
    constructor(private callback: (val: T) => void) {}

    call(subscriber: Subscriber<T>, source: any): TeardownLogic {
        return source.subscribe(
            new TapLastSubscriber(subscriber, this.callback)
        );
    }
}

class TapLastSubscriber<T> extends Subscriber<T> {
    private hasValue = false;
    private value: T;

    constructor(
        destination: Subscriber<T>,
        private callback: (val: T) => void
    ) {
        super(destination);
    }

    protected override _next(value: T): void {
        this.hasValue = true;
        this.value = value;
        // @ts-ignore
        this.destination.next(value);
    }

    protected override _complete(): void {
        if (this.hasValue) {
            try {
                this.callback(this.value);
            } catch (err) {
                // @ts-ignore
                this.destination.error(err);
                return;
            }
        }
        // @ts-ignore
        return this.destination.complete();
    }
}
