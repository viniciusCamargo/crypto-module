import { Injectable } from '@hapiness/core';
import { Observable } from 'rxjs/Observable';
import { GenerateOptions, generate } from 'randomstring';
import { of } from 'rxjs/observable/of';

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
        return of(generate(options));
    }
}

/**
 * Export randomstring interfaces
 */
export { GenerateOptions };
