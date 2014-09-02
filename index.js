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
// need function to determine neighbor
var neighbor = function(x, y) {
  var count = 0,
      i = x>0 ? x-1 : x,
      min_j = y>0 ? y-1 : y,
      max_i = (x>=field.length) ? x : x+1,
      max_j = (y>=field[0].length) ? y : y+1;

  for(; i <= max_i; i++){
    for(var j=min_j; j <= max_j; j++){
      if (i==x && j==y) continue;
      if(field[i][j] == F) count++;
    }
  }

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