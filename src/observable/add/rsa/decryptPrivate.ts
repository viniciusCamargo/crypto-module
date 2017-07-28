import { Observable } from 'rxjs/Observable';
import { decryptPrivate } from '../../operator/rsa/decryptPrivate';

Observable.prototype.decryptPrivate = decryptPrivate;

declare module 'rxjs/Observable' {
    interface Observable<T> {
        decryptPrivate: typeof decryptPrivate;
    }
}
