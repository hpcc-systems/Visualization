import{_ as t,c as o,a as r,o as i}from"./app.ab56574e.js";const h='{"title":"ECLArchiveViewer","description":"","frontmatter":{},"headers":[{"level":2,"title":"API","slug":"api"},{"level":2,"title":"Published Properties","slug":"published-properties"}],"relativePath":"packages/eclwatch/docs/ECLArchiveViewer.md"}',a={};function c(n,e,s,l,d,p){return i(),o("div",null,e[0]||(e[0]=[r(`<h1 id="eclarchiveviewer" tabindex="-1">ECLArchiveViewer <a class="header-anchor" href="#eclarchiveviewer" aria-hidden="true">#</a></h1><p>ECLArchiveViewer fetches and displays a workunit&#39;s archive files. It extends <em>SplitPanel</em> and displays two widgets side by side in the target element&#39;s available space.</p><p>The two widgets are:</p><ol><li><em>DirectoryList</em> on the left</li><li><em>Editor</em> on the right</li></ol><p><em>url</em> can be used to specify a direct link to the archives to fetch.</p><div class="language-sample-code"><pre><code>import { ECLArchiveViewer } from &quot;@hpcc-js/eclwatch&quot;;

new ECLArchiveViewer()
    .target(&quot;target&quot;)
    .baseUrl(&quot;http://play.hpccsystems.com:8010/&quot;)
    .wuid(&quot;W20200107-160602&quot;)
    .render()
    ;
</code></pre></div><p>Or <em>baseUrl</em> and <em>wuid</em> can be used to fetch the archive files.</p><p><em>verticalScroll</em> can be set to <em>false</em> to hide the <em>DirectoryList</em> vertical scroll bar.</p><div class="language-sample-code"><pre><code>import { ECLArchiveViewer } from &quot;@hpcc-js/eclwatch&quot;;

new ECLArchiveViewer()
    .target(&quot;target&quot;)
    .baseUrl(&quot;http://play.hpccsystems.com:8010/&quot;)
    .wuid(&quot;W20200107-160602&quot;)
    .verticalScroll(false)
    .render()
    ;
</code></pre></div><p><em>iconSize</em> and <em>fontSize</em> set the size of the <em>DirectoryList</em> icons and fonts.</p><p><em>folderIconOpen</em> and <em>folderIconClosed</em> can specify CSS classes assigned to open and closed folder icons.</p><div class="language-sample-code"><pre><code>import { ECLArchiveViewer } from &quot;@hpcc-js/eclwatch&quot;;

new ECLArchiveViewer()
    .target(&quot;target&quot;)
    .baseUrl(&quot;http://play.hpccsystems.com:8010/&quot;)
    .wuid(&quot;W20200107-160602&quot;)
    .verticalScroll(false)
    .iconSize(16)
    .fontSize(12)
    .folderIconOpen(&quot;fa fa-minus-square-o&quot;)
    .folderIconClosed(&quot;fa fa-plus-square-o&quot;)
    .render()
    ;
</code></pre></div><p><em>codeFileIcon</em> and <em>textFileIcon</em> allow CSS classes to be assigned to file icons.</p><p><em>fontColor</em> can be used to set the font color of the <em>DirectoryList</em> text and icons.</p><p><em>fontFamily</em> can be used to set the font family of the <em>DirectoryList</em> text.</p><p><em>directoryPaneHoverColor</em> sets the background color of hovered <em>DirectoryList</em> rows.</p><div class="language-sample-code"><pre><code>import { ECLArchiveViewer } from &quot;@hpcc-js/eclwatch&quot;;

new ECLArchiveViewer()
    .target(&quot;target&quot;)
    .baseUrl(&quot;http://play.hpccsystems.com:8010/&quot;)
    .wuid(&quot;W20200107-160602&quot;)
    .iconSize(16)
    .fontSize(12)
    .folderIconOpen(&quot;fa fa-minus-circle&quot;)
    .folderIconClosed(&quot;fa fa-plus-circle&quot;)
    .codeFileIcon(&quot;fa fa-code&quot;)
    .textFileIcon(&quot;fa fa-font&quot;)
    .fontColor(&quot;#333&quot;)
    .fontFamily(&quot;Tahoma&quot;)
    .directoryPaneHoverColor(&quot;#1A9BD7&quot;)
    .render()
    ;
</code></pre></div><h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-hidden="true">#</a></h2><h2 id="published-properties" tabindex="-1">Published Properties <a class="header-anchor" href="#published-properties" aria-hidden="true">#</a></h2><div class="language-@hpcc-js/eclwatch:ECLArchiveViewer"><pre><code></code></pre></div>`,20)]))}var m=t(a,[["render",c]]);export{h as __pageData,m as default};
