import{_ as l,c as s,b as e,d as a,e as n,w as i,a as d,r as p,o}from"./app.ab56574e.js";const x='{"title":"HalfPie","description":"","frontmatter":{},"headers":[{"level":2,"title":"API","slug":"api"},{"level":2,"title":"Published Properties","slug":"published-properties"}],"relativePath":"packages/chart/src/HalfPie.md"}',h={};function c(u,t,f,P,m,g){const r=p("ClientOnly");return o(),s("div",null,[t[2]||(t[2]=e("h1",{id:"halfpie",tabindex:"-1"},[a("HalfPie "),e("a",{class:"header-anchor",href:"#halfpie","aria-hidden":"true"},"#")],-1)),t[3]||(t[3]=e("p",null,[e("a",{href:"./Pie.html"},"Pie"),a(", HalfPie and "),e("a",{href:"./QuarterPie.html"},"QuarterPie"),a(" are effectively the same class, but have different starting and ending angles. They support all of the same properties.")],-1)),n(r,null,{default:i(()=>t[0]||(t[0]=[e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
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
`)])],-1)])),_:1}),n(r,null,{default:i(()=>t[1]||(t[1]=[e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
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
`)])],-1)])),_:1}),t[4]||(t[4]=d('<h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-hidden="true">#</a></h2><h2 id="published-properties" tabindex="-1">Published Properties <a class="header-anchor" href="#published-properties" aria-hidden="true">#</a></h2><div class="language-@hpcc-js/chart:HalfPie"><pre><code></code></pre></div>',3))])}var y=l(h,[["render",c]]);export{x as __pageData,y as default};
