import { Observable } from 'rxjs/Observable';
import { Operator } from 'rxjs/Operator';
import { Subscriber } from 'rxjs/Subscriber';

/**
 * New observable operator
 *
 * @param strict if true method will return false if key pair have private exponent. Default false.
 *
 * @return {Observable<T>|WebSocketSubject<T>}
 */
export function isPublic<T>(strict?: boolean): Observable<T> {
    return this.lift(new IsPublicOperator(this, strict));
}

/**
 * Operator class definition
 */
class IsPublicOperator<T> implements Operator<T, T> {
    /**
     * Class constructor
     *
     * @param _source subscriber source
     * @param _strict if true method will return false if key pair have private exponent. Default false.
     */
    constructor(private _source: Observable<T>, private _strict?: boolean) {
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
        return source.subscribe(new IsPublicSubscriber(subscriber, this._source, this._strict));
    }
}

/**
 * Operator subscriber class definition
 */
class IsPublicSubscriber<T> extends Subscriber<T> {
    /**
     * Class constructor
     *
     * @param destination subscriber destination
     * @param _source subscriber source
     * @param _strict if true method will return false if key pair have private exponent. Default false.
     */
    constructor(destination: Subscriber<T>, private _source: Observable<T>, private _strict?: boolean) {
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
                    const k = (<any> nodeRSA).isPublic(this._strict);
                    this.destination.next(!!k);
                    this.destination.complete();
                } catch (e) {
                    this.destination.error(e);
                }
            }
        );
    }
}
