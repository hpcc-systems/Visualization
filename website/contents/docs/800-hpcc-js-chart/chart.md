---
title: Overview
root: '/docs'
parents: ['@hpcc-js/chart']
---

This package is part of the mono repository "@hpcc-js" (aka Visualization Framework), for more information including [Quick Start](https://github.com/hpcc-systems/Visualization/wiki/Quick-Start), [Gallery](https://raw.githack.com/hpcc-systems/Visualization/master/demos/gallery/gallery.html) and [Tutorials](https://github.com/hpcc-systems/Visualization/wiki/Tutorials), please visit the main page on GitHub:  [hpcc-systems/Visualization](https://github.com/hpcc-systems/Visualization).

## Exported Widgets
* [Area](https://raw.githack.com/hpcc-systems/Visualization/master/demos/gallery/playground.html?./samples/chart/Area/Area.js)
* [Bar](https://raw.githack.com/hpcc-systems/Visualization/master/demos/gallery/playground.html?./samples/chart/Bar.js) / [Column](https://raw.githack.com/hpcc-systems/Visualization/master/demos/gallery/playground.html?./samples/chart/Column/Column.js)
* [Bubble](https://raw.githack.com/hpcc-systems/Visualization/master/demos/gallery/playground.html?./samples/misc/Bubble.js) / [BubbleXY](https://raw.githack.com/hpcc-systems/Visualization/master/demos/gallery/playground.html?./samples/chart/BubbleXY/BubbleXY.js)
* [Bullet](https://raw.githack.com/hpcc-systems/Visualization/master/demos/gallery/playground.html?./samples/chart/Bullet.js)
* [Contour](https://raw.githack.com/hpcc-systems/Visualization/master/demos/gallery/playground.html?./samples/chart/Contour/Contour.js)
* [Gantt](https://raw.githack.com/hpcc-systems/Visualization/master/demos/gallery/playground.html?./samples/chart/Gantt/Gantt%20II.js)
* [Gauge](https://raw.githack.com/hpcc-systems/Visualization/master/demos/gallery/playground.html?./samples/widget/Gauge.js)
* [Pie](https://raw.githack.com/hpcc-systems/Visualization/master/demos/gallery/playground.html?./samples/chart/Pie/Pie.js) / [HalfPie](https://raw.githack.com/hpcc-systems/Visualization/master/demos/gallery/playground.html?./samples/chart/Pie/HalfPie.js) / [QuarterPie](https://raw.githack.com/hpcc-systems/Visualization/master/demos/gallery/playground.html?./samples/chart/Pie/QuarterPie.js)
* [Radar](https://raw.githack.com/hpcc-systems/Visualization/master/demos/gallery/playground.html?./samples/chart/Radar/Hex.js)
* [RadialBar](https://raw.githack.com/hpcc-systems/Visualization/master/demos/gallery/playground.html?./samples/chart/Radial%20Bar.js)
* [Scatter](https://raw.githack.com/hpcc-systems/Visualization/master/demos/gallery/playground.html?./samples/chart/Scatter/Sized%20Scatter.js)
* [Step](https://raw.githack.com/hpcc-systems/Visualization/master/demos/gallery/playground.html?./samples/chart/Step.js)
* [Summary](https://raw.githack.com/hpcc-systems/Visualization/master/demos/gallery/playground.html?./samples/chart/Summary.js) / [SummaryC](https://raw.githack.com/hpcc-systems/Visualization/master/demos/gallery/playground.html?./samples/chart/SummaryC.js)
* [WordCloud](https://raw.githack.com/hpcc-systems/Visualization/master/demos/gallery/playground.html?./samples/misc/Word%20Cloud.js)

## Stand-alone HTML Example

<!--DOCUSAURUS_CODE_TABS-->
<!--HTML-->
```html
<html>
    <head>
        <title>Simple Bar Chart</title>
        <script src="https://unpkg.com/@hpcc-js/common"></script>
        <script src="https://unpkg.com/@hpcc-js/api"></script>
        <script src="https://unpkg.com/@hpcc-js/chart"></script>
    </head>
    <body>
        <div id="placeholder" style="width:800px;height:600px;"></div>
        <script>
            var chart = new window["@hpcc-js/chart"].Bar()
                .target("placeholder")
                .columns(["Subject", "Year 1", "Year 2", "Year 3"])
                .data([
                    ["Geography", 75, 68, 65],
                    ["English", 45, 55, -52],
                    ["Math", 98, 92, 90],
                    ["Science", 66, 60, 72]
                ])
                .render();
        </script>
    </body>
</html>
```
<!--END_DOCUSAURUS_CODE_TABS-->

## Getting Started with @hpccjs
* _[Quick Start](https://github.com/hpcc-systems/Visualization/wiki/Quick-Start)_
* _[Tutorials](https://github.com/hpcc-systems/Visualization/wiki/Tutorials)_
* _[Gallery](https://raw.githack.com/hpcc-systems/Visualization/master/demos/gallery/gallery.html)_ ([alt](https://rawgit.com/hpcc-systems/Visualization/master/demos/gallery/gallery.html))
* _[Wiki](https://github.com/hpcc-systems/Visualization/wiki)_
