/* global Tests */
Tests.addSuite('profits', [
    function() {
        //Test if the method Profits.basicProfits exists

        Tests.isA(Profits.basicProfits, 'function');
    },

    function() {
        //Tests of the Profits.basicProfits method

        //No neighbours
        Tests.equals(Profits.basicProfits([]), 0);

        //some neighbours
        var neighbours = [
            {beePop: [0, 0, 0, 0]},
            {beePop: [0, 0, 0, 0]},
            {beePop: [0, 0, 0, 0]},
            {beePop: [0, 0, 0, 0]},
            {beePop: [0, 0, 0, 0]}
        ];
        Tests.equals(Profits.basicProfits(neighbours), 0);
        neighbours = [
            {beePop: [1, 1, 1, 1]},
            {beePop: [1, 1, 1, 1]},
            {beePop: [1, 1, 1, 1]},
            {beePop: [1, 1, 1, 1]},
            {beePop: [1, 1, 1, 1]}
        ];
        Tests.equals(Profits.basicProfits(neighbours), 20);
        neighbours = [
            {beePop: [3,5,7,3]},
            {beePop: [7,3,2,7]},
            {beePop: [9,4,60,3]},
            {beePop: [64,1,0,4]},
            {beePop: [6,4,12,3]}
        ];
        Tests.equals(Profits.basicProfits(neighbours), 207);
    }
]);
