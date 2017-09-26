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
import { JWTService } from '../../src';

@suite('- Unit JWTServiceTest file')
export class JWTServiceTest {
    // private property to store service instance
    private _jwtService: JWTService;

    /**
     * Class constructor
     */
    constructor() {}

    /**
     * Function executed before each test
     */
    before() {
        this._jwtService = new JWTService();
    }

    /**
     * Function executed after each test
     */
    after() {
        this._jwtService = undefined;
    }

    /**
     * Test if `JWTService` as a `sign` function
     */
    @test('- `JWTService` must have `sign` function')
    testJWTServiceSign() {
        unit.function(this._jwtService.sign);
    }

    /**
     * Test if `JWTService.sign()` function returns an Observable
     */
    @test('- `JWTService.sign()` function must return an Observable')
    testJWTServiceSignObservable() {
        unit.object(this._jwtService.sign(null, null)).isInstanceOf(Observable);
    }

    /**
     * Test if `JWTService` as a `verify` function
     */
    @test('- `JWTService` must have `verify` function')
    testJWTServiceVerify() {
        unit.function(this._jwtService.verify);
    }

    /**
     * Test if `JWTService.verify()` function returns an Observable
     */
    @test('- `JWTService.verify()` function must return an Observable')
    testJWTServiceVerifyObservable() {
        unit.object(this._jwtService.verify(null, null)).isInstanceOf(Observable);
    }

    /**
     * Test if `JWTService` as a `decode` function
     */
    @test('- `JWTService` must have `decode` function')
    testJWTServiceDecode() {
        unit.function(this._jwtService.decode);
    }

    /**
     * Test if `JWTService.decode()` function returns an Observable
     */
    @test('- `JWTService.decode()` function must return an Observable')
    testJWTServiceDecodeObservable() {
        unit.object(this._jwtService.decode(null)).isInstanceOf(Observable);
    }
}
