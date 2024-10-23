import{_ as l,c as s,b as t,d as a,e as n,w as o,a as d,r as i,o as b}from"./app.ab56574e.js";const g='{"title":"Observable","description":"","frontmatter":{},"headers":[{"level":2,"title":"Observable","slug":"observable-1"},{"level":2,"title":"Events","slug":"events"},{"level":2,"title":"Credits","slug":"credits"}],"relativePath":"packages/observable-md/src/observable.md"}',c={};function h(v,e,p,u,m,f){const r=i("ClientOnly");return b(),s("div",null,[e[1]||(e[1]=t("h1",{id:"observable",tabindex:"-1"},[a("Observable "),t("a",{class:"header-anchor",href:"#observable","aria-hidden":"true"},"#")],-1)),e[2]||(e[2]=t("p",null,[t("strong",null,"Class"),a(": "),t("code",null,"Observable")],-1)),n(r,null,{default:o(()=>e[0]||(e[0]=[t("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[t("pre",null,[t("code",null,`<div id="placeholder" style="width:100%;height:600px">
</div>
<script type="module">
    import { Observable } from "@hpcc-js/observable-md";
    
    const observable = new Observable()
        .target("placeholder")
        .showValues(true)
        .mode("omd")
        .text(\`
        # Hello World

        \\\`\\\`\\\`
        hw = 'Hello' + ' World';            
        tick = {                           
          let i = 0;                       
          while (true) {                   
            yield ++i;                     
          }                                
        }
        \\\`\\\`\\\`
        \`)                                  
        .render()
        ;
<\/script>
`)])],-1)])),_:1}),e[3]||(e[3]=d('<div class="tip custom-block"><p class="custom-block-title">TIP</p><p>See <a href="./../README.html">Getting Started</a> for details on how to include @hpcc-js/observable-md in your application</p></div><h2 id="observable-1" tabindex="-1"><code>Observable</code> <a class="header-anchor" href="#observable-1" aria-hidden="true">#</a></h2><h2 id="events" tabindex="-1">Events <a class="header-anchor" href="#events" aria-hidden="true">#</a></h2><h2 id="credits" tabindex="-1">Credits <a class="header-anchor" href="#credits" aria-hidden="true">#</a></h2>',4))])}var w=l(c,[["render",h]]);export{g as __pageData,w as default};
