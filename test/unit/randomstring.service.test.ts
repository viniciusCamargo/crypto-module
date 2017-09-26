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
import { RandomstringService } from '../../src';

@suite('- Unit RandomstringServiceTest file')
export class RandomstringServiceTest {
    // private property to store service instance
    private _randomstringService: RandomstringService;
    /**
     * Class constructor
     */
    constructor() {}

    /**
     * Function executed before each test
     */
    before() {
        this._randomstringService = new RandomstringService();
    }

    /**
     * Function executed after each test
     */
    after() {
        this._randomstringService = undefined;
    }

    /**
     * Test if `RandomstringService` as a `generate` function
     */
    @test('- `RandomstringService` must have `generate` function')
    testRandomstringServiceGenerate() {
        unit.function(this._randomstringService.generate);
    }

    /**
     * Test if `RandomstringService.generate()` function returns an Observable
     */
    @test('- `RandomstringService.generate()` function must return an Observable')
    testRandomstringServiceGenerateObservable() {
        unit.object(this._randomstringService.generate()).isInstanceOf(Observable);
    }
}
