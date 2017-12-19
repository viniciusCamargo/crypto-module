import { Observable } from 'rxjs/Observable';
import { isEmptyKey as higherOrder } from '../operators'

/**
 * New observable operator
 *
 * Return true if key pair doesn't have any data.
 *
 * @return {Observable<boolean>}
 */
export function isEmptyKey<NodeRSA>(): Observable<boolean> {
    return higherOrder<NodeRSA>()(this);
}
