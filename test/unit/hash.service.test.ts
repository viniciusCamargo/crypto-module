/**
 * @see https://github.com/pana-cc/mocha-typescript
 */
import { suite, test } from 'mocha-typescript';

/**
 * @see http://unitjs.com/
 */
import * as unit from 'unit.js';

import { Observable } from 'rxjs/Observable';

// element to test
import { HashService } from '../../src';

@suite('- Unit HashServiceTest file')
export class HashServiceTest {
    // private property to store service instance
    private _hashService: HashService;

    /**
     * Class constructor
     */
    constructor() {}

    /**
     * Function executed before each test
     */
    before() {
        this._hashService = new HashService();
    }

    /**
     * Function executed after each test
     */
    after() {
        this._hashService = undefined;
    }

    /**
     * Test if `HashService` as a `generate` function
     */
    @test('- `HashService` must have `generate` function')
    testHashServiceGenerate() {
        unit.function(this._hashService.generate);
    }

    /**
     * Test if `HashService.generate()` function returns an Observable
     */
    @test('- `HashService.generate()` function must return an Observable')
    testHashServiceGenerateObservable() {
        unit.object(this._hashService.generate(null, null, null, null, null)).isInstanceOf(Observable);
    }
}
