import{_ as s,c as i,b as e,d as n,e as a,w as l,a as d,r as o,o as p}from"./app.ab56574e.js";const y='{"title":"Bar","description":"","frontmatter":{},"headers":[{"level":2,"title":"API","slug":"api"},{"level":2,"title":"Published Properties","slug":"published-properties"}],"relativePath":"packages/chart/src/Bar.md"}',u={};function h(c,r,m,f,x,g){const t=o("ClientOnly");return p(),i("div",null,[r[3]||(r[3]=e("h1",{id:"bar",tabindex:"-1"},[n("Bar "),e("a",{class:"header-anchor",href:"#bar","aria-hidden":"true"},"#")],-1)),r[4]||(r[4]=e("p",null,[n("Bar and "),e("a",{href:"./Column.html"},"Column"),n(" are effectively the same class, but have one different default value - their "),e("em",null,"orientation"),n(". They support all of the same properties.")],-1)),a(t,null,{default:l(()=>r[0]||(r[0]=[e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
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
`)])],-1)])),_:1}),r[5]||(r[5]=e("p",null,"Two or more series are commonly compared with a bar chart.",-1)),a(t,null,{default:l(()=>r[1]||(r[1]=[e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
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
`)])],-1)])),_:1}),r[6]||(r[6]=e("p",null,[n("A bar chart supports n-number of numeric values per data row. A series is created for each column as needed. In the below example the series' are stacked together using the "),e("em",null,"yAxisStacked"),n(" property.")],-1)),a(t,null,{default:l(()=>r[2]||(r[2]=[e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
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
`)])],-1)])),_:1}),r[7]||(r[7]=d('<h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-hidden="true">#</a></h2><h2 id="published-properties" tabindex="-1">Published Properties <a class="header-anchor" href="#published-properties" aria-hidden="true">#</a></h2><div class="language-@hpcc-js/chart:Bar"><pre><code></code></pre></div>',3))])}var B=s(u,[["render",h]]);export{y as __pageData,B as default};
