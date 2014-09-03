var _ = require('underscore');
var clone = require('clone');
var neighbor = require('./neighbor').neighbor;

var util = require('util');


// better console.log due to object depth limits in node
var c = function(myObject) {
  console.log(util.inspect(myObject, {
    showHidden: false,
    depth: null
  }));
}


// formulas / constants
var intrinsicRateOfIncrease = 0.1;

var polinationPercentage = function(beeCount) {
  // polination = base + scale(1-e(-N/1000))
  // N = number of bees
  return 0 + 100 * (1 - Math.pow(Math.E, beeCount * -1 / 1000));
}





//TODO: each forest should have a max population size that bees can't exceed

// DEFINITIONS
// a single forest isolated block would have negative rate of change
// need function to update rate of change and population





// initial yield for crop output / aka game score
var productionOutput = 0;

// forest block
var F = {
  type: "forest",
  bees: [{
    type: "A",
    population: 900
  }]
};

// crop block
var C = {
  type: "crop",
  bees: [{
    type: "A",
    population: 1,
    rate: 0
  }]
};




// game field
var field = [
  [F, F],
  [C, C]
];



c("***** initial field *****");
c(field);
c("*************************");






var advanceCropProduction = function(field) {
  _(field).each(function(row, rowIndex) {

    _(row).each(function(cell, cellIndex) {

      if (cell.type === "crop") {

        // determine how many forest neighbors are there
        var neighbors = neighbor(field, rowIndex, cellIndex);
        // console.log("(", rowIndex, ",", cellIndex, ")");

        productionOutput += polinationPercentage(neighbors.capacity);

      }

    }) //cell
  }); //row

}

var advanceBeePopulation = function(field) {
  _(field).each(function(row, rowIndex) {

    _(row).each(function(cell, cellIndex) {

        var currCell = clone(cell);

        // get info on the current cell
        var neighbors = neighbor(field, rowIndex, cellIndex);

        // popsize(t+1) = popsize(t) * e^(intrinsic rate of increase(1-(popsize(t)/carrying capacity))+random variability in rate of increase
        currCell.bees[0].population = currCell.bees[0].population * Math.pow(Math.E, intrinsicRateOfIncrease * (1 - currCell.bees[0].population / neighbors.capacity));

        field[rowIndex][cellIndex] = currCell;

    }) //cell
  }); //row
}


var advanceTimeStep = function() {

  //advance crop production
  advanceCropProduction(field);

  //advance bee production
  advanceBeePopulation(field);
  // c(field);
  // c(productionOutput);
}

var iterateGameBoard = function(numOfIterations) {
  var repeat = function(num, f) {
    for (var i=0; i<num; i++) {
      console.log("iteration #", i+1);
      f();
      // c(field);
      console.log("production:", productionOutput);
    }
  }

  repeat(numOfIterations, advanceTimeStep);
}

iterateGameBoard(2);


c("***** final field *****");
c(field);
c("*************************");
