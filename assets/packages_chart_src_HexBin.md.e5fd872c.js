import{_ as r,c as s,b as i,w as a,d as e,e as n,a as o,r as l,o as c}from"./app.70956d7b.js";const T='{"title":"HexBin","description":"","frontmatter":{},"headers":[{"level":2,"title":"API","slug":"api"},{"level":2,"title":"Published Properties","slug":"published-properties"}],"relativePath":"packages/chart/src/HexBin.md"}',d={},h=e("h1",{id:"hexbin",tabindex:"-1"},[n("HexBin "),e("a",{class:"header-anchor",href:"#hexbin","aria-hidden":"true"},"#")],-1),p=e("p",null,[n("HexBin and "),e("a",{href:"./Contour.html"},"Contour"),n(" serve a similar purpose. They summarize high density data across two continuous axes.")],-1),u=e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { HexBin } from "@hpcc-js/chart";

  new HexBin()
      .target("placeholder")
      .columns(["X-Value", "Y-Value"])
      .data(randomData(1000))
      .xAxisType("linear")
      .render()
      ;

  function randomData(count){
      return Array(count).fill(1).map((n,x)=>{
          const y = Math.sqrt(x) * Math.random();
          return [x,y];
      });
  }
<\/script>
`)])],-1),x=e("p",null,[e("em",null,"binSize"),n(" can be used to set the size of the hexagon bins. The results can be seen in the below example.")],-1),_=e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { HexBin } from "@hpcc-js/chart";

  let binSize = 5;

  const widget = new HexBin()
      .target("placeholder")
      .columns(["X-Value", "Y-Value"])
      .data(randomData(1000))
      .xAxisType("linear")
      .xAxisTickCount(10)
      .binSize(binSize)
      .render()
      ;

  function randomData(count){
      return Array(count).fill(1).map((n,x)=>{
          const y = Math.sqrt(x) * Math.random();
          return [x,y];
      });
  }
  let interval = 5;
  setInterval(function(){
      const next = binSize + interval;
      if(next > 20 || next <= 0){
          interval *= -1;
      }
      binSize += interval;
      widget
          .xAxisTitle("binSize = " + binSize)
          .binSize(binSize)
          .render()
          ;
  },1000);
<\/script>
`)])],-1),m=o('<p>For documentation on axis-specific properties take a look at the <a href="./XYAxis.html">Axis Documentation</a>.</p><h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-hidden="true">#</a></h2><h2 id="published-properties" tabindex="-1">Published Properties <a class="header-anchor" href="#published-properties" aria-hidden="true">#</a></h2><div class="language-@hpcc-js/chart:HexBin"><pre><code></code></pre></div>',4);function b(f,v,y,g,S,A){const t=l("ClientOnly");return c(),s("div",null,[h,p,i(t,null,{default:a(()=>[u]),_:1}),x,i(t,null,{default:a(()=>[_]),_:1}),m])}var z=r(d,[["render",b]]);export{T as __pageData,z as default};
