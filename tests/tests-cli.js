/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* global require, process */
var tests = require('./tests.js').Tests;
require('./profits.js');
require('./world.js');
require('./tests-of-tests.js');

process.exit(tests.runTests(console.log));
