# bcrypt-speed

Determine the maximum number of rounds on the current machine for different
bcrypt implementations using a fixed amount of time (and thus having an assured
user experience).

This package should be run on the target production server to determine the
maximum level of security (number of rounds) given a constant amount of time.

The following packages are currently tested:
* [bcrypt-nodejs](https://www.npmjs.org/package/bcrypt-nodejs) (pure js, no deps)
* [twin-bcrypt](https://www.npmjs.org/package/twin-bcrypt) (pure js, no deps, asm.js)
* [bcryptjs](https://www.npmjs.org/package/bcryptjs) (pure js, no deps)
* [bcrypt](https://www.npmjs.org/package/bcrypt) (c++, has deps)

Any suggestions on other bcrypt implementations are welcome.

## Usage

    $ node bcrypt-speed.js [time]

A time is optional and defaults to 100ms.

## Example

Example run on a 3 GHz core:

    $ node bcrypt-speed.js
    test duration per number of rounds, up to 100ms

    bcrypt-nodejs (pure js, no deps)
    round   ms
      4      7
      5      8
      6     16
      7     30
      8     57
      9    107

    twin-bcrypt (pure js, no deps, asm.js)
    round   ms
      4     10
      5     16
      6     31
      7     53
      8    110

    bcryptjs (pure js, no deps)
    round   ms
      4      7
      5      8
      6     18
      7     32
      8     58
      9    112

    bcrypt (c++, has deps)
    round   ms
      4      1
      5      2
      6      4
      7      9
      8     18
      9     37
     10     75
     11    144

## License

MIT, see LICENSE
