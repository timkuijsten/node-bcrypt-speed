/**
 * Copyright (c) 2014, 2015 Tim Kuijsten
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */

'use strict';

var bcryptNodejs = require('bcrypt-nodejs');
var twinBcrypt = require('twin-bcrypt');
var bcryptjs = require('bcryptjs');
var bcrypt = require('bcrypt');
var async = require('async');

var maxDuration = Number(process.argv[2]) || 500;
console.log('test duration per number of rounds, up to ' + maxDuration + 'ms');

var start, duration, salt, hash, rounds;

var tests = [];

function idle(cb) {
  setTimeout(cb, 200);
}

/////////////////////////////////////////////////////////////////////
// bcrypt-nodejs
function testBcryptNodejs(cb){

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

  cb();
}
/////////////////////////////////////////////////////////////////////
// twin-bcrypt
function testTwinBcrypt(cb){

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

  cb();
}
/////////////////////////////////////////////////////////////////////
// bcryptjs
function testBcryptjs(cb){

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

  cb();
}
/////////////////////////////////////////////////////////////////////
// bcrypt
function testBcrypt(cb){

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

  cb();
}

tests.push(idle, testBcryptNodejs);
tests.push(idle, testTwinBcrypt);
tests.push(idle, testBcryptjs);
if (!process.browser) { tests.push(idle, testBcrypt); }

async.series(tests);
