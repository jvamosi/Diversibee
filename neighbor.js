// DEFINITIONS
// a single forest isolated block would have negative rate of change

// need function to update rate of change and population


// function to determine count of neighboring forests to a cell
// inputs:
//   field: field 2d array
//   row: row of the cell
//   column: column number of the cell
// return:
//   info on the neighboring cells
//   forest: count of neighboring forest cells
//   crops: count of neighboring crop cells
//   population: sum of bee population in neighboring cells
var neighbor = function(field, row, col) {

  var forest = 0, // count all the forests found
    population = 0,
    crop = 0,
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

      // Increase count when you find a forest
      if (field[i][j].type == "forest") {
        forest++;
        population += field[i][j].bees.population;
      } else {
        crop++;
      }

    }
  }

  // Return info on the neighboring cells.
  // Number of forests/crops, bee population
  return {
    forests: forest,
    population: population,
    crops: crop,
    capacity: (field[row][col].type == "forest" ? 1000 : 0) + (forest*10);
  };
}

module.exports.neighbor = neighbor;