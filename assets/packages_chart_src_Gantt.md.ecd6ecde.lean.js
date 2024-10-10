import{_ as l,c as s,b as t,d as n,e as r,w as i,a as o,r as d,o as p}from"./app.ab56574e.js";const v='{"title":"Gantt","description":"","frontmatter":{},"headers":[{"level":2,"title":"API","slug":"api"},{"level":2,"title":"Published Properties","slug":"published-properties"}],"relativePath":"packages/chart/src/Gantt.md"}',u={};function h(c,e,m,g,x,y){const a=d("ClientOnly");return p(),s("div",null,[e[4]||(e[4]=t("h1",{id:"gantt",tabindex:"-1"},[n("Gantt "),t("a",{class:"header-anchor",href:"#gantt","aria-hidden":"true"},"#")],-1)),e[5]||(e[5]=t("p",null,"Gantt compares ranges of continuous data. Each range is represented by an array of two numeric values. The first column of each data row must contain a string or number to represent that row's category. Each additional column must contain an array of two numbers.",-1)),r(a,null,{default:i(()=>e[0]||(e[0]=[t("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[t("pre",null,[t("code",null,`<div id="placeholder" style="height:400px">
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
`)])],-1)])),_:1}),e[6]||(e[6]=t("p",null,"Gantt also supports multiple ranges per data row.",-1)),e[7]||(e[7]=t("p",null,[n("The "),t("em",null,"orientation"),n(" is set to 'horizontal' by default so "),t("em",null,"yAxisTitle"),n(" is used to assign the horizontal axis' label.")],-1)),e[8]||(e[8]=t("p",null,[t("em",null,"xAxisSeriesPaddingInner"),n(" can be used to set the ratio between white space and bar size (per series).")],-1)),r(a,null,{default:i(()=>e[1]||(e[1]=[t("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[t("pre",null,[t("code",null,`<div id="placeholder" style="height:400px">
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
`)])],-1)])),_:1}),e[9]||(e[9]=t("p",null,"It also supports duplicate category values.",-1)),r(a,null,{default:i(()=>e[2]||(e[2]=[t("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[t("pre",null,[t("code",null,`<div id="placeholder" style="height:400px">
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
`)])],-1)])),_:1}),e[10]||(e[10]=t("p",null,[n("For documentation on axis-specific properties, like those used in the below example, take a look at the "),t("a",{href:"./XYAxis.html"},"Axis Documentation"),n(".")],-1)),r(a,null,{default:i(()=>e[3]||(e[3]=[t("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[t("pre",null,[t("code",null,`<div id="placeholder" style="height:400px">
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
`)])],-1)])),_:1}),e[11]||(e[11]=o('<h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-hidden="true">#</a></h2><h2 id="published-properties" tabindex="-1">Published Properties <a class="header-anchor" href="#published-properties" aria-hidden="true">#</a></h2><div class="language-@hpcc-js/chart:Gantt"><pre><code></code></pre></div>',3))])}var b=l(u,[["render",h]]);export{v as __pageData,b as default};
