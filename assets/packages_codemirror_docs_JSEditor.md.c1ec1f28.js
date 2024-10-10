import{_ as r,c as t,a,o}from"./app.ab56574e.js";const u='{"title":"JSEditor","description":"","frontmatter":{},"headers":[{"level":2,"title":"API","slug":"api"},{"level":2,"title":"Published Properties","slug":"published-properties"}],"relativePath":"packages/codemirror/docs/JSEditor.md"}',i={};function d(n,e,s,c,p,l){return o(),t("div",null,e[0]||(e[0]=[a(`<h1 id="jseditor" tabindex="-1">JSEditor <a class="header-anchor" href="#jseditor" aria-hidden="true">#</a></h1><p>JSEditor displays an editable snippet of JavaScript with syntax coloring and code folding.</p><div class="language-sample-code"><pre><code>import { JSEditor } from &quot;@hpcc-js/codemirror&quot;;

const code = \`
function foo(a, b) {
    return a + b;
}
function bar(c, d) {
    return foo(c, d) + (c * d);
}
\`;

let count = 0;
new JSEditor()
    .target(&quot;target&quot;)
    .javascript(code)
    .render()
    ;            

</code></pre></div><p>JSEditor extends <a href="./Editor.html">Editor</a>.</p><h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-hidden="true">#</a></h2><h2 id="published-properties" tabindex="-1">Published Properties <a class="header-anchor" href="#published-properties" aria-hidden="true">#</a></h2><div class="language-@hpcc-js/codemirror:JSEditor"><pre><code></code></pre></div>`,7)]))}var f=r(i,[["render",d]]);export{u as __pageData,f as default};
