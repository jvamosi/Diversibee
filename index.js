var _ = require('underscore');
var clone = require('clone');
var neighbor = require('./neighbor').neighbor;

console.log(neighbor);

// forest block
var F = {
  type: "forest",
  maxPopulationSize: 1000,
  bees: [{
    type: "A",
    population: 1000,
    rate: 0
  }]
};

// crop block
var C = {
  type: "crop"
};





var rateOfPopulationIncrease = 100;

var field = [
  [F, C, C],
  [C, F, C],
  [C, C, C]
];



console.log("initial field *****");
console.log(field);


// console.log(field[0][0]);


// var newobj = []

var qq = function(field) {

  // we assume that the field is a rectangle and not an irregular object
  var width = field[0].length;
  var height = field.length;

  // _(field).map(function(cell){
  //  console.log(cell);
  // });


  // for(var i=0; i<= field[0])

  _(field).each(function(row, rowIndex) {

    _(row).each(function(cell, cellIndex) {

      // console.log(field[rowIndex][cellIndex]);
      // console.log(rowIndex, cellIndex);


      // console.log()

      if (cell.type === "forest") {

        // determine how many neighbors are there

        var forest = clone(cell);


        // cell.maxPopulationSize = (2 * rateOfPopulationIncrease) + cell.maxPopulationSize;


        console.log(rowIndex, cellIndex);
        var neighbors = neighbor(field, rowIndex, cellIndex);
        console.log(neighbors);


        // forest.maxPopulationSize = (2 * rateOfPopulationIncrease) + forest.maxPopulationSize;


        // console.log(cell);

        // newobj[rowIndex][cellIndex] = cell;
        // newobj[rowIndex][cellIndex] = cell;

        field[rowIndex][cellIndex] = forest;

      }


    }) //cell

  }); //row

}





// console.log(field);

qq(field);

console.log("**********");
console.log("revised *******");
console.log(field);
