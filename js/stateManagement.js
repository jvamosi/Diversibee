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
        buttonId: '#tab-level1 a'
      },
      {
        name: '2',
        hash: 'level2',
        buttonId: '#tab-level2 a'
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

  function seedBoard(seedRate, width, height) {
    // Seed the board with tree/grass cells

    return generateCells(width, height);
  }

  function setAnimation(cell) {
    //set up the animation for cell

    var sprite = new createjs.Sprite(Game.store.spriteSheet, cell.type);

    sprite.x = cell.coords.x * Game.width;
    sprite.y = cell.coords.y * Game.height;

    sprite.addEventListener('mousedown', handleCellClick(cell));
    sprite.addEventListener('mouseover', handleCellMouseOver(cell));

    Game.stage.addChild(sprite); // possible memory leak?
    sprite.play(cell.type);
  }

  function handleCellClick(cell) {
    return function() {
      paintCell(cell);

      updateProfitLv1();
    };
  }

  function handleCellMouseOver(cell) {
    return function(e) {
      if (e.nativeEvent.buttons === 1 || e.nativeEvent.buttons === 3) {
        paintCell(cell);
      }

      updateProfitLv1();
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

    //
    //
    // Insert other logic that happens when the level changes.
    //
    //

    // Switch info panels
    $(Game.level.buttonId).click();
  }

  function paintCell(cell) {
    // Use the current painting cell type (registered on mousedown) to update the cell type.

    cell.type = paintCellType;
    setAnimation(cell);
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
    }, 1000);
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

    return blueberryCount * treeCount;
  }

  function updateProfitLv1() {
    var profits = Profits.calculateLv1Profit(Game.board);
    Game.store.profit = profits;
    document.getElementById('profit-value').innerHTML = '$' + profits;
  }

  function calculateProfitLv2()
  {
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

    return totalProfit;
  }

  Game.init = function(width, height) {
    // Initialize the play area on load

    var seedRate = 0.02;
    changeLevel(location.hash.substring(1));

    //declare global store with default values
    Game.width = width;
    Game.height = height;
    Game.board = seedBoard(seedRate, Game.width, Game.height);
    Game.store = {};
    Game.store.animationData = {
      images: ['img/spriteSheet.png'],
      frames: {width:20, height:20},
      animations: {
        grass: [0, 3],
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
