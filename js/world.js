/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* global exports */
var World = (function() {
  // Collection of class to work on the world, geometry....
  // Calculate distance between cells,
  // Manipulate coordinates...

  var World = {};

  World.Coord = function(x, y) {
    this.x = x;
    this.y = y;
  };

  World.Coord.prototype.distanceFrom = function(coord) {
    // Returns the distance between this coord and another (pythagoras)

    var xDiff = Math.abs(this.x - coord.x),
      yDiff = Math.abs(this.y - coord.y);

    // c^2 = a^2 + b^2
    return Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
  };

  return World;
})();

if (typeof (exports) != 'undefined') {
  exports.World = World;
}
