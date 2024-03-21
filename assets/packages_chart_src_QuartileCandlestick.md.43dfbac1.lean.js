import{_ as r,c as o,b as i,w as l,d as e,e as t,a,r as s,o as d}from"./app.70956d7b.js";const A='{"title":"QuartileCandlestick","description":"","frontmatter":{},"headers":[{"level":2,"title":"API","slug":"api"},{"level":2,"title":"Published Properties","slug":"published-properties"}],"relativePath":"packages/chart/src/QuartileCandlestick.md"}',c={},h=e("h1",{id:"quartilecandlestick",tabindex:"-1"},[t("QuartileCandlestick "),e("a",{class:"header-anchor",href:"#quartilecandlestick","aria-hidden":"true"},"#")],-1),p=e("p",null,"QuartileCandlestick displays a five number summary of a range of numeric values. The five-number summary is the minimum, first quartile, median, third quartile, and maximum.",-1),u=e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { QuartileCandlestick } from "@hpcc-js/chart";

  new QuartileCandlestick()
      .target("placeholder")
      .columns(["Min","25%","50%","75%","Max"])
      .data([100,250,350,400,500])
      .render()
      ;
<\/script>
`)])],-1),m=a("",5),_=e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { QuartileCandlestick } from "@hpcc-js/chart";

  new QuartileCandlestick()
      .target("placeholder")
      .columns(["Min","25%","50%","75%","Max"])
      .data([100,200,300,400,500])
      .orientation("vertical")
      .lineWidth(2)
      .candleWidth(80)
      .edgePadding(20)
      .roundedCorners(0)
      .upperTextRotation(-90)
      .lowerTextRotation(-90)
      .render()
      ;
<\/script>
`)])],-1),f=e("p",null,[e("em",null,"lineColor"),t(" sets the fill color of the lines.")],-1),x=e("p",null,[e("em",null,"textColor"),t(" sets the fill color of the labels and values.")],-1),g=e("p",null,[e("em",null,"innerRectColor"),t(" sets the fill color of the inner rectangles between the first and third quartiles.")],-1),C=e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { QuartileCandlestick } from "@hpcc-js/chart";

  new QuartileCandlestick()
      .target("placeholder")
      .columns(["Min","25%","50%","75%","Max"])
      .data([100,250,350,400,500])
      .orientation("vertical")
      .lineColor("#999")
      .textColor("#555")
      .innerRectColor("#000")
      .lineWidth(2)
      .candleWidth(80)
      .edgePadding(20)
      .roundedCorners(0)
      .upperTextRotation(-90)
      .lowerTextRotation(-90)
      .render()
      ;
<\/script>
`)])],-1),v=e("p",null,[e("em",null,"showLabels"),t(" and "),e("em",null,"showValues"),t(" are true by default but can be used to hide the labels and values.")],-1),w=e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { QuartileCandlestick } from "@hpcc-js/chart";

  new QuartileCandlestick()
      .target("placeholder")
      .columns(["Min","25%","50%","75%","Max"])
      .data([1,497,498,499,500])
      .showLabels(false)
      .showValues(false)
      .lineColor("#999")
      .innerRectColor("#000")
      .lineWidth(2)
      .candleWidth(80)
      .edgePadding(20)
      .roundedCorners(0)
      .upperTextRotation(-90)
      .lowerTextRotation(-90)
      .render()
      ;
<\/script>
`)])],-1),b=a("",3);function y(T,k,P,Q,R,V){const n=s("ClientOnly");return d(),o("div",null,[h,p,i(n,null,{default:l(()=>[u]),_:1}),m,i(n,null,{default:l(()=>[_]),_:1}),f,x,g,i(n,null,{default:l(()=>[C]),_:1}),v,i(n,null,{default:l(()=>[w]),_:1}),b])}var M=r(c,[["render",y]]);export{A as __pageData,M as default};
