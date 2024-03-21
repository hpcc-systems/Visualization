import{_ as r,c as i,b as a,w as s,d as e,e as t,a as o,r as l,o as d}from"./app.70956d7b.js";const k='{"title":"Gantt","description":"","frontmatter":{},"headers":[{"level":2,"title":"API","slug":"api"},{"level":2,"title":"Published Properties","slug":"published-properties"}],"relativePath":"packages/chart/src/Gantt.md"}',c={},p=e("h1",{id:"gantt",tabindex:"-1"},[t("Gantt "),e("a",{class:"header-anchor",href:"#gantt","aria-hidden":"true"},"#")],-1),h=e("p",null,"Gantt compares ranges of continuous data. Each range is represented by an array of two numeric values. The first column of each data row must contain a string or number to represent that row's category. Each additional column must contain an array of two numbers.",-1),u=e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { Gantt } from "@hpcc-js/chart";

  new Gantt()
      .target("placeholder")
      .columns(["Category", "Range"])
      .data([
          ["A", [34, 90]],
          ["B", [55, 75]],
          ["C", [75, 89]],
          ["D", [66, 99]]
      ])
      .render()
      ;
<\/script>
`)])],-1),_=e("p",null,"Gantt also supports multiple ranges per data row.",-1),m=e("p",null,[t("The "),e("em",null,"orientation"),t(" is set to 'horizontal' by default so "),e("em",null,"yAxisTitle"),t(" is used to assign the horizontal axis' label.")],-1),g=e("p",null,[e("em",null,"xAxisSeriesPaddingInner"),t(" can be used to set the ratio between white space and bar size (per series).")],-1),x=e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { Gantt } from "@hpcc-js/chart";

  new Gantt()
      .target("placeholder")
      .columns(["State Changes", "Iron", "Aluminum", "Lead", "Gold"])
      .data([
          ["Solid", [0, 1811], [0, 933], [0, 600], [0,1337]],
          ["Liquid", [1811, 3134], [933, 2743], [600, 2022], [1337, 3243]],
          ["Gas", [3134, 5000], [2743, 5000], [2022, 5000], [3243, 5000]]
      ])
    .xAxisSeriesPaddingInner(0.3)
      .yAxisTitle("Kelvin")
      .render()
      ;
<\/script>
`)])],-1),y=e("p",null,"It also supports duplicate category values.",-1),f=e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { Gantt } from "@hpcc-js/chart";

  new Gantt()
      .target("placeholder")
      .columns(["Category", "Range"])
      .data([
          ["A", [34, 90]],
          ["B", [55, 75]],
          ["A", [95, 120]],
          ["B", [85, 175]]
      ])
      .render()
      ;
<\/script>
`)])],-1),v=e("p",null,[t("For documentation on axis-specific properties, like those used in the below example, take a look at the "),e("a",{href:"./XYAxis.html"},"Axis Documentation"),t(".")],-1),b=e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { Gantt } from "@hpcc-js/chart";

  new Gantt()
      .target("placeholder")
      .columns(["Project", "Date Range"])
      .data([
          ["Docs", ["2012-09-09", "2012-10-09"]],
          ["Coding", ["2011-08-09", "2012-09-09"]],
          ["Specs", ["2010-07-09", "2011-08-09"]]
      ])
      .yAxisType("time")
      .yAxisTypeTimePattern("%Y-%m-%d")
      .render()
      ;
<\/script>
`)])],-1),w=o("",3);function A(G,T,P,C,S,I){const n=l("ClientOnly");return d(),i("div",null,[p,h,a(n,null,{default:s(()=>[u]),_:1}),_,m,g,a(n,null,{default:s(()=>[x]),_:1}),y,a(n,null,{default:s(()=>[f]),_:1}),v,a(n,null,{default:s(()=>[b]),_:1}),w])}var B=r(c,[["render",A]]);export{k as __pageData,B as default};
