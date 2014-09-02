var _ = require('underscore');

// forest block
var F = {
  maxPopulationSize: 1000,
  bees: [{
    beetype: "A",
    population: 1000,
    rate: 0
  }, {
    beetype: "B",
    population: 1000,
    rate: 0
  }, {
    beetype: "C",
    population: 1000,
    rate: 0
  }, {
    beetype: "D",
    population: 1000,
    rate: 0
  }]
};

// crop block
var C = {
  "type": "crop - blueberry"
};

var field = [
  [F, C, C],
  [C, F, C],
  [C, C, C]
];

// DEFINITIONS
// a single forest isolated block would have negative rate of change

// need function to update rate of change and population


// function to determine count of neighboring forests to a cell
// inputs:
//   row: row of the cell
//   column: column number of the cell
// return:
//   count of neighboring forests around current cell
var neighbor = function(row, col) {

  var count = 0, // count all the forests found
      // begin counting one row up, unless already in topmost row
      i = row>0 ? row-1 : row,
      // begin counting one column left, unless already in leftmost column
      min_j = col>0 ? col-1 : col,
      // finish counting one row down, unless already in bottommost row
      max_i = (row>=field.length-1) ? row : row+1,
      // finish counting one column right, unless already in rightmost column
      max_j = (col>=field[0].length-1) ? col : col+1;

  for(; i <= max_i; i++){
    for(var j=min_j; j <= max_j; j++){

      // Don't add the block you're on!
      if (i==row && j==col) continue;

      // Increase count when you find a field
      if(field[i][j] == F) count++;

    }
  }

  // Return the number of neighboring forests found
  return count;
}


// console.log(field[0][0]);


var qq = function(field) {

  // we assume that the field is a rectangle and not an irregular object
  var width = field[0].length;
  var height = field.length;

  // _(field).map(function(cell){
  // 	console.log(cell);
  // });


}





// console.log(field);

qq(field);