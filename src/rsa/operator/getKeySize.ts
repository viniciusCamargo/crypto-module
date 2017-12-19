import { Observable } from 'rxjs/Observable';
import { getKeySize as higherOrder } from '../operators'

/**
 * New observable operator
 *
 * Return key size in bits.
 *
 * @return {Observable<number>}
 */
export function getKeySize<NodeRSA>(): Observable<number> {
    return higherOrder<NodeRSA>()(this);
}
