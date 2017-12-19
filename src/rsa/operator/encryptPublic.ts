import { Observable } from 'rxjs/Observable';
import { encryptPublic as higherOrder } from '../operators'
import { Encoding, Data } from 'node-rsa';

/**
 * New observable operator
 *
 * Encrypting data method with public key
 *
 * @param data {string|number|object|array|Buffer} - data for encrypting. Object and array will convert to JSON string.
 * @param encoding {string} - optional. Encoding for output result, may be 'buffer', 'binary', 'hex' or 'base64'. Default 'buffer'.
 * @param sourceEncoding {string} - optional. Encoding for given string. Default utf8.
 *
 * @return {Observable<R>}
 */
export function encryptPublic<NodeRSA, R>(data: Data | Buffer, encoding?: 'buffer' | Encoding, sourceEncoding?: Encoding): Observable<R> {
    return higherOrder<NodeRSA, R>(data, encoding, sourceEncoding)(this);
}
