import { Pipe, PipeTransform } from '@angular/core';
// import { isDefined } from '@c19/commons'
import { isDefined } from '../xternal-helpers/from-c19-commons/utils/is-defined.function';

@Pipe({ name: 'isDefined', pure: true })
export class IsDefinedPipe implements PipeTransform {
    transform<T>(value: T | undefined | null): value is T {
        return isDefined(value);
    }
}
