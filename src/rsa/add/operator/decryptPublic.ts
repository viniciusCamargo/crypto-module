import { Observable } from 'rxjs/Observable';
import { decryptPublic } from '../../operator';

Observable.prototype.decryptPublic = decryptPublic;

declare module 'rxjs/Observable' {
    interface Observable<T> {
        decryptPublic: typeof decryptPublic;
    }
}
