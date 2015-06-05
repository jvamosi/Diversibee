/* global exports, require */
if (typeof (require) != 'undefined') {
  var color = require('colors/safe');
}

var Tests = (function() {
  //Micro tests service

  var tests = {},
    suites = [],
    displayElement,
    result = 0,
    output;

  function _equalsObject(val, expected) {
    //Naive, quick and dirty but working object comparison

    return JSON.stringify(val) === JSON.stringify(expected);
  }

  function _dumpResult(val, linkWord, expected, equals) {
    var result = 'Expected that ' + val + linkWord + expected;
    if (equals) {
      output(result, 'success');
    }
    else {
      output(result, 'error');
    }
  }

  function _outputCLI(text, type) {
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
    var equals = typeof (val) === type;

    _dumpResult(
      (val.toString && val.toString() || val).substring(0, 20) + ' (' + typeof (val) + ')',
      ' is a ',
      type,
      equals
    );

    if (!equals) {
      result = 1;
    }

    return equals;
  };

  tests.addSuite = function(name, suite) {
    suites.push([name, suite]);
  };

  tests.runTests = function(d) {
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
