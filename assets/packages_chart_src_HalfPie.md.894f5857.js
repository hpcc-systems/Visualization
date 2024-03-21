import{_ as i,c as l,b as n,w as r,d as e,e as t,a as s,r as d,o}from"./app.70956d7b.js";const H='{"title":"HalfPie","description":"","frontmatter":{},"headers":[{"level":2,"title":"API","slug":"api"},{"level":2,"title":"Published Properties","slug":"published-properties"}],"relativePath":"packages/chart/src/HalfPie.md"}',c={},h=e("h1",{id:"halfpie",tabindex:"-1"},[t("HalfPie "),e("a",{class:"header-anchor",href:"#halfpie","aria-hidden":"true"},"#")],-1),p=e("p",null,[e("a",{href:"./Pie.html"},"Pie"),t(", HalfPie and "),e("a",{href:"./QuarterPie.html"},"QuarterPie"),t(" are effectively the same class, but have different starting and ending angles. They support all of the same properties.")],-1),u=e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { HalfPie } from "@hpcc-js/chart";

  new HalfPie()
      .columns(["Category", "Value"])
      .data([
          ["A", 34],
          ["B", 55],
          ["C", 89],
          ["D", 144]
      ])
      .target("placeholder")
      .render()
      ;
<\/script>
`)])],-1),_=e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { HalfPie } from "@hpcc-js/chart";

  new HalfPie()
      .columns(["Category", "Value"])
      .data([
          ["A", 34],
          ["B", 55],
          ["C", 89],
          ["D", 144]
      ])
      .target("placeholder")
      .innerRadius(62)
      .showSeriesPercentage(true)
      .showSeriesValue(true)
      .render()
      ;
<\/script>
`)])],-1),f=s('<h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-hidden="true">#</a></h2><h2 id="published-properties" tabindex="-1">Published Properties <a class="header-anchor" href="#published-properties" aria-hidden="true">#</a></h2><div class="language-@hpcc-js/chart:HalfPie"><pre><code></code></pre></div>',3);function P(m,g,v,x,y,b){const a=d("ClientOnly");return o(),l("div",null,[h,p,n(a,null,{default:r(()=>[u]),_:1}),n(a,null,{default:r(()=>[_]),_:1}),f])}var V=i(c,[["render",P]]);export{H as __pageData,V as default};
