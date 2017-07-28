import { Observable } from 'rxjs/Observable';
import { decryptWithAesKey } from '../../operator/aes/decryptWithAesKey';

Observable.prototype.decryptWithAesKey = decryptWithAesKey;

declare module 'rxjs/Observable' {
    interface Observable<T> {
        decryptWithAesKey: typeof decryptWithAesKey;
    }
}
