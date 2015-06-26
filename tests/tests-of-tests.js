/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* global require */
if (typeof (require) != 'undefined') {
  var Tests = require('./tests.js').Tests;
}

Tests.addSuite('tests', [
  function() {
    //Test if the method Tests.isA exists (A bit recursive logic...)

    Tests.isA(Tests.isA, 'function');
  },

  function() {
    //Test of the method Tests.isA

    var integer = 1,
        float = 1.1,
        str = 'hello',
        array = ['hello', 'world'],
        obj = {hello: 'world'},
        bool = true,
        func = function() {return 'Hello World';};

    Tests.isA(integer, 'number');
    Tests.isA(float, 'number');
    Tests.isA(str, 'string');
    Tests.isA(array, 'object');
    Tests.isA(obj, 'object');
    Tests.isA(bool, 'boolean');
    Tests.isA(func, 'function');
    Tests.isA(new func(), 'object');
  },

  function() {
    //Test if the method Tests.equals exists

    Tests.isA(Tests.equals, 'function');
  },

  function() {
    //Test of the method Tests.isA

    var integer = 1,
        float = 1.1,
        str = 'hello',
        array = ['hello', 'world'],
        obj = {hello: 'world'},
        bool = true,
        func = function() {return 'Hello World';};

    Tests.equals(integer, 1);
    Tests.equals(float, 1.1);
    Tests.equals(str, 'hello');
    Tests.equals(array, ['hello', 'world']);
    Tests.equals(obj, {hello: 'world'});
    Tests.equals(bool, true);
    Tests.equals(func, function() {return 'Hello World';});
  },

]);
