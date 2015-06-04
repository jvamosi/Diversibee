/* global tests */
tests.addSuite([
    function() {
        //Test if the method Utils.adjacentCells exists

        return tests.isA(Utils.adjacentCells, 'function');
    },
    function() {
        //Test if the method Utils.inArray exists

        return tests.isA(Utils.inArray, 'function');
    },
]);
