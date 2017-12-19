import { Injectable } from '@hapiness/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { HashService } from './hash.service';

/**
 * AES key definition
 */
export interface AESKeyCreationResult {
    key: string;
    iv: string;
}

@Injectable()
export class AESService {
    /**
     * Class constructor
     *
     * @param {HashService} _hashService injected service
     */
    constructor(private _hashService: HashService) {}

    /**
     * Creates RSA-SHA256 AES key for given password and salt
     *
     * @param {string | Buffer} password for AES key
     * @param {string | Buffer} salt for AES key
     *
     * @return {Observable<AESKeyCreationResult>} {key, iv} used to encrypt and decrypt data
     */
    createKey(password: string | Buffer, salt: string | Buffer): Observable<AESKeyCreationResult> {
        // generate derivedKey for this password and salt
        return this._hashService.generate(password, salt, 4096, 48, 'sha256')
            .pipe(
                map((derivedKey: Buffer) => {
                    // clone buffer
                    const keyBuffer = Buffer.from(derivedKey);

                    // get aes256 key
                    const key = keyBuffer.slice(0, 32).toString('hex');

                    // get aes256 iv
                    const iv = derivedKey.slice(32).toString('hex');

                    return { key, iv };
                })
            );
    }
}
