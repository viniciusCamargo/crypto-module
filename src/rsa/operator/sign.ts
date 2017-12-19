import { Observable } from 'rxjs/Observable';
import { sign as higherOrder } from '../operators'
import { Encoding, Data } from 'node-rsa';

/**
 * New observable operator
 *
 * Signing data
 *
 * @param data {string|number|object|array|Buffer} - data for signing. Object and array will convert to JSON string.
 * @param encoding {string} - optional. Encoding for output result, may be 'buffer', 'binary', 'hex' or 'base64'. Default 'buffer'.
 * @param sourceEncoding {string} - optional. Encoding for given string. Default utf8.
 *
 * @return {Observable<R>}
 */
export function sign<NodeRSA, R>(data: Data | Buffer, encoding?: 'buffer' | Encoding, sourceEncoding?: Encoding): Observable<R> {
    return higherOrder<NodeRSA, R>(data, encoding, sourceEncoding)(this);
}
