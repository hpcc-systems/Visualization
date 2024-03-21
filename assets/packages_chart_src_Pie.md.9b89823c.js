import{_ as r,c as s,b as i,w as a,d as e,e as t,a as l,r as o,o as c}from"./app.70956d7b.js";const S='{"title":"Pie","description":"","frontmatter":{},"headers":[{"level":2,"title":"API","slug":"api"},{"level":2,"title":"Published Properties","slug":"published-properties"}],"relativePath":"packages/chart/src/Pie.md"}',h={},d=e("h1",{id:"pie",tabindex:"-1"},[t("Pie "),e("a",{class:"header-anchor",href:"#pie","aria-hidden":"true"},"#")],-1),p=e("p",null,[t("A circular statistical graphic, which is divided into slices to illustrate numerical proportion. In a pie chart, the arc length of each slice, is proportional to the quantity it represents. (See also: "),e("a",{href:"./HalfPie.html"},"HalfPie"),t(" and "),e("a",{href:"./QuarterPie.html"},"QuarterPie"),t(" )")],-1),u=e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
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
`)])],-1),_=e("p",null,"In the below example the 'showSeriesValue' is used to display the value next to each slice label.",-1),m=e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
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
`)])],-1),P=e("p",null,"In the below example the 'innerRadius' is used to transform the pie chart into a donut chart. 'showSeriesPercentage' displays the percentage next to each slice label.",-1),g=e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
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
`)])],-1),f=l('<h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-hidden="true">#</a></h2><h2 id="published-properties" tabindex="-1">Published Properties <a class="header-anchor" href="#published-properties" aria-hidden="true">#</a></h2><div class="language-@hpcc-js/chart:Pie"><pre><code></code></pre></div>',3);function v(x,y,w,b,C,V){const n=o("ClientOnly");return c(),s("div",null,[d,p,i(n,null,{default:a(()=>[u]),_:1}),_,i(n,null,{default:a(()=>[m]),_:1}),P,i(n,null,{default:a(()=>[g]),_:1}),f])}var I=r(h,[["render",v]]);export{S as __pageData,I as default};
