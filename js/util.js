(function() {
  //helper functions and general utilities

  var Utils = {};

  Utils.adjacentCells = function(i) {
    //return a list of cell objects corresponding to the neighbours of cell i

    var neighbours = [],
        j, neighbourIndex;

    //three above:
    for (j = -1; j < 2; j++) {
      neighbourIndex = i - Diversibee.store.width + j;
      if (neighbourIndex >= 0 && Math.floor(neighbourIndex / Diversibee.store.width) === Math.floor((i - Diversibee.store.width) / Diversibee.store.width)) {
        neighbours.push(Diversibee.store.state[neighbourIndex]);
      }
    }

    //two beside
    if (i - 1 > Math.floor(i / Diversibee.store.width) * Diversibee.store.width) {
      neighbours.push(Diversibee.store.state[i - 1]);
    }

    if (i + 1 < Math.floor(i / Diversibee.store.width) * Diversibee.store.width + Diversibee.store.width) {
      neighbours.push(Diversibee.store.state[i + 1]);
    }

    //three below
    for (j = -1; j < 2; j++) {
      neighbourIndex = i + Diversibee.store.width + j;
      if (neighbourIndex < Diversibee.store.width * Diversibee.store.height && Math.floor(neighbourIndex / Diversibee.store.width) === Math.floor((i + Diversibee.store.width) / Diversibee.store.width)) {
        neighbours.push(Diversibee.store.state[neighbourIndex]);
      }
    }

    return neighbours;
  };

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

  window.Utils = Utils;

})();
