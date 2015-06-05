/* global exports */
var Utils = (function() {
  //helper functions and general utilities

  var Utils = {};

  Utils.inArray = function(needle, haystack) {
    //Determine if item is in array
    //Borrowed from: http://stackoverflow.com/questions/784012/javascript-equivalent-of-phps-in-array
    var length = haystack.length,
      i;

    for (i = 0; i < length; i++) {
      if (haystack[i] === needle) {
        return true;
      }
    }

    return false;
  };

  return Utils;
})();

if (typeof (exports) != 'undefined') {
  exports.Utils = Utils;
}
