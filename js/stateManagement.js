(function() {
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


        for(i=0; i<cellsWide*cellsHigh; i++) {
            distanceFromSeedCell = distancefromSeed(i, cellsWide, seededCells);
            //Does this cell initially become a forest based on the cell"s seed proximity
            isForest = shouldGrowForest(distanceFromSeedCell);

            if(isForest) {
                cells[i] = {
                    type: "forest",
                    beePop: [Math.floor(Math.random()*1000), Math.floor(Math.random()*1000), Math.floor(Math.random()*1000), Math.floor(Math.random()*1000)],
                    beeGrowth: [0,0,0,0]
                };
            } else {
                cells[i] = {
                    type: "grass",
                    beePop: [0,0,0,0],
                    beeGrowth: [0,0,0,0]
                };
            }
        }

        return cells;
    }


    function setAnimation(i) {
        //set up the animation for cell i

        Diversibee.store.mapCell[i] = new createjs.Sprite(Diversibee.store.spriteSheet, Diversibee.store.state[i].type);
        Diversibee.store.mapCell[i].x = 20*(i%Diversibee.store.width);
        Diversibee.store.mapCell[i].y = 20*Math.floor(i/Diversibee.store.width);
        Diversibee.store.mapCell[i].addEventListener("click", clickCell.bind(this, i));
        Diversibee.store.mapCell[i].addEventListener("mouseover", showStats.bind(this, i));

        Diversibee.store.stage.addChild(Diversibee.store.mapCell[i]);
        Diversibee.store.mapCell[i].play(Diversibee.store.state[i].type);
    }

    function repaintBoard() {
        //re-paints the board state

        if(Diversibee.store.animationLoop) {
            clearInterval(Diversibee.store.animationLoop);
        }

        Diversibee.store.stage.update();
        Diversibee.store.animationLoop = setInterval(function() {Diversibee.store.stage.update();}, 300);
    }

    function clickCell(i) {
        //handle when a player clicks on the ith cell

        //change the clicked cell to a blueberry patch
        if(Diversibee.store.cash >=100 && Diversibee.store.state[i].type !== "blueberries") {
            Diversibee.store.state[i] = {
                type: "blueberries",
                beePop: [0,0,0,0],
                beeGrowth: [0,0,0,0]
            };
            updateCash(-1*Diversibee.store.blueberryBuildPrice);
            setAnimation(i);
            repaintBoard();
        }
    }

    function showStats(i) {
        //display the current state of cell i in a text box.

        var text = "Current State of cell " + i +":<br>";

        text += "Type: " + Diversibee.store.state[i].type + "<br>";

        text += "Bee Populations: " + Diversibee.store.state[i].beePop + "<br>";

        text += "Bee Growth Rates: " + Diversibee.store.state[i].beeGrowth;

        document.getElementById("cellStats").innerHTML = text;
    }

    function updateCash(income) {
        //update the farmer"s bank account

        Diversibee.store.cash += income;
        document.getElementById("bank").innerHTML = "$"+Diversibee.store.cash;
    }

    function advanceTurn() {
        //trigger to advance to next turn

        var i;

        //update bee populations in forests & gather profits from blueberries
        for(i=0; i<Diversibee.store.width*Diversibee.store.height; i++) {
            if(Diversibee.store.state[i].type === "forest") {
                updateBeePop(i);
                updateBeeGrowth(i, Utils.adjacentCells(i));
            } else if(Diversibee.store.state[i].type === "blueberries") {
                updateProfits(i, Utils.adjacentCells(i));
            }
        }
    }

    function updateBeePop(i) {
        //update the bee population in cell i based on its current growth rates

        var j;

        for(j=0; j<Diversibee.store.state[i].beePop.length; j++) {
            Diversibee.store.state[i].beePop[j] += Diversibee.store.state[i].beeGrowth[j];
            Diversibee.store.state[i].beePop[j] = Math.max(0, Diversibee.store.state[i].beePop[j]);
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
        var distance = Number.MAX_SAFE_INTEGER,
            i,
            temp_dist;

        for(i=0; i<seededCells.length; i++) {
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
    Diversibee.init = function(width, height) {
        // Initialize the play area on load

        var i;

        //declare global store with default values
        Diversibee.store.width = width;
        Diversibee.store.height = height;
        Diversibee.store.state = setUpBoardState(Diversibee.store.width, Diversibee.store.height);
        Diversibee.store.animationData = {
            images: ["img/spriteSheet.png"],
            frames: {width:20, height:20},
            animations: {
                grass: [0,3],
                forest: [4,7],
                blueberries: [8,11]
            }
        };
        Diversibee.store.stage = new createjs.Stage("board");
        Diversibee.store.stage.enableMouseOver(10);
        Diversibee.store.mapCell = [];
        Diversibee.store.spriteSheet = new createjs.SpriteSheet(Diversibee.store.animationData);
        Diversibee.store.w = Diversibee.store.stage.canvas.width;
        Diversibee.store.h = Diversibee.store.stage.canvas.height;
        Diversibee.store.cash = 1000;
        Diversibee.store.blueberryBuildPrice = 100;

        //set up initial cell animationsL
        for(i=0; i<Diversibee.store.width*Diversibee.store.height; i++) {
            setAnimation(i);
        }
        //paint the initial state of the board
        repaintBoard();

        //set up turn advancement
        document.getElementById("nextTurn").onclick = advanceTurn;
        //trigger a turn to finish configuring the board
        Diversibee.advanceTurn();
    };

    Diversibee.advanceTurn = function() {
        //trigger to advance to next turn

        var i;

        //update bee populations in forests & gather profits from blueberries
        for(i=0; i<Diversibee.store.width*Diversibee.store.height; i++) {
            if(Diversibee.store.state[i].type === "forest") {
                updateBeePop(i);
                updateBeeGrowth(i, Utils.adjacentCells(i));
            } else if(Diversibee.store.state[i].type === "blueberries") {
                updateProfits(i, Utils.adjacentCells(i));
            }
        }
    };

    Diversibee.store = {};

    window.Diversibee = Diversibee;
})();
