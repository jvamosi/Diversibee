var _ = require('underscore');
var clone = require('clone');

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

// DEFINITIONS
// a single forest isolated block would have negative rate of change

// need function to update rate of change and population
// need function to determine neighbor

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

      if (cell.type === "forest") {

        // determine how many neighbors are there

        var forest = clone(cell);


        // cell.maxPopulationSize = (2 * rateOfPopulationIncrease) + cell.maxPopulationSize;


        console.log(rowIndex, cellIndex);

        var neighbors = neighbor(rowIndex, cellIndex);
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

// determine neighboring locations
var qqq = function(row, col) {

  // // assuming field
  // var minRow = 0;
  // var maxRow = field[row].length;
  // var minCol = 0;
  // var maxCol = 

  return 2;

}



// function to determine count of neighboring forests to a cell
// inputs:
//   row: row of the cell
//   column: column number of the cell
// return:
//   count of neighboring forests around current cell
var neighbor = function(row, col) {

  var count = 0, // count all the forests found
    // begin counting one row up, unless already in topmost row
    i = row > 0 ? row - 1 : row,
    // begin counting one column left, unless already in leftmost column
    min_j = col > 0 ? col - 1 : col,
    // finish counting one row down, unless already in bottommost row
    max_i = (row >= field.length - 1) ? row : row + 1,
    // finish counting one column right, unless already in rightmost column
    max_j = (col >= field[0].length - 1) ? col : col + 1;

  for (; i <= max_i; i++) {
    for (var j = min_j; j <= max_j; j++) {

      // Don't add the block you're on!
      if (i == row && j == col) continue;

      // Increase count when you find a field
      if (field[i][j] == F) count++;

    }
  }

  // Return the number of neighboring forests found
  return count;
}



// console.log(field);

qq(field);

console.log("**********");
console.log("revised *******");
console.log(field);