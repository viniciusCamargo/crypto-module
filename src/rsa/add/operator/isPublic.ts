import { Observable } from 'rxjs/Observable';
import { isPublic } from '../../operator';

Observable.prototype.isPublic = isPublic;

declare module 'rxjs/Observable' {
    interface Observable<T> {
        isPublic: typeof isPublic;
    }
}
