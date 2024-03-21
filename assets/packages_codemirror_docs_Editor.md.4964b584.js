import{_ as e,c as t,o,a as r}from"./app.70956d7b.js";const _='{"title":"Editor","description":"","frontmatter":{},"headers":[{"level":3,"title":"Hotkeys related to Search & Replace:","slug":"hotkeys-related-to-search-replace"},{"level":2,"title":"API","slug":"api"},{"level":2,"title":"Published Properties","slug":"published-properties"}],"relativePath":"packages/codemirror/docs/Editor.md"}',a={},i=r(`<h1 id="editor" tabindex="-1">Editor <a class="header-anchor" href="#editor" aria-hidden="true">#</a></h1><p>Editor displays an editable snippet of text.</p><div class="language-sample-code"><pre><code>import { Editor } from &quot;@hpcc-js/codemirror&quot;;

new Editor()
    .text(\`Lorem ipsum dolor sit amet, consectetur adipiscing elit.

Nam hendrerit nisi sed sollicitudin pellentesque.

Nunc posuere purus rhoncus pulvinar aliquam.

Ut aliquet tristique nisl vitae volutpat.

Nulla aliquet porttitor venenatis.

Donec a dui et dui fringilla consectetur id nec massa. Aliquam erat volutpat.\`)
    .target(&quot;target&quot;)
    .render()
    ;

</code></pre></div><h3 id="hotkeys-related-to-search-replace" tabindex="-1">Hotkeys related to Search &amp; Replace: <a class="header-anchor" href="#hotkeys-related-to-search-replace" aria-hidden="true">#</a></h3><p><em>Ctrl-F / Cmd-F</em></p><blockquote><p>Start searching</p></blockquote><p><em>Ctrl-G / Cmd-G</em></p><blockquote><p>Find next</p></blockquote><p><em>Shift-Ctrl-G / Shift-Cmd-G</em></p><blockquote><p>Find previous</p></blockquote><p><em>Shift-Ctrl-F / Cmd-Option-F</em></p><blockquote><p>Replace</p></blockquote><p><em>Shift-Ctrl-R / Shift-Cmd-Option-F</em></p><blockquote><p>Replace all</p></blockquote><p><em>Alt-F</em></p><blockquote><p>Persistent search (dialog doesn&#39;t autoclose, enter to find next, Shift-Enter to find previous)</p></blockquote><p><em>Alt-G</em></p><blockquote><p>Jump to line</p></blockquote><h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-hidden="true">#</a></h2><h2 id="published-properties" tabindex="-1">Published Properties <a class="header-anchor" href="#published-properties" aria-hidden="true">#</a></h2><div class="language-@hpcc-js/codemirror:Editor"><pre><code></code></pre></div>`,21),l=[i];function p(d,s,n,c,u,h){return o(),t("div",null,l)}var b=e(a,[["render",p]]);export{_ as __pageData,b as default};
