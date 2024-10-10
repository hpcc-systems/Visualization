import{_ as t,c as o,a as r,o as a}from"./app.ab56574e.js";const q='{"title":"vertex.tsx","description":"","frontmatter":{},"headers":[{"level":2,"title":"Multi Line Vertex","slug":"multi-line-vertex"}],"relativePath":"packages/react/docs/vertex.md"}',n={};function u(i,e,c,p,d,s){return a(),o("div",null,e[0]||(e[0]=[r(`<h1 id="vertex-tsx" tabindex="-1">vertex.tsx <a class="header-anchor" href="#vertex-tsx" aria-hidden="true">#</a></h1><p>&quot;Vertex&quot; React Component - replacement for Vertex widget used in Graphs, which is a combination of a <a href="./icon.html">Icon</a> and an <a href="./text.html">TextBox</a></p><div class="language-sample-code"><pre><code>import { Vertex, SVGAdapter } from &quot;@hpcc-js/react&quot;;

new SVGAdapter(Vertex)
    .target(&quot;target&quot;)
    .prop(&quot;icon&quot;, {
        faChar: &quot;fa-user&quot;,
        height: 64,
        stroke: &quot;black&quot;
        
    })
    .prop(&quot;text&quot;, &quot;Hello And Welcome!&quot;)
    .prop(&quot;textHeight&quot;, 12)
    .render()
;
</code></pre></div><h2 id="multi-line-vertex" tabindex="-1">Multi Line Vertex <a class="header-anchor" href="#multi-line-vertex" aria-hidden="true">#</a></h2><div class="language-sample-code"><pre><code>import { Vertex, SVGAdapter } from &quot;@hpcc-js/react&quot;;

new SVGAdapter(Vertex)
    .target(&quot;target&quot;)
    .prop(&quot;icon&quot;, {
        faChar: &quot;fa-user&quot;,
        height: 64,
        stroke: &quot;black&quot;
        
    })
    .prop(&quot;text&quot;, &quot;Hello\\nAnd\\nWelcome!&quot;)
    .prop(&quot;textHeight&quot;, 12)
    .render()
;
</code></pre></div>`,5)]))}var x=t(n,[["render",u]]);export{q as __pageData,x as default};
