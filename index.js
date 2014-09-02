var _ = require('underscore');
var clone = require('clone');
var neighbor = require('./neighbor').neighbor;

var util = require('util');
util.inspect(util, { showHidden: true, depth: null })


var c = function(myObject) {
  console.log(util.inspect(myObject, {showHidden: false, depth: null}));
}

//TODO: each forest should have a max population size that bees can't exceed


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
  type: "crop"
};


var intrinsicRateOfIncrease = 0.1;



var field = [
  [F, F, C],
  [C, C, F],
  [C, F, C]
];



console.log("initial field *****");
c(field);



var advanceTimeStep = function() {
  //determine crop production
  //determine bee production
}




var advanceCropProduction = function() {

}

var advanceBeePopulation = function(field) {
  _(field).each(function(row, rowIndex) {

    _(row).each(function(cell, cellIndex) {

      if (cell.type === "forest") {
        
        var forest = clone(cell);

        // determine how many neighbors are there
        var neighbors = neighbor(field, rowIndex, cellIndex);
      
        // forest.maxPopulationSize = (neighbors.forests * rateOfPopulationIncrease) + forest.maxPopulationSize;
        // forest.bees[0].population = (neighbors.forests * rateOfPopulationIncrease) + forest.bees[0].population

        // popsize(t+1) = popsize(t) * e^(intrinsic rate of increase(1-(popsize(t)/carrying capacity))+random variability in rate of increase
        forest.bees[0].population = forest.bees[0].population * Math.pow(Math.E, intrinsicRateOfIncrease * (1-forest.bees[0].population/neighbors.capacity));


        field[rowIndex][cellIndex] = forest;
      }

    }) //cell
  }); //row
}



// console.log(field);

advanceBeePopulation(field);

console.log("**********");
console.log("revised *******");
c(field);
