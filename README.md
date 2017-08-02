<img src="http://bit.ly/2mxmKKI" width="500" alt="Hapiness" />

<div style="margin-bottom:20px;">
<div style="line-height:60px">
    <a href="https://travis-ci.org/hapinessjs/crypto-module.svg?branch=master">
        <img src="https://travis-ci.org/hapinessjs/crypto-module.svg?branch=master" alt="build" />
    </a>
    <a href="https://coveralls.io/github/hapinessjs/crypto-module?branch=master">
        <img src="https://coveralls.io/repos/github/hapinessjs/crypto-module/badge.svg?branch=master" alt="coveralls" />
    </a>
    <a href="https://david-dm.org/hapinessjs/crypto-module">
        <img src="https://david-dm.org/hapinessjs/crypto-module.svg" alt="dependencies" />
    </a>
    <a href="https://david-dm.org/hapinessjs/crypto-module?type=dev">
        <img src="https://david-dm.org/hapinessjs/crypto-module/dev-status.svg" alt="devDependencies" />
    </a>
</div>
<div>
    <a href="https://www.typescriptlang.org/docs/tutorial.html">
        <img src="https://cdn-images-1.medium.com/max/800/1*8lKzkDJVWuVbqumysxMRYw.png"
             align="right" alt="Typescript logo" width="50" height="50" style="border:none;" />
    </a>
    <a href="http://reactivex.io/rxjs">
        <img src="http://reactivex.io/assets/Rx_Logo_S.png"
             align="right" alt="ReactiveX logo" width="50" height="50" style="border:none;" />
    </a>
    <a href="http://hapijs.com">
        <img src="http://bit.ly/2lYPYPw"
             align="right" alt="Hapijs logo" width="75" style="border:none;" />
    </a>
</div>
</div>

# Crypto Module

`Crypto` module for the [Hapiness](https://github.com/hapinessjs/hapiness) framework provides some functions for security features like `AES key`, `Key pair`, `PKCS12`, `RSA key`, `Certificate`, `JWT` and more.

We use existing node modules to provide these functions: [NodeRSA](https://github.com/rzcoder/node-rsa), [PEM](https://github.com/Dexus/pem), [JWT](https://github.com/auth0/node-jsonwebtoken) and [RandomString](https://github.com/klughammer/node-randomstring) but we add `Observable` feature for asynchronous and stream processes.

**All most important crypto features in only one module.**

## Table of contents

* [Using http module inside Hapiness application](#using-http-module-inside-hapiness-application)
    * [Yarn or NPM it in your package.json](#yarn-or-npm-it-in-your-packagejson)
    * [Import CryptoModule](#import-cryptomodule)
    * [Use it anywhere](#use-it-anywhere)
* [API in Detail](#api-in-detail)
* [Contributing](#contributing)
* [Change History](#change-history)
* [Maintainers](#maintainers)
* [License](#license)

## Using http module inside Hapiness application

### `yarn` or `npm` it in your `package.json`

```bash
$ npm install --save @hapiness/core @hapiness/crypto rxjs

or

$ yarn add @hapiness/core @hapiness/crypto rxjs
```

```javascript
"dependencies": {
    "@hapiness/core": "^1.0.0-rc.6",
    "@hapiness/crypto": "^1.0.0-rc.6.2",
    "rxjs": "^5.4.2",
    //...
}
//...
```

### import `CryptoModule`

```javascript
import { HapinessModule } from '@hapiness/core';
import { CryptoModule } from '@hapiness/crypto';

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

### use it anywhere

You can use `AESService`, `HashService`, `PEMService`, `RandomstringService` and `RSAService` anywhere in your module with **dependency injection**.

```javascript
import { Lib } from '@hapiness/core';
import { RSAService, NodeRSA } from '@hapiness/crypto';

@Lib()
class LibWithCrypto {
    constructor(private _rsaService: RSAService) {}
    
    createRsaKey(): void {
        this._rsaService.createKey().subscribe(
            (k: NodeRSA) => console.log(k), // Show NodeRSA instance in console
            e => console.error(e) // Show error in console
        );
    }
}
```

[Back to top](#table-of-contents)

## API in Detail

We implemented some services and to see their details go to documentation folder:

* [./documentation/AESService.md](https://github.com/hapinessjs/crypto-module/blob/master/documentation/AESService.md)
* [./documentation/HashService.md](https://github.com/hapinessjs/crypto-module/blob/master/documentation/HashService.md)
* [./documentation/JWTService.md](https://github.com/hapinessjs/crypto-module/blob/master/documentation/JWTService.md)
* [./documentation/PEMService.md](https://github.com/hapinessjs/crypto-module/blob/master/documentation/PEMService.md)
* [./documentation/RandomstringService.md](https://github.com/hapinessjs/crypto-module/blob/master/documentation/RandomstringService.md)
* [./documentation/RSAService.md](https://github.com/hapinessjs/crypto-module/blob/master/documentation/RSAService.md)

[Back to top](#table-of-contents)

## Contributing

To set up your development environment:

1. clone the repo to your workspace,
2. in the shell `cd` to the main folder,
3. hit `npm or yarn install`,
4. run `npm or yarn run test`.
    * It will lint the code and execute all tests. 
    * The test coverage report can be viewed from `./coverage/lcov-report/index.html`.

[Back to top](#table-of-contents)

## Change History

* v1.0.0-rc.6.2 (2017-08-02)
    * Implementation of `JWTService`
    * Related tests.
    * Documentation.
* v1.0.0-rc.6 (2017-07-28)
    * Implementation of `CryptoModule` with `AESService`, `HashService`, `PEMService`, `RandomstringService` and `RSAService`
    * Implementation of `Observable's` operators for `AESService` and `RSAService` features.
    * Related tests.
    * Documentation.
    * Module version related to core version.

## Maintainers

<table>
    <tr>
        <td colspan="4" align="center"><a href="https://www.tadaweb.com"><img src="https://tadaweb.com/images/tadaweb/logo.png" width="117" alt="tadaweb" /></a></td>
    </tr>
    <tr>
        <td align="center"><a href="https://github.com/Juneil"><img src="https://avatars3.githubusercontent.com/u/6546204?v=3&s=117" width="117"/></a></td>
        <td align="center"><a href="https://github.com/antoinegomez"><img src="https://avatars3.githubusercontent.com/u/997028?v=3&s=117" width="117"/></a></td>
        <td align="center"><a href="https://github.com/reptilbud"><img src="https://avatars3.githubusercontent.com/u/6841511?v=3&s=117" width="117"/></a></td>
        <td align="center"><a href="https://github.com/njl07"><img src="https://avatars3.githubusercontent.com/u/1673977?v=3&s=117" width="117"/></a></td>
    </tr>
    <tr>
        <td align="center"><a href="https://github.com/Juneil">Julien Fauville</a></td>
        <td align="center"><a href="https://github.com/antoinegomez">Antoine Gomez</a></td>
        <td align="center"><a href="https://github.com/reptilbud">Sébastien Ritz</a></td>
        <td align="center"><a href="https://github.com/njl07">Nicolas Jessel</a></td>
    </tr>
</table>

## License

Copyright (c) 2017 **Hapiness** Licensed under the [MIT license](https://github.com/hapinessjs/crypto-module/blob/master/LICENSE.md).

[Back to top](#table-of-contents)
