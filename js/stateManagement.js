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
      }

      updateProfit();
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

    //declare global store with default values
    Game.cellWidth = 20;
    Game.cellHeight = 20;
    Game.board = generateCells(Game.level.width, Game.level.height);

    var canvasWidth = Game.level.width *  Game.cellWidth;
    var canvasHeight = Game.level.height *  Game.cellHeight;
    var gameBoard = document.getElementById('board');
    gameBoard.width = canvasWidth;
    gameBoard.height = canvasHeight;

    Game.stage.removeAllChildren();
    Game.stage = new createjs.Stage('board');
    Game.stage.tickOnUpdate = false;
    Game.stage.enableMouseOver(10);
    Game.store.spriteSheet = new createjs.SpriteSheet(Game.store.animationData);

    //set up initial cell animations
    for (var index in Game.board) {
      setAnimation(Game.board[index]);
    }

    updateProfit();

    // draw the initial state of the board
    redrawBoard();

    // allow level change by adding hash to url
    window.onhashchange = function() { changeLevel(location.hash.substring(1)); };

    $(Game.level.buttonId).click();
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
    var blueberryCount = 0;
    var treeCount = 0;
    for (var index in Game.board) {
      if (Game.board[index].type === 'blueberries') {
        blueberryCount++;
      }
      else if (Game.board[index].type === 'forest') {
        treeCount++;
      }
    }

    return blueberryCount * treeCount / 10.0;
  }

  function updateProfit() {
    Game.store.profit = Game.level.calculateProfit();
    displayProfit();
  }

  function displayProfit() {
    document.getElementById('profit-value').innerHTML = '$' + Game.store.profit.toFixed(2);
  }

  function calculateProfitLv2() {
    var totalProfit = 0;

    // Iterate over all blueberry cells
    Game.board.forEach(function(cell, index) {
      if (cell.type === cellTypes.blueberries) {
        var neighbours = Utils.adjacentCells(index);
        var treeCount = 0;
        var cellProfit = 0;

        // Get number of trees in surrounding cells
        for (var neighIndex in neighbours) {
          if (neighbours[neighIndex].type === cellTypes.forest) {
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
  }

  function calculateProfitLv3() {
    var totalProfit = 0;
    var beesInCell = [];
    Game.board.forEach(function() {
      beesInCell.push(0);
    });

    Game.board.forEach(function(cell, index) {
      if (cell.type === cellTypes.forest) {
        var neighbours = Utils.adjacentCells(index);
        var forestCount = 1; // include self
        neighbours.forEach(function(neighbourCell) {
          if (neighbourCell.type === cellTypes.forest) {
            forestCount++;
          }
        });

        beesInCell[index] = forestCount;
      }
    });

    // Iterate over all blueberry cells
    Game.board.forEach(function(cell, index) {
      if (cell.type === cellTypes.blueberries) {
        var neighbours = Utils.adjacentCells(index);
        var cellProfit = 0;
        var contribution = 0;

        // Calculate number of bee in surrounding cells
        neighbours.forEach(function(neighbourCell) {
          if (neighbourCell.type === cellTypes.forest) {
            contribution += (1.0 / 7.0) * beesInCell[boardIndex(neighbourCell.coords)];
          }
        });

        // Calculate Profit for cell
        if (contribution <= 1) {
          cellProfit = 0.1 + (0.9 / 6.0) * contribution;
        } else {
          cellProfit = 1;
        }

        // Add to total
        totalProfit += cellProfit;
      }
    });

    return totalProfit * 10;
  }

  function boardIndex(coord) {
    return Game.level.width * coord.y + coord.x;
  }

  Game.init = function() {
    // Initialize the play area on load

    Game.level = getLevelFromHash(location.hash.substring(1));

    //declare global store with default values
    Game.cellWidth = 20;
    Game.cellHeight = 20;
    Game.board = generateCells(Game.level.width, Game.level.height);
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

    Game.stage = new createjs.Stage('board');
    Game.stage.tickOnUpdate = false;
    Game.stage.enableMouseOver(10);
    Game.store.spriteSheet = new createjs.SpriteSheet(Game.store.animationData);

    //set up initial cell animations
    for (var index in Game.board) {
      setAnimation(Game.board[index]);
    }

    changeLevel(location.hash.substring(1));

    // draw the initial state of the board
    redrawBoard();

    // allow level change by adding hash to url
    window.onhashchange = function() { changeLevel(location.hash.substring(1)); };
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
