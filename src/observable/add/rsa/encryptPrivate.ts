import { Observable } from 'rxjs/Observable';
import { encryptPrivate } from '../../operator/rsa/encryptPrivate';

Observable.prototype.encryptPrivate = encryptPrivate;

declare module 'rxjs/Observable' {
    interface Observable<T> {
        encryptPrivate: typeof encryptPrivate;
    }
}
