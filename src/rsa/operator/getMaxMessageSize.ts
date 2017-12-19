import { Observable } from 'rxjs/Observable';
import { getMaxMessageSize as higherOrder } from '../operators'

/**
 * New observable operator
 *
 * Return max data size for encrypt in bytes.
 *
 * @return {Observable<number>}
 */
export function getMaxMessageSize<NodeRSA>(): Observable<number> {
    return higherOrder<NodeRSA>()(this);
}
