import{_ as l,c as s,b as t,d as n,e as i,w as a,a as o,r as p,o as d}from"./app.ab56574e.js";const x='{"title":"Pie","description":"","frontmatter":{},"headers":[{"level":2,"title":"API","slug":"api"},{"level":2,"title":"Published Properties","slug":"published-properties"}],"relativePath":"packages/chart/src/Pie.md"}',h={};function c(u,e,m,P,g,f){const r=p("ClientOnly");return d(),s("div",null,[e[3]||(e[3]=t("h1",{id:"pie",tabindex:"-1"},[n("Pie "),t("a",{class:"header-anchor",href:"#pie","aria-hidden":"true"},"#")],-1)),e[4]||(e[4]=t("p",null,[n("A circular statistical graphic, which is divided into slices to illustrate numerical proportion. In a pie chart, the arc length of each slice, is proportional to the quantity it represents. (See also: "),t("a",{href:"./HalfPie.html"},"HalfPie"),n(" and "),t("a",{href:"./QuarterPie.html"},"QuarterPie"),n(" )")],-1)),i(r,null,{default:a(()=>e[0]||(e[0]=[t("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[t("pre",null,[t("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { Pie } from "@hpcc-js/chart";

  new Pie()
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
`)])],-1)])),_:1}),e[5]||(e[5]=t("p",null,"In the below example the 'showSeriesValue' is used to display the value next to each slice label.",-1)),i(r,null,{default:a(()=>e[1]||(e[1]=[t("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[t("pre",null,[t("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { Pie } from "@hpcc-js/chart";

  new Pie()
      .target("placeholder")
      .columns(["Category", "Value"])
      .data([
          ["A", 34],
          ["B", 55],
          ["C", 89],
          ["D", 144]
      ])
      .showSeriesValue(true)
      .render()
      ;
<\/script>
`)])],-1)])),_:1}),e[6]||(e[6]=t("p",null,"In the below example the 'innerRadius' is used to transform the pie chart into a donut chart. 'showSeriesPercentage' displays the percentage next to each slice label.",-1)),i(r,null,{default:a(()=>e[2]||(e[2]=[t("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[t("pre",null,[t("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { Pie } from "@hpcc-js/chart";

  new Pie()
      .target("placeholder")
      .columns(["Category", "Value"])
      .data([
          ["A", 34],
          ["B", 55],
          ["C", 89],
          ["D", 144]
      ])
      .innerRadius(62)
      .showSeriesPercentage(true)
      .render()
      ;
<\/script>
`)])],-1)])),_:1}),e[7]||(e[7]=o('<h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-hidden="true">#</a></h2><h2 id="published-properties" tabindex="-1">Published Properties <a class="header-anchor" href="#published-properties" aria-hidden="true">#</a></h2><div class="language-@hpcc-js/chart:Pie"><pre><code></code></pre></div>',3))])}var y=l(h,[["render",c]]);export{x as __pageData,y as default};
