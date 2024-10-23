import{_ as r,c as o,a as s,e as l,w as n,b as e,d as a,r as d,o as p}from"./app.ab56574e.js";const A='{"title":"XYAxis","description":"","frontmatter":{},"headers":[{"level":2,"title":"API","slug":"api"},{"level":2,"title":"Published Properties","slug":"published-properties"}],"relativePath":"packages/chart/src/XYAxis.md"}',h={};function x(m,t,u,c,g,y){const i=d("ClientOnly");return p(),o("div",null,[t[5]||(t[5]=s('<h1 id="xyaxis" tabindex="-1">XYAxis <a class="header-anchor" href="#xyaxis" aria-hidden="true">#</a></h1><p>The XYAxis widget generates the x-axis and y-axis for the following widgets: <a href="./Area.html">Area</a>, <a href="./Bar.html">Bar</a>, <a href="./Column.html">Column</a>, <a href="./Contour.html">Contour</a>, <a href="./Gantt.html">Gantt</a>, <a href="./HexBin.html">HexBin</a>, <a href="./Line.html">Line</a>, <a href="./Scatter.html">Scatter</a> and <a href="./Step.html">Step</a>.</p><p>The x and y axis extend a core &#39;Axis&#39; widget and share all of the same properties (with the exception of <em>xAxisFocus</em> and <em>xAxisFocusHeight</em>). This means that the &#39;xAxis&#39; and &#39;yAxis&#39; prefixes can be used interchangeably to affect the corresponding axis.</p>',3)),l(i,null,{default:n(()=>t[0]||(t[0]=[e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { XYAxis } from "@hpcc-js/chart";

  new XYAxis()
      .target("placeholder")
      .render()
      ;
<\/script>
`)])],-1)])),_:1}),t[6]||(t[6]=e("p",null,[e("em",null,"xAxisType"),a(" is likely the most significant property as it determines the expected data shape. This is the breakdown of the different axis types:")],-1)),t[7]||(t[7]=e("ul",null,[e("li",null,'"ordinal" - displays categorical data'),e("li",null,'"linear" - displays numerical data'),e("li",null,'"time" - displays time data'),e("li",null,'"pow" - displays numerical data skewed by a power of 2 to emphasize disproportionately large or small values.'),e("li",null,'"log" - displays numerical data skewed by a log of base 10 to de-emphasize disproportionately large or small values.')],-1)),l(i,null,{default:n(()=>t[1]||(t[1]=[e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { XYAxis } from "@hpcc-js/chart";

  new XYAxis()
      .target("placeholder")
      .xAxisType("linear")
      .render()
      ;
<\/script>
`)])],-1)])),_:1}),t[8]||(t[8]=e("p",null,"The following two properties only apply to an axis while its type is 'ordinal':",-1)),t[9]||(t[9]=e("ul",null,[e("li",null,[e("em",null,"xAxisOrdinalPaddingInner"),a(" sets the ratio of the width of a category and the white space between categories.")]),e("li",null,[e("em",null,"xAxisOrdinalPaddingOuter"),a(" sets the ratio of the width of a category and the white space between the edges of the chart and the first (and/or last) category.")])],-1)),t[10]||(t[10]=e("p",null,"NOTE: Column is used below as the two padding properties require data in order to observe their effect.",-1)),l(i,null,{default:n(()=>t[2]||(t[2]=[e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { Column } from "@hpcc-js/chart";

  new Column()
      .target("placeholder")
      .columns(["Category", "Value 1", "Value 2", "Value 3"])
      .xAxisOrdinalPaddingInner(0.9)
      .xAxisOrdinalPaddingOuter(1)
      .data([
          ["A", 34, 90, 82],
          ["B", 55, 50, 65],
          ["C", 89, 75, 43],
          ["D", 144, 66, 56]
      ])
      .render()
      ;
<\/script>
`)])],-1)])),_:1}),t[11]||(t[11]=s("<p><em>xAxisGuideLines</em> displays lines across the background corresponding to each axis tick and perpendicular to their axis.</p><p><em>xAxisDomainLow</em> and <em>xAxisDomainHigh</em> set the axis&#39; lower and upper values (only while the axis type is not ordinal).</p><p><em>xAxisTickCount</em> sets the target number of ticks to display along the axis. The tick count may be slightly lower or higher than the provided number as the axis attempts to place the ticks in sensible intervals.</p><p><em>xAxisTickFormat</em> sets the number format rule for axis tick text (only while the axis type is not ordinal).</p><p><em>xAxisOverlapMode</em> specifies the behavior when tick labels would overlap.</p><p><em>xAxisLabelRotation</em> sets the degree angle of rotation for labels while overlap mode is &#39;rotate&#39;.</p>",6)),l(i,null,{default:n(()=>t[3]||(t[3]=[e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { XYAxis } from "@hpcc-js/chart";

  new XYAxis()
      .target("placeholder")
      .yAxisType("log")
      .xAxisType("pow")
      .xAxisGuideLines(true)
      .xAxisDomainLow(-1000000)
      .xAxisDomainHigh(1000000)
      .xAxisTickCount(7)
      .xAxisTickFormat(",.2r")
      .xAxisOverlapMode("rotate")
      .xAxisLabelRotation(90)
      .xAxisTitle("AXIS TITLE GOES HERE")
      .render()
      ;
<\/script>
`)])],-1)])),_:1}),t[12]||(t[12]=s("<p>While working with time data the following properties should be used:</p><ul><li><em>xAxisType</em> should be set to &quot;time&quot;</li><li><em>xAxisTypeTimePattern</em> should be set to match the string format of your time data. <ul><li>In other words: <em>this property tells the widget how to ingest the time strings in your data</em></li></ul></li><li><em>xAxisTickFormat</em> should be set to match the desired time format of the axis ticks. <ul><li>In other words: <em>this property tells the widget what you want the tick text to look like</em></li></ul></li><li><em>xAxisDomainLow</em> and <em>xAxisDomainHigh</em> are optional, but should you choose to use them, then they should match the format specified <em>xAxisTypeTimePattern</em>.</li></ul>",2)),l(i,null,{default:n(()=>t[4]||(t[4]=[e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { XYAxis } from "@hpcc-js/chart";

  new XYAxis()
      .target("placeholder")
      .xAxisType("time")
      .xAxisTypeTimePattern("%m/%d/%Y")
      .xAxisDomainLow("06/31/1980")
      .xAxisDomainHigh("06/31/2019")
      .xAxisTickFormat("%Y")
      .render()
      ;
<\/script>
`)])],-1)])),_:1}),t[13]||(t[13]=s('<h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-hidden="true">#</a></h2><h2 id="published-properties" tabindex="-1">Published Properties <a class="header-anchor" href="#published-properties" aria-hidden="true">#</a></h2><div class="language-@hpcc-js/chart:XYAxis"><pre><code></code></pre></div>',3))])}var w=r(h,[["render",x]]);export{A as __pageData,w as default};
