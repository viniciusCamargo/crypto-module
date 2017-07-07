import { Observable } from 'rxjs';
import { Injectable } from '@hapiness/core';
const randomstring = require('randomstring');

export const enum Charsets {
  alphanumeric,
  alphabetic,
  numeric,
  hex,
  custom
};

export const enum Capitalization {
  lowercase,
  uppercase
};

export interface GenerateArguments {
  length?: number;
  readable?: boolean;
  charset?: Charsets;
  capitalization?: Capitalization;
};

@Injectable()
export class RandomstringService {
    /**
    * Function to generate a randomstring
    * @return {string}
    */
    generate(options: GenerateArguments) {
      return randomstring.generate(options);
    }

}
