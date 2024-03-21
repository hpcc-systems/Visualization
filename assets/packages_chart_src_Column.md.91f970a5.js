import{_ as l,c as o,b as r,w as a,d as e,e as n,a as s,r as i,o as d}from"./app.70956d7b.js";const T='{"title":"Column","description":"","frontmatter":{},"headers":[{"level":2,"title":"API","slug":"api"},{"level":2,"title":"Published Properties","slug":"published-properties"}],"relativePath":"packages/chart/src/Column.md"}',c={},h=e("h1",{id:"column",tabindex:"-1"},[n("Column "),e("a",{class:"header-anchor",href:"#column","aria-hidden":"true"},"#")],-1),p=e("p",null,[e("a",{href:"./Bar.html"},"Bar"),n(" and Column are effectively the same class, but have one different default value - their "),e("em",null,"orientation"),n(". They support all of the same properties.")],-1),u=e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { Column } from "@hpcc-js/chart";

  new Column()
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
`)])],-1),m=e("p",null,"Two or more series are commonly compared with a column chart.",-1),_=e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { Column } from "@hpcc-js/chart";

  new Column()
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
`)])],-1),f=e("p",null,[n("A column chart supports n-number of numeric values per data row. A series is created for each column as needed. In the below example the series' are stacked together using the "),e("em",null,"yAxisStacked"),n(" property.")],-1),C=e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { Column } from "@hpcc-js/chart";

  new Column()
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
`)])],-1),x=s('<h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-hidden="true">#</a></h2><h2 id="published-properties" tabindex="-1">Published Properties <a class="header-anchor" href="#published-properties" aria-hidden="true">#</a></h2><div class="language-@hpcc-js/chart:Column"><pre><code></code></pre></div>',3);function g(v,y,A,w,V,b){const t=i("ClientOnly");return d(),o("div",null,[h,p,r(t,null,{default:a(()=>[u]),_:1}),m,r(t,null,{default:a(()=>[_]),_:1}),f,r(t,null,{default:a(()=>[C]),_:1}),x])}var B=l(c,[["render",g]]);export{T as __pageData,B as default};
