import { Observable } from 'rxjs/Observable';
import { sign } from '../../operator';

Observable.prototype.sign = sign;

declare module 'rxjs/Observable' {
    interface Observable<T> {
        sign: typeof sign;
    }
}
