/* global require, process */
var tests = require('./tests.js').Tests;
require('./profits.js');
require('./world.js');
require('./tests-of-tests.js');

process.exit(tests.runTests(console.log));
