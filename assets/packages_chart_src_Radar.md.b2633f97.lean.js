import{_ as r,c as o,b as t,w as l,d as e,e as n,a as s,r as i,o as d}from"./app.70956d7b.js";const z='{"title":"Radar","description":"","frontmatter":{},"headers":[{"level":2,"title":"API","slug":"api"},{"level":2,"title":"Published Properties","slug":"published-properties"}],"relativePath":"packages/chart/src/Radar.md"}',c={},p=e("h1",{id:"radar",tabindex:"-1"},[n("Radar "),e("a",{class:"header-anchor",href:"#radar","aria-hidden":"true"},"#")],-1),h=e("p",null,"Radar displays continuous data across n-number of categories (rows) and n-number of series (columns).",-1),u=e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { Radar } from "@hpcc-js/chart";

  new Radar()
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
`)])],-1),_=e("p",null,[e("em",null,"fontFamily"),n(" and "),e("em",null,"fontSize"),n(" can be used to control the font family and size used for the labels and guidelines.")],-1),m=e("p",null,[e("em",null,"pointShape"),n(" and "),e("em",null,"pointSize"),n(" can be used to control the shape and size of the data points.")],-1),f=e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { Radar } from "@hpcc-js/chart";

  new Radar()
      .target("placeholder")
      .columns(["Hour", "Value"])
      .data([
          ["Dec", 134],
          ["Jan", 95],
          ["Feb", 80],
          ["Mar", 65],
          ["Apr", 59],
          ["May", 51],
          ["Jun", 58],
          ["Jul", 72],
          ["Aug", 79],
          ["Sep", 104],
          ["Oct", 134],
          ["Nov", 124]
      ])
      .fontFamily("Verdana")
      .fontSize(14)
      .pointShape("circle")
      .pointSize(3)
      .render()
      ;
<\/script>
`)])],-1),b=e("p",null,[e("em",null,"fillOpacity"),n(" can be used to control the opacity of the background color created by each series.")],-1),g=e("p",null,[e("em",null,"valueGuideRatios"),n(" can be used to control placement, and count, of the guide lines.")],-1),v=e("p",null,[e("em",null,"labelPaddingRatio"),n(" shrinks the chart's visible area between its column labels.")],-1),y=e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { Radar } from "@hpcc-js/chart";

  new Radar()
      .target("placeholder")
      .columns(["Category", "Value 1", "Value 2"])
      .data([
          ["A", 34, 190],
          ["B", 55, 150],
          ["C", 89, 35],
          ["D", 144, 36]
      ])
      .valueGuideRatios([0.5, 1.0])
      .labelPaddingRatio(0.8)
      .render()
      ;
<\/script>
`)])],-1),R=s("",3);function x(P,S,V,w,C,A){const a=i("ClientOnly");return d(),o("div",null,[p,h,t(a,null,{default:l(()=>[u]),_:1}),_,m,t(a,null,{default:l(()=>[f]),_:1}),b,g,v,t(a,null,{default:l(()=>[y]),_:1}),R])}var N=r(c,[["render",x]]);export{z as __pageData,N as default};
