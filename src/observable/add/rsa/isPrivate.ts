import { Observable } from 'rxjs/Observable';
import { isPrivate } from '../../operator/rsa/isPrivate';

Observable.prototype.isPrivate = isPrivate;

declare module 'rxjs/Observable' {
    interface Observable<T> {
        isPrivate: typeof isPrivate;
    }
}
