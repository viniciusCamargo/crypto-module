import { Observable } from 'rxjs/Observable';
import { generateKeyPair as higherOrder } from '../operators'

/**
 * New observable operator
 *
 * @param bits Key size in bits. 2048 by default.
 * @param exponent public exponent. 65537 by default.
 *
 * @return {Observable<NodeRSA>}
 */
export function generateKeyPair<NodeRSA>(bits?: number, exponent?: number): Observable<NodeRSA> {
    return higherOrder<NodeRSA>(bits, exponent)(this);
}
