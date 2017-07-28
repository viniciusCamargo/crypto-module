import { Observable } from 'rxjs/Observable';
import { Operator } from 'rxjs/Operator';
import { Subscriber } from 'rxjs/Subscriber';
import { Format } from 'node-rsa';

/**
 * New observable operator
 *
 * Export key to PEM string, PEM/DER Buffer or components.
 *
 * @param format key format
 *
 * @return {Observable<T>|WebSocketSubject<T>}
 */
export function exportKey<T>(format?: Format): Observable<T> {
    return this.lift(new ExportKeyOperator(this, format));
}

/**
 * Operator class definition
 */
class ExportKeyOperator<T> implements Operator<T, T> {
    /**
     * Class constructor
     *
     * @param _source subscriber source
     * @param _format key format
     */
    constructor(private _source: Observable<T>, private _format?: Format) {
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
        return source.subscribe(new ExportKeySubscriber(subscriber, this._source, this._format));
    }
}

/**
 * Operator subscriber class definition
 */
class ExportKeySubscriber<T> extends Subscriber<T> {
    /**
     * Class constructor
     *
     * @param destination subscriber destination
     * @param _source subscriber source
     * @param _format key format
     */
    constructor(destination: Subscriber<T>, private _source: Observable<T>, private _format?: Format) {
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
                    const k = (<any> nodeRSA).exportKey(this._format);
                    this.destination.next(k);
                    this.destination.complete();
                } catch (e) {
                    this.destination.error(e);
                }
            }
        );
    }
}
