import { Observable } from 'rxjs';
import { Injectable } from '@hapiness/core';
import * as crypto from 'crypto';
declare const Buffer;

export interface GenerateKeyArguments {
    password: string;
    salt: string;
    iterations?: number;
    keylen?: number;
    digest?: string;
};

export interface AesKey {
    key: string;
    iv: string;
};

@Injectable()
export class AesService {

    _getAesKey(opts: any): Observable<AesKey> {
        const { aesKey, password, salt } = Object.assign({ password: null, salt: null }, opts);
        if (!aesKey && password && salt) {
            return this.generateKey({ password, salt });
        } else {
            return Observable.create(observer => observer.next(aesKey));
        }
    }

    encrypt(opts: any): Observable<any> {
        const { input, aesKey, algorithm, password, salt } =
            Object.assign({ input: null, aesKey: null, algorithm: 'aes-256-cbc', password: null, salt: null }, opts);

        return this._getAesKey({ aesKey, password, salt }).map(_aesKey => {
            const cipher = crypto.createCipheriv(algorithm, _aesKey.key, _aesKey.iv);
            const bufEncrypted = cipher.update(input);
            const bufFinal = cipher.final();

            // check if we have extra content
            if (bufFinal) {
                return Buffer.concat([bufEncrypted, bufFinal]);
            } else {
                return bufEncrypted;
            }
        });
    }

    decrypt(opts: any): Observable<any> {
        const { input, aesKey, algorithm, password, salt } =
            Object.assign({ input: null, aesKey: null, algorithm: 'aes-256-cbc', password: null, salt: null }, opts);

        return this._getAesKey({ aesKey, password, salt }).map(_aesKey => {
            const cipher = crypto.createDecipheriv(algorithm, _aesKey.key, _aesKey.iv);
            const bufDecrypted = cipher.update(input, 'binary');
            const bufFinal = cipher.final();

            if (bufFinal) {
                return Buffer.concat([bufDecrypted, bufFinal]);
            } else {
                return bufDecrypted;
            }
        });
    }

    generateKey(opts: GenerateKeyArguments): Observable<any> {
      const { password, salt, iterations, keylen, digest } =
      Object.assign({ password: null, salt: null, iterations: 4096, keylen: 24, digest: 'sha256' }, opts);
      const pbkdf2: any = Observable.bindNodeCallback(crypto.pbkdf2);
      const gen = pbkdf2(password, salt, iterations, keylen, digest);
      return gen.map(keyBuffer => {
          const key = keyBuffer.toString('hex').slice(0, 32).toString('hex');
          const iv = keyBuffer.toString('hex').slice(32).toString('hex');
          return { key, iv };
      });
    }

}
