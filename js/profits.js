/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* global exports */
var Profits = (function() {
  //functions describing how profits are caluclated for a given blueberry crop tile

  var Profits = {};

  Profits.calculateLv1Profit = function(board) {
    var blueberryCount = 0,
        treeCount = 0;
    for (var index in board.cells) {
      if (board.cells[index].type === 'blueberries') {
        blueberryCount++;
      }
      else if (board.cells[index].type === 'forest') {
        treeCount++;
      }
    }

    return blueberryCount * Math.max(treeCount, 0.1) / 10;
  };

  Profits.calculateLv2Profit = function(board) {
    var totalProfit = 0;

    // Iterate over all blueberry cells
    board.cells.forEach(function(cell, index) {
      if (cell.type === 'blueberries') {
        var neighbours = Utils.adjacentCells(index);
        var treeCount = 0;
        var cellProfit = 0;

        // Get number of trees in surrounding cells
        for (var neighIndex in neighbours) {
          if (neighbours[neighIndex].type === 'forest') {
            treeCount++;
          }
        }

        // Calculate Profit for cell
        if (treeCount < 6) {
          cellProfit = 0.1 + (0.9 / 6.0) * treeCount;
        } else {
          cellProfit = 1;
        }

        // Add to total
        totalProfit += cellProfit;
      }
    });

    return totalProfit * 10;
  };

  Profits.calculateLv3Profit = function(board) {
    var totalProfit = 0;
    var beesInCell = [];
    board.cells.forEach(function() {
      beesInCell.push(0);
    });

    board.cells.forEach(function(cell, index) {
      if (cell.type === 'forest') {
        var neighbours = Utils.adjacentCells(index);
        var forestCount = 1; // include self
        neighbours.forEach(function(neighbourCell) {
          if (neighbourCell.type === 'forest') {
            forestCount++;
          }
        });

        beesInCell[index] = forestCount;
      }
    });

    // Iterate over all blueberry cells
    board.cells.forEach(function(cell, index) {
      if (cell.type === 'blueberries') {
        var neighbours = Utils.adjacentCells(index);
        var cellProfit = 0;
        var contribution = 0;

        // Calculate number of bee in surrounding cells
        neighbours.forEach(function(neighbourCell) {
          if (neighbourCell.type === 'forest') {
            contribution += beesInCell[board.boardIndex(neighbourCell.coords)];
          }
        });

        // Calculate Profit for cell
        if (contribution < 7) {
          cellProfit = 0.1 + (0.9 / 7.0) * contribution;
        } else {
          cellProfit = 1;
        }

        // Add to total
        totalProfit += cellProfit;
      }
    });

    return totalProfit * 10;
  };

  return Profits;
})();

if (typeof (exports) != 'undefined') {
  exports.Profits = Profits;
}
