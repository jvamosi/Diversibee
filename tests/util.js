/* global tests */
tests.addSuite([
    function() {
        //Test if the method Utils.adjacentCells exists

        return tests.equals(typeof(Utils.adjacentCells), 'function');
    },
    function() {
        //Test if the method Utils.inArray exists

        return tests.equals(typeof(Utils.inArray), 'function');
    },
]);
