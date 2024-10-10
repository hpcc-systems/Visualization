import{_ as d,c as o,b as t,d as n,e as i,w as r,a,r as s,o as p}from"./app.ab56574e.js";const C='{"title":"QuartileCandlestick","description":"","frontmatter":{},"headers":[{"level":2,"title":"API","slug":"api"},{"level":2,"title":"Published Properties","slug":"published-properties"}],"relativePath":"packages/chart/src/QuartileCandlestick.md"}',u={};function h(c,e,m,f,x,g){const l=s("ClientOnly");return p(),o("div",null,[e[4]||(e[4]=t("h1",{id:"quartilecandlestick",tabindex:"-1"},[n("QuartileCandlestick "),t("a",{class:"header-anchor",href:"#quartilecandlestick","aria-hidden":"true"},"#")],-1)),e[5]||(e[5]=t("p",null,"QuartileCandlestick displays a five number summary of a range of numeric values. The five-number summary is the minimum, first quartile, median, third quartile, and maximum.",-1)),i(l,null,{default:r(()=>e[0]||(e[0]=[t("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[t("pre",null,[t("code",null,`<div id="placeholder" style="height:400px">
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
`)])],-1)])),_:1}),e[6]||(e[6]=a("<p><em>orientation</em> can be used to render this chart either vertically or horizontally.</p><p><em>lineWidth</em> and <em>candleWidth</em> can be used to set the pixel width of the lines and the overall pixel width of the drawn portion of this chart respectively. <em>candleWidth</em> also controls the height of the drawn portion while using &#39;horizontal&#39; orientation.</p><p><em>edgePadding</em> sets the pixel padding between the edges of the containing element and the minimum/maximum lines.</p><p><em>roundedCorners</em> sets the pixel radius of the drawn lines.</p><p><em>upperTextRotation</em> and <em>lowerTextRotation</em> sets the degrees of rotation for the column labels and column values respectively.</p>",5)),i(l,null,{default:r(()=>e[1]||(e[1]=[t("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[t("pre",null,[t("code",null,`<div id="placeholder" style="height:400px">
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
`)])],-1)])),_:1}),e[7]||(e[7]=t("p",null,[t("em",null,"lineColor"),n(" sets the fill color of the lines.")],-1)),e[8]||(e[8]=t("p",null,[t("em",null,"textColor"),n(" sets the fill color of the labels and values.")],-1)),e[9]||(e[9]=t("p",null,[t("em",null,"innerRectColor"),n(" sets the fill color of the inner rectangles between the first and third quartiles.")],-1)),i(l,null,{default:r(()=>e[2]||(e[2]=[t("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[t("pre",null,[t("code",null,`<div id="placeholder" style="height:400px">
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
`)])],-1)])),_:1}),e[10]||(e[10]=t("p",null,[t("em",null,"showLabels"),n(" and "),t("em",null,"showValues"),n(" are true by default but can be used to hide the labels and values.")],-1)),i(l,null,{default:r(()=>e[3]||(e[3]=[t("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[t("pre",null,[t("code",null,`<div id="placeholder" style="height:400px">
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
`)])],-1)])),_:1}),e[11]||(e[11]=a('<h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-hidden="true">#</a></h2><h2 id="published-properties" tabindex="-1">Published Properties <a class="header-anchor" href="#published-properties" aria-hidden="true">#</a></h2><div class="language-@hpcc-js/chart:QuartileCandlestick"><pre><code></code></pre></div>',3))])}var w=d(u,[["render",h]]);export{C as __pageData,w as default};
