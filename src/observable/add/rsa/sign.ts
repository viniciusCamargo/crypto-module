import { Observable } from 'rxjs/Observable';
import { sign } from '../../operator/rsa/sign';

Observable.prototype.sign = sign;

declare module 'rxjs/Observable' {
    interface Observable<T> {
        sign: typeof sign;
    }
}
