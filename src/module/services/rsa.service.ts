import { Observable } from 'rxjs';
import { Injectable } from '@hapiness/core';
import * as NodeRsa from 'node-rsa';
import { Buffer } from 'buffer';

export interface RsaEncryptArguments {
    key: string;
    input: string|Buffer;
    format?: string;
    options?: any;
};

export interface RsaDecryptArguments {
    key: string;
    input: string|Buffer;
    source_encoding?: string;
};

@Injectable()
export class RsaService {

    private _allowedEncodings;

    constructor() {
        this._allowedEncodings = ['utf8', 'base64', 'hex', 'binary'];
    }

    encrypt({ key, input, format, options }: RsaEncryptArguments): Buffer {
        if (typeof key !== 'string' || !key) {
            throw new Error('Invalid key');
        }

        const _key = new NodeRsa(key, format, options);
        const encrypted = _key.encrypt(input, 'buffer');
        return encrypted;
    }

    decrypt({ key, input, source_encoding }: RsaDecryptArguments = { key: null, input: null, source_encoding: 'utf8' }): Buffer {
        if (typeof key !== 'string' || !key) {
            throw new Error('Invalid key');
        }

        let _input;
        if (typeof input === 'string') {
            if (typeof source_encoding !== 'string' || !source_encoding) {
                throw new Error('Invalid source encoding');
            }

            if (!this._allowedEncodings.includes(source_encoding)) {
                throw new Error(`Source encoding must be one of the following:
 "${this._allowedEncodings.join(',')}", Provided: "${source_encoding}"`.replace(/\n/g, ''));
            }

            _input = Buffer.from(input, source_encoding);
        } else if (typeof input === 'object' && input instanceof Buffer) {
            _input = input;
        } else {
            throw new Error('Invalid input');
        }

        const _key = new NodeRsa(key);

        const decrypted = _key.decrypt(_input, 'buffer', source_encoding);
        return decrypted;
    }

}
