/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* global exports */
var Profits = (function() {
  //functions describing how profits are caluclated for a given blueberry crop tile

  // TODO: Move profit functions into here from stateManagement

  var Profits = {};

  Profits.calculateLv1Profit = function(board) {
    var blueberryCount = 0,
        treeCount = 0;
    for (var index in board) {
      if (board[index].type === 'blueberries') {
        blueberryCount++;
      }
      else if (board[index].type === 'forest') {
        treeCount++;
      }
    }

    return blueberryCount * treeCount;
  };

  return Profits;
})();

if (typeof (exports) != 'undefined') {
  exports.Profits = Profits;
}
