import { Observable } from 'rxjs/Observable';
import { Operator } from 'rxjs/Operator';
import { Subscriber } from 'rxjs/Subscriber';
import { Encoding, Data } from 'node-rsa';
import { Buffer } from 'buffer';

/**
 * New observable operator
 *
 * Verifying signed data
 *
 * @param data {string|number|object|array|Buffer} - signed data.
 * @param signature {string|Buffer} - signature from sign method.
 * @param sourceEncoding {string} - optional. Encoding for given string. Default utf8.
 * @param signatureEncoding {string} - optional. Encoding of given signature.
 *          May be 'buffer', 'binary', 'hex' or 'base64'. Default 'buffer'.
 *
 * @return {Observable<T>|WebSocketSubject<T>}
 */
export function verify<T>(data: Data | Buffer, signature: string | Buffer,
                          sourceEncoding?: Encoding, signatureEncoding?: Encoding): Observable<T> {
    return this.lift(new VerifyOperator(this, data, signature, sourceEncoding, signatureEncoding));
}

/**
 * Operator class definition
 */
class VerifyOperator<T> implements Operator<T, T> {
    /**
     * Class constructor
     *
     * @param _source subscriber source
     * @param _data {string|number|object|array|Buffer} - signed data.
     * @param _signature {string|Buffer} - signature from sign method.
     * @param _sourceEncoding {string} - optional. Encoding for given string. Default utf8.
     * @param _signatureEncoding {string} - optional. Encoding of given signature.
     *          May be 'buffer', 'binary', 'hex' or 'base64'. Default 'buffer'.
     */
    constructor(private _source: Observable<T>,
                private _data: Data | Buffer, private _signature: string | Buffer,
                private _sourceEncoding?: Encoding, private _signatureEncoding?: Encoding) {
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
        return source.subscribe(new VerifySubscriber(subscriber, this._source,
            this._data, this._signature, this._sourceEncoding, this._signatureEncoding));
    }
}

/**
 * Operator subscriber class definition
 */
class VerifySubscriber<T> extends Subscriber<T> {
    /**
     * Class constructor
     *
     * @param destination subscriber destination
     * @param _source subscriber source
     * @param _data {string|number|object|array|Buffer} - signed data.
     * @param _signature {string|Buffer} - signature from sign method.
     * @param _sourceEncoding {string} - optional. Encoding for given string. Default utf8.
     * @param _signatureEncoding {string} - optional. Encoding of given signature.
     *          May be 'buffer', 'binary', 'hex' or 'base64'. Default 'buffer'.
     */
    constructor(destination: Subscriber<T>, private _source: Observable<T>,
                private _data: Data | Buffer, private _signature: string | Buffer,
                private _sourceEncoding?: Encoding, private _signatureEncoding?: Encoding) {
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
                    const k = (<any> nodeRSA).verify(this._data, this._signature, this._sourceEncoding, this._signatureEncoding);
                    this.destination.next(k);
                    this.destination.complete();
                } catch (e) {
                    this.destination.error(e);
                }
            }
        );
    }
}
