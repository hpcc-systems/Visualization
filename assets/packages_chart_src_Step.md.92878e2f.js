import{_ as p,c as s,a as r,e as a,w as i,b as e,d as n,r as o,o as d}from"./app.ab56574e.js";const y='{"title":"Step","description":"","frontmatter":{},"headers":[{"level":2,"title":"API","slug":"api"},{"level":2,"title":"Published Properties","slug":"published-properties"}],"relativePath":"packages/chart/src/Step.md"}',u={};function h(c,t,m,f,x,g){const l=o("ClientOnly");return d(),s("div",null,[t[5]||(t[5]=r('<h1 id="step" tabindex="-1">Step <a class="header-anchor" href="#step" aria-hidden="true">#</a></h1><p>Step, <a href="./Area.html">Area</a>, <a href="./Line.html">Line</a> and <a href="./Scatter.html">Scatter</a> serve a similar purpose. They display continuous data along a categorical or continuous axis.</p>',2)),a(l,null,{default:i(()=>t[0]||(t[0]=[e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { Step } from "@hpcc-js/chart";

  new Step()
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
`)])],-1)])),_:1}),t[6]||(t[6]=e("p",null,"Step supports n-number of numeric values per data row. A series is created for each column as needed.",-1)),a(l,null,{default:i(()=>t[1]||(t[1]=[e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { Step } from "@hpcc-js/chart";

  new Step()
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
`)])],-1)])),_:1}),t[7]||(t[7]=e("p",null,[e("em",null,"pointShape"),n(" can be used to specify the shape of each data point (see the property list below for potential values).")],-1)),t[8]||(t[8]=e("p",null,[e("em",null,"pointSize"),n(" can be used to set the size of each data point's shape.")],-1)),t[9]||(t[9]=e("p",null,[e("em",null,"showValue"),n(" specifies whether or not to display the value above each data point.")],-1)),t[10]||(t[10]=e("p",null,[e("em",null,"yAxisDomainPadding"),n(" can be used to reserve a percentage of the top and bottom edges for white space.")],-1)),a(l,null,{default:i(()=>t[2]||(t[2]=[e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { Step } from "@hpcc-js/chart";

  new Step()
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
      .yAxisDomainPadding(10)
      .render()
      ;
<\/script>
`)])],-1)])),_:1}),t[11]||(t[11]=e("p",null,[e("em",null,"interpolate"),n(" can be used to specify which line interpolation mode is used to draw the connecting line between data points (see the property list below for potential values).")],-1)),t[12]||(t[12]=e("p",null,[e("em",null,"pointDarken"),n(" can be set to 'false' to disable the slight darkening effect applied to each data point.")],-1)),t[13]||(t[13]=e("p",null,[e("em",null,"showValue"),n(" along with "),e("em",null,'valueBaseline("central")'),n(" places the values at the center of each data point.")],-1)),t[14]||(t[14]=e("p",null,[e("em",null,"xAxisDomainPadding"),n(" can be used to reserve a percentage of the left and right edges for white space.")],-1)),a(l,null,{default:i(()=>t[3]||(t[3]=[e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { Step } from "@hpcc-js/chart";

  new Step()
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
      .pointShape("rectangle")
      .pointSize(20)
      .pointDarken(false)
      .showValue(true)
      .valueBaseline("central")
      .xAxisDomainPadding(5)
      .render()
      ;
<\/script>
`)])],-1)])),_:1}),t[15]||(t[15]=e("p",null,[n("For documentation on axis-specific properties, like those used in the below example, take a look at the "),e("a",{href:"./XYAxis.html"},"Axis Documentation"),n(".")],-1)),a(l,null,{default:i(()=>t[4]||(t[4]=[e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { Step } from "@hpcc-js/chart";

  new Step()
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
`)])],-1)])),_:1}),t[16]||(t[16]=r('<h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-hidden="true">#</a></h2><h2 id="published-properties" tabindex="-1">Published Properties <a class="header-anchor" href="#published-properties" aria-hidden="true">#</a></h2><div class="language-@hpcc-js/chart:Step"><pre><code></code></pre></div>',3))])}var w=p(u,[["render",h]]);export{y as __pageData,w as default};
