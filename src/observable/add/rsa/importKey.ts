import { Observable } from 'rxjs/Observable';
import { importKey } from '../../operator/rsa/importKey';

Observable.prototype.importKey = importKey;

declare module 'rxjs/Observable' {
    interface Observable<T> {
        importKey: typeof importKey;
    }
}
