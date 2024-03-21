import{_ as e,c as r,o as t,a as o}from"./app.70956d7b.js";const f='{"title":"JSEditor","description":"","frontmatter":{},"headers":[{"level":2,"title":"API","slug":"api"},{"level":2,"title":"Published Properties","slug":"published-properties"}],"relativePath":"packages/codemirror/docs/JSEditor.md"}',a={},i=o(`<h1 id="jseditor" tabindex="-1">JSEditor <a class="header-anchor" href="#jseditor" aria-hidden="true">#</a></h1><p>JSEditor displays an editable snippet of JavaScript with syntax coloring and code folding.</p><div class="language-sample-code"><pre><code>import { JSEditor } from &quot;@hpcc-js/codemirror&quot;;

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

</code></pre></div><p>JSEditor extends <a href="./Editor.html">Editor</a>.</p><h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-hidden="true">#</a></h2><h2 id="published-properties" tabindex="-1">Published Properties <a class="header-anchor" href="#published-properties" aria-hidden="true">#</a></h2><div class="language-@hpcc-js/codemirror:JSEditor"><pre><code></code></pre></div>`,7),d=[i];function n(s,c,p,l,h,_){return t(),r("div",null,d)}var S=e(a,[["render",n]]);export{f as __pageData,S as default};
