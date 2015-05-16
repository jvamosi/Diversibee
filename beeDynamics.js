// functions desctibing how bee populations change each turn.

function baseBeeSpawning(i){
    //new bees born next turn in cell i
    //note this overwrites beeGrowth parameters, so should be called first.

    var j,
        baseBeeSpawnRate = [1,1,1,1];

    for(j=0; j<store.state[i].beeGrowth.length; j++){
        store.state[i].beeGrowth[j] = baseBeeSpawnRate[j]
    }

}

function forestEdgeEffect(i, neighbours){
    //bee populations decline at different rates on the edges of forests

    var j, k, neighbour,
        beeEdgeDeathRate = [1, 3, 10, 100];

    for(j=0; j<neighbours.length; j++){
        neighbour = neighbours[j];
        if(neighbour.type != 'forest'){
            for(k=0; k<store.state[i].beeGrowth.length; k++){
                store.state[i].beeGrowth[k] -= beeEdgeDeathRate[k]
            }
        }
    }
}