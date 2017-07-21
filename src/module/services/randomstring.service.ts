import { Injectable } from '@hapiness/core';
import { Observable } from 'rxjs/Observable';
import { GenerateOptions, generate } from 'randomstring';

@Injectable()
export class RandomstringService {
    constructor() {}
    /**
    * Function to generate a randomstring
    * @return {string}
    */
    generate(options?: GenerateOptions | number): Observable<string> {
      return Observable.create(observer => {
          try {
              const str = generate(options);
              observer.next(str);
              observer.complete();
          } catch (e) {
              observer.error(e);
          }
      });
    }
}

export { GenerateOptions };
