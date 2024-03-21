import{_ as l,c as o,b as i,w as s,a,d as e,e as n,r,o as h}from"./app.70956d7b.js";const D='{"title":"XYAxis","description":"","frontmatter":{},"headers":[{"level":2,"title":"API","slug":"api"},{"level":2,"title":"Published Properties","slug":"published-properties"}],"relativePath":"packages/chart/src/XYAxis.md"}',d={},p=a("",3),c=e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { XYAxis } from "@hpcc-js/chart";

  new XYAxis()
      .target("placeholder")
      .render()
      ;
<\/script>
`)])],-1),x=e("p",null,[e("em",null,"xAxisType"),n(" is likely the most significant property as it determines the expected data shape. This is the breakdown of the different axis types:")],-1),m=e("ul",null,[e("li",null,'"ordinal" - displays categorical data'),e("li",null,'"linear" - displays numerical data'),e("li",null,'"time" - displays time data'),e("li",null,'"pow" - displays numerical data skewed by a power of 2 to emphasize disproportionately large or small values.'),e("li",null,'"log" - displays numerical data skewed by a log of base 10 to de-emphasize disproportionately large or small values.')],-1),u=e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { XYAxis } from "@hpcc-js/chart";

  new XYAxis()
      .target("placeholder")
      .xAxisType("linear")
      .render()
      ;
<\/script>
`)])],-1),_=e("p",null,"The following two properties only apply to an axis while its type is 'ordinal':",-1),A=e("ul",null,[e("li",null,[e("em",null,"xAxisOrdinalPaddingInner"),n(" sets the ratio of the width of a category and the white space between categories.")]),e("li",null,[e("em",null,"xAxisOrdinalPaddingOuter"),n(" sets the ratio of the width of a category and the white space between the edges of the chart and the first (and/or last) category.")])],-1),g=e("p",null,"NOTE: Column is used below as the two padding properties require data in order to observe their effect.",-1),y=e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
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
`)])],-1),f=a("",6),w=e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
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
`)])],-1),T=a("",2),b=e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
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
`)])],-1),v=a("",3);function k(C,P,S,I,Y,V){const t=r("ClientOnly");return h(),o("div",null,[p,i(t,null,{default:s(()=>[c]),_:1}),x,m,i(t,null,{default:s(()=>[u]),_:1}),_,A,g,i(t,null,{default:s(()=>[y]),_:1}),f,i(t,null,{default:s(()=>[w]),_:1}),T,i(t,null,{default:s(()=>[b]),_:1}),v])}var O=l(d,[["render",k]]);export{D as __pageData,O as default};
