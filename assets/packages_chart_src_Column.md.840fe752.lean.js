import{_ as o,c as s,b as e,d as t,e as l,w as a,a as i,r as d,o as p}from"./app.ab56574e.js";const v='{"title":"Column","description":"","frontmatter":{},"headers":[{"level":2,"title":"API","slug":"api"},{"level":2,"title":"Published Properties","slug":"published-properties"}],"relativePath":"packages/chart/src/Column.md"}',u={};function h(c,n,m,f,x,C){const r=d("ClientOnly");return p(),s("div",null,[n[3]||(n[3]=e("h1",{id:"column",tabindex:"-1"},[t("Column "),e("a",{class:"header-anchor",href:"#column","aria-hidden":"true"},"#")],-1)),n[4]||(n[4]=e("p",null,[e("a",{href:"./Bar.html"},"Bar"),t(" and Column are effectively the same class, but have one different default value - their "),e("em",null,"orientation"),t(". They support all of the same properties.")],-1)),l(r,null,{default:a(()=>n[0]||(n[0]=[e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
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
`)])],-1)])),_:1}),n[5]||(n[5]=e("p",null,"Two or more series are commonly compared with a column chart.",-1)),l(r,null,{default:a(()=>n[1]||(n[1]=[e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
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
`)])],-1)])),_:1}),n[6]||(n[6]=e("p",null,[t("A column chart supports n-number of numeric values per data row. A series is created for each column as needed. In the below example the series' are stacked together using the "),e("em",null,"yAxisStacked"),t(" property.")],-1)),l(r,null,{default:a(()=>n[2]||(n[2]=[e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
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
`)])],-1)])),_:1}),n[7]||(n[7]=i('<h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-hidden="true">#</a></h2><h2 id="published-properties" tabindex="-1">Published Properties <a class="header-anchor" href="#published-properties" aria-hidden="true">#</a></h2><div class="language-@hpcc-js/chart:Column"><pre><code></code></pre></div>',3))])}var y=o(u,[["render",h]]);export{v as __pageData,y as default};
