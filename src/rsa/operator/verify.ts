import { Observable } from 'rxjs/Observable';
import { verify as higherOrder } from '../operators'
import { Encoding, Data } from 'node-rsa';

/**
 * New observable operator
 *
 * Verifying signed data
 *
 * @param data {string|number|object|array|Buffer} - signed data.
 * @param signature {string|Buffer} - signature from sign method.
 * @param sourceEncoding {string} - optional. Encoding for given string. Default utf8.
 * @param signatureEncoding {string} - optional. Encoding of given signature.
 *          May be 'buffer', 'binary', 'hex' or 'base64'. Default 'buffer'.
 *
 * @return {Observable<R>}
 */
export function verify<NodeRSA, R>(data: Data | Buffer, signature: string | Buffer,
                          sourceEncoding?: Encoding, signatureEncoding?: Encoding): Observable<R> {
    return higherOrder<NodeRSA, R>(data, signature, sourceEncoding, signatureEncoding)(this);
}
