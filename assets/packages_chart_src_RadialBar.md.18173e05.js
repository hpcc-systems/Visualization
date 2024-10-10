import{_ as i,c as d,b as a,d as t,e as l,w as r,a as s,r as o,o as p}from"./app.ab56574e.js";const f='{"title":"RadialBar","description":"","frontmatter":{},"headers":[{"level":2,"title":"API","slug":"api"},{"level":2,"title":"Published Properties","slug":"published-properties"}],"relativePath":"packages/chart/src/RadialBar.md"}',u={};function h(c,e,m,g,v,x){const n=o("ClientOnly");return p(),d("div",null,[e[3]||(e[3]=a("h1",{id:"radialbar",tabindex:"-1"},[t("RadialBar "),a("a",{class:"header-anchor",href:"#radialbar","aria-hidden":"true"},"#")],-1)),e[4]||(e[4]=a("p",null,"RadialBar displays one category and one numeric value per data row.",-1)),l(n,null,{default:r(()=>e[0]||(e[0]=[a("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[a("pre",null,[a("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { RadialBar } from "@hpcc-js/chart";

  new RadialBar()
      .target("placeholder")
      .columns(["Category", "Value"])
      .data([
          ["A", 144],
          ["B", 89],
          ["C", 55],
          ["D", 34]
      ])
      .render()
      ;
<\/script>
`)])],-1)])),_:1}),e[5]||(e[5]=a("p",null,[a("em",null,"valueMaxAngle"),t(" sets the maximum angle of the largest value in the data that you provide.")],-1)),e[6]||(e[6]=a("p",null,[a("em",null,"tickCount"),t(" sets the target number of ticks to display along the circular axis. The tick count may be slightly lower or higher than the provided number as the axis attempts to place the ticks in sensible intervals.")],-1)),l(n,null,{default:r(()=>e[1]||(e[1]=[a("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[a("pre",null,[a("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { RadialBar } from "@hpcc-js/chart";

  new RadialBar()
      .target("placeholder")
      .columns(["Category", "Value 1"])
      .data([
          ["A", 144],
          ["B", 89],
          ["C", 55],
          ["D", 34]
      ])
      .valueMaxAngle(90)
      .tickCount(10)
      .render()
      ;
<\/script>
`)])],-1)])),_:1}),e[7]||(e[7]=a("p",null,[a("em",null,"domainPadding"),t(" sets the ratio of white space to bar width.")],-1)),e[8]||(e[8]=a("p",null,[a("em",null,"valueDomainHigh"),t(" sets the maximum domain axis value.")],-1)),l(n,null,{default:r(()=>e[2]||(e[2]=[a("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[a("pre",null,[a("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { RadialBar } from "@hpcc-js/chart";

  new RadialBar()
      .target("placeholder")
      .columns(["Category", "Value 1"])
      .data([
          ["A", 144],
          ["B", 89],
          ["C", 55],
          ["D", 34]
      ])
      .domainPadding(0.62)
      .valueDomainHigh(200)
      .render()
      ;
<\/script>
`)])],-1)])),_:1}),e[9]||(e[9]=s('<h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-hidden="true">#</a></h2><h2 id="published-properties" tabindex="-1">Published Properties <a class="header-anchor" href="#published-properties" aria-hidden="true">#</a></h2><div class="language-@hpcc-js/chart:RadialBar"><pre><code></code></pre></div>',3))])}var B=i(u,[["render",h]]);export{f as __pageData,B as default};
