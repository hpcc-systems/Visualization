import{_ as o,c as s,b as a,w as l,a as i,d as e,e as t,r,o as p}from"./app.70956d7b.js";const $='{"title":"Area","description":"","frontmatter":{},"headers":[{"level":2,"title":"API","slug":"api"},{"level":2,"title":"Published Properties","slug":"published-properties"}],"relativePath":"packages/chart/src/Area.md"}',c={},d=i("",2),h=e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
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
`)])],-1),u=e("p",null,"Area supports n-number of numeric values per data row. A series is created for each column as needed.",-1),_=e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
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
`)])],-1),m=e("p",null,[e("em",null,"pointShape"),t(" can be used to specify the shape of each data point (see the property list below for potential values).")],-1),f=e("p",null,[e("em",null,"pointSize"),t(" can be used to set the size of each data point's shape.")],-1),x=e("p",null,[e("em",null,"showValue"),t(" specifies whether or not to display the value above each data point.")],-1),A=e("p",null,[e("em",null,"yAxisDomainPadding"),t(" can be used to reserve a percentage of the top and bottom edges for white space.")],-1),g=e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
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
`)])],-1),v=e("p",null,[e("em",null,"interpolate"),t(" can be used to specify which line interpolation mode is used to draw the connecting line between data points (see the property list below for potential values).")],-1),y=e("p",null,[e("em",null,"pointDarken"),t(" can be set to 'false' to disable the slight darkening effect applied to each data point.")],-1),w=e("p",null,[e("em",null,"showValue"),t(" along with "),e("em",null,'valueBaseline("central")'),t(" places the values at the center of each data point.")],-1),b=e("p",null,[e("em",null,"xAxisDomainPadding"),t(" can be used to reserve a percentage of the left and right edges for white space.")],-1),V=e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
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
`)])],-1),T=e("p",null,[t("For documentation on axis-specific properties, like those used in the below example, take a look at the "),e("a",{href:"./XYAxis.html"},"Axis Documentation"),t(".")],-1),S=e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
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
`)])],-1),C=i("",3);function P(D,k,B,I,j,N){const n=r("ClientOnly");return p(),s("div",null,[d,a(n,null,{default:l(()=>[h]),_:1}),u,a(n,null,{default:l(()=>[_]),_:1}),m,f,x,A,a(n,null,{default:l(()=>[g]),_:1}),v,y,w,b,a(n,null,{default:l(()=>[V]),_:1}),T,a(n,null,{default:l(()=>[S]),_:1}),C])}var E=o(c,[["render",P]]);export{$ as __pageData,E as default};
