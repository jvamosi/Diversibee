Diversibee
========


An emerging field of research in ecology is the study of 'natural capital' - the capitalization potential of natural land services like rivers, forests, natural habitats and biodiversity, and their impact on the long term, sustainable productivity of that land.  As long as natural capital remains poorly understood, it is difficult to fit the value of biodiversity into the language of our legal and economic systems of land governance; without an understanding of the real capital value of biodiversity, it is difficult to form legal cases claiming quantifiable damages have been done when natural resources are destroyed, and difficult to justify the perceived negative economic impact of conservation and protection efforts of ill-valued resources.

In this project, we'd like to build a simple browser-based game that illustrates to players the long term effects that land usage can have on the profitability of a business.  In it, players play as a blueberry farmer, starting with a plot of land laid out on a playing grid, populated with natural resources and features.  Every turn, they will have the opportunity to develop their land for farming use, and concurrently the natural landscape and productivity of the land will evolve via conditions the ecologists will specify.

## Getting Started

Clone the project to your local machine, and open `index.html` in your browser to see what we've got so far.

## Get Involved

Diversibee needs all kinds of different contributors - have a look at these major areas of work and pick one that interests you.

#### Ecologists or Algorithm Designers

Diversibee strives to reflect authentic ecological modeling in its bee populations. Every turn, bee populations in the forests are updated based on the health of the local forest region, and on bee migrations between areas of forest. Ecologists, we need your help to identify what real-world effects we can try to model in game; algorithm designers, we'll need your help to implement those models.

The main wiki has a digest of the current set of rules governing [bee dynamics](https://github.com/jvamosi/Diversibee/wiki/Bee-Dynamics), and another for the current state of [profit dynamics](https://github.com/jvamosi/Diversibee/wiki/Profit-Dynamics); start here to get an understanding of the model so far, and expand from there! There are a number of [proposed enhancements](https://github.com/jvamosi/Diversibee/labels/enhancement) in the issue tracker, too, if you're looking for a place to start.

#### Artists & Designers

The spritesheet for animating the playing area currently looks like this:

![stylesheet](https://raw.githubusercontent.com/BillMills/Diversibee/master/img/spriteSheet.png)

The first row are the animation cells for grassland tiles; the second row, for forest tiles; and the thrid row, for blueberry crop tiles. We'd love suggestions on how to expand this spritesheet, or any other ideas you have on how to make the visual experience of Diversibee as elegant as possible.

#### JavaScript Enthusiasts

We're trying to keep the implementation of Diversibee simple, and accessible to JavaScript newcomers - but, we could always use expert advice on better implementations & testing. 

## Contributing Guidelines

We're trying to keep contributing to Diversibee friendly for beginners, so please follow these rules when sending a pull request:

 - Start by reading 'Understanding Diversibee in 10 Minutes' below.
 - Functions should be no longer than 50 lines, and should do exactly one thing.
 - A pull request should be at most 400 lines; please send lots of small contributions rather than one enormous one.
 - All new code must be commented clearly, and any changes that impact the high-level design below must be reflected in updates to this document.
 - Open issues early (like first thing) in the development process to let everyone know what you're working on.

## Understanding Diversibee in 10 Minutes

Here is a quick, high-level orientation of how Diversibee is designed:

#### The Game Mechanic

 - Diversibee is played on a grid of tiles; each tile can be either grassland, forest or blueberry crop.
 - Each turn, the player can spend money to turn a tile into new blueberry crop.
 - At the end of each turn, profits are awarded to the player based on the current state of the map, but...
 - ...before profits are awarded, bee populations are adjusted based on the health of their environment, affecting how well crops are pollenated and how much money is made!
 - The object of the game is to generate the highest per-turn profits in a stable, steady state.

#### The JavaScript

 - Diversibee consists of only a few series of functions:
  - **On load**: `init()` establishes the data stores, sets up the initial game state using `setUpBoardState()`, and draws the initial map using `setAnimation()` and `repaintBoard()`.
  - **On click**: When a user clicks a tile on the map to turn it into blueberry crop, `clickCell()` rewrites the appropriate entry in `store.state`, and updates the map image.
  - **On turn advancement**: `advanceTurn()` is triggered when the 'Next Turn' button is clicked; it uses `updateBeePop()`, `updateBeeGrowth()` and `updateProfits()` to modify the game state. In turn, `profits.js` contains all the functions used to update profits each turn, and `beeDynamics.js` contains the functions that govern bee population dynamics.

#### Data Handling

 - Information is stored and exposed for use in a simple global `store` object, that has the following properties:

 key | value
 ----|------
 `width` | number of cells in one row of the map
 `height` | number of cells in one column of the map
 `state` | an array of objects describing the state of the board (specification below)
 `animationData` | object encoding the animations for each cell
 `stage` | easel.js context for drawing the map
 `mapCell` | array containing the current visualization state of each cell
 `spriteSheet` | the easel.js spritesheet built from `img/spriteSheet.png`
 `w` | width in pixels of the map
 `h` | height in pixels of the map
 `cash` | current cash available to the player
 `blueberryBuildPrice` | price to turn one tile into blueberry crop.

 - The `store.state` object mentioned above is an array of objects, where the ith array element describes the ith tile (where tiles are counted left to right across rows, then top to bottom over columns). Each element in this array is an object with the following structure:

 key | value
 ----|------
 `type` | string, one of 'forest', 'grass' or 'blueberries' - indicates tile type.
 `beePop` | array of 4 integers, each representing the current population in that tile of each of 4 types of bees.
 `beeGrowth` | array of 4 integers, each representing the change that the corresponding value in `beePop` will undergo the next time the turn is advanced
