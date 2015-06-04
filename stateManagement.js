(function () {
    //functions managing & updating the game state data, consisting of the `store` object and
    //visualization in the browser.

    var Diversibee = {};

    /**
     * Private methods
     */
    function setUpBoardState(cellsWide, cellsHigh) {
        // initializes board state

        var cells = [],
            distanceFromSeedCell,
            isForest,
            i,
            //The likelihood a cell contains a "seed"; probability bound 0 <= seedRate <= 1
            seedRate = 0.02,
            //Cells containing an initial "seed". Seeds are used to determine the inital forest growth
            seededCells = generateUniqueRandomCells(cellsHigh, cellsWide, (cellsHigh*cellsWide*seedRate));


        for(i=0; i<cellsWide*cellsHigh; i++){
            distanceFromSeedCell = distancefromSeed(i, cellsWide, seededCells);
            //Does this cell initially become a forest based on the cell"s seed proximity
            isForest = shouldGrowForest(distanceFromSeedCell);

            if(isForest){
                cells[i] = {
                    type: "forest",
                    beePop: [Math.floor(Math.random()*1000), Math.floor(Math.random()*1000), Math.floor(Math.random()*1000), Math.floor(Math.random()*1000)],
                    beeGrowth: [0,0,0,0]
                }
            } else {
                cells[i] = {
                    type: "grass",
                    beePop: [0,0,0,0],
                    beeGrowth: [0,0,0,0]
                }
            }
        }

        return cells;
    }


    function setAnimation(i) {
        //set up the animation for cell i

        store.mapCell[i] = new createjs.Sprite(store.spriteSheet, store.state[i].type);
        store.mapCell[i].x = 20*(i%store.width);
        store.mapCell[i].y = 20*Math.floor(i/store.width);
        store.mapCell[i].addEventListener("click", clickCell.bind(this, i));
        store.mapCell[i].addEventListener("mouseover", showStats.bind(this, i));

        store.stage.addChild(store.mapCell[i]);
        store.mapCell[i].play(store.state[i].type);
    }

    function repaintBoard() {
        //re-paints the board state

        if(store.animationLoop) {
            clearInterval(store.animationLoop);
        }

        store.stage.update();
        store.animationLoop = setInterval(function(){store.stage.update();}, 300);
    }

    function clickCell(i) {
        //handle when a player clicks on the ith cell

        //change the clicked cell to a blueberry patch
        if(store.cash >=100 && store.state[i].type !== "blueberries") {
            store.state[i] = {
                type: "blueberries",
                beePop: [0,0,0,0],
                beeGrowth: [0,0,0,0]
            }
            updateCash(-1*store.blueberryBuildPrice);
            setAnimation(i)
            repaintBoard();
        }
    }

    function showStats(i) {
        //display the current state of cell i in a text box.

        var text = "Current State of cell " + i +":<br>";

        text += "Type: " + store.state[i].type + "<br>";

        text += "Bee Populations: " + store.state[i].beePop + "<br>";

        text += "Bee Growth Rates: " + store.state[i].beeGrowth;

        document.getElementById("cellStats").innerHTML = text;
    }

    function updateCash(income) {
        //update the farmer"s bank account

        store.cash += income;
        document.getElementById("bank").innerHTML = "$"+store.cash;
    }

    function advanceTurn(){
        //trigger to advance to next turn

        var i;

        //update bee populations in forests & gather profits from blueberries
        for(i=0; i<store.width*store.height; i++) {
            if(store.state[i].type === "forest") {
                updateBeePop(i);
                updateBeeGrowth(i, Utils.adjacentCells(i));
            } else if (store.state[i].type === "blueberries") {
                updateProfits(i, Utils.adjacentCells(i));
            }
        }
    }

    function updateBeePop(i) {
        //update the bee population in cell i based on its current growth rates

        var j;

        for(j=0; j<store.state[i].beePop.length; j++) {
            store.state[i].beePop[j] += store.state[i].beeGrowth[j];
            store.state[i].beePop[j] = Math.max(0, store.state[i].beePop[j]);
        }
    }

    function updateBeeGrowth(i, neighbours) {
        //update the growth rate for the bee populations in cell i based on effects from the cell"s nearest neighbours

        BeeDynamics.baseBeeSpawning(i);
        BeeDynamics.forestEdgeEffect(i, neighbours);
    }

    function updateProfits(i, neighbours) {
        //collect profits from cell i, modified by its nearest neghbours

        updateCash(Profits.basicProfits(neighbours));
    }

    function distancefromSeed(cell, width, seededCells) {
        //Returns the distance from a cell to the closest seed (seeds are given as an array of cell locations)
        var distance = Number.MAX_SAFE_INTEGER;
        var i;
        var temp_dist;

        for(i=0; i<seededCells.length; i++){
            temp_dist = distanceBetweenCells(seededCells[i], cell, width);
            distance = Math.min(distance, temp_dist);
        }
        return distance;
    }

    function distanceBetweenCells(cellA, cellB, boardWidth) {
        //returns the distance between cell A and cell B

        var xDiff = (cellA % boardWidth) - (cellB % boardWidth);
        var yDiff = (Math.floor(cellA / boardWidth)) - (Math.floor(cellB / boardWidth));
        return Math.abs(xDiff) + Math.abs(yDiff);
    }

    function shouldGrowForest(distanceFromSeed) {
        //A simple forest growth algorithm which clusters around seed locations

        return distanceFromSeed + distanceFromSeed * Math.random() < 5;
    }

    function generateUniqueRandomCells(height, width, numberOfCells) {
        //Returns an array of unique random cells

        var uniqueRandomCells = [],
            i;
        //we can safely choose the first unique random cell number
        var cellNumber = Math.floor(Math.random() * (height * width));

        for(i=0; i<numberOfCells; i++) {
            while ( Utils.inArray(cellNumber, uniqueRandomCells) ) {
                cellNumber = Math.floor(Math.random() * (height * width));
            }
            uniqueRandomCells.push(cellNumber);
        }
        return uniqueRandomCells;
    }

    /**
     * Public methods
     */
    Diversibee.init = function () {
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
        store.stage.enableMouseOver(10);
        store.mapCell = []
        store.spriteSheet = new createjs.SpriteSheet(store.animationData);
        store.w = store.stage.canvas.width;
        store.h = store.stage.canvas.height;
        store.cash = 1000
        store.blueberryBuildPrice = 100

        //set up initial cell animationsL
        for(i=0; i<store.width*store.height; i++) {
            setAnimation(i);
        }
        //paint the initial state of the board
        repaintBoard()

        //set up turn advancement
        document.getElementById("nextTurn").onclick = advanceTurn
        //trigger a turn to finish configuring the board
        Diversibee.advanceTurn();
    };

    Diversibee.advanceTurn = function () {
        //trigger to advance to next turn

        var i;

        //update bee populations in forests & gather profits from blueberries
        for(i=0; i<store.width*store.height; i++) {
            if(store.state[i].type === "forest") {
                updateBeePop(i);
                updateBeeGrowth(i, Utils.adjacentCells(i));
            } else if (store.state[i].type === "blueberries") {
                supdateProfits(i, Utils.adjacentCells(i));
            }
        }
    };

    window.Diversibee = Diversibee;
})();
