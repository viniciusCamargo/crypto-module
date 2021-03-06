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

# AES Service

After imported `CryptoModule` in your module, you can access to `AESService` anywhere with **dependency injection**.

```javascript
import { HapinessModule, Lib } from '@hapiness/core';
import { CryptoModule, AESService } from '@hapiness/crypto';

@Lib()
class LibWithCrypto {
    constructor(private _aesService: AESService) {}
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
    * [.createKey(password, salt)](#createkeypassword-salt)
    * [.encryptWithAesKey(data)](#encryptwithaeskeydata)
    * [.decryptWithAesKey(data)](#decryptwithaeskeydata)
* [Change History](#change-history)

## API in Detail

### `.createKey(password, salt)`

Creates `RSA-SHA256` `AES key` for given `password` and `salt`

**Parameters:**
> - ***{string | Buffer} password*** *(required): password for `AES key`.*
> - ***{string | Buffer} salt*** *(required): salt for `AES key` should also be as unique as possible. It is recommended that the salts are random and their lengths are greater than 16 bytes.*

**Response:**
> *{[RxJS.Observable](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/observable.md)} The successfully generated `AES key` will be passed as a `{key, iv}` object and used to encrypt and decrypt data.*

**Example:**
```javascript
this._aesService.createKey('P3HQdR35PUQLZ5ioOrsPlxx7QWra7WQl', 'Kt9V3wgxrhpf8GN3')
    .subscribe(
        (aesKeyCreationResult: AesKeyCreationResult) => console.log(aesKeyCreationResult), // Show `{key: '61cac683ff27580e4c68778df5208c745b0e4731727786586938c794a37f4419', iv: '31cef43b785870e993cbc94aee0354cf'}` in the console
        e => console.error(e.message) // Show error message in the console
    );
```
[Back to top](#table-of-contents)

### `.encryptWithAesKey(data)`

Encrypting `data` method with `AES key`. This method is an `Observable's` `operator`.

**Parameters:**
> - ***{Buffer} data*** *(required): data for encrypting.*

**Response:**
> *{[RxJS.Observable](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/observable.md)} The successfully `encrypted` data will be passed as a `Buffer`.*

**Example:**
```javascript
import '@hapiness/crypto/aes/add/operator/encryptWithAesKey';

...

this._aesService.createKey('P3HQdR35PUQLZ5ioOrsPlxx7QWra7WQl', 'Kt9V3wgxrhpf8GN3').encryptWithAesKey(new Buffer('data'))
    .subscribe(
        (buffer: Buffer) => console.log(buffer.toString('hex')), // Show `a3d4bb8fcb8ec0e24a86cef07a28e3af` in the console
        e => console.error(e.message) // Show error message in the console
    );
```

**Example - Lettable operators:**
```javascript
import { encryptWithAesKey } from '@hapiness/crypto/aes/operators';

...

this._aesService.createKey('P3HQdR35PUQLZ5ioOrsPlxx7QWra7WQl', 'Kt9V3wgxrhpf8GN3')
    .pipe(
        encryptWithAesKey(new Buffer('data'))
    )
    .subscribe(
        (buffer: Buffer) => console.log(buffer.toString('hex')), // Show `a3d4bb8fcb8ec0e24a86cef07a28e3af` in the console
        e => console.error(e.message) // Show error message in the console
    );
```

[Back to top](#table-of-contents)

### `.decryptWithAesKey(data)`

Decrypting `data` method with `AES key`. This method is an `Observable's` `operator`.

**Parameters:**
> - ***{Buffer} data*** *(required): data for decrypting.*

**Response:**
> *{[RxJS.Observable](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/observable.md)} The successfully `decrypted` data will be passed as a `Buffer`.*

**Example:**
```javascript
import '@hapiness/crypto/aes/add/operator/decryptWithAesKey';

...

this._aesService.createKey('P3HQdR35PUQLZ5ioOrsPlxx7QWra7WQl', 'Kt9V3wgxrhpf8GN3').decryptWithAesKey(new Buffer('a3d4bb8fcb8ec0e24a86cef07a28e3af', 'hex'))
    .subscribe(
        (buffer: Buffer) => console.log(buffer.toString()), // Show `data` in the console
        e => console.error(e.message) // Show error message in the console
    );
```

**Example - Lettable operators:**
```javascript
import { decryptWithAesKey } from '@hapiness/crypto/aes/operators';

...

this._aesService.createKey('P3HQdR35PUQLZ5ioOrsPlxx7QWra7WQl', 'Kt9V3wgxrhpf8GN3')
    .pipe(
        decryptWithAesKey(new Buffer('a3d4bb8fcb8ec0e24a86cef07a28e3af', 'hex'))
    )
    .subscribe(
        (buffer: Buffer) => console.log(buffer.toString()), // Show `data` in the console
        e => console.error(e.message) // Show error message in the console
    );
```

[Back to top](#table-of-contents)

## Change History

* Fix operators (2018-11-15)
    * Fix of `cipher.final()` in `AESService.encryptWithAesKey()` and `AESService.decryptWithAesKey()` operators
* Implementation of all methods (2017-12-19)
    * [.createKey(password, salt)](#createkeypassword-salt)
    * [.encryptWithAesKey(data)](#encryptwithaeskeydata)
    * [.decryptWithAesKey(data)](#decryptwithaeskeydata)
    
[Back to top](#table-of-contents)

