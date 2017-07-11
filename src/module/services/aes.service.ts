import { Observable } from 'rxjs';
import { Injectable } from '@hapiness/core';
import * as crypto from 'crypto';
import { Buffer } from 'buffer';

export interface AesKeyArgument {
    password: string;
    salt: string;
};

export interface GenerateKeyArguments {
    password: string;
    salt: string;
};

export interface EncryptArguments {
    input: Buffer|string;
    aesKey?: AesKeyArgument;
    password?: string;
    salt?: string;
};

export interface DecryptArguments {
    input: Buffer|string;
    aesKey?: AesKeyArgument;
    password?: string;
    salt?: string;
};

export interface AesKey {
    key: string;
    iv: string;
};

export interface GetAesKeyArguments {
    aesKey?: AesKey;
    password?: string;
    salt?: string;
};

@Injectable()
export class AesService {

    private _algorithm: 'aes-256-cbc';

    constructor() {
        this._algorithm = 'aes-256-cbc';
    }

    private _getAesKey(opts: GetAesKeyArguments): Observable<AesKey> {
        const { aesKey, password, salt } = Object.assign({ password: null, salt: null }, opts);
        if (!aesKey) {
            return this.generateKey({ password, salt });
        } else {
            return Observable.create(observer => observer.next(aesKey));
        }
    }

    encrypt(opts: EncryptArguments): Observable<Buffer> {
        const { input, aesKey, password, salt } =
            Object.assign({ input: null, aesKey: null, password: null, salt: null }, opts);

        return this._getAesKey({ aesKey, password, salt }).map(_aesKey => {
            const cipher = crypto.createCipheriv(this._algorithm, _aesKey.key, _aesKey.iv);
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

    decrypt(opts: DecryptArguments): Observable<Buffer> {
        const { input, aesKey, password, salt } =
            Object.assign({ input: null, aesKey: null, password: null, salt: null }, opts);

        return this._getAesKey({ aesKey, password, salt }).map(_aesKey => {
            const cipher = crypto.createDecipheriv(this._algorithm, _aesKey.key, _aesKey.iv);
            const bufDecrypted = cipher.update(input, 'binary');
            const bufFinal = cipher.final();

            if (bufFinal) {
                return Buffer.concat([bufDecrypted, bufFinal]);
            } else {
                return bufDecrypted;
            }
        });
    }

    generateKey(opts: GenerateKeyArguments): Observable<AesKey> {
        const { password, salt } = Object.assign({ password: null, salt: null }, opts);

        if (typeof password !== 'string' || !password) {
            throw new Error('Missing aes password');
        }

        if (typeof salt !== 'string' || !salt) {
            throw new Error('Missing aes salt');
        }

        const iterations = 4096;
        const keylen = 24;
        const digest = 'sha256';
        const pbkdf2: any = Observable.bindNodeCallback(crypto.pbkdf2);
        const gen = pbkdf2(password, salt, iterations, keylen, digest);
        return gen.map(keyBuffer => {
            const key = keyBuffer.toString('hex').slice(0, 32).toString('hex');
            const iv = keyBuffer.toString('hex').slice(32).toString('hex');
            return { key, iv };
        });
    }

}
