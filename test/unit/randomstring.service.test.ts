/**
 * @see https://github.com/pana-cc/mocha-typescript
 */
import { test, suite } from 'mocha-typescript';

/**
 * @see http://unitjs.com/
 */
import * as unit from 'unit.js';

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
    testRandomstringServiceGenerate(done) {
        console.log(this._randomstringService);
        unit.function(this._randomstringService.generate).when(_ => done());
    }

    @test('- `RandomstringService.generate()` function must return a string')
    testRandomstringServiceSayHelloObservable(done) {
        this._randomstringService.generate().subscribe(str => unit.string(str).when(_ => done()));
    }
}
