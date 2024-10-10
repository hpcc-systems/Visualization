import{_ as e,c as a,a as r,o}from"./app.ab56574e.js";const h='{"title":"faChar.tsx","description":"","frontmatter":{},"headers":[{"level":2,"title":"fa-question","slug":"fa-question"},{"level":2,"title":"fa-user","slug":"fa-user"}],"relativePath":"packages/react/docs/faChar.md"}',u={};function n(s,t,p,i,d,c){return o(),a("div",null,t[0]||(t[0]=[r(`<h1 id="fachar-tsx" tabindex="-1">faChar.tsx <a class="header-anchor" href="#fachar-tsx" aria-hidden="true">#</a></h1><p>Simple &quot;Font Awesome&quot; character</p><h2 id="fa-question" tabindex="-1">fa-question <a class="header-anchor" href="#fa-question" aria-hidden="true">#</a></h2><p>Copy and past unicode char into code:</p><div class="language-sample-code"><pre><code>import { FAChar, SVGAdapter } from &quot;@hpcc-js/react&quot;;

new SVGAdapter(FAChar)
    .target(&quot;target&quot;)
    .prop(&quot;height&quot;, 64)
    .prop(&quot;fill&quot;, &quot;lightgrey&quot;)
    .prop(&quot;stroke&quot;, &quot;black&quot;)
    .prop(&quot;faChar&quot;, &quot;\uF128&quot;)
    .render()
;
</code></pre></div><h2 id="fa-user" tabindex="-1">fa-user <a class="header-anchor" href="#fa-user" aria-hidden="true">#</a></h2><p>...or use fa-* identifier</p><div class="language-sample-code"><pre><code>import { FAChar, SVGAdapter } from &quot;@hpcc-js/react&quot;;

new SVGAdapter(FAChar)
    .target(&quot;target&quot;)
    .prop(&quot;height&quot;, 64)
    .prop(&quot;fill&quot;, &quot;lightgrey&quot;)
    .prop(&quot;stroke&quot;, &quot;black&quot;)
    .prop(&quot;faChar&quot;, &quot;fa-user&quot;)
    .render()
;
</code></pre></div>`,8)]))}var f=e(u,[["render",n]]);export{h as __pageData,f as default};
