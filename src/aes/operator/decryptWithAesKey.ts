import { Observable } from 'rxjs/Observable';
import { decryptWithAesKey as  higherOrder } from '../operators';

/**
 * New observable operator
 *
 * Decrypting data method with aes key
 *
 * @param data {Buffer} - data for decrypting.
 *
 * @return {Observable<Buffer>} Buffer of decrypted data
 */
export function decryptWithAesKey<AESKeyCreationResult>(this: Observable<AESKeyCreationResult>, data: Buffer): Observable<Buffer>  {
    return higherOrder<AESKeyCreationResult>(data)(this);
}
