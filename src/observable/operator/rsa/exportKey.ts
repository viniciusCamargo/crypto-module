import { Observable } from 'rxjs/Observable';
import { Operator } from 'rxjs/Operator';
import { Subscriber } from 'rxjs/Subscriber';
import * as NodeRSA from 'node-rsa';
import { Format, Key } from 'node-rsa';

/**
 * New observable operator
 *
 * Export key to PEM string, PEM/DER Buffer or components.
 *
 * @param format key format
 *
 * @return {Observable<Key>}
 */
export function exportKey<NodeRSA>(format?: Format): Observable<Key> {
    return higherOrder<NodeRSA>(format)(this);
}

function higherOrder<NodeRSA>(format?: Format): (source: Observable<NodeRSA>) => Observable<Key> {
    return (source: Observable<NodeRSA>) => <Observable<Key>> source.lift(new ExportKeyOperator(format));
}

/**
 * Operator class definition
 */
class ExportKeyOperator<Key> implements Operator<NodeRSA, Key> {
    /**
     * Class constructor
     *
     * @param _format key format
     */
    constructor(private _format?: Format) {
    }

    /**
     * Function calls when operator is executing
     *
     * @param subscriber current subscriber
     * @param source subscriber source
     *
     * @return {AnonymousSubscription|Subscription|Promise<PushSubscription>|TeardownLogic}
     */
    call(subscriber: Subscriber<Key>, source: Observable<NodeRSA>): any {
        return source.subscribe(new ExportKeySubscriber(subscriber, this._format));
    }
}

/**
 * Operator subscriber class definition
 */
class ExportKeySubscriber<Key> extends Subscriber<NodeRSA> {
    /**
     * Class constructor
     *
     * @param destination subscriber destination
     * @param _format key format
     */
    constructor(destination: Subscriber<Key>, private _format?: Format) {
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
            this.destination.next(nodeRSA.exportKey(this._format));
            this.destination.complete();
        } catch (e) {
            this.destination.error(e);
        }
    }
}
