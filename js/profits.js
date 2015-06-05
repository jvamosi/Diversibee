/* global exports */
var Profits = (function() {
  //functions describing how profits are caluclated for a given blueberry crop tile

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
  }

  return Profits;
})();

if (typeof (exports) != 'undefined') {
  exports.Profits = Profits;
}
