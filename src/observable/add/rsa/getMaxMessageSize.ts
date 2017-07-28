import { Observable } from 'rxjs/Observable';
import { getMaxMessageSize } from '../../operator/rsa/getMaxMessageSize';

Observable.prototype.getMaxMessageSize = getMaxMessageSize;

declare module 'rxjs/Observable' {
    interface Observable<T> {
        getMaxMessageSize: typeof getMaxMessageSize;
    }
}
