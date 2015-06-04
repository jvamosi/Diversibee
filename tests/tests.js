(function() {
    //Micro tests service

    var tests = {},
        suites = [],
        displayElement;

    function _equalsObject(val, expected) {
        //Naive, quick and dirty but working object comparison

        return JSON.stringify(val) === JSON.stringify(expected) ;
    }

    function _dumpResult(val, linkWord, expected, equals) {
        var result = 'Expected that ' + val + linkWord + expected;
        if(equals) {
            displayElement.innerHTML += '<div class="success">' + result + '</div>';
        }
        else {
            displayElement.innerHTML += '<div class="error">' + result + '</div>';
        }
    }

    tests.equals = function(val, expected) {
        // Return true if val and expected are strictly equals

        var equals,
            type = typeof(val);

        if(type != typeof(expected)) {
            equals = false;
        }
        else {
            switch (type) {
                case 'undefined':
                    equals = true;
                    break;
                case 'object':
                    equals = _equalsObject(val, expected);
                    break;
                case 'boolean':
                case 'number':
                case 'string':
                    equals = val === expected;
                    break;
                case 'function':
                    equals = val.toString() === expected.toString();
                    break;
                default:
                    equals = val === expected;
                    break;
            }
        }

        _dumpResult(
            val.toString && val.toString() || val,
            ' equals ',
            expected.toString && expected.toString() || expected,
            equals
        );
        return equals;
    };

    tests.addSuite = function(suite) {
        suites.push(suite);
    };

    tests.runTests = function(d) {
        var s, t;

        displayElement = d;

        for(s = 0; s < suites.length; s++) {
            for (t = 0; t < suites[s].length; t++) {
                suites[s][t]();
            }
        }
    };

    window.tests = tests;
})();
