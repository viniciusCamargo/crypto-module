import { Observable } from 'rxjs/Observable';
import { encryptWithAesKey } from '../../operator/aes/encryptWithAesKey';

Observable.prototype.encryptWithAesKey = encryptWithAesKey;

declare module 'rxjs/Observable' {
    interface Observable<T> {
        encryptWithAesKey: typeof encryptWithAesKey;
    }
}
