/**
 * @see https://github.com/pana-cc/mocha-typescript
 */
import { test, suite } from 'mocha-typescript';

/**
 * @see http://unitjs.com/
 */
import * as unit from 'unit.js';

import { Observable } from 'rxjs/Observable';

// element to test
import { RandomstringService } from '../../src';

@suite('- Unit RandomstringServiceTest file')
class RandomstringServiceTest {
    private _randomstringService: RandomstringService;

    constructor() {}

    before() {
        this._randomstringService = new RandomstringService();
    }

    after() {
        this._randomstringService = undefined;
    }

    @test('- `RandomstringService` must have `generate` function')
    testRandomstringServiceGenerate() {
        unit.function(this._randomstringService.generate);
    }

    @test('- `RandomstringService.generate()` function must return a string')
    testRandomstringServiceSayHelloObservable() {
        unit.string(this._randomstringService.generate());
    }
}
