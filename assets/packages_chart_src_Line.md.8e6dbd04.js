import{_ as o,c as s,b as a,w as i,a as l,d as e,e as n,r,o as p}from"./app.70956d7b.js";const z='{"title":"Line","description":"","frontmatter":{},"headers":[{"level":2,"title":"API","slug":"api"},{"level":2,"title":"Published Properties","slug":"published-properties"}],"relativePath":"packages/chart/src/Line.md"}',c={},d=l('<h1 id="line" tabindex="-1">Line <a class="header-anchor" href="#line" aria-hidden="true">#</a></h1><p>Line, <a href="./Area.html">Area</a>, <a href="./Scatter.html">Scatter</a> and <a href="./Step.html">Step</a> serve a similar purpose. They display continuous data along a categorical or continuous axis.</p>',2),h=e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { Line } from "@hpcc-js/chart";

  new Line()
      .target("placeholder")
      .columns(["Category", "Value"])
      .data([
          ["A", 34],
          ["B", 55],
          ["C", 89],
          ["D", 144]
      ])
      .render()
      ;
<\/script>
`)])],-1),u=e("p",null,"Line supports n-number of numeric values per data row. A series is created for each column as needed.",-1),_=e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { Line } from "@hpcc-js/chart";

  new Line()
      .target("placeholder")
      .columns(["Category", "Value 1", "Value 2", "Value 3"])
      .data([
          ["A", 34, 90, 82],
          ["B", 55, 50, 65],
          ["C", 89, 75, 43],
          ["D", 144, 66, 56]
      ])
      .render()
      ;
<\/script>
`)])],-1),m=e("p",null,[e("em",null,"pointShape"),n(" can be used to specify the shape of each data point (see the property list below for potential values).")],-1),f=e("p",null,[e("em",null,"pointSize"),n(" can be used to set the size of each data point's shape.")],-1),x=e("p",null,[e("em",null,"showValue"),n(" specifies whether or not to display the value above each data point.")],-1),g=e("p",null,[e("em",null,"yAxisDomainPadding"),n(" can be used to reserve a percentage of the top and bottom edges for white space.")],-1),v=e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { Line } from "@hpcc-js/chart";

  new Line()
      .target("placeholder")
      .columns(["Category", "Value", "Value 2"])
      .data([
          ["A", 34, 350],
          ["B", 55, 380],
          ["C", 89, 390],
          ["D", 98, 410]
      ])
      .pointShape("circle")
      .pointSize(2)
      .showValue(true)
      .render()
      ;
<\/script>
`)])],-1),y=e("p",null,[e("em",null,"interpolate"),n(" can be used to specify which line interpolation mode is used to draw the connecting line between data points (see the property list below for potential values).")],-1),A=e("p",null,[e("em",null,"pointDarken"),n(" can be set to 'false' to disable the slight darkening effect applied to each data point.")],-1),w=e("p",null,[e("em",null,"xAxisDomainPadding"),n(" can be used to reserve a percentage of the left and right edges for white space.")],-1),b=e("p",null,[e("em",null,"showValue"),n(" along with "),e("em",null,'valueBaseline("central")'),n(" places the values at the center of each data point.")],-1),V=e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { Line } from "@hpcc-js/chart";

  new Line()
      .target("placeholder")
      .columns(["Value 1", "Value 2"])
      .data([
          [144, 90],
          [89, 50],
          [55, 75],
          [34, 66]
      ])
      .paletteID("FlatUI_German")
      .xAxisType("linear")
      .xAxisDomainPadding(5)
      .pointShape("rectangle")
      .pointSize(20)
      .pointDarken(false)
      .showValue(true)
      .valueBaseline("central")
      .interpolate("monotone")
      .render()
      ;
<\/script>
`)])],-1),T=e("p",null,[n("For documentation on axis-specific properties, like those used in the below example, take a look at the "),e("a",{href:"./XYAxis.html"},"Axis Documentation"),n(".")],-1),L=e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { Line } from "@hpcc-js/chart";

  new Line()
      .target("placeholder")
      .columns(["Value 1", "Value 2"])
      .data([
          [144, 90],
          [89, 50],
          [55, 75],
          [34, 66]
      ])
      .xAxisType("linear")
      .xAxisTitle("X-Axis Title")
      .yAxisTitle("Y-Axis Title")
      .xAxisTickCount(30)
      .xAxisOverlapMode("rotate")
      .xAxisLabelRotation(90)
      .pointShape("circle")
      .render()
      ;
<\/script>
`)])],-1),S=l('<h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-hidden="true">#</a></h2><h2 id="published-properties" tabindex="-1">Published Properties <a class="header-anchor" href="#published-properties" aria-hidden="true">#</a></h2><div class="language-@hpcc-js/chart:Line"><pre><code></code></pre></div>',3);function C(P,D,k,B,I,j){const t=r("ClientOnly");return p(),s("div",null,[d,a(t,null,{default:i(()=>[h]),_:1}),u,a(t,null,{default:i(()=>[_]),_:1}),m,f,x,g,a(t,null,{default:i(()=>[v]),_:1}),y,A,w,b,a(t,null,{default:i(()=>[V]),_:1}),T,a(t,null,{default:i(()=>[L]),_:1}),S])}var $=o(c,[["render",C]]);export{z as __pageData,$ as default};
