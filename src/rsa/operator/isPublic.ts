import { Observable } from 'rxjs/Observable';
import { isPublic as higherOrder } from '../operators'

/**
 * New observable operator
 *
 * @param strict if true method will return false if key pair have private exponent. Default false.
 *
 * @return {Observable<boolean>}
 */
export function isPublic<NodeRSA>(strict?: boolean): Observable<boolean> {
    return higherOrder<NodeRSA>(strict)(this);
}
