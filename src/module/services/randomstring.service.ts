import { Injectable } from '@hapiness/core';
import { Observable } from 'rxjs/Observable';
import { GenerateOptions, generate } from 'randomstring';

@Injectable()
export class RandomstringService {
    /**
     * Function to generate a random string
     *
     * @param {GenerateOptions | number} [options] Optional object or number to configure data of generation
     *
     * @return {Observable<string>}
     */
    generate(options?: GenerateOptions | number): Observable<string> {
        return Observable.create(observer => {
            observer.next(generate(options));
            observer.complete();
        });
    }
}

/**
 * Export randomstring interfaces
 */
export { GenerateOptions };
