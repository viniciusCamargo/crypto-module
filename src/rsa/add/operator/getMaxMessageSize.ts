import { Observable } from 'rxjs/Observable';
import { getMaxMessageSize } from '../../operator';

Observable.prototype.getMaxMessageSize = getMaxMessageSize;

declare module 'rxjs/Observable' {
    interface Observable<T> {
        getMaxMessageSize: typeof getMaxMessageSize;
    }
}
