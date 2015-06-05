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
