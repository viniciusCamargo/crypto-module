import { Observable } from 'rxjs/Observable';
import { encryptWithAesKey as  higherOrder } from '../operators';

/**
 * New observable operator
 *
 * Encrypting data method with aes key
 *
 * @param data {Buffer} - data for encrypting.
 *
 * @return {Observable<Buffer>} Buffer of encrypted data
 */
export function encryptWithAesKey<AESKeyCreationResult>(data: Buffer): Observable<Buffer> {
    return higherOrder<AESKeyCreationResult>(data)(this);
}
