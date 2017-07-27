import { Observable } from 'rxjs/Observable';
import { getKeySize } from '../../operator/rsa/getKeySize';

Observable.prototype.getKeySize = getKeySize;

declare module 'rxjs/Observable' {
    interface Observable<T> {
        getKeySize: typeof getKeySize;
    }
}
