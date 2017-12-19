import { Observable } from 'rxjs/Observable';
import { decryptPrivate as higherOrder } from '../operators'
import { Encoding } from 'node-rsa';

/**
 * New observable operator
 *
 * Decrypting data method with private key
 *
 * @param data {Buffer} - buffer for decrypting
 * @param encoding - encoding for result string, can also take 'json' or 'buffer' for the automatic conversion of this type
 *
 * @return {Observable<R>}
 */
export function decryptPrivate<NodeRSA, R>(data: Buffer | string, encoding?: 'buffer' | Encoding | 'json'): Observable<R> {
    return higherOrder<NodeRSA, R>(data, encoding)(this);
}
