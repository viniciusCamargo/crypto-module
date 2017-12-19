import { Observable } from 'rxjs/Observable';
import { exportKey } from '../../operator';

Observable.prototype.exportKey = exportKey;

declare module 'rxjs/Observable' {
    interface Observable<T> {
        exportKey: typeof exportKey;
    }
}
