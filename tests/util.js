/* global require */
if (typeof (require) != 'undefined') {
    var Tests = require('./tests.js').Tests,
        Utils = require('../js/util.js').Utils;
}

Tests.addSuite('util', [
    function() {
        //Test if the method Utils.inArray exists

        Tests.isA(Utils.inArray, 'function');
    },
    function() {
        //Test Utils.inArray

        //Test if an element is in an empty array
        Tests.equals(Utils.inArray(1, []), false);

        //Test if an element is not in an array
        Tests.equals(Utils.inArray(1, [2, 3]), false);

        //Test if an element is in an array
        Tests.equals(Utils.inArray(1, [1, 2]), true);

        //Test if an element is in an array but with a different type
        Tests.equals(Utils.inArray(1, ['1', 2]), false);
    }
]);
