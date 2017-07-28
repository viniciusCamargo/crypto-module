/**
 * @see https://github.com/pana-cc/mocha-typescript
 */
import { suite, test } from 'mocha-typescript';

/**
 * @see http://unitjs.com/
 */
import * as unit from 'unit.js';

// element to test
import { HashService } from '../../src';

import { Buffer } from 'buffer';

@suite('- Integration HashServiceTest file')
class HashServiceTest {
    // private property to store service instance
    private _hashService: HashService;
    // private property to store password
    private _password: string;
    // private property to store salt
    private _salt: string;
    // private property to store iterations number
    private _iterations: number;
    // private property to store key length
    private _keylen: number;
    // private property to store digest
    private _digest: string;

    /**
     * Class constructor
     */
    constructor() {}

    /**
     * Function executed before each test
     */
    before() {
        this._hashService = new HashService();
        this._password = 'P3HQdR35PUQLZ5ioOrsPlxx7QWra7WQl';
        this._salt = 'Kt9V3wgxrhpf8GN3';
        this._iterations = 4096;
        this._keylen = 24;
        this._digest = 'sha256';
    }

    /**
     * Function executed after each test
     */
    after() {
        this._hashService = undefined;
        this._password = undefined;
        this._salt = undefined;
        this._iterations = undefined;
        this._keylen = undefined;
        this._digest = undefined;
    }

    /**
     * Test if `HashService.generate()` function returns an Observable with error if parameters are wrong
     */
    @test('- `HashService.generate()` function must return an Observable with error if parameters are wrong')
    testHashServiceGenerateObservable(done) {
        this._hashService.generate(null, null, null, null, null)
            .subscribe(null, error => unit.object(error).hasProperty('message', 'Pass phrase must be a buffer').when(_ => done()));
    }

    /**
     * Test if `HashService.generate()` Observable returns Buffer
     */
    @test('- `HashService.generate()` Observable function must return a Buffer')
    testHashServiceGenerateObservableReturnBuffer(done) {
        this._hashService.generate(this._password, this._salt, this._iterations, this._keylen, this._digest)
            .subscribe(buffer => unit.object(buffer).isInstanceOf(Buffer).when(_ => done()));
    }

    /**
     * Test if `HashService.generate()` Observable returns Buffer and
     *  his string representation is `61cac683ff27580e4c68778df5208c745b0e473172778658`
     */
    @test('- `HashService.generate()` Observable function must return a Buffer and his string representation is ' +
        '`61cac683ff27580e4c68778df5208c745b0e473172778658`')
    testHashServiceGenerateObservableReturnBufferWithStringRepresentationValue(done) {
        this._hashService.generate(this._password, this._salt, this._iterations, this._keylen, this._digest)
            .subscribe(buffer => unit.string(buffer.toString('hex')).is('61cac683ff27580e4c68778df5208c745b0e473172778658')
                .when(_ => done()));
    }
}
