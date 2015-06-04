(function() {
    //functions describing how profits are caluclated for a given blueberry crop tile

    var Profits = {};

    Profits.basicProfits = function(neighbours) {
        //award $1 for every bee in a tile adjacent to tile i
        var j, k,
            neighbour,
            bees = 0;

        for(j=0; j<neighbours.length; j++) {
            neighbour = neighbours[j];
            for(k=0; k<neighbour.beePop.length; k++) {
                bees += neighbour.beePop[k];
            }
        }
        return bees;

    }

    window.Profits = Profits;
})();
