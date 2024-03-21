import{_ as l,c as n,b as a,w as r,a as i,r as s,o as h,d as e}from"./app.70956d7b.js";const b='{"title":"@hpcc-js/chart","description":"","frontmatter":{},"headers":[{"level":2,"title":"Exported Widgets","slug":"exported-widgets"},{"level":2,"title":"Stand-alone HTML Example","slug":"stand-alone-html-example"},{"level":2,"title":"Getting Started with @hpccjs","slug":"getting-started-with-hpccjs"}],"relativePath":"packages/chart/README.md"}',c={},o=i('<h1 id="hpcc-js-chart" tabindex="-1">@hpcc-js/chart <a class="header-anchor" href="#hpcc-js-chart" aria-hidden="true">#</a></h1><p>This package is part of the mono repository &quot;@hpcc-js&quot; (aka Visualization Framework), for more information including <a href="https://github.com/hpcc-systems/Visualization/wiki/Quick-Start" target="_blank" rel="noopener noreferrer">Quick Start</a>, <a href="https://raw.githack.com/hpcc-systems/Visualization/trunk/demos/gallery/gallery.html" target="_blank" rel="noopener noreferrer">Gallery</a> and <a href="https://github.com/hpcc-systems/Visualization/wiki/Tutorials" target="_blank" rel="noopener noreferrer">Tutorials</a>, please visit the main page on GitHub: <a href="https://github.com/hpcc-systems/Visualization" target="_blank" rel="noopener noreferrer">hpcc-systems/Visualization</a>.</p><h2 id="exported-widgets" tabindex="-1">Exported Widgets <a class="header-anchor" href="#exported-widgets" aria-hidden="true">#</a></h2><ul><li><a href="./src/Area.html">Area</a></li><li><a href="./src/Bar.html">Bar</a></li><li><a href="./src/Bubble.html">Bubble</a></li><li><a href="./src/Bullet.html">Bullet</a></li><li><a href="./src/Column.html">Column</a></li><li><a href="./src/Contour.html">Contour</a></li><li><a href="./src/Gantt.html">Gantt</a></li><li><a href="./src/Gauge.html">Gauge</a></li><li><a href="./src/HalfPie.html">Half Pie</a></li><li><a href="./src/Heat.html">Heat</a></li><li><a href="./src/HexBin.html">Hex Bin</a></li><li><a href="./src/Line.html">Line</a></li><li><a href="./src/Pie.html">Pie</a></li><li><a href="./src/QuarterPie.html">Quarter Pie</a></li><li><a href="./src/QuartileCandlestick.html">Quartile Candlestick</a></li><li><a href="./src/Radar.html">Radar</a></li><li><a href="./src/RadialBar.html">Radial Bar</a></li><li><a href="./src/Scatter.html">Scatter</a></li><li><a href="./src/StatChart.html">Stat Chart</a></li><li><a href="./src/Step.html">Step</a></li><li><a href="./src/Summary.html">Summary</a></li><li><a href="./src/SummaryC.html">Summary (Canvas)</a></li><li><a href="./src/WordCloud.html">Word Cloud</a></li><li><a href="./src/XYAxis.html">XYAxis</a></li></ul><h2 id="stand-alone-html-example" tabindex="-1">Stand-alone HTML Example <a class="header-anchor" href="#stand-alone-html-example" aria-hidden="true">#</a></h2>',5),p=e("hpcc-preview",{content_selector:"pre > code",style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<head>
    <title>Simple Bar Chart</title>
    <script src="https://cdn.jsdelivr.net/npm/@hpcc-js/common"><\/script>
    <script src="https://cdn.jsdelivr.net/npm/@hpcc-js/api"><\/script>
    <script src="https://cdn.jsdelivr.net/npm/@hpcc-js/chart"><\/script>
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
    <\/script>
</body>
`)])],-1),d=i('<h2 id="getting-started-with-hpccjs" tabindex="-1">Getting Started with @hpccjs <a class="header-anchor" href="#getting-started-with-hpccjs" aria-hidden="true">#</a></h2><ul><li><em><a href="https://github.com/hpcc-systems/Visualization/wiki/Quick-Start" target="_blank" rel="noopener noreferrer">Quick Start</a></em></li><li><em><a href="https://github.com/hpcc-systems/Visualization/wiki/Tutorials" target="_blank" rel="noopener noreferrer">Tutorials</a></em></li><li><em><a href="https://raw.githack.com/hpcc-systems/Visualization/trunk/demos/gallery/gallery.html" target="_blank" rel="noopener noreferrer">Gallery</a></em> (<a href="https://rawgit.com/hpcc-systems/Visualization/trunk/demos/gallery/gallery.html" target="_blank" rel="noopener noreferrer">alt</a>)</li><li><em><a href="https://github.com/hpcc-systems/Visualization/wiki" target="_blank" rel="noopener noreferrer">Wiki</a></em></li></ul>',2),m=e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="width:100%;height:400px">
</div>
<script type="module">
    import { Contour } from "@hpcc-js/chart";

    new Contour()
        .target("placeholder")
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
<\/script>
`)])],-1);function u(f,_,g,y,k,x){const t=s("ClientOnly");return h(),n("div",null,[o,a(t,null,{default:r(()=>[p]),_:1}),d,a(t,null,{default:r(()=>[m]),_:1})])}var w=l(c,[["render",u]]);export{b as __pageData,w as default};
