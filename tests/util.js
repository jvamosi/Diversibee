/* global tests */
tests.addSuite([
    function() {
        //Test if the method Utils.adjacentCells exists

        tests.isA(Utils.adjacentCells, 'function');
    },
    function() {
        //Test if the method Utils.inArray exists

        tests.isA(Utils.inArray, 'function');
    },
]);
