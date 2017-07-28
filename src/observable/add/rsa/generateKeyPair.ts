import { Observable } from 'rxjs/Observable';
import { generateKeyPair } from '../../operator/rsa/generateKeyPair';

Observable.prototype.generateKeyPair = generateKeyPair;

declare module 'rxjs/Observable' {
    interface Observable<T> {
        generateKeyPair: typeof generateKeyPair;
    }
}
