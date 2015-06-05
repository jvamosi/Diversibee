/* global require */
if (typeof (require) != 'undefined') {
  var Tests = require('./tests.js').Tests,
    World = require('../js/world.js').World;
}

Tests.addSuite('world', [
  function() {
    //Test if the method World.Coord exists

    Tests.isA(World.Coord, 'function');
  },

  function() {
    //Test of the object World.Coord

    /*
     * Will calculate the distance from c1 to all the others to cover
     * all the directions
     * c2  c3  c4
     *    \ | /
     *     \|/
     * c5---c1--c6
     *    / |\
     *   /  | \
     * c7  c8  c9
     */
    var c1 = new World.Coord(2, 2);
    var c2 = new World.Coord(0, 0);
    var c3 = new World.Coord(2, 0);
    var c4 = new World.Coord(4, 0);
    var c5 = new World.Coord(0, 2);
    var c6 = new World.Coord(4, 2);
    var c7 = new World.Coord(0, 4);
    var c8 = new World.Coord(2, 4);
    var c9 = new World.Coord(4, 4);

    Tests.equals(c1.distanceFrom(c2), 2 * Math.sqrt(2));
    Tests.equals(c1.distanceFrom(c3), 2);
    Tests.equals(c1.distanceFrom(c4), 2 * Math.sqrt(2));
    Tests.equals(c1.distanceFrom(c5), 2);
    Tests.equals(c1.distanceFrom(c6), 2);
    Tests.equals(c1.distanceFrom(c7), 2 * Math.sqrt(2));
    Tests.equals(c1.distanceFrom(c8), 2);
    Tests.equals(c1.distanceFrom(c9), 2 * Math.sqrt(2));
  }

]);
