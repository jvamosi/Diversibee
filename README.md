Diversibee
========

[![Build Status](https://travis-ci.org/jvamosi/Diversibee.png)](https://travis-ci.org/jvamosi/Diversibee)

An emerging field of research in ecology is the study of 'natural capital' - the capitalization potential of natural land services like rivers, forests, natural habitats and biodiversity, and their impact on the long term, sustainable productivity of that land.  As long as natural capital remains poorly understood, it is difficult to fit the value of biodiversity into the language of our legal and economic systems of land governance; without an understanding of the real capital value of biodiversity, it is difficult to form legal cases claiming quantifiable damages have been done when natural resources are destroyed, and difficult to justify the perceived negative economic impact of conservation and protection efforts of ill-valued resources.

In this project, we'd like to build a simple browser-based game that illustrates to players the long term effects that land usage can have on the profitability of a business.  In it, players play as a blueberry farmer, starting with a plot of land laid out on a playing grid, populated with natural resources and features.  They will have the opportunity to develop their land for farming use, and concurrently the natural landscape and productivity of the land will evolve via conditions the ecologists will specify.

## Getting Started

You can view the current version of the site at http://www.diversibee.org. To set up an environment to work in yourself, clone the project to your local machine. If you have Python installed, you can start up a local server by running `python -m SimpleHTTPServer 8000` from the project's root directory. Open http://127.0.0.1:8000 in your browser to see your local copy of the website. With that, you're ready to hack away on the JavaScript, HTML, CSS or art assets and see those changes in the game.

## Get Involved

Diversibee needs all kinds of different contributors - have a look at these major areas of work and pick one that interests you.

#### Ecologists or Algorithm Designers

Diversibee strives to reflect authentic ecological modeling in its bee populations. Ecologists, we need your help to identify what real-world effects we can try to model in game.

Algorithm designers, we'll need your help to model these effects in ways that are instructive to the player. New elements should provide interesting challenges for optimizing output and should implicitly teach some concept.

The main wiki should have a digest of the current set of rules for each level. At present, it does not.

#### Artists & Designers

The spritesheet for drawing the playing area currently looks like this:

![stylesheet](https://raw.githubusercontent.com/BillMills/Diversibee/master/img/spriteSheet.png)

The first row are the icons for grassland tiles; the second row, for forest tiles; and the thrid row, for blueberry crop tiles. We'd love suggestions on how to expand this spritesheet, or any other ideas you have on how to make the visual experience of Diversibee as elegant as possible.

#### JavaScript Enthusiasts

We're trying to keep the implementation of Diversibee simple, and accessible to JavaScript newcomers - but, we could always use expert advice on better implementations & testing. 

## Contributing Guidelines

We're trying to keep contributing to Diversibee friendly for beginners, so please follow these rules when sending a pull request:

 - Functions should be no longer than 50 lines, and should do exactly one thing.
 - A pull request should be at most 400 lines; please send lots of small contributions rather than one enormous one.
 - All new code must be commented clearly, and any changes that impact the high-level design must be reflected in updates to this document.
 - Open issues early (like first thing) in the development process to let everyone know what you're working on.
 - Code is checked with [JSHint](http://jshint.com/), so you may wish to run it on your code locally before submitting. We use the [AirBNB style guidelines](https://airbnb.io/javascript/).
