import{_ as l,c as i,b as a,w as o,d as e,e as t,a as s,r as n,o as d}from"./app.70956d7b.js";const T='{"title":"Observable","description":"","frontmatter":{},"headers":[{"level":2,"title":"Attributes","slug":"attributes"},{"level":3,"title":"mode","slug":"mode"},{"level":3,"title":"plugins","slug":"plugins"},{"level":3,"title":"show_errors","slug":"show-errors"},{"level":3,"title":"show_values","slug":"show-values"},{"level":2,"title":"Properties","slug":"properties"},{"level":3,"title":"mode","slug":"mode-1"},{"level":3,"title":"plugins","slug":"plugins-1"},{"level":3,"title":"show_errors","slug":"show-errors-1"},{"level":3,"title":"show_values","slug":"show-values-1"},{"level":2,"title":"Events","slug":"events"},{"level":2,"title":"More Examples","slug":"more-examples"},{"level":3,"title":"Observable Markdown","slug":"observable-markdown"},{"level":2,"title":"Credits","slug":"credits"},{"level":3,"title":"@observablehq/runtime","slug":"observablehq-runtime"},{"level":3,"title":"@observablehq/parser","slug":"observablehq-parser"},{"level":3,"title":"@observablehq/stdlib","slug":"observablehq-stdlib"},{"level":3,"title":"@observablehq/inspector","slug":"observablehq-inspector"}],"relativePath":"components/observable/src/observable.md"}',h={},b=e("h1",{id:"observable",tabindex:"-1"},[t("Observable "),e("a",{class:"header-anchor",href:"#observable","aria-hidden":"true"},"#")],-1),c=e("p",null,[e("strong",null,"tag"),t(": "),e("code",null,"<hpcc-observable>")],-1),p=e("hpcc-vitepress",{preview_border:"0px",preview_height_ratio:"0.6",style:{width:"100%",height:"800px"}},[e("pre",null,[e("code",null,`<hpcc-observable style="width:100%;height:100%">
  md\`# Covid cases in the world for select countries\`

  import { bubblemap } from "@gordonsmith/bubble-map-design-board"

  bubblemap

  md\`# Confirmed Cases v Deaths (\${my_country}) - \${lastDate.toLocaleDateString("en-US", {dateStyle: "medium"})}\`

  chart;

  //  Dependencies
  my_country = "Germany";
  import { chart, lastDate } with { my_country as overrideLocation } from "@gordonsmith/irish-confirmed-cases-v-deaths";
</hpcc-observable>

<script type="module">
  import "@hpcc-js/wc-observable";
<\/script>
`)])],-1),u=s("",41),v=e("hpcc-vitepress",{preview_border:"0px",preview_height_ratio:"0.75",style:{width:"100%",height:"800px"}},[e("pre",null,[e("code",null,`<hpcc-observable mode="markdown" style="width:100%;height:100%">
  # Liquid Fun

  \`\`\`
  canvas;

  //  Dependencies
  import { canvas } from "@mbostock/liquidfun";
  \`\`\`
</hpcc-observable>

<script type="module">
  import "@hpcc-js/wc-observable";
<\/script>
`)])],-1),m=s("",13);function g(w,f,_,y,q,k){const r=n("ClientOnly");return d(),i("div",null,[b,c,a(r,null,{default:o(()=>[p]),_:1}),u,a(r,null,{default:o(()=>[v]),_:1}),m])}var O=l(h,[["render",g]]);export{T as __pageData,O as default};
