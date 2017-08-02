/**
 * @see https://github.com/pana-cc/mocha-typescript
 */
import { suite, test } from 'mocha-typescript';

/**
 * @see http://unitjs.com/
 */
import * as unit from 'unit.js';

// element to test
import { JWTService, JsonWebTokenError } from '../../src';

@suite('- Integration JWTServiceTest file')
class JWTServiceTest {
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
     * Test if `JWTService.sign()` Observable returns a string
     */
    @test('- `JWTService.sign()` Observable must return a string')
    testJWTServiceSignObservable(done) {
        this._jwtService.sign({data: 'data to sign'}, new Buffer('secret to sign JWT'))
            .subscribe((jwt: string) => unit.string(jwt).when(_ => done()));
    }

    /**
     * Test if `JWTService.sign()` Observable returns an error if RSA signature without PEM private key
     */
    @test('- `JWTService.sign()` Observable must return an error if RSA signature without PEM private key')
    testJWTServiceSignObservableError(done) {
        this._jwtService.sign({data: 'data to sign'}, new Buffer('secret to sign JWT'), { algorithm: 'RS512' })
            .subscribe(null, e => unit.object(e).hasProperty('message', 'error:0906D06C:PEM routines:PEM_read_bio:no start line')
                .when(_ => done()));
    }

    /**
     * Test if `JWTService.verify()` Observable returns a payload object with signature verification
     */
    @test('- `JWTService.verify()` Observable must return a payload object with signature verification')
    testJWTServiceVerifyObservable(done) {
        this._jwtService.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiZGF0YSB0byBzaWduIiwiaWF0IjoxNTAxNTk4MzE0fQ' +
            '.f0B-YNbl9qIbHgDRMcDBxZDrQN5UiLkX5_9McwNvHZI', new Buffer('secret to sign JWT'))
            .subscribe((payload: object) => unit.object(payload).hasProperty('data', 'data to sign').when(_ => done()));
    }

    /**
     * Test if `JWTService.verify()` Observable returns an error if signature is missing in JWT
     */
    @test('- `JWTService.verify()` Observable must return an error if signature is missing in JWT')
    testJWTServiceVerifyObservableError(done) {
        this._jwtService.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiZGF0YSB0byBzaWduIiwiaWF0IjoxNTAxNTk4MzE0fQ',
            new Buffer('secret to sign JWT'))
            .subscribe(null, (e: JsonWebTokenError) => unit.object(e).hasProperty('name', 'JsonWebTokenError')
                .hasProperty('message', 'jwt malformed').when(_ => done()));
    }

    /**
     * Test if `JWTService.decode()` Observable returns a payload object without signature verification
     */
    @test('- `JWTService.verify()` Observable must return a payload object without signature verification')
    testJWTServiceDecodeObservable(done) {
        this._jwtService.decode('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiZGF0YSB0byBzaWduIiwiaWF0IjoxNTAxNTk4MzE0fQ' +
            '.f0B-YNbl9qIbHgDRMcDBxZDrQN5UiLkX5_9McwNvHZI')
            .subscribe((payload: object) => unit.object(payload).hasProperty('data', 'data to sign').when(_ => done()));
    }
}
