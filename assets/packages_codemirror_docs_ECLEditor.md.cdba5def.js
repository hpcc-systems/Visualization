import{_ as r,c as t,a as o,o as a}from"./app.ab56574e.js";const E='{"title":"ECLEditor","description":"","frontmatter":{},"headers":[{"level":2,"title":"API","slug":"api"},{"level":2,"title":"Published Properties","slug":"published-properties"}],"relativePath":"packages/codemirror/docs/ECLEditor.md"}',i={};function d(n,e,s,c,p,l){return a(),t("div",null,e[0]||(e[0]=[o(`<h1 id="ecleditor" tabindex="-1">ECLEditor <a class="header-anchor" href="#ecleditor" aria-hidden="true">#</a></h1><p>ECLEditor displays an editable snippet of ECL with syntax coloring.</p><div class="language-sample-code"><pre><code>
import { ECLEditor } from &quot;@hpcc-js/codemirror&quot;;

const code = \`\\
MySample := SAMPLE(Person,10,1) // get every 10th record

SomeFile := DATASET([{&#39;A&#39;},{&#39;B&#39;},{&#39;C&#39;},{&#39;D&#39;},{&#39;E&#39;},
                     {&#39;F&#39;},{&#39;G&#39;},{&#39;H&#39;},{&#39;I&#39;},{&#39;J&#39;},
                     {&#39;K&#39;},{&#39;L&#39;},{&#39;M&#39;},{&#39;N&#39;},{&#39;O&#39;},
                     {&#39;P&#39;},{&#39;Q&#39;},{&#39;R&#39;},{&#39;S&#39;},{&#39;T&#39;},
                     {&#39;U&#39;},{&#39;V&#39;},{&#39;W&#39;},{&#39;X&#39;},{&#39;Y&#39;}],
                     {STRING1 Letter});
Set1 := SAMPLE(SomeFile,5,1); // returns A, F, K, P, U\`;

new ECLEditor()
    .target(&quot;target&quot;)
    .text(code)
    .render()
    ;

</code></pre></div><p>ECLEditor extends <a href="./Editor.html">Editor</a>.</p><h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-hidden="true">#</a></h2><h2 id="published-properties" tabindex="-1">Published Properties <a class="header-anchor" href="#published-properties" aria-hidden="true">#</a></h2><div class="language-@hpcc-js/codemirror:ECLEditor"><pre><code></code></pre></div>`,7)]))}var u=r(i,[["render",d]]);export{E as __pageData,u as default};
