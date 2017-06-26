import { Observable } from 'rxjs';
import { Injectable } from '@hapiness/core';
const randomstring = require('randomstring');

@Injectable()
export class RandomstringService {
    /**
    * Function to generate a randomstring
    * @return {string}
    */
    generate(...args) {
      return randomstring.generate(...args);
    }

}
