import{_ as o,c as s,a as i,e as l,w as r,b as e,d as t,r as p,o as d}from"./app.ab56574e.js";const v='{"title":"Area","description":"","frontmatter":{},"headers":[{"level":2,"title":"API","slug":"api"},{"level":2,"title":"Published Properties","slug":"published-properties"}],"relativePath":"packages/chart/src/Area.md"}',u={};function h(c,n,m,f,x,g){const a=p("ClientOnly");return d(),s("div",null,[n[5]||(n[5]=i('<h1 id="area" tabindex="-1">Area <a class="header-anchor" href="#area" aria-hidden="true">#</a></h1><p>Area, <a href="./Line.html">Line</a>, <a href="./Step.html">Step</a> and <a href="./Scatter.html">Scatter</a> serve a similar purpose. They display continuous data along a categorical or continuous axis.</p>',2)),l(a,null,{default:r(()=>n[0]||(n[0]=[e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { Area } from "@hpcc-js/chart";

  new Area()
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
`)])],-1)])),_:1}),n[6]||(n[6]=e("p",null,"Area supports n-number of numeric values per data row. A series is created for each column as needed.",-1)),l(a,null,{default:r(()=>n[1]||(n[1]=[e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { Area } from "@hpcc-js/chart";

  new Area()
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
`)])],-1)])),_:1}),n[7]||(n[7]=e("p",null,[e("em",null,"pointShape"),t(" can be used to specify the shape of each data point (see the property list below for potential values).")],-1)),n[8]||(n[8]=e("p",null,[e("em",null,"pointSize"),t(" can be used to set the size of each data point's shape.")],-1)),n[9]||(n[9]=e("p",null,[e("em",null,"showValue"),t(" specifies whether or not to display the value above each data point.")],-1)),n[10]||(n[10]=e("p",null,[e("em",null,"yAxisDomainPadding"),t(" can be used to reserve a percentage of the top and bottom edges for white space.")],-1)),l(a,null,{default:r(()=>n[2]||(n[2]=[e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { Area } from "@hpcc-js/chart";

  new Area()
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
`)])],-1)])),_:1}),n[11]||(n[11]=e("p",null,[e("em",null,"interpolate"),t(" can be used to specify which line interpolation mode is used to draw the connecting line between data points (see the property list below for potential values).")],-1)),n[12]||(n[12]=e("p",null,[e("em",null,"pointDarken"),t(" can be set to 'false' to disable the slight darkening effect applied to each data point.")],-1)),n[13]||(n[13]=e("p",null,[e("em",null,"showValue"),t(" along with "),e("em",null,'valueBaseline("central")'),t(" places the values at the center of each data point.")],-1)),n[14]||(n[14]=e("p",null,[e("em",null,"xAxisDomainPadding"),t(" can be used to reserve a percentage of the left and right edges for white space.")],-1)),l(a,null,{default:r(()=>n[3]||(n[3]=[e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { Area } from "@hpcc-js/chart";

  new Area()
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
`)])],-1)])),_:1}),n[15]||(n[15]=e("p",null,[t("For documentation on axis-specific properties, like those used in the below example, take a look at the "),e("a",{href:"./XYAxis.html"},"Axis Documentation"),t(".")],-1)),l(a,null,{default:r(()=>n[4]||(n[4]=[e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { Area } from "@hpcc-js/chart";

  new Area()
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
`)])],-1)])),_:1}),n[16]||(n[16]=i('<h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-hidden="true">#</a></h2><h2 id="published-properties" tabindex="-1">Published Properties <a class="header-anchor" href="#published-properties" aria-hidden="true">#</a></h2><div class="language-@hpcc-js/chart:Area"><pre><code></code></pre></div>',3))])}var y=o(u,[["render",h]]);export{v as __pageData,y as default};
