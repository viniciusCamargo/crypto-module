import { Observable } from 'rxjs/Observable';
import { isPrivate as higherOrder } from '../operators'

/**
 * New observable operator
 *
 * Return true if key is private.
 *
 * @return {Observable<boolean>}
 */
export function isPrivate<NodeRSA>(): Observable<boolean> {
    return higherOrder<NodeRSA>()(this);
}
