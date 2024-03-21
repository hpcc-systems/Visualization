import{_ as i,c as r,b as n,w as l,d as e,e as a,a as s,r as d,o}from"./app.70956d7b.js";const k='{"title":"RadialBar","description":"","frontmatter":{},"headers":[{"level":2,"title":"API","slug":"api"},{"level":2,"title":"Published Properties","slug":"published-properties"}],"relativePath":"packages/chart/src/RadialBar.md"}',c={},h=e("h1",{id:"radialbar",tabindex:"-1"},[a("RadialBar "),e("a",{class:"header-anchor",href:"#radialbar","aria-hidden":"true"},"#")],-1),p=e("p",null,"RadialBar displays one category and one numeric value per data row.",-1),u=e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
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
`)])],-1),_=e("p",null,[e("em",null,"valueMaxAngle"),a(" sets the maximum angle of the largest value in the data that you provide.")],-1),m=e("p",null,[e("em",null,"tickCount"),a(" sets the target number of ticks to display along the circular axis. The tick count may be slightly lower or higher than the provided number as the axis attempts to place the ticks in sensible intervals.")],-1),g=e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
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
`)])],-1),v=e("p",null,[e("em",null,"domainPadding"),a(" sets the ratio of white space to bar width.")],-1),x=e("p",null,[e("em",null,"valueDomainHigh"),a(" sets the maximum domain axis value.")],-1),y=e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
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
`)])],-1),f=s("",3);function B(b,C,R,w,P,A){const t=d("ClientOnly");return o(),r("div",null,[h,p,n(t,null,{default:l(()=>[u]),_:1}),_,m,n(t,null,{default:l(()=>[g]),_:1}),v,x,n(t,null,{default:l(()=>[y]),_:1}),f])}var T=i(c,[["render",B]]);export{k as __pageData,T as default};
