import { Observable } from 'rxjs/Observable';
import { isEmptyKey } from '../../operator';

Observable.prototype.isEmptyKey = isEmptyKey;

declare module 'rxjs/Observable' {
    interface Observable<T> {
        isEmptyKey: typeof isEmptyKey;
    }
}
