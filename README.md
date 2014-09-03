MoneyBee
========


An emerging field of research in ecology is the study of 'natural capital' - the capitalization potential of natural land services like rivers, forests, natural habitats and biodiversity, and their impact on the long term, sustainable productivity of that land.  As long as natural capital remains poorly understood, it is difficult to fit the value of biodiversity into the language of our legal and economic systems of land governance; without an understanding of the real capital value of biodiversity, it is difficult to form legal cases claiming quantifiable damages have been done when natural resources are destroyed, and difficult to justify the perceived negative economic impact of conservation and protection efforts of ill-valued resources.

In this project, we'd like to build a simple browser-based game that illustrates to players the long term effects that land usage can have on the profitability of a business.  In it, players play as a blueberry farmer, starting with a plot of land laid out on a playing grid, populated with natural resources and features.  Every turn, they will have the opportunity to develop their land for farming use, and concurrently the natural landscape and productivity of the land will evolve via conditions the ecologists will specify.

##Setup & Execution
Functions for simulating bee and crop behavior are currently implemented in a simple [node](http://nodejs.org/) app.  After installing node, in the root directory do
```
npm install
node index.js
```

This will execute some of the simulation functions currently as is.

There's also a visualization demo in `visDemo/index.html`.  Open this in a web browser, and behold the performance of easel.js rendering a 20x20 grid of tiles from a sprite sheet.
