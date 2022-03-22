# @hpcc-js/chart
This package is part of the mono repository "@hpcc-js" (aka Visualization Framework), for more information including [Quick Start](https://github.com/hpcc-systems/Visualization/wiki/Quick-Start), [Gallery](https://raw.githack.com/hpcc-systems/Visualization/trunk/demos/gallery/gallery.html) and [Tutorials](https://github.com/hpcc-systems/Visualization/wiki/Tutorials), please visit the main page on GitHub:  [hpcc-systems/Visualization](https://github.com/hpcc-systems/Visualization).

## Exported Widgets
* [Area](https://raw.githack.com/hpcc-systems/Visualization/trunk/demos/gallery/playground.html?./samples/chart/Area/Area.js)
* [Bar](https://raw.githack.com/hpcc-systems/Visualization/trunk/demos/gallery/playground.html?./samples/chart/Bar/Basic.js)
* [Column](./src/Column)
* [Bubble](https://raw.githack.com/hpcc-systems/Visualization/trunk/demos/gallery/playground.html?./samples/misc/Bubble.js) / [BubbleXY](https://raw.githack.com/hpcc-systems/Visualization/trunk/demos/gallery/playground.html?./samples/chart/BubbleXY/BubbleXY.js)
* [Bullet](https://raw.githack.com/hpcc-systems/Visualization/trunk/demos/gallery/playground.html?./samples/chart/Bullet.js)
* [Contour](https://raw.githack.com/hpcc-systems/Visualization/trunk/demos/gallery/playground.html?./samples/chart/Contour/Contour.js)
* [Gantt](https://raw.githack.com/hpcc-systems/Visualization/trunk/demos/gallery/playground.html?./samples/chart/Gantt/Gantt%20II.js)
* [Gauge](https://raw.githack.com/hpcc-systems/Visualization/trunk/demos/gallery/playground.html?./samples/widget/Gauge.js)
* [Pie](./src/Pie)
* [HalfPie](https://raw.githack.com/hpcc-systems/Visualization/trunk/demos/gallery/playground.html?./samples/chart/Pie/HalfPie.js) 
* [QuarterPie](https://raw.githack.com/hpcc-systems/Visualization/trunk/demos/gallery/playground.html?./samples/chart/Pie/QuarterPie.js)
* [Radar](https://raw.githack.com/hpcc-systems/Visualization/trunk/demos/gallery/playground.html?./samples/chart/Radar/Hex.js)
* [RadialBar](https://raw.githack.com/hpcc-systems/Visualization/trunk/demos/gallery/playground.html?./samples/chart/Radial%20Bar.js)
* [Scatter](https://raw.githack.com/hpcc-systems/Visualization/trunk/demos/gallery/playground.html?./samples/chart/Scatter/Sized%20Scatter.js)
* [Step](https://raw.githack.com/hpcc-systems/Visualization/trunk/demos/gallery/playground.html?./samples/chart/Step.js)
* [Summary](https://raw.githack.com/hpcc-systems/Visualization/trunk/demos/gallery/playground.html?./samples/chart/Summary.js) / [SummaryC](https://raw.githack.com/hpcc-systems/Visualization/trunk/demos/gallery/playground.html?./samples/chart/SummaryC.js)
* [WordCloud](https://raw.githack.com/hpcc-systems/Visualization/trunk/demos/gallery/playground.html?./samples/misc/Word%20Cloud.js)

## Stand-alone HTML Example

<ClientOnly>
  <hpcc-preview content_selector="pre > code" style="width:100%;height:600px">
    <head>
        <title>Simple Bar Chart</title>
        <script src="https://cdn.jsdelivr.net/npm/@hpcc-js/common"></script>
        <script src="https://cdn.jsdelivr.net/npm/@hpcc-js/api"></script>
        <script src="https://cdn.jsdelivr.net/npm/@hpcc-js/chart"></script>
    </head>
    <body>
        <div id="placeholder" style="height:300px;"></div>
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
  </hpcc-preview>
</ClientOnly>
```

## Getting Started with @hpccjs
* _[Quick Start](https://github.com/hpcc-systems/Visualization/wiki/Quick-Start)_
* _[Tutorials](https://github.com/hpcc-systems/Visualization/wiki/Tutorials)_
* _[Gallery](https://raw.githack.com/hpcc-systems/Visualization/trunk/demos/gallery/gallery.html)_ ([alt](https://rawgit.com/hpcc-systems/Visualization/trunk/demos/gallery/gallery.html))
* _[Wiki](https://github.com/hpcc-systems/Visualization/wiki)_

<ClientOnly>
  <hpcc-vitepress style="width:100%;height:600px">
    <div id="target" style="width:100%;height:400px">
    </div>
    <script type="module">
        import { Contour } from "@hpcc-js/chart";

        new Contour()
            .target("target")
            .columns(["A", "B"])
            .data([
                [10, 10],
                [20, 20],
                [20, 30],
                [30, 20],
                [40, 30],
                [30, 40],
                [10, 20],
                [20, 10]
            ])
            .contourBandwidth(80)
            .contourStrokeWidth(0)
            .yAxisType("linear")
            .xAxisType("ordinal")
            .xAxisTitle("A")
            .render()
            ;
    </script>
  </hpcc-vitepress>
</ClientOnly>
