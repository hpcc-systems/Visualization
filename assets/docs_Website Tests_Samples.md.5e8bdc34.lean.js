import{_ as a,c as s,a as t,o as e}from"./app.ab56574e.js";const k='{"title":"Sample","description":"","frontmatter":{},"headers":[{"level":2,"title":"Samples","slug":"samples"},{"level":3,"title":"Code and Sample (Splitter)","slug":"code-and-sample-splitter"},{"level":3,"title":"Code and Sample (Tabbed)","slug":"code-and-sample-tabbed"},{"level":3,"title":"Just a Sample (no code)","slug":"just-a-sample-no-code"},{"level":3,"title":"Just code (no visible sample)","slug":"just-code-no-visible-sample"},{"level":2,"title":"API","slug":"api"},{"level":2,"title":"Published Properties","slug":"published-properties"}],"relativePath":"docs/Website Tests/Samples.md"}',o={};function p(u,n,c,l,i,r){return e(),s("div",null,n[0]||(n[0]=[t(`<h1 id="sample" tabindex="-1">Sample <a class="header-anchor" href="#sample" aria-hidden="true">#</a></h1><h2 id="samples" tabindex="-1">Samples <a class="header-anchor" href="#samples" aria-hidden="true">#</a></h2><h3 id="code-and-sample-splitter" tabindex="-1">Code and Sample (Splitter) <a class="header-anchor" href="#code-and-sample-splitter" aria-hidden="true">#</a></h3><div class="language-sample-code-split"><pre><code>import { Column } from &quot;@hpcc-js/chart&quot;;

new Column()
    .target(&quot;target&quot;)
    .columns([&quot;Subject&quot;, &quot;Year 1&quot;, &quot;Year 2&quot;, &quot;Year 3&quot;])
    .data([
        [&quot;Geography&quot;, 75, 68, 65],
        [&quot;English&quot;, 45, 55, -52],
        [&quot;Math&quot;, 98, 92, 90],
        [&quot;Science&quot;, 66, 60, 72]
    ])
    .render()
    ;
</code></pre></div><h3 id="code-and-sample-tabbed" tabindex="-1">Code and Sample (Tabbed) <a class="header-anchor" href="#code-and-sample-tabbed" aria-hidden="true">#</a></h3><div class="language-sample-code-tabbed"><pre><code>import { Column } from &quot;@hpcc-js/chart&quot;;

new Column()
    .target(&quot;target&quot;)
    .columns([&quot;Subject&quot;, &quot;Year 1&quot;, &quot;Year 2&quot;, &quot;Year 3&quot;])
    .data([
        [&quot;Geography&quot;, 75, 68, 65],
        [&quot;English&quot;, 45, 55, -52],
        [&quot;Math&quot;, 98, 92, 90],
        [&quot;Science&quot;, 66, 60, 72]
    ])
    .render()
    ;
</code></pre></div><h3 id="just-a-sample-no-code" tabindex="-1">Just a Sample (no code) <a class="header-anchor" href="#just-a-sample-no-code" aria-hidden="true">#</a></h3><div class="language-sample"><pre><code>import { Column } from &quot;@hpcc-js/chart&quot;;

new Column()
    .target(&quot;target&quot;)
    .columns([&quot;Subject&quot;, &quot;Year 1&quot;, &quot;Year 2&quot;, &quot;Year 3&quot;])
    .data([
        [&quot;Geography&quot;, 75, 68, 65],
        [&quot;English&quot;, 45, 55, -52],
        [&quot;Math&quot;, 98, 92, 90],
        [&quot;Science&quot;, 66, 60, 72]
    ])
    .render()
    ;
</code></pre></div><h3 id="just-code-no-visible-sample" tabindex="-1">Just code (no visible sample) <a class="header-anchor" href="#just-code-no-visible-sample" aria-hidden="true">#</a></h3><div class="language-javascript"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> Column <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@hpcc-js/chart&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">new</span> <span class="token class-name">Column</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">target</span><span class="token punctuation">(</span><span class="token string">&quot;target&quot;</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">columns</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&quot;Subject&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Year 1&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Year 2&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Year 3&quot;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">[</span>
        <span class="token punctuation">[</span><span class="token string">&quot;Geography&quot;</span><span class="token punctuation">,</span> <span class="token number">75</span><span class="token punctuation">,</span> <span class="token number">68</span><span class="token punctuation">,</span> <span class="token number">65</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token punctuation">[</span><span class="token string">&quot;English&quot;</span><span class="token punctuation">,</span> <span class="token number">45</span><span class="token punctuation">,</span> <span class="token number">55</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">52</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token punctuation">[</span><span class="token string">&quot;Math&quot;</span><span class="token punctuation">,</span> <span class="token number">98</span><span class="token punctuation">,</span> <span class="token number">92</span><span class="token punctuation">,</span> <span class="token number">90</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token punctuation">[</span><span class="token string">&quot;Science&quot;</span><span class="token punctuation">,</span> <span class="token number">66</span><span class="token punctuation">,</span> <span class="token number">60</span><span class="token punctuation">,</span> <span class="token number">72</span><span class="token punctuation">]</span>
    <span class="token punctuation">]</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">;</span>
</code></pre></div><h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-hidden="true">#</a></h2><h2 id="published-properties" tabindex="-1">Published Properties <a class="header-anchor" href="#published-properties" aria-hidden="true">#</a></h2><div class="language-@hpcc-js/chart:Column"><pre><code></code></pre></div>`,13)]))}var q=a(o,[["render",p]]);export{k as __pageData,q as default};
