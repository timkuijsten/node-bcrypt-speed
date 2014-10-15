/**
 * Copyright (c) 2014 Tim Kuijsten
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

'use strict';

var bcryptNodejs = require('bcrypt-nodejs');
var twinBcrypt = require('twin-bcrypt');
var bcryptjs = require('bcryptjs');
var bcrypt = require('bcrypt');

var maxDuration = Number(process.argv[2]) || 100;
console.log('test duration per number of rounds, up to ' + maxDuration + 'ms');

var start, duration, salt, hash, rounds;

/////////////////////////////////////////////////////////////////////
// bcrypt-nodejs
rounds = 3;

console.log('\nbcrypt-nodejs (pure js, no deps)');
console.log('rounds', ' ms');

do {
  rounds++;
  salt = bcryptNodejs.genSaltSync(rounds);
  start = new Date();
  hash = bcryptNodejs.hashSync('somepass', salt);
  duration = new Date() - start.getTime();
  console.log(('   ' + rounds).slice(-3), ('     ' + duration).slice(-6));
} while (duration < maxDuration);


/////////////////////////////////////////////////////////////////////
// twin-bcrypt
rounds = 3;

console.log('\ntwin-bcrypt (pure js, no deps, asm.js)');
console.log('rounds', ' ms');

do {
  rounds++;
  salt = twinBcrypt.genSalt(rounds);
  start = new Date();
  hash = twinBcrypt.hashSync('somepass', salt);
  duration = new Date() - start.getTime();
  console.log(('   ' + rounds).slice(-3), ('     ' + duration).slice(-6));
} while (duration < maxDuration);


/////////////////////////////////////////////////////////////////////
// bcryptjs
rounds = 3;

console.log('\nbcryptjs (pure js, no deps)');
console.log('rounds', ' ms');

do {
  rounds++;
  salt = bcryptjs.genSaltSync(rounds);
  start = new Date();
  hash = bcryptjs.hashSync('somepass', salt);
  duration = new Date() - start.getTime();
  console.log(('   ' + rounds).slice(-3), ('     ' + duration).slice(-6));
} while (duration < maxDuration);


/////////////////////////////////////////////////////////////////////
// bcrypt
rounds = 3;

console.log('\nbcrypt (c++, has deps)');
console.log('rounds', ' ms');

do {
  rounds++;
  salt = bcrypt.genSaltSync(rounds);
  start = new Date();
  hash = bcrypt.hashSync('somepass', salt);
  duration = new Date() - start.getTime();
  console.log(('   ' + rounds).slice(-3), ('     ' + duration).slice(-6));
} while (duration < maxDuration);
