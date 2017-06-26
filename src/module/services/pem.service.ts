import { Observable } from 'rxjs';
import { Injectable } from '@hapiness/core';
import * as pem from 'pem';
declare const Buffer;

@Injectable()
export class PemService {

    generatePrivateKey({ length }: any = { length: 2048 }): Observable<string> {
        const createPrivateKey: any = Observable.bindNodeCallback(pem.createPrivateKey);
        return createPrivateKey(length).map(key => key.key);
    }

    getPublicKey(privateKey: string): Observable<string> {
        const getPublicKey: any = Observable.bindNodeCallback(pem.getPublicKey);
        return getPublicKey(privateKey).map(key => key.publicKey);
    }

    generatePair({ length }: any = { length: 2048 }): Observable<any> {
        const privateKeyObs = this.generatePrivateKey({ length });
        return privateKeyObs.flatMap(privateKey => this.getPublicKey(privateKey).map(publicKey => ({
            privateKey, publicKey
        })));
    }

}
