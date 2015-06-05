/* global require, process */
var tests = require('./tests.js').Tests;
require('./profits.js');
require('./util.js');
require('./world.js');

process.exit(tests.runTests(console.log));
