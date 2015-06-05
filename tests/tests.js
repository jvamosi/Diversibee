/* global exports, require */
if (typeof (require) != 'undefined') {
  var color = require('colors/safe');
}

var Tests = (function() {
  //Micro tests service

  // The tests library
  var tests = {},
    // the collection of test suites
    suites = [],
    // Where to display the results (at the moment can be console.log or
    // a DOM node
    displayElement,
    // The result of a run of tests, 0 if ok, 1 if at least a test fails
    // Used as exit code for cli run
    result = 0,
    // Function to call to print the output
    output;

  function _equalsObject(val, expected) {
    // Naive, quick and dirty but working object comparison

    return JSON.stringify(val) === JSON.stringify(expected);
  }

  function _dumpResult(val, linkWord, expected, equals) {
    // Method used to dump a sum up of a test's result.
    // It will call output() which has been set when starting to run the
    // suite.

    var result = 'Expected that ' + val + linkWord + expected;
    if (equals) {
      output(result, 'success');
    }
    else {
      output(result, 'error');
    }
  }

  function _outputCLI(text, type) {
    // Prints a result on stdout, to run the scripts in command line
    // To be used in travis for example.

    switch (type) {
      case 'title':
        displayElement(text);
        break;
      case 'success':
        displayElement(color.green('success - ' + text));
        break;
      case 'error':
        displayElement(color.red('error - ' + text));
        break;
    }
  }

  function _outputHTML(text, type) {
    // Prints a result in a DOM node, by appending the text in the
    // node's innerHTML attribute

    switch (type) {
      case 'title':
        displayElement.innerHTML += '<h2>' + text + '</h2>';
        break;
      case 'success':
        displayElement.innerHTML += '<div class="success">' + text + '</div>';
        break;
      case 'error':
        displayElement.innerHTML += '<div class="error">' + text + '</div>';
        break;
    }
  }

  tests.equals = function(val, expected) {
    // Return true if val and expected are strictly equals

    var equals,
    type = typeof (val);

    if (type != typeof (expected)) {
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
      val && val.toString && val.toString() || val,
      ' equals ',
      expected && expected.toString && expected.toString() || expected,
      equals
    );

    if (!equals) {
      result = 1;
    }

    return equals;
  };

  tests.isA = function(val, type) {
    // Returns true if val is of type type.

    var typeVal = typeof (val),
      equals = typeVal === type;

    if (typeVal == 'undefined') {
      _dumpResult(
        typeVal,
        ' is a ',
        type,
        equals
      );
    }
    else {
      _dumpResult(
        (val.toString && val.toString() || val).substring(0, 20) + ' (' + typeof (val) + ')',
        ' is a ',
        type,
        equals
      );
    }

    if (!equals) {
      result = 1;
    }

    return equals;
  };

  tests.addSuite = function(name, suite) {
    // Add a suite to the collection to be tested. A suite has a name
    // and an array of functions

    suites.push([name, suite]);
  };

  tests.runTests = function(d) {
    // Main method to run the tests, will define output from d (display
    // element). If d is a function (for example console.log), at the
    // moment to display the results, output will be invoked.
    // Otherwise, d is considered as a DOM node.
    // Note that calling runTests in a browser with console.log as param
    // fails with the following exception:
    // Uncaught TypeError: Illegal invocation

    var s, t;

    result = 0;
    displayElement = d;
    if (typeof (displayElement) == 'function') {
      output = _outputCLI;
    }
    else {
      output = _outputHTML;
    }

    for (s = 0; s < suites.length; s++) {
      output('Tests for ' + suites[s][0], 'title');
      for (t = 0; t < suites[s][1].length; t++) {
        suites[s][1][t]();
      }
    }

    return result;
  };

  return tests;
})();

if (typeof (exports) != 'undefined') {
  exports.Tests = Tests;
}
