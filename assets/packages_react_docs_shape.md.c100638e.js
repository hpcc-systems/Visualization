import{_ as t,c as o,a as r,o as a}from"./app.ab56574e.js";const i='{"title":"shape.tsx","description":"","frontmatter":{},"headers":[{"level":2,"title":"Circle","slug":"circle"},{"level":2,"title":"Square","slug":"square"},{"level":2,"title":"Rectangle","slug":"rectangle"},{"level":2,"title":"Shape","slug":"shape"}],"relativePath":"packages/react/docs/shape.md"}',u={};function p(n,e,q,c,l,d){return a(),o("div",null,e[0]||(e[0]=[r(`<h1 id="shape-tsx" tabindex="-1">shape.tsx <a class="header-anchor" href="#shape-tsx" aria-hidden="true">#</a></h1><p>Simple &quot;Shape&quot; React Components.</p><h2 id="circle" tabindex="-1">Circle <a class="header-anchor" href="#circle" aria-hidden="true">#</a></h2><div class="language-sample-code"><pre><code>import { Circle, SVGAdapter } from &quot;@hpcc-js/react&quot;;

new SVGAdapter(Circle)
    .target(&quot;target&quot;)
    .prop(&quot;radius&quot;, 64)
    .prop(&quot;fill&quot;, &quot;lightgrey&quot;)
    .prop(&quot;stroke&quot;, &quot;black&quot;)
    .render()
;
</code></pre></div><h2 id="square" tabindex="-1">Square <a class="header-anchor" href="#square" aria-hidden="true">#</a></h2><div class="language-sample-code"><pre><code>import { Square, SVGAdapter } from &quot;@hpcc-js/react&quot;;

new SVGAdapter(Square)
    .target(&quot;target&quot;)
    .prop(&quot;radius&quot;, 64)
    .prop(&quot;cornerRadius&quot;, 5)
    .prop(&quot;fill&quot;, &quot;lightgrey&quot;)
    .prop(&quot;stroke&quot;, &quot;black&quot;)
    .render()
;
</code></pre></div><h2 id="rectangle" tabindex="-1">Rectangle <a class="header-anchor" href="#rectangle" aria-hidden="true">#</a></h2><div class="language-sample-code"><pre><code>import { Rectangle, SVGAdapter } from &quot;@hpcc-js/react&quot;;

new SVGAdapter(Rectangle)
    .target(&quot;target&quot;)
    .prop(&quot;width&quot;, 128)
    .prop(&quot;height&quot;, 64)
    .prop(&quot;cornerRadius&quot;, 5)
    .prop(&quot;fill&quot;, &quot;lightgrey&quot;)
    .prop(&quot;stroke&quot;, &quot;black&quot;)
    .render()
;
</code></pre></div><h2 id="shape" tabindex="-1">Shape <a class="header-anchor" href="#shape" aria-hidden="true">#</a></h2><p>Single component which can be a <code>square</code>:</p><div class="language-sample-code"><pre><code>import { Shape, SVGAdapter } from &quot;@hpcc-js/react&quot;;

new SVGAdapter(Shape)
    .target(&quot;target&quot;)
    .prop(&quot;shape&quot;, &quot;square&quot;)
    .prop(&quot;height&quot;, 64)
    .prop(&quot;fill&quot;, &quot;lightgrey&quot;)
    .prop(&quot;stroke&quot;, &quot;black&quot;)
    .prop(&quot;faCharFill&quot;, &quot;black&quot;)
    .prop(&quot;faChar&quot;, &quot;fa-user&quot;)
    .render()
;
</code></pre></div><p>...or a <code>circle</code>:</p><div class="language-sample-code"><pre><code>import { Shape, SVGAdapter } from &quot;@hpcc-js/react&quot;;

new SVGAdapter(Shape)
    .target(&quot;target&quot;)
    .prop(&quot;shape&quot;, &quot;circle&quot;)
    .prop(&quot;height&quot;, 64)
    .prop(&quot;fill&quot;, &quot;lightgrey&quot;)
    .prop(&quot;stroke&quot;, &quot;black&quot;)
    .prop(&quot;faCharFill&quot;, &quot;black&quot;)
    .prop(&quot;faChar&quot;, &quot;fa-user&quot;)
    .render()
;
</code></pre></div>`,13)]))}var h=t(u,[["render",p]]);export{i as __pageData,h as default};
