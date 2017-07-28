import { Observable } from 'rxjs/Observable';
import { Operator } from 'rxjs/Operator';
import { Subscriber } from 'rxjs/Subscriber';

/**
 * New observable operator
 *
 * @param bits Key size in bits. 2048 by default.
 * @param exponent public exponent. 65537 by default.
 *
 * @return {Observable<T>|WebSocketSubject<T>}
 */
export function generateKeyPair<T>(bits?: number, exponent?: number): Observable<T> {
    return this.lift(new GenerateKeyPairOperator(this, bits, exponent));
}

/**
 * Operator class definition
 */
class GenerateKeyPairOperator<T> implements Operator<T, T> {
    /**
     * Class constructor
     *
     * @param _source subscriber source
     * @param _bits Key size in bits. 2048 by default.
     * @param _exponent public exponent. 65537 by default.
     */
    constructor(private _source: Observable<T>, private _bits?: number, private _exponent?: number) {
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
        return source.subscribe(new GenerateKeyPairSubscriber(subscriber, this._source, this._bits, this._exponent));
    }
}

/**
 * Operator subscriber class definition
 */
class GenerateKeyPairSubscriber<T> extends Subscriber<T> {
    /**
     * Class constructor
     *
     * @param destination subscriber destination
     * @param _source subscriber source
     * @param _bits Key size in bits. 2048 by default.
     * @param _exponent public exponent. 65537 by default.
     */
    constructor(destination: Subscriber<T>, private _source: Observable<T>, private _bits?: number, private _exponent?: number) {
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
                    (<any> nodeRSA).generateKeyPair(this._bits, this._exponent);
                    this.destination.next(nodeRSA);
                    this.destination.complete();
                } catch (e) {
                    this.destination.error(e);
                }
            }
        );
    }
}
