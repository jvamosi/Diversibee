/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* global exports, Profits, World */

var Diversibee = (function() {

  var Game = {},
    paintCellType,
    cellTypes = {
      grass: 'grass',
      forest: 'forest',
      blueberries: 'blueberries'
    },
    levels = [
      {
        name: '1',
        hash: 'level1',
        buttonId: '#tab-level1 a',
        width: 10,
        height: 10,
        calculateProfit: calculateProfitLv1
      },
      {
        name: '2',
        hash: 'level2',
        buttonId: '#tab-level2 a',
        width: 10,
        height: 10,
        calculateProfit: calculateProfitLv2
      },
      {
        name: '3',
        hash: 'level3',
        buttonId: '#tab-level3 a',
        width: 10,
        height: 10,
        calculateProfit: calculateProfitLv3
      }
    ];

  function generateCell(coord) {
    // Generate a cell with a type and coordinates.

    return {
      type: cellTypes.grass,
      coords: coord
    };
  }

  function generateCells(width, height) {
    // Generate cells for the game board.

    var cells = [];

    for (var y = 0; y < height; y++) {
      for (var x = 0; x < width; x++) {
        cells.push(generateCell(new World.Coord(x, y)));
      }
    }

    return cells;
  }

  // Returns a random integer between min (included) and max (excluded)
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  // Select random value from an array
  function getRandomArrayValue(arr) {
    return arr[getRandomInt(0, arr.length)];
  }

  function updateAnimation(cell) {
    cell.sprite.gotoAndStop(cell.type);
    var animation = Game.store.spriteSheet.getAnimation(cell.type);
    cell.sprite.gotoAndStop(getRandomArrayValue(animation.frames));
  }

  function setAnimation(cell) {
    //set up the animation for cell

    var sprite = new createjs.Sprite(Game.store.spriteSheet, cell.type);

    sprite.x = cell.coords.x * Game.cellWidth;
    sprite.y = cell.coords.y * Game.cellHeight;

    sprite.addEventListener('mousedown', handleCellClick(cell));
    sprite.addEventListener('mouseover', handleCellMouseOver(cell));

    cell.sprite = sprite;
    Game.stage.addChild(sprite);
  }

  function handleCellClick(cell) {
    return function() {
      paintCell(cell);
      updateProfit();
    };
  }

  function handleCellMouseOver(cell) {
    return function(e) {
      if (e.nativeEvent.buttons === 1 || e.nativeEvent.buttons === 3) {
        paintCell(cell);
        updateProfit();
      }
    };
  }

  function getLevelFromHash(hash) {
    for (var index in levels) {
      var level = levels[index];
      if (level.hash === hash) {
        return level;
      }
    }

    return levels[0];
  }

  function changeLevel(hash) {
    // Change level based on URL hash.

    Game.level = getLevelFromHash(hash);

    Game.board = {
      cells: generateCells(Game.level.width, Game.level.height),
      width: Game.level.width,
      height: Game.level.height,
      boardIndex: function(coord) {
        return this.width * coord.y + coord.x;
      }
    };

    var canvasWidth = Game.level.width *  Game.cellWidth;
    var canvasHeight = Game.level.height *  Game.cellHeight;
    var gameBoard = document.getElementById('board');
    gameBoard.width = canvasWidth;
    gameBoard.height = canvasHeight;

    Game.stage = new createjs.Stage('board');
    Game.stage.tickOnUpdate = false;
    Game.stage.enableMouseOver(10);
    Game.store.spriteSheet = new createjs.SpriteSheet(Game.store.animationData);

    //set up initial cell animations
    Game.board.cells.forEach(function(cell) {
      setAnimation(cell);
    });

    updateProfit();

    // draw the new state of the board
    redrawBoard();
  }

  function paintCell(cell) {
    // Use the current painting cell type (registered on mousedown) to update the cell type.

    cell.type = paintCellType;
    updateAnimation(cell);
    Game.stage.update();
  }

  function redrawBoard() {
    // Redraws the board state

    if (Game.store.animationLoop) {
      clearInterval(Game.store.animationLoop);
    }

    Game.stage.update();
    Game.store.animationLoop = setInterval(function() {
      Game.stage.update();
      Game.stage.tick();
    }, 500);
  }

  function calculateProfitLv1() {
    return Profits.calculateLv1Profit(Game.board);
  }

  function updateProfit() {
    Game.store.previousProfit = Game.store.profit;
    Game.store.profit = Game.level.calculateProfit();

    displayProfit();
  }

  function calculateProfitLv2() {
    return Profits.calculateLv2Profit(Game.board);
  }

  function calculateProfitLv3() {
    return Profits.calculateLv3Profit(Game.board);
  }

  function displayProfit() {
    var indicatorClass = 'fa fa-minus-circle';

    if (Game.store.previousProfit > Game.store.profit) {
      indicatorClass = 'fa fa-chevron-circle-down';
    }
    else if (Game.store.previousProfit < Game.store.profit) {
      indicatorClass = 'fa fa-chevron-circle-up';
    }

    $('#profit-indicator').attr('class', indicatorClass);
    $('#profit-value').html('$' + Game.store.profit.toFixed(2));
  }

  Game.init = function() {
    // Initialize the play area on load

    var hash = location.hash.substring(1);
    Game.level = getLevelFromHash(hash);

    Game.cellWidth = 20;
    Game.cellHeight = 20;

    //declare global store with default values
    Game.store = {};
    Game.store.animationData = {
      images: ['img/spriteSheet.png'],
      frames: {width:20, height:20},
      animations: {
        grass: [3, 3],
        forest: [4, 7],
        blueberries: [8, 11]
      }
    };

    changeLevel(hash);

    // allow level change by adding hash to url
    window.onhashchange = function() { changeLevel(location.hash.substring(1)); };

    $(Game.level.buttonId).click();
  };

  Game.setPaintType = function(paintType) {
    paintCellType = paintType;
  };

  Game.setPaintType('blueberries');

  return Game;
})();

if (typeof (exports) != 'undefined') {
  exports.Diversibee = Diversibee;
}
