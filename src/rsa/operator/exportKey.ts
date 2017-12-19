import { Observable } from 'rxjs/Observable';
import { exportKey as higherOrder } from '../operators'
import { Format, Key } from 'node-rsa';

/**
 * New observable operator
 *
 * Export key to PEM string, PEM/DER Buffer or components.
 *
 * @param format key format
 *
 * @return {Observable<Key>}
 */
export function exportKey<NodeRSA>(format?: Format): Observable<Key> {
    return higherOrder<NodeRSA>(format)(this);
}
