import { Observable } from 'rxjs/Observable';
import { Operator } from 'rxjs/Operator';
import { Subscriber } from 'rxjs/Subscriber';
import { Buffer } from 'buffer';
import { Decipher, createDecipheriv } from 'crypto';
import { AESKeyCreationResult } from '../../..';

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

function higherOrder<AESKeyCreationResult>(data: Buffer): (source: Observable<AESKeyCreationResult>) => Observable<Buffer> {
    return (source: Observable<AESKeyCreationResult>) => <Observable<Buffer>> source.lift(new DecryptWithAesKeyOperator(data));
}

/**
 * Operator class definition
 */
class DecryptWithAesKeyOperator<R> implements Operator<AESKeyCreationResult, R> {
    /**
     * Class constructor
     *
     * @param _data {Buffer} - data for encrypting.
     */
    constructor(private _data: Buffer) {
    }

    /**
     * Function calls when operator is executing
     *
     * @param subscriber current subscriber
     * @param source subscriber source
     *
     * @return {AnonymousSubscription|Subscription|Promise<PushSubscription>|TeardownLogic}
     */
    call(subscriber: Subscriber<R>, source: Observable<AESKeyCreationResult>): any {
        return source.subscribe(new DecryptWithAesKeySubscriber(subscriber, this._data));
    }
}

/**
 * Operator subscriber class definition
 */
class DecryptWithAesKeySubscriber<R> extends Subscriber<AESKeyCreationResult> {
    /**
     * Class constructor
     *
     * @param destination subscriber destination
     * @param _data {Buffer} - data for encrypting.
     */
    constructor(destination: Subscriber<R>, private _data: Buffer) {
        super(destination);
    }

    /**
     * Function to send result to next subscriber
     *
     * @param aesKey key from previous subscriber
     *
     * @private
     */
    protected _next(aesKey: AESKeyCreationResult): void {
        try {
            const decipher: Decipher = createDecipheriv('aes-256-cbc', Buffer.from(aesKey.key, 'hex'), Buffer.from(aesKey.iv, 'hex'));
            const bufDecrypted: Buffer = decipher.update(Buffer.from(this._data));
            const bufFinal: Buffer = decipher.final();

            this.destination.next(Buffer.concat([bufDecrypted, bufFinal]));
            this.destination.complete();
        } catch (e) {
            this.destination.error(e);
        }
    }
}
