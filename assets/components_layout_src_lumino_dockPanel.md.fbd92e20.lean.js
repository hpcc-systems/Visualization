import{_ as i,c as d,b as l,w as o,d as e,e as t,a as s,r as n,o as r}from"./app.70956d7b.js";const x='{"title":"Dock Panel","description":"","frontmatter":{},"headers":[{"level":2,"title":"Child Element data-??? attributes","slug":"child-element-data-attributes"},{"level":3,"title":"data-label","slug":"data-label"},{"level":3,"title":"data-mode","slug":"data-mode"},{"level":3,"title":"data-ref","slug":"data-ref"},{"level":3,"title":"data-closable","slug":"data-closable"},{"level":3,"title":"data-caption","slug":"data-caption"},{"level":2,"title":"Events","slug":"events"},{"level":3,"title":"child-added","slug":"child-added"},{"level":3,"title":"child-hidden","slug":"child-hidden"},{"level":3,"title":"child-removed","slug":"child-removed"},{"level":3,"title":"child-shown","slug":"child-shown"},{"level":3,"title":"closeRequest","slug":"closerequest"},{"level":3,"title":"fit-request","slug":"fit-request"},{"level":3,"title":"layout-modified","slug":"layout-modified"},{"level":3,"title":"update-request","slug":"update-request"},{"level":2,"title":"Credits","slug":"credits"},{"level":3,"title":"Lumino","slug":"lumino"}],"relativePath":"components/layout/src/lumino/dockPanel.md"}',c={},h=e("h1",{id:"dock-panel",tabindex:"-1"},[t("Dock Panel "),e("a",{class:"header-anchor",href:"#dock-panel","aria-hidden":"true"},"#")],-1),u=e("p",null,[e("strong",null,"tag"),t(": "),e("code",null,"<hpcc-dockpanel>")],-1),m=e("hpcc-vitepress",{preview_border:"0px",style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<script type="module">
    import "@hpcc-js/wc-layout";
<\/script>

<hpcc-dockpanel style="width:100%;height:100%">
  <div id="one" data-label="AAAA" style="overflow:auto;min-width:48px;min-height:48px">
    <h1>AAAA HTML Ipsum Presents</h1>
    <p><strong>Pellentesque habitant morbi tristique</strong> senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. <em>Aenean ultricies mi vitae est.</em> Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, <code>commodo vitae</code>, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. <a href="#">Donec non enim</a> in turpis pulvinar facilisis. Ut felis.</p>
  </div>
  <div id="three" data-mode="split-right" data-closable="true" style="overflow:auto;min-width:48px;min-height:48px">
    <h1>CCCC HTML Ipsum Presents</h1>
    <p><strong>Pellentesque habitant morbi tristique</strong> senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. <em>Aenean ultricies mi vitae est.</em> Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, <code>commodo vitae</code>, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. <a href="#">Donec non enim</a> in turpis pulvinar facilisis. Ut felis.</p>
  </div>
  <div data-mode="tab-after" data-ref="three" data-caption="What no label!" style="overflow:auto;min-width:48px;min-height:48px">
    <h1>DDDD HTML Ipsum Presents</h1>
    <p><strong>Pellentesque habitant morbi tristique</strong> senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. <em>Aenean ultricies mi vitae est.</em> Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, <code>commodo vitae</code>, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. <a href="#">Donec non enim</a> in turpis pulvinar facilisis. Ut felis.</p>
  </div>
  <div data-mode="split-bottom" data-ref="one" style="overflow:auto;min-width:48px;min-height:48px">
    <h1>BBBB HTML Ipsum Presents</h1>
    <p><strong>Pellentesque habitant morbi tristique</strong> senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. <em>Aenean ultricies mi vitae est.</em> Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, <code>commodo vitae</code>, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. <a href="#">Donec non enim</a> in turpis pulvinar facilisis. Ut felis.</p>
  </div>
</hpcc-dockpanel>
<script>
  document.querySelector("hpcc-dockpanel").addEventListener("closeRequest", function (evt) {
    if (!confirm(\`Close Tab "\${evt.detail.tagName} #\${evt.detail.id}"?\`)) {
      evt.preventDefault();
    }
  });
<\/script>
`)])],-1),p=s("",45);function f(b,g,v,w,y,q){const a=n("ClientOnly");return r(),d("div",null,[h,u,l(a,null,{default:o(()=>[m]),_:1}),p])}var T=i(c,[["render",f]]);export{x as __pageData,T as default};
