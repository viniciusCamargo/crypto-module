import { Observable } from 'rxjs/Observable';
import { Operator } from 'rxjs/Operator';
import { Subscriber } from 'rxjs/Subscriber';
import * as NodeRSA from 'node-rsa';
import { Encoding } from 'node-rsa';

/**
 * New observable operator
 *
 * Decrypting data method with public key
 *
 * @param data {Buffer} - buffer for decrypting
 * @param encoding - encoding for result string, can also take 'json' or 'buffer' for the automatic conversion of this type
 *
 * @return {Observable<R>}
 */
export function decryptPublic<NodeRSA, R>(data: Buffer | string, encoding?: 'buffer' | Encoding | 'json'): Observable<R> {
    return higherOrder<NodeRSA, R>(data, encoding)(this);
}

function higherOrder<NodeRSA, R>(data: Buffer | string,
                                 encoding?: 'buffer' | Encoding | 'json'): (source: Observable<NodeRSA>) => Observable<R> {
    return (source: Observable<NodeRSA>) => <Observable<R>> source.lift(new DecryptPublicOperator(data, encoding));
}

/**
 * Operator class definition
 */
class DecryptPublicOperator<R> implements Operator<NodeRSA, R> {
    /**
     * Class constructor
     *
     * @param _data {Buffer} - buffer for decrypting
     * @param _encoding - encoding for result string, can also take 'json' or 'buffer' for the automatic conversion of this type
     */
    constructor(private _data: Buffer | string, private _encoding?: 'buffer' | Encoding | 'json') {
    }

    /**
     * Function calls when operator is executing
     *
     * @param subscriber current subscriber
     * @param source subscriber source
     *
     * @return {AnonymousSubscription|Subscription|Promise<PushSubscription>|TeardownLogic}
     */
    call(subscriber: Subscriber<R>, source: Observable<NodeRSA>): any {
        return source.subscribe(new DecryptPublicSubscriber(subscriber, this._data, this._encoding));
    }
}

/**
 * Operator subscriber class definition
 */
class DecryptPublicSubscriber<R> extends Subscriber<NodeRSA> {
    /**
     * Class constructor
     *
     * @param destination subscriber destination
     * @param _data {Buffer} - buffer for decrypting
     * @param _encoding - encoding for result string, can also take 'json' or 'buffer' for the automatic conversion of this type
     */
    constructor(destination: Subscriber<R>, private _data: Buffer | string, private _encoding?: 'buffer' | Encoding | 'json') {
        super(destination);
    }

    /**
     * Function to send result to next subscriber
     *
     * @param nodeRSA object from previous subscriber
     *
     * @private
     */
    protected _next(nodeRSA: NodeRSA): void {
        try {
            this.destination.next(nodeRSA.decryptPublic(this._data, <any> this._encoding));
            this.destination.complete();
        } catch (e) {
            this.destination.error(e);
        }
    }
}
