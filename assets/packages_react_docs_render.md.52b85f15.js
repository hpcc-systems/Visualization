import{_ as e,c as o,a as r,o as n}from"./app.ab56574e.js";const q='{"title":"render.tsx","description":"","frontmatter":{},"headers":[],"relativePath":"packages/react/docs/render.md"}',a={};function p(u,t,c,s,d,i){return n(),o("div",null,t[0]||(t[0]=[r(`<h1 id="render-tsx" tabindex="-1">render.tsx <a class="header-anchor" href="#render-tsx" aria-hidden="true">#</a></h1><p>Renderer contains several functions / adapters to simplify the rendering of react components within a HPCC Widget.</p><p>The common example is a <code>SVGAdapter</code> which creates an SVG Element and renders the SVG React Component.</p><div class="language-sample-code"><pre><code>import { Icon, SVGAdapter } from &quot;@hpcc-js/react&quot;;

new SVGAdapter(Icon)
    .target(&quot;target&quot;)
    .prop(&quot;shape&quot;, &quot;square&quot;)
    .prop(&quot;height&quot;, 64)
    .prop(&quot;fill&quot;, &quot;lightgrey&quot;)
    .prop(&quot;stroke&quot;, &quot;black&quot;)
    .prop(&quot;faCharFill&quot;, &quot;black&quot;)
    .prop(&quot;faChar&quot;, &quot;fa-user&quot;)
    .render()
;
</code></pre></div><p>Alternative use:</p><div class="language-sample-code"><pre><code>import { Icon, SVGAdapter } from &quot;@hpcc-js/react&quot;;

new SVGAdapter(Icon)
    .target(&quot;target&quot;)
    .props({
        shape: &quot;square&quot;,
        height: 64,
        fill: &quot;pink&quot;,
        stroke: &quot;black&quot;,
        faCharFill: &quot;black&quot;,
        faChar: &quot;fa-plus&quot;
    })
    .render()
    ;
</code></pre></div><p>Custom JSX:</p><div class="language-sample-code"><pre><code>import { React, SVGAdapter } from &quot;@hpcc-js/react&quot;;

export const Circle = ({
    radius = 32,
    fill = &quot;navy&quot;,
    stroke = fill
}) =&gt; &lt;circle r={radius} fill={fill} stroke={stroke} /&gt;;

new SVGAdapter(Circle)
    .target(&quot;target&quot;)
    .props({
        fill: &quot;pink&quot;,
        stroke: &quot;black&quot;
    })
    .render()
    ;

</code></pre></div>`,8)]))}var f=e(a,[["render",p]]);export{q as __pageData,f as default};
