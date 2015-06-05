(function() {
  //functions managing & updating the game state data, consisting of the `store` object and
  //visualization in the browser.

  var Diversibee = {};
  var paintCellType;

  /**
   * Private methods
   */
  function setUpBoardState(cellsWide, cellsHigh) {
    // initializes board state

    var cells = [],
        distanceFromSeedCell,
        isForest,
        i,

        //The likelihood a cell contains a 'seed'; probability bound 0 <= seedRate <= 1
        seedRate = 0.02,

        //Cells containing an initial 'seed'. Seeds are used to determine the inital forest growth
        seededCells = generateUniqueRandomCells(cellsHigh, cellsWide, (cellsHigh * cellsWide * seedRate));

    for (i = 0; i < cellsWide * cellsHigh; i++) {
      distanceFromSeedCell = distancefromSeed(i, cellsWide, seededCells);

      //Does this cell initially become a forest based on the cell's seed proximity
      isForest = shouldGrowForest(distanceFromSeedCell);

      if (isForest) {
        setCellType(i, cells, 'forest');
      } else {
        setCellType(i, cells, 'grass');
      }
    }

    return cells;
  }

  function setUpBoardStateLv1(cellsWide, cellsHigh) {
    //Initializes board state for level one

    var cells = [];

    for (i = 0; i < cellsWide * cellsHigh; i++) {
      addToCell(i, cells, 'forest');
    }

    return cells;
  }

  function setCellType(i, cells, typeName) {
    cells[ i ] = { type: typeName };
  }

  function setAnimation(i) {
    //set up the animation for cell i

    Diversibee.store.mapCell[i] = new createjs.Sprite(Diversibee.store.spriteSheet, Diversibee.store.state[i].type);
    Diversibee.store.mapCell[i].x = 20 * (i % Diversibee.store.width);
    Diversibee.store.mapCell[i].y = 20 * Math.floor(i / Diversibee.store.width);

    Diversibee.store.mapCell[i].addEventListener('mousedown', handleCellClick(i));
    Diversibee.store.mapCell[i].addEventListener('mouseover', handleCellMouseOver(i));

    Diversibee.store.stage.addChild(Diversibee.store.mapCell[i]);
    Diversibee.store.mapCell[i].play(Diversibee.store.state[i].type);
  }

  function handleCellClick(i) {
    return function(e) {
      paintCellType = Diversibee.store.state[i].type === 'blueberries' ? 'forest' : 'blueberries';
      paintCell(i);
      updateProfitLv1();
    };
  }

  function handleCellMouseOver(i) {
    return function(e) {
      if (e.nativeEvent.buttons === 1 || e.nativeEvent.buttons === 3) {
        paintCell(i);
      }

      updateProfitLv1();
    };
  }

  function paintCell(i) {
    setCellType(i, Diversibee.store.state, paintCellType);
    setAnimation(i);
    repaintBoard();
  }

  function repaintBoard() {
    //re-paints the board state

    if (Diversibee.store.animationLoop) {
      clearInterval(Diversibee.store.animationLoop);
    }

    Diversibee.store.stage.update();
    Diversibee.store.animationLoop = setInterval(function() {Diversibee.store.stage.update();}, 300);
  }

  function addToProfits(income) {
    //update the farmer's bank account

    Diversibee.store.profit += income;
    document.getElementById('profit-value').innerHTML = '$' + Diversibee.store.cash;
  }

  function addCellProfitsToProfits(i, neighbours) {
    //collect profits from cell i, modified by its nearest neghbours

    addToProfits(Profits.basicProfits(neighbours));
  }

  function calculateLevelOneProfit() {
    var blueberryCount = 0;
    var treeCount = 0;
    for (var index in Diversibee.store.state) {
      if (Diversibee.store.state[index].type === 'blueberries') {
        blueberryCount++;
      }
      else if (Diversibee.store.state[index].type === 'forest') {
        treeCount++;
      }
    }

    return blueberryCount * treeCount;
  }

  function updateProfitLv1() {
    var profits = calculateLevelOneProfit();

    Diversibee.store.profit = profits;
    document.getElementById('profit-value').innerHTML = '$' + profits;
  }

  function distancefromSeed(cell, width, seededCells) {
    //Returns the distance from a cell to the closest seed (seeds are given as an array of cell locations)
    var distance = Number.MAX_SAFE_INTEGER,
        i,
        temp_dist;

    for (i = 0; i < seededCells.length; i++) {
      temp_dist = distanceBetweenCells(seededCells[i], cell, width);
      distance = Math.min(distance, temp_dist);
    }

    return distance;
  }

  function distanceBetweenCells(cellA, cellB, boardWidth) {
    //returns the distance between cell A and cell B

    var xDiff = (cellA % boardWidth) - (cellB % boardWidth),
        yDiff = (Math.floor(cellA / boardWidth)) - (Math.floor(cellB / boardWidth));
    return Math.abs(xDiff) + Math.abs(yDiff);
  }

  function shouldGrowForest(distanceFromSeed) {
    //A simple forest growth algorithm which clusters around seed locations

    return distanceFromSeed + distanceFromSeed * Math.random() < 5;
  }

  function generateUniqueRandomCells(height, width, numberOfCells) {
    //Returns an array of unique random cells

    var uniqueRandomCells = [],
        i,

        //we can safely choose the first unique random cell number
        cellNumber = Math.floor(Math.random() * (height * width));

    for (i = 0; i < numberOfCells; i++) {
      while (Utils.inArray(cellNumber, uniqueRandomCells)) {
        cellNumber = Math.floor(Math.random() * (height * width));
      }

      uniqueRandomCells.push(cellNumber);
    }

    return uniqueRandomCells;
  }

  /**
   * Public methods
   */
  Diversibee.init = function(width, height) {
    // Initialize the play area on load

    var i;

    //declare global store with default values
    Diversibee.store.width = width;
    Diversibee.store.height = height;

    // Stores current total number of each type, updated by addTypeToCell()
    Diversibee.store.typeCount = {
      grass: 0,
      forest: 0,
      blueberries: 0
    };
    Diversibee.store.state = setUpBoardState(Diversibee.store.width, Diversibee.store.height);
    Diversibee.store.animationData = {
      images: ['img/spriteSheet.png'],
      frames: {width:20, height:20},
      animations: {
        grass: [0, 3],
        forest: [4, 7],
        blueberries: [8, 11]
      }
    };

    Diversibee.store.stage = new createjs.Stage('board');
    Diversibee.store.stage.enableMouseOver(10);
    Diversibee.store.mapCell = [];
    Diversibee.store.spriteSheet = new createjs.SpriteSheet(Diversibee.store.animationData);
    Diversibee.store.w = Diversibee.store.stage.canvas.width;
    Diversibee.store.h = Diversibee.store.stage.canvas.height;
    Diversibee.store.profit = 1000;
    Diversibee.store.blueberryBuildPrice = 100;

    //set up initial cell animationsL
    for (i = 0; i < Diversibee.store.width * Diversibee.store.height; i++) {
      setAnimation(i);
    }

    //paint the initial state of the board
    repaintBoard();
  };

  Diversibee.store = {};

  window.Diversibee = Diversibee;
})();
