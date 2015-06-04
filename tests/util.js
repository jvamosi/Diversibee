/* global tests */
tests.addSuite('util', [
    function() {
        //Test if the method Utils.inArray exists

        tests.isA(Utils.inArray, 'function');
    },
    function() {
        //Test Utils.inArray

        //Test if an element is in an empty array
        tests.equals(Utils.inArray(1, []), false);

        //Test if an element is not in an array
        tests.equals(Utils.inArray(1, [2, 3]), false);

        //Test if an element is in an array
        tests.equals(Utils.inArray(1, [1, 2]), true);

        //Test if an element is in an array but with a different type
        tests.equals(Utils.inArray(1, ['1', 2]), false);
    }
]);
