import{_ as d,c as a,b as r,w as o,d as e,e as i,a as n,r as c,o as s}from"./app.70956d7b.js";const q='{"title":"CodeMirror Editor","description":"","frontmatter":{},"headers":[{"level":2,"title":"Attributes","slug":"attributes"},{"level":3,"title":"mode","slug":"mode"},{"level":3,"title":"theme","slug":"theme"},{"level":2,"title":"Properties","slug":"properties"},{"level":3,"title":"text","slug":"text"},{"level":2,"title":"Events","slug":"events"},{"level":2,"title":"Credits","slug":"credits"},{"level":3,"title":"CodeMirror","slug":"codemirror"}],"relativePath":"components/editor/src/codemirror.md"}',l={},h=e("h1",{id:"codemirror-editor",tabindex:"-1"},[i("CodeMirror Editor "),e("a",{class:"header-anchor",href:"#codemirror-editor","aria-hidden":"true"},"#")],-1),p=e("p",null,[e("strong",null,"tag"),i(": "),e("code",null,"<hpcc-codemirror>")],-1),u=e("hpcc-vitepress",{preview_border:"0px",preview_height_ratio:"0.5",style:{width:"100%",height:"400px"}},[e("pre",null,[e("code",null,`<hpcc-codemirror mode="json" theme="dark" style="width:100%;height:100%">
</hpcc-codemirror>

<script type="module">
  import "@hpcc-js/wc-editor";

  document.querySelector('hpcc-codemirror').text = \`\\
  {
    "aaa":123, 
    "bbb":"ddd", 
    "c":3, 
    "d":true
  }\`;
<\/script>
`)])],-1),m=e("hr",null,null,-1),_=e("hpcc-vitepress",{preview_border:"0px",preview_height_ratio:"0.5",style:{width:"100%",height:"400px"}},[e("pre",null,[e("code",null,`<hpcc-codemirror mode="json" theme="dark" style="width:100%;height:100%">
  {
    "aaa":123, 
    "bbb":"ddd", 
    "c":3, 
    "d":true
  }
 </hpcc-codemirror>
<script type="module">
  import "@hpcc-js/wc-editor";
  setTimeout(()=>{
    document.querySelector('hpcc-codemirror').text = "Hello and Welcome!";
  }, 3000);
<\/script>
`)])],-1),g=n("",22);function b(f,x,v,y,T,w){const t=c("ClientOnly");return s(),a("div",null,[h,p,r(t,null,{default:o(()=>[u]),_:1}),m,r(t,null,{default:o(()=>[_]),_:1}),g])}var k=d(l,[["render",b]]);export{q as __pageData,k as default};
