import { Observable } from 'rxjs/Observable';
import { encryptPublic } from '../../operator';

Observable.prototype.encryptPublic = encryptPublic;

declare module 'rxjs/Observable' {
    interface Observable<T> {
        encryptPublic: typeof encryptPublic;
    }
}
