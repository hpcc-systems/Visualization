import{_ as i,c as s,b as e,d as n,e as r,w as a,a as o,r as u,o as p}from"./app.ab56574e.js";const k='{"title":"Gauge","description":"","frontmatter":{},"headers":[{"level":2,"title":"API","slug":"api"},{"level":2,"title":"Published Properties","slug":"published-properties"}],"relativePath":"packages/chart/src/Gauge.md"}',d={};function c(h,t,g,v,m,y){const l=u("ClientOnly");return p(),s("div",null,[t[5]||(t[5]=e("h1",{id:"gauge",tabindex:"-1"},[n("Gauge "),e("a",{class:"header-anchor",href:"#gauge","aria-hidden":"true"},"#")],-1)),t[6]||(t[6]=e("p",null,"A gauge chart displays a value between 0 and 1 as a percentage.",-1)),r(l,null,{default:a(()=>t[0]||(t[0]=[e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { Gauge } from "@hpcc-js/chart";

  var gauge = new Gauge()
      .target("placeholder")
      .title("Example")
      .value(.38)
      .render()
      ;
<\/script>
`)])],-1)])),_:1}),t[7]||(t[7]=e("p",null,[e("em",null,"tickValue"),n(" can be used to display a point of interest. "),e("em",null,"showTick"),n(" must be set to "),e("em",null,"true"),n(" in order for the tick to be visible.")],-1)),r(l,null,{default:a(()=>t[1]||(t[1]=[e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { Gauge } from "@hpcc-js/chart";

  var gauge = new Gauge()
      .target("placeholder")
      .title("Gauge w/ Tick")
      .value(.38)
      .showTick(true)
      .tickValue(.62)
      .render()
      ;
<\/script>
`)])],-1)])),_:1}),t[8]||(t[8]=e("p",null,[e("em",null,"titleDescription"),n(", "),e("em",null,"valueDescription"),n(" and "),e("em",null,"tickValueDescription"),n(" can be used to specify hover text that displays while the cursor hovers the title, value or tick respectively.")],-1)),r(l,null,{default:a(()=>t[2]||(t[2]=[e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { Gauge } from "@hpcc-js/chart";

  var gauge = new Gauge()
      .target("placeholder")
      .title("Tick & Descriptions")
      .titleDescription("My Title Description")
      .value(.38)
      .valueDescription("My Value Description")
      .showTick(true)
      .tickValue(.62)
      .tickValueDescription("My Tick Description")
      .render()
      ;
<\/script>
`)])],-1)])),_:1}),t[9]||(t[9]=e("p",null,[n("Custom colors can be specified using two properties. "),e("em",null,"colorRange"),n(" expects an array of valid css color style strings. "),e("em",null,"colorDomain"),n(" expects an array of threshold values from 0 to 1. For the best results these two arrays should have the same number of elements.")],-1)),r(l,null,{default:a(()=>t[3]||(t[3]=[e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { Gauge } from "@hpcc-js/chart";

  var gauge = new Gauge()
      .target("placeholder")
      .title("Custom Color Gauge")
      .value(0)
      .tickValue(0.5)
      .showTick(true)
      .colorDomain([0,0.25,0.5,0.75,1])
      .colorRange(["#0000FF","dodgerblue","goldenrod","orange","rgb(255,0,0)"])
      .emptyColor("#FFFFFF")
      .tickColor("red")
      .render()
      ;

  setInterval(function () {
      const v = gauge.value() + 0.25;
      gauge
          .value(v <= 1 ? v : 0)
          .lazyRender()
          ;
  }, 1000);
<\/script>
`)])],-1)])),_:1}),t[10]||(t[10]=e("p",null,"When the values change, the gauge animates to display the new values.",-1)),r(l,null,{default:a(()=>t[4]||(t[4]=[e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { Gauge } from "@hpcc-js/chart";

  var gauge = new Gauge()
      .target("placeholder")
      .title("My Gauge")
      .titleDescription("@hpcc-js/chart")
      .value(.66)
      .valueDescription("Main")
      .showTick(true)
      .tickValue(.33)
      .tickValueDescription("Average")
      .render()
      ;

  setInterval(function () {
      gauge
          .value(Math.random())
          .tickValue(Math.random())
          .lazyRender()
          ;
  }, 3000);
<\/script>
`)])],-1)])),_:1}),t[11]||(t[11]=o('<h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-hidden="true">#</a></h2><h2 id="published-properties" tabindex="-1">Published Properties <a class="header-anchor" href="#published-properties" aria-hidden="true">#</a></h2><div class="language-@hpcc-js/chart:Gauge"><pre><code></code></pre></div>',3))])}var w=i(d,[["render",c]]);export{k as __pageData,w as default};
