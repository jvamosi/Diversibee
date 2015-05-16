function init() {
  // Initialize the play area on load

  var i;

  //declare global store with default values
  store = {}
  store.width = 20
  store.height = 20
  store.state = setUpBoardState(store.width, store.height);
  store.animationData = {
      images: ["img/spriteSheet.png"],
      frames: {width:20, height:20},
      animations: {
          grass: [0,3],
          forest: [4,7],
          blueberries: [8,11]
        }      
    };
  store.stage = new createjs.Stage("board");
  store.mapCell = []
  store.spriteSheet = new createjs.SpriteSheet(store.animationData);
  store.w = store.stage.canvas.width;
  store.h = store.stage.canvas.height;
  store.cash = 1000
  store.blueberryBuildPrice = 100

  //set up initial cell animationsL
  for(i=0; i<store.width*store.height; i++)
    setAnimation(i);
  //paint the initial state of the board
  repaintBoard()

  //set up turn advancement
  document.getElementById('nextTurn').onclick = advanceTurn

}



function setUpBoardState(cellsWide, cellsHigh){
  // initializes board state

  var cells = [],
    isForest,
    i;

  for(i=0; i<cellsWide*cellsHigh; i++){
    isForest = Math.random() > 0.5

    if(isForest){
      cells[i] = {
        type: 'forest',
        beePop: [Math.floor(Math.random()*1000), Math.floor(Math.random()*1000), Math.floor(Math.random()*1000), Math.floor(Math.random()*1000)],
        beeGrowth: [0,0,0,0]
      }
    } else {
      cells[i] = {
        type: 'grass',
        beePop: [0,0,0,0],
        beeGrowth: [0,0,0,0]
      }      
    }

  }

  return cells
}


function setAnimation(i){
  //set up the animation for cell i

  store.mapCell[i] = new createjs.Sprite(store.spriteSheet, store.state[i].type);
  store.mapCell[i].x = 20*(i%store.width);
  store.mapCell[i].y = 20*Math.floor(i/store.width);
  store.mapCell[i].addEventListener('click', clickCell.bind(this,i) )

  store.stage.addChild(store.mapCell[i]);
  store.mapCell[i].play(store.state[i].type);  
}

function repaintBoard() {
  //re-paints the board state

  if(store.animationLoop)
    clearInterval(store.animationLoop)

  store.stage.update();
  store.animationLoop = setInterval(function(){store.stage.update();}, 300);
}

function clickCell(i){
  //handle when a player clicks on the ith cell

  //change the clicked cell to a blueberry patch
  if(store.cash >=100 && store.state[i].type!='blueberries'){
    store.state[i] = {
      type: 'blueberries',
      beePop: [0,0,0,0],
      beeGrowth: [0,0,0,0]    
    }
    updateCash(-1*store.blueberryBuildPrice);
    setAnimation(i)
    repaintBoard();
  }
}

function updateCash(income){
  //update the farmer's bank account

  store.cash += income
  document.getElementById('bank').innerHTML = '$'+store.cash
}

function advanceTurn(){
  //trigger to advance to next turn

  var i;

  //update bee populations in forests & gather profits from blueberries
  for(i=0; i<store.width*store.height; i++){
    if(store.state[i].type == 'forest'){
      updateBeePop(i);
      updateBeeGrowth(i, adjacentCells(i));      
    } else if (store.state[i].type == 'blueberries'){
      updateProfits(i, adjacentCells(i));
    }
  }
}

function updateBeePop(i){
  //update the bee population in cell i based on its current growth rates

  var j; 

  for(j=0; j<store.state[i].beePop.length; j++){
    store.state[i].beePop[j] += store.state[i].beeGrowth[j]
    store.state[i].beePop[j] = Math.max(0, store.state[i].beePop[j])
  }

}

function updateBeeGrowth(i, neighbours){
  //update the growth rate for the bee populations in cell i based on effects from the cell's nearest neighbours

}

function updateProfits(i, neighbours){
  //collect profits from cell i, modified by its nearest neghbours
}

function adjacentCells(i){
  //return a list of cell objects corresponding to the neighbours of cell i

  var neighbours = [],
  j, neighbourIndex;

  //three above:
  for(j=-1; j<2; j++){
    neighbourIndex = i-store.width + j
    if(neighbourIndex >= 0 && Math.floor(neighbourIndex/store.width) == Math.floor((i-store.width)/store.width) ){
      neighbours.push(store.state[neighbourIndex]);
    }
  }

  //two beside
  if(i-1 > Math.floor(i/store.width)*store.width){
    neighbours.push(store.state[i-1]);
  }
  if(i+1 < Math.floor(i/store.width)*store.width + store.width){
    neighbours.push(store.state[i+1]);
  }

  //three below
  for(j=-1; j<2; j++){
    neighbourIndex = i+store.width + j
    if(neighbourIndex < store.width*store.height && Math.floor(neighbourIndex/store.width) == Math.floor((i+store.width)/store.width) ){
      neighbours.push(store.state[neighbourIndex]);
    }
  }

  return neighbours
}
