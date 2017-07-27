import { Observable } from 'rxjs/Observable';
import { Operator } from 'rxjs/Operator';
import { Subscriber } from 'rxjs/Subscriber';
import { Encoding, Data } from 'node-rsa';
import { Buffer } from 'buffer';

/**
 * New observable operator
 *
 * Encrypting data method with public key
 *
 * @param data {string|number|object|array|Buffer} - data for encrypting. Object and array will convert to JSON string.
 * @param encoding {string} - optional. Encoding for output result, may be 'buffer', 'binary', 'hex' or 'base64'. Default 'buffer'.
 * @param sourceEncoding {string} - optional. Encoding for given string. Default utf8.
 *
 * @return {Observable<T>|WebSocketSubject<T>}
 */
export function encryptPublic<T>(data: Data | Buffer, encoding?: 'buffer' | Encoding, sourceEncoding?: Encoding): Observable<T> {
    return this.lift(new EncryptPublicOperator(this, data, encoding, sourceEncoding));
}

/**
 * Operator class definition
 */
class EncryptPublicOperator<T> implements Operator<T, T> {
    /**
     * Class constructor
     *
     * @param _source subscriber source
     * @param _data {string|number|object|array|Buffer} - data for encrypting. Object and array will convert to JSON string.
     * @param _encoding {string} - optional. Encoding for output result, may be 'buffer', 'binary', 'hex' or 'base64'. Default 'buffer'.
     * @param _sourceEncoding {string} - optional. Encoding for given string. Default utf8.
     */
    constructor(private _source: Observable<T>,
                private _data: Data | Buffer, private _encoding?: 'buffer' | Encoding, private _sourceEncoding?: Encoding) {
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
        return source.subscribe(new EncryptPublicSubscriber(subscriber, this._source, this._data, this._encoding, this._sourceEncoding));
    }
}

/**
 * Operator subscriber class definition
 */
class EncryptPublicSubscriber<T> extends Subscriber<T> {
    /**
     * Class constructor
     *
     * @param destination subscriber destination
     * @param _source subscriber source
     * @param _data {string|number|object|array|Buffer} - data for encrypting. Object and array will convert to JSON string.
     * @param _encoding {string} - optional. Encoding for output result, may be 'buffer', 'binary', 'hex' or 'base64'. Default 'buffer'.
     * @param _sourceEncoding {string} - optional. Encoding for given string. Default utf8.
     */
    constructor(destination: Subscriber<T>, private _source: Observable<T>,
                private _data: Data | Buffer, private _encoding?: 'buffer' | Encoding, private _sourceEncoding?: Encoding) {
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
                    const k = (<any> nodeRSA).encrypt(this._data, this._encoding, this._sourceEncoding);
                    this.destination.next(k);
                    this.destination.complete();
                } catch (e) {
                    this.destination.error(e);
                }
            }
        );
    }
}
