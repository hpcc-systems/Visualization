import{_ as o,c as i,b as a,w as r,d as e,e as n,a as s,r as d,o as l}from"./app.70956d7b.js";const T='{"title":"Contour","description":"","frontmatter":{},"headers":[{"level":2,"title":"API","slug":"api"},{"level":2,"title":"Published Properties","slug":"published-properties"}],"relativePath":"packages/chart/src/Contour.md"}',c={},h=e("h1",{id:"contour",tabindex:"-1"},[n("Contour "),e("a",{class:"header-anchor",href:"#contour","aria-hidden":"true"},"#")],-1),u=e("p",null,[n("Contour and "),e("a",{href:"./HexBin.html"},"HexBin"),n(" serve a similar purpose. They summarize high density data across two continuous axes.")],-1),p=e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { Contour } from "@hpcc-js/chart";

  new Contour()
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
`)])],-1),_=e("p",null,[e("em",null,"contourBandwidth"),n(" can be used to control the standard deviation of the contour algorithm. The results can be seen in the below example.")],-1),x=e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { Contour } from "@hpcc-js/chart";

  let bandwidth = 10;

  const widget = new Contour()
      .target("placeholder")
      .columns(["X-Value", "Y-Value"])
      .data(randomData(1000))
      .xAxisType("linear")
      .xAxisTickCount(10)
      .contourBandwidth(bandwidth)
      .render()
      ;

  function randomData(count){
      return Array(count).fill(1).map((n,x)=>{
          const y = Math.sqrt(x) * Math.random();
          return [x,y];
      });
  }
  let interval = 10;
  setInterval(function(){
      const next = bandwidth + interval;
      if(next > 100 || next <= 0){
          interval *= -1;
      }
      bandwidth += interval;
      widget
          .xAxisTitle("bandwidth = " + bandwidth)
          .contourBandwidth(bandwidth)
          .render()
          ;
  },1000);
<\/script>
`)])],-1),m=s("",4);function f(v,w,b,y,C,g){const t=d("ClientOnly");return l(),i("div",null,[h,u,a(t,null,{default:r(()=>[p]),_:1}),_,a(t,null,{default:r(()=>[x]),_:1}),m])}var V=o(c,[["render",f]]);export{T as __pageData,V as default};
