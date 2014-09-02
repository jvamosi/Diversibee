var _ = require('underscore');
var clone = require('clone');
var neighbor = require('./neighbor').neighbor;

var util = require('util');
util.inspect(util, {
  showHidden: true,
  depth: null
})


var c = function(myObject) {
  console.log(util.inspect(myObject, {
    showHidden: false,
    depth: null
  }));
}

//TODO: each forest should have a max population size that bees can't exceed


// initial yield for crop output
var cropYield = 0;

// forest block
var F = {
  type: "forest",
  bees: [{
    type: "A",
    population: 900,
    rate: 0
  }]
};

// crop block
var C = {
  type: "crop",
  yield: 100
};


var intrinsicRateOfIncrease = 0.1;



var field = [
  [F, F],
  [C, C]
];



console.log("initial field *****");
c(field);
console.log("*****");




var polinationPercentage = function(beeCount) {
  // polination = base + scale(1-e(-N/1000))
  // N = number of bees
  return 0 + 100 * (1 - Math.pow(Math.E, beeCount * -1 / 1000));
}

// c(polinationPercentage(100));


var advanceCropProduction = function(field) {
  _(field).each(function(row, rowIndex) {

    _(row).each(function(cell, cellIndex) {

      if (cell.type === "crop") {

        // determine how many forest neighbors are there
        var neighbors = neighbor(field, rowIndex, cellIndex);

        var crop = clone(cell);

        cropYield += polinationPercentage(neighbors.capacity);

      }

    }) //cell
  }); //row

}

var advanceBeePopulation = function(field) {
  _(field).each(function(row, rowIndex) {

    _(row).each(function(cell, cellIndex) {

      if (cell.type === "forest") {

        var forest = clone(cell);

        // determine how many forest neighbors are there
        var neighbors = neighbor(field, rowIndex, cellIndex);

        // popsize(t+1) = popsize(t) * e^(intrinsic rate of increase(1-(popsize(t)/carrying capacity))+random variability in rate of increase
        forest.bees[0].population = forest.bees[0].population * Math.pow(Math.E, intrinsicRateOfIncrease * (1 - forest.bees[0].population / neighbors.capacity));


        field[rowIndex][cellIndex] = forest;
      }

    }) //cell
  }); //row
}


var advanceTimeStep = function() {

  // c("iterate");
  //advance crop production
  advanceCropProduction(field);

  //advance bee production
  advanceBeePopulation(field);
  // c(field);
  c(cropYield);
}



advanceTimeStep();
advanceTimeStep();
advanceTimeStep();
advanceTimeStep();