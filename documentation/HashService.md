<img src="http://bit.ly/2mxmKKI" width="500" alt="Hapiness" />

<div style="margin-bottom:20px;">
<div>
    <a href="https://www.typescriptlang.org/docs/tutorial.html">
        <img src="https://cdn-images-1.medium.com/max/800/1*8lKzkDJVWuVbqumysxMRYw.png"
             align="right" alt="Typescript logo" width="50" height="50" style="border:none;" />
    </a>
    <a href="http://reactivex.io/rxjs">
        <img src="http://reactivex.io/assets/Rx_Logo_S.png"
             align="right" alt="ReactiveX logo" width="50" height="50" style="border:none;" />
    </a>
</div>
</div>

# Hash Service

After imported `CryptoModule` in your module, you can access to `HashService` anywhere with **dependency injection**.

```javascript
import { HapinessModule, Lib } from '@hapiness/core';
import { CryptoModule, HashService } from '@hapiness/crypto';

@Lib()
class LibWithCrypto {
    constructor(private _hashService: HashService) {}
}

@HapinessModule({
    version: '1.0.0',
    declarations: [
        LibWithCrypto
    ],
    imports: [
        CryptoModule
    ]
})
class HapinessModuleNeedsCryptoModule {}
```

## Table of contents

* [API in Detail](#api-in-detail)
    * [.generate(data, salt, iterations, keylen, digest)](#generatedata-salt-iterations-keylen-digest)
* [Change History](#change-history)

## API in Detail

### `.generate(data, salt, iterations, keylen, digest)`

Provides an asynchronous Password-Based Key Derivation Function 2 (PBKDF2) implementation.

A selected HMAC `digest` algorithm specified by digest is applied to derive a key of the requested byte length (`keylen`) from the `password`, `salt` and `iterations`.

**Parameters:**
> - ***{string | Buffer} data*** *(required): data will be hashed. Generally a password in key creation.*
> - ***{string | Buffer} salt*** *(required): salt should also be as unique as possible. It is recommended that the salts are random and their lengths are greater than 16 bytes.*
> - ***{number} iterations*** *(required): iterations argument must be a number set as high as possible. The higher the number of iterations, the more secure the derived key will be, but will take a longer amount of time to complete.*
> - ***{number} keylen*** *(required): keylen requested byte length.*
> - ***{string} digest*** *(required): digest HMAC digest algorithm is applied to derive a key of the requested byte length (keylen).*

**Response:**
> *{[RxJS.Observable](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/observable.md)} The successfully generated `derivedKey` will be passed as a `Buffer`.*

**Example:**
```javascript
this._hashService.generate('P3HQdR35PUQLZ5ioOrsPlxx7QWra7WQl', 'Kt9V3wgxrhpf8GN3', 4096, 24, 'sha256')
    .subscribe(
        (buffer: Buffer) => console.log(buffer.toString('hex')), // Show `61cac683ff27580e4c68778df5208c745b0e473172778658` in the console
        e => console.error(e.message) // Show error message in the console
    );
```
[Back to top](#table-of-contents)

## Change History

* Implementation of all methods (2017-12-19)
    * [.generate(data,salt,iterations,keylen,digest)](#generatedata-salt-iterations-keylen-digest)

[Back to top](#table-of-contents)
