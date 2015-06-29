/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* global require */
if (typeof (require) != 'undefined') {
  var Tests = require('./tests.js').Tests,
    Profits = require('../js/profits.js').Profits;
}

Tests.addSuite('profits', [
  function() {
    //Test if the method Profits.calculateLv1Profit exists

    Tests.isA(Profits.calculateLv1Profit, 'function');
  },

  function() {
    //Tests of the Profits.calculateLv1Profit method

    //Empty board
    Tests.equals(Profits.calculateLv1Profit([]), 0);

    //intial board
    var cells = [
      {type: 'forest'},
      {type: 'forest'},
      {type: 'forest'},
      {type: 'forest'},
      {type: 'grass'},
      {type: 'grass'},
      {type: 'forest'},
      {type: 'grass'},
      {type: 'grass'}
    ];
    var board = {
      cells: cells,
      width: 3,
      height: 3,
    }
    Tests.equals(Profits.calculateLv1Profit(board), 0.0);
    board.cells[0].type = 'blueberries';
    Tests.equals(Profits.calculateLv1Profit(board), 0.4);
    board.cells[1].type = 'blueberries';
    Tests.equals(Profits.calculateLv1Profit(board), 0.6);
    board.cells[2].type = 'blueberries';
    Tests.equals(Profits.calculateLv1Profit(board), 0.6);
    board.cells[3].type = 'blueberries';
    Tests.equals(Profits.calculateLv1Profit(board), 0.4);
    board.cells[4].type = 'blueberries';
    Tests.equals(Profits.calculateLv1Profit(board), 0.5);
    board.cells[5].type = 'blueberries';
    Tests.equals(Profits.calculateLv1Profit(board), 0.6);
    board.cells[6].type = 'blueberries';
    Tests.equals(Profits.calculateLv1Profit(board), 0.0);
    board.cells[7].type = 'blueberries';
    Tests.equals(Profits.calculateLv1Profit(board), 0.0);
    board.cells[8].type = 'blueberries';
    Tests.equals(Profits.calculateLv1Profit(board), 0.0);
  }

]);
