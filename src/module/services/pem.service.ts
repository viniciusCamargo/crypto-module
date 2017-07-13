import { Observable } from 'rxjs';
import { Injectable } from '@hapiness/core';
import * as pem from 'pem';
declare const Buffer;

export interface Pair {
    privateKey: string;
    publicKey: string;
};

export interface GeneratePemKeyArguments {
    length?: number;
};

@Injectable()
export class PemService {

    generatePrivateKey({ length }: GeneratePemKeyArguments = { length: 2048 }): Observable<string> {
        const createPrivateKey: any = Observable.bindNodeCallback(pem.createPrivateKey);
        return createPrivateKey(length).map(key => key.key);
    }

    getPublicKey(privateKey: string): Observable<string> {
        const getPublicKey: any = Observable.bindNodeCallback(pem.getPublicKey);
        return getPublicKey(privateKey).map(key => key.publicKey);
    }

    generatePair({ length }: GeneratePemKeyArguments = { length: 2048 }): Observable<Pair> {
        const privateKeyObs = this.generatePrivateKey({ length });
        return privateKeyObs.flatMap(privateKey => this.getPublicKey(privateKey).map(publicKey => ({
            privateKey, publicKey
        })));
    }

}
