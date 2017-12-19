import { Observable } from 'rxjs/Observable';
import { isPrivate } from '../../operator';

Observable.prototype.isPrivate = isPrivate;

declare module 'rxjs/Observable' {
    interface Observable<T> {
        isPrivate: typeof isPrivate;
    }
}
