import { Observable } from 'rxjs/Observable';
import { importKey as higherOrder } from '../operators'
import { Key, Format } from 'node-rsa';

/**
 * New observable operator
 *
 * Import key from PEM string, PEM/DER Buffer or components.
 *
 * @param key key from PEM string, PEM/DER Buffer or components
 * @param format key format
 *
 * @return {Observable<NodeRSA>}
 */
export function importKey<NodeRSA>(key: Key, format?: Format): Observable<NodeRSA> {
    return higherOrder<NodeRSA>(key, format)(this);
}
