import { Observable } from 'rxjs/Observable';
import { Operator } from 'rxjs/Operator';
import { Subscriber } from 'rxjs/Subscriber';
import { Encoding } from 'node-rsa';
import { Buffer } from 'buffer';

/**
 * New observable operator
 *
 * Decrypting data method with public key
 *
 * @param data {Buffer} - buffer for decrypting
 * @param encoding - encoding for result string, can also take 'json' or 'buffer' for the automatic conversion of this type
 *
 * @return {Observable<T>|WebSocketSubject<T>}
 */
export function decryptPublic<T>(data: Buffer | string, encoding?: 'buffer' | Encoding | 'json'): Observable<T> {
    return this.lift(new DecryptPublicOperator(this, data, encoding));
}

/**
 * Operator class definition
 */
class DecryptPublicOperator<T> implements Operator<T, T> {
    /**
     * Class constructor
     *
     * @param _source subscriber source
     * @param _data {Buffer} - buffer for decrypting
     * @param _encoding - encoding for result string, can also take 'json' or 'buffer' for the automatic conversion of this type
     */
    constructor(private _source: Observable<T>, private _data: Buffer | string, private _encoding?: 'buffer' | Encoding | 'json') {
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
        return source.subscribe(new DecryptPublicSubscriber(subscriber, this._source, this._data, this._encoding));
    }
}

/**
 * Operator subscriber class definition
 */
class DecryptPublicSubscriber<T> extends Subscriber<T> {
    /**
     * Class constructor
     *
     * @param destination subscriber destination
     * @param _source subscriber source
     * @param _data {Buffer} - buffer for decrypting
     * @param _encoding - encoding for result string, can also take 'json' or 'buffer' for the automatic conversion of this type
     */
    constructor(destination: Subscriber<T>, private _source: Observable<T>,
                private _data: Buffer | string, private _encoding?: 'buffer' | Encoding | 'json') {
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
        this._source.subscribe((nodeRSA) => {
                try {
                    const k = (<any> nodeRSA).decryptPublic(this._data, this._encoding);
                    this.destination.next(k);
                    this.destination.complete();
                } catch (e) {
                    this.destination.error(e);
                }
            }
        );
    }
}
