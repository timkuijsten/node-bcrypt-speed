# bcrypt-speed

Determine the maximum level of security for some hardware given the maximum time
that can be spent on login.

Using a fixed amount of time (and thus having an assured user experience) this
module runs a couple of different bcrypt implementations so that the optimum
number of rounds can be found given some hardware and the time that a login 
may take (i.e. Apple uses 80ms for unlocking [*](http://www.darthnull.org/2014/10/06/ios-encryption)).

Note: this package should be run on the target production hardware to get a good estimate.

The following packages are currently tested:
* [bcrypt-nodejs](https://www.npmjs.org/package/bcrypt-nodejs) (pure js, no deps)
* [twin-bcrypt](https://www.npmjs.org/package/twin-bcrypt) (pure js, no deps, asm.js)
* [bcryptjs](https://www.npmjs.org/package/bcryptjs) (pure js, no deps)
* [bcrypt](https://www.npmjs.org/package/bcrypt) (c++, has deps)

Any suggestions on other bcrypt implementations are welcome.

## Usage

    $ node bcrypt-speed.js [maxtime]

A maxtime is optional and defaults to 100ms. This should be the maximum time you
want to let your users wait while you're verifying their password.

## Example

Example run on a 3 GHz core:

    $ node bcrypt-speed.js
    test duration per number of rounds, up to 100ms

    bcrypt-nodejs (pure js, no deps)
    rounds  ms
      4      7
      5      9
      6     17
      7     34
      8     57
      9    114

    twin-bcrypt (pure js, no deps, asm.js)
    rounds  ms
      4      7
      5      7
      6     13
      7     24
      8     49
      9     97
     10    186

    bcryptjs (pure js, no deps)
    rounds  ms
      4      6
      5      9
      6     16
      7     31
      8     60
      9    113

    bcrypt (c++, has deps)
    rounds  ms
      4      1
      5      2
      6      4
      7     10
      8     19
      9     40
     10     75
     11    153

## License

MIT, see LICENSE
