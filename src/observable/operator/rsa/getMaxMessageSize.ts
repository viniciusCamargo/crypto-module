import { Observable } from 'rxjs/Observable';
import { Operator } from 'rxjs/Operator';
import { Subscriber } from 'rxjs/Subscriber';

/**
 * New observable operator
 *
 * Return max data size for encrypt in bytes.
 *
 * @return {Observable<T>|WebSocketSubject<T>}
 */
export function getMaxMessageSize<T>(): Observable<T> {
    return this.lift(new GetMaxMessageSizeOperator(this));
}

/**
 * Operator class definition
 */
class GetMaxMessageSizeOperator<T> implements Operator<T, T> {
    /**
     * Class constructor
     *
     * @param _source subscriber source
     */
    constructor(private _source: Observable<T>) {
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
        return source.subscribe(new GetMaxMessageSizeSubscriber(subscriber, this._source));
    }
}

/**
 * Operator subscriber class definition
 */
class GetMaxMessageSizeSubscriber<T> extends Subscriber<T> {
    /**
     * Class constructor
     *
     * @param destination subscriber destination
     * @param _source subscriber source
     */
    constructor(destination: Subscriber<T>, private _source: Observable<T>) {
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
                    const k = (<any> nodeRSA).getMaxMessageSize();
                    this.destination.next(k);
                    this.destination.complete();
                } catch (e) {
                    this.destination.error(e);
                }
            }
        );
    }
}
