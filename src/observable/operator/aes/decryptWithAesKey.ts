import { Observable } from 'rxjs/Observable';
import { Operator } from 'rxjs/Operator';
import { Subscriber } from 'rxjs/Subscriber';
import { Buffer } from 'buffer';
import { Decipher, createDecipheriv } from 'crypto';

/**
 * New observable operator
 *
 * Decrypting data method with aes key
 *
 * @param data {Buffer} - data for decrypting.
 *
 * @return {Observable<T>|WebSocketSubject<T>} Buffer of decrypted data
 */
export function decryptWithAesKey<T>(data: Buffer): Observable<T> {
    return this.lift(new DecryptWithAesKeyOperator(this, data));
}

/**
 * Operator class definition
 */
class DecryptWithAesKeyOperator<T> implements Operator<T, T> {
    /**
     * Class constructor
     *
     * @param _source subscriber source
     * @param _data {Buffer} - data for encrypting.
     */
    constructor(private _source: Observable<T>, private _data: Buffer) {
    }

    /**
     * Function calls when operator is executing
     *
     * @param subscriber current subscriber
     * @param source subscriber source
     *
     * @return {AnonymousSubscription|Subscription|Promise<PushSubscription>|TeardownLogic}
     */
    call(subscriber: Subscriber<T>, source: any): any {
        return source.subscribe(new DecryptWithAesKeySubscriber(subscriber, this._source, this._data));
    }
}

/**
 * Operator subscriber class definition
 */
class DecryptWithAesKeySubscriber<T> extends Subscriber<T> {
    /**
     * Class constructor
     *
     * @param destination subscriber destination
     * @param _source subscriber source
     * @param _data {Buffer} - data for encrypting.
     */
    constructor(destination: Subscriber<T>, private _source: Observable<T>, private _data: Buffer) {
        super(destination);
    }

    /**
     * Function to send result to next subscriber
     *
     * @param value result for next subscriber
     *
     * @private
     */
    protected _next(value: T): void {
        this._source.subscribe((aesKey: any) => {
                try {
                    const decipher: Decipher = createDecipheriv('aes-256-cbc', new Buffer(aesKey.key, 'hex'), new Buffer(aesKey.iv, 'hex'));
                    const bufDecrypted: Buffer = decipher.update(new Buffer(this._data));
                    const bufFinal: Buffer = decipher.final();

                    this.destination.next(Buffer.concat([bufDecrypted, bufFinal]));
                    this.destination.complete();
                } catch (e) {
                    this.destination.error(e);
                }
            }
        );
    }
}
