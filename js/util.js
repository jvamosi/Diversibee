(function() {
  //helper functions and general utilities

  var Utils = {};

  Utils.adjacentCells = function(i) {
    //return a list of cell objects corresponding to the neighbours of cell i

    var neighbours = [],
        j, neighbourIndex;

    //three above:
    for (j = -1; j < 2; j++) {
      neighbourIndex = i - Diversibee.width + j;
      if (neighbourIndex >= 0 && Math.floor(neighbourIndex / Diversibee.width) === Math.floor((i - Diversibee.width) / Diversibee.width)) {
        neighbours.push(Diversibee.board[neighbourIndex]);
      }
    }

    //two beside
    if (i - 1 >= Math.floor(i / Diversibee.width) * Diversibee.width) {
      neighbours.push(Diversibee.board[i - 1]);
    }

    if (i + 1 < Math.floor(i / Diversibee.width) * Diversibee.width + Diversibee.width) {
      neighbours.push(Diversibee.board[i + 1]);
    }

    //three below
    for (j = -1; j < 2; j++) {
      neighbourIndex = i + Diversibee.width + j;
      if (neighbourIndex < Diversibee.width * Diversibee.height && Math.floor(neighbourIndex / Diversibee.width) === Math.floor((i + Diversibee.width) / Diversibee.width)) {
        neighbours.push(Diversibee.board[neighbourIndex]);
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
