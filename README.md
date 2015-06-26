Diversibee
========

[![Build Status](https://travis-ci.org/jvamosi/Diversibee.png)](https://travis-ci.org/jvamosi/Diversibee)

An emerging field of research in ecology is the study of 'natural capital' - the capitalization potential of natural land services like rivers, forests, natural habitats and biodiversity, and their impact on the long term, sustainable productivity of that land.  As long as natural capital remains poorly understood, it is difficult to fit the value of biodiversity into the language of our legal and economic systems of land governance; without an understanding of the real capital value of biodiversity, it is difficult to form legal cases claiming quantifiable damages have been done when natural resources are destroyed, and difficult to justify the perceived negative economic impact of conservation and protection efforts of ill-valued resources.

In this project, we'd like to build a simple browser-based game that illustrates to players the long term effects that land usage can have on the profitability of a business.  In it, players play as a blueberry farmer, starting with a plot of land laid out on a playing grid, populated with natural resources and features.  Every turn, they will have the opportunity to develop their land for farming use, and concurrently the natural landscape and productivity of the land will evolve via conditions the ecologists will specify.

## Getting Started

You can see the working version at http://jvamosi.github.io/Diversibee. Alternatively, clone the project to your local machine, and open `index.html` in your browser to see what we've got so far.

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
 - Code is checked with [JSHint](http://jshint.com/) and [JSCS](http://jscs.info), so you may wish to run it on your code locally before submitting. We use the [AirBNB style guidelines](http://airbnb.io/javascript).
