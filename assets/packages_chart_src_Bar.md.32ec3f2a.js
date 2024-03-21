import{_ as s,c as l,b as n,w as a,d as e,e as t,a as i,r as o,o as d}from"./app.70956d7b.js";const P='{"title":"Bar","description":"","frontmatter":{},"headers":[{"level":2,"title":"API","slug":"api"},{"level":2,"title":"Published Properties","slug":"published-properties"}],"relativePath":"packages/chart/src/Bar.md"}',c={},h=e("h1",{id:"bar",tabindex:"-1"},[t("Bar "),e("a",{class:"header-anchor",href:"#bar","aria-hidden":"true"},"#")],-1),p=e("p",null,[t("Bar and "),e("a",{href:"./Column.html"},"Column"),t(" are effectively the same class, but have one different default value - their "),e("em",null,"orientation"),t(". They support all of the same properties.")],-1),u=e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { Bar } from "@hpcc-js/chart";

  new Bar()
      .target("placeholder")
      .columns(["Category", "Value"])
      .data([
          ["A", 34],
          ["B", 55],
          ["C", 89],
          ["D", 144]
      ])
      .yAxisDomainLow(0)
      .render()
      ;
<\/script>
`)])],-1),_=e("p",null,"Two or more series are commonly compared with a bar chart.",-1),m=e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { Bar } from "@hpcc-js/chart";

  new Bar()
      .target("placeholder")
      .columns(["Category", "Value 1", "Value 2"])
      .data([
          ["A", 34, 90],
          ["B", 55, 50],
          ["C", 89, 75],
          ["D", 144, 66]
      ])
      .xAxisOrdinalPaddingInner(0.38)
      .xAxisOrdinalPaddingOuter(0.62)
      .xAxisFocus(true)
      .render()
      ;
<\/script>
`)])],-1),f=e("p",null,[t("A bar chart supports n-number of numeric values per data row. A series is created for each column as needed. In the below example the series' are stacked together using the "),e("em",null,"yAxisStacked"),t(" property.")],-1),x=e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { Bar } from "@hpcc-js/chart";

  new Bar()
      .target("placeholder")
      .columns(["Category", "Value 1", "Value 2", "Value 3"])
      .data([
          ["A", 34, 90, 82],
          ["B", 55, 50, 65],
          ["C", 89, 75, 43],
          ["D", 144, 66, 56]
      ])
      .showValue(true)
      .valueCentered(true)
      .yAxisStacked(true)
      .render()
      ;
<\/script>
`)])],-1),g=i('<h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-hidden="true">#</a></h2><h2 id="published-properties" tabindex="-1">Published Properties <a class="header-anchor" href="#published-properties" aria-hidden="true">#</a></h2><div class="language-@hpcc-js/chart:Bar"><pre><code></code></pre></div>',3);function v(y,B,b,A,C,w){const r=o("ClientOnly");return d(),l("div",null,[h,p,n(r,null,{default:a(()=>[u]),_:1}),_,n(r,null,{default:a(()=>[m]),_:1}),f,n(r,null,{default:a(()=>[x]),_:1}),g])}var T=s(c,[["render",v]]);export{P as __pageData,T as default};
