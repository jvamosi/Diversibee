// Functions on the field - get carrying capacity, bee count or population

// CONSTANTS

// base carrying capacity for a forest cell
var baseForestCapacity = 1000,

// additional carrying capacity added to each neighboring cell
    neighborForestCapacity = 10;


// function to determine count of neighboring forests to a cell
// inputs:
//   field: field 2d array
//   row: row of the cell
//   column: column number of the cell
// return:
//   info on the current cell
//   population: bee population in polination range
//   capacity: carrying capacity for the current cell
var neighbor = function(args) {

  var forest = 0, // count all the forests found
    population = 0,
    capacity = 0,
    field = args.field,
    row = args.row,
    col = args.col,
    pop = args.population,
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
      if(pop){
        // Add bee population in all blocks
        population += field[i][j].bees[0].population;
      } else {
        // Don't add the block you're on!
        if (i == row && j == col) continue;

        // Increase count when you find a forest
        if (field[i][j].type == "forest") forest++
      }
    }
  }

  // bee population in current cell and in all neighboring cells
  if(pop) return population;

  // If we're currently on a forest, add base capacity
  if(field[row][col].type == "forest"){
    capacity += baseForestCapacity;
  }

  // carrying capacity of the current cell
  return capacity + (forest*neighborForestCapacity);
}

var population = function(field, row, col){
  return neighbor({field: field, row: row, col: col, population: true});
}

var capacity = function(field, row, col){
  return neighbor({field: field, row: row, col: col, capacity: true });
}

module.exports.population = population;
module.exports.capacity = capacity;