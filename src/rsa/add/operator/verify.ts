import { Observable } from 'rxjs/Observable';
import { verify } from '../../operator';

Observable.prototype.verify = verify;

declare module 'rxjs/Observable' {
    interface Observable<T> {
        verify: typeof verify;
    }
}
