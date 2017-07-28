import { Observable } from 'rxjs/Observable';
import { encryptPublic } from '../../operator/rsa/encryptPublic';

Observable.prototype.encryptPublic = encryptPublic;

declare module 'rxjs/Observable' {
    interface Observable<T> {
        encryptPublic: typeof encryptPublic;
    }
}
