import { Observable } from 'rxjs/Observable';
import { Operator } from 'rxjs/Operator';
import { Subscriber } from 'rxjs/Subscriber';
import { Key, Format } from 'node-rsa';

/**
 * New observable operator
 *
 * Import key from PEM string, PEM/DER Buffer or components.
 *
 * @param key key from PEM string, PEM/DER Buffer or components
 * @param format key format
 *
 * @return {Observable<T>|WebSocketSubject<T>}
 */
export function importKey<T>(key: Key, format?: Format): Observable<T> {
    return this.lift(new ImportKeyOperator(this, key, format));
}

/**
 * Operator class definition
 */
class ImportKeyOperator<T> implements Operator<T, T> {
    /**
     * Class constructor
     *
     * @param _source subscriber source
     * @param _key key from PEM string, PEM/DER Buffer or components
     * @param _format key format
     */
    constructor(private _source: Observable<T>, private _key: Key, private _format?: Format) {
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
        return source.subscribe(new ImportKeySubscriber(subscriber, this._source, this._key, this._format));
    }
}

/**
 * Operator subscriber class definition
 */
class ImportKeySubscriber<T> extends Subscriber<T> {
    /**
     * Class constructor
     *
     * @param destination subscriber destination
     * @param _source subscriber source
     * @param _key key from PEM string, PEM/DER Buffer or components
     * @param _format key format
     */
    constructor(destination: Subscriber<T>, private _source: Observable<T>, private _key: Key, private _format?: Format) {
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
                    (<any> nodeRSA).importKey(this._key, this._format);
                    this.destination.next(nodeRSA);
                    this.destination.complete();
                } catch (e) {
                    this.destination.error(e);
                }
            }
        );
    }
}
