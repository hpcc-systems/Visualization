import{_ as t,c as e,o,a as r}from"./app.70956d7b.js";const h='{"title":"text.tsx","description":"","frontmatter":{},"headers":[{"level":2,"title":"Text","slug":"text"},{"level":2,"title":"Multi Line Text","slug":"multi-line-text"},{"level":2,"title":"TextBox","slug":"textbox"},{"level":2,"title":"Multi Line TextBox","slug":"multi-line-textbox"}],"relativePath":"packages/react/docs/text.md"}',a={},n=r(`<h1 id="text-tsx" tabindex="-1">text.tsx <a class="header-anchor" href="#text-tsx" aria-hidden="true">#</a></h1><p>Simple &quot;Text&quot; React Components.</p><h2 id="text" tabindex="-1">Text <a class="header-anchor" href="#text" aria-hidden="true">#</a></h2><div class="language-sample-code"><pre><code>import { Text, SVGAdapter } from &quot;@hpcc-js/react&quot;;

new SVGAdapter(Text)
    .target(&quot;target&quot;)
    .prop(&quot;anchor&quot;, &quot;middle&quot;)
    .prop(&quot;baseline&quot;, &quot;middle&quot;)
    .prop(&quot;height&quot;, 18)
    .prop(&quot;fill&quot;, &quot;black&quot;)
    .prop(&quot;text&quot;, &quot;Hello and Welcome!&quot;)
    .render()
;
</code></pre></div><h2 id="multi-line-text" tabindex="-1">Multi Line Text <a class="header-anchor" href="#multi-line-text" aria-hidden="true">#</a></h2><div class="language-sample-code"><pre><code>import { Text, SVGAdapter } from &quot;@hpcc-js/react&quot;;

new SVGAdapter(Text)
    .target(&quot;target&quot;)
    .prop(&quot;anchor&quot;, &quot;middle&quot;)
    .prop(&quot;baseline&quot;, &quot;middle&quot;)
    .prop(&quot;height&quot;, 18)
    .prop(&quot;fill&quot;, &quot;black&quot;)
    .prop(&quot;text&quot;, &quot;Hello\\nand\\nWelcome!&quot;)
    .render()
;
</code></pre></div><h2 id="textbox" tabindex="-1">TextBox <a class="header-anchor" href="#textbox" aria-hidden="true">#</a></h2><div class="language-sample-code"><pre><code>import { TextBox, SVGAdapter } from &quot;@hpcc-js/react&quot;;

new SVGAdapter(TextBox)
    .target(&quot;target&quot;)
    .prop(&quot;padding&quot;, 8)
    .prop(&quot;fill&quot;, &quot;lightgrey&quot;)
    .prop(&quot;stroke&quot;, &quot;darkgrey&quot;)
    .prop(&quot;text&quot;, &quot;Hello and Welcome!&quot;)
    .render()
;
</code></pre></div><h2 id="multi-line-textbox" tabindex="-1">Multi Line TextBox <a class="header-anchor" href="#multi-line-textbox" aria-hidden="true">#</a></h2><div class="language-sample-code"><pre><code>import { TextBox, SVGAdapter } from &quot;@hpcc-js/react&quot;;

new SVGAdapter(TextBox)
    .target(&quot;target&quot;)
    .prop(&quot;padding&quot;, 8)
    .prop(&quot;fill&quot;, &quot;lightgrey&quot;)
    .prop(&quot;stroke&quot;, &quot;darkgrey&quot;)
    .prop(&quot;text&quot;, &quot;Hello\\nand\\nWelcome!&quot;)
    .render()
;
</code></pre></div>`,10),u=[n];function l(d,i,q,p,c,x){return o(),e("div",null,u)}var m=t(a,[["render",l]]);export{h as __pageData,m as default};
