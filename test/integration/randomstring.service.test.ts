/**
 * @see https://github.com/pana-cc/mocha-typescript
 */
import { suite, test } from 'mocha-typescript';

/**
 * @see http://unitjs.com/
 */
import * as unit from 'unit.js';

// element to test
import { RandomstringService } from '../../src';

@suite('- Integration RandomstringServiceTest file')
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
     * Test if `RandomstringService.generate()` Observable returns 'string'
     */
    @test('- `RandomstringService.generate()` Observable function must return a string')
    testRandomstringServiceGenerateObservableReturnString(done) {
        this._randomstringService.generate().subscribe(m => unit.string(m).when(_ => done()));
    }

    /**
     * Test if `RandomstringService.generate()` Observable returns 'string'
     */
    @test('- `RandomstringService.generate()` Observable function must return a string with 32 chars')
    testRandomstringServiceGenerateObservableReturnStringLength(done) {
        this._randomstringService.generate(32).subscribe(m => unit.string(m).hasLength(32).when(_ => done()));
    }
}
