/* global exports */
var Diversibee = (function() {

  var Game = {},
      paintCellType,
      cellTypes = {
        grass: 'grass',
        forest: 'forest',
        blueberries: 'blueberries'
      },
      levels = [{
        name: '1',
        hash: 'level1'
      }],
      Coord = function(x, y) {
        this.x = x;
        this.y = y;
      };

  Coord.prototype.distanceFrom = function(coord) {
    // Returns the distance between this coord and another (pythagoras)

    var xDiff = Math.abs(this.x - coord.x),
        yDiff = Math.abs(this.y - coord.y);

    // c^2 = a^2 + b^2
    return Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
  };

  function generateType(coord, seeds) {
    // Generate the cell type based on the distance from seeds (close to seed = forest)

    var distanceFromSeedCell = distanceFromSeed(coord, seeds);
    return shouldGrowForest(distanceFromSeedCell) ? cellTypes.forest : cellTypes.grass;
  }

  function generateCell(coord, seeds) {
    // Generate a cell with a type and coordinates.

    return {
      type: generateType(coord, seeds),
      coords: coord
    };
  }

  function generateCells(width, height, seeds) {
    // Generate cells for the game board.

    var cells = [];

    for (var x = 0; x < width; x++) {
      for (var y = 0; y < height; y++) {
        cells.push(generateCell(new Coord(x, y), seeds));
      }
    }

    return cells;
  }

  function distanceFromSeed(coords, seeds) {
    //Returns the distance from a cell to the closest seed (seeds are given as an array of cell locations)

    return seeds.reduce(function(prevDistance, seed) {
      return Math.min(prevDistance, coords.distanceFrom(seed));
    }, Number.MAX_SAFE_INTEGER);
  }

  function shouldGrowForest(distanceFromSeedCell) {
    // A simple forest growth algorithm which clusters around seed locations

    return (distanceFromSeedCell * 1.25) + (distanceFromSeedCell * Math.random()) < 5;
  }

  function generateRandomSeeds(height, width, numberOfCells) {
    // Generate a set of random seed coords to determine where trees are placed.

    var randomCoords = [];

    for (var i = 0; i < numberOfCells; i++) {
      var x = Math.floor(Math.random() * width),
          y = Math.floor(Math.random() * height);
      randomCoords.push(new Coord(x, y));
    }

    return randomCoords;
  }

  function seedBoard(seedRate, width, height) {
    // Seed the board with tree/grass cells

    var seed = generateRandomSeeds(height, width, (height * width * seedRate));
    return generateCells(width, height, seed);
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
      paintCellType = (cell.type === cellTypes.blueberries) ? cellTypes.forest : cellTypes.blueberries;
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
    }, 300);
  }

  function calculateLv1Profit() {
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
    var profits = calculateLv1Profit();
    Game.store.profit = profits;
    document.getElementById('profit-value').innerHTML = '$' + profits;
  }

  function initLevel() {

    var currentLevel = levels[0];

    levels.forEach(function(level) {
      if (window.location.hash === level.hash) {
        currentLevel = level;
      }
    });

    return currentLevel;
  }

  Game.init = function(width, height) {
    // Initialize the play area on load

    var seedRate = 0.02;
    Game.level = initLevel();

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

    //draw the initial state of the board
    redrawBoard();
  };

  return Game;
})();

if (typeof (exports) != 'undefined') {
  exports.Diversibee = Diversibee;
}
