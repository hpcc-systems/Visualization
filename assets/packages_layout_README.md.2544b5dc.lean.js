import{_ as t,c as p,a as o,e,w as c,r as l,o as u,b as a}from"./app.ab56574e.js";const f='{"title":"@hpcc-js/layout","description":"","frontmatter":{},"headers":[{"level":2,"title":"Exported Widgets","slug":"exported-widgets"},{"level":2,"title":"Stand-alone HTML Example","slug":"stand-alone-html-example"}],"relativePath":"packages/layout/README.md"}',i={};function k(r,n,g,m,d,h){const s=l("ClientOnly");return u(),p("div",null,[n[1]||(n[1]=o(`<h1 id="hpcc-js-layout" tabindex="-1">@hpcc-js/layout <a class="header-anchor" href="#hpcc-js-layout" aria-hidden="true">#</a></h1><p>This package is part of the mono repository &quot;@hpcc-js&quot; (aka Visualization Framework), for more information including <a href="https://github.com/hpcc-systems/Visualization/wiki/Quick-Start" target="_blank" rel="noopener noreferrer">Quick Start</a>, <a href="https://raw.githack.com/hpcc-systems/Visualization/trunk/demos/gallery/gallery.html" target="_blank" rel="noopener noreferrer">Gallery</a> and <a href="https://github.com/hpcc-systems/Visualization/wiki/Tutorials" target="_blank" rel="noopener noreferrer">Tutorials</a>, please visit the main page on GitHub: <a href="https://github.com/hpcc-systems/Visualization" target="_blank" rel="noopener noreferrer">hpcc-systems/Visualization</a>.</p><h2 id="exported-widgets" tabindex="-1">Exported Widgets <a class="header-anchor" href="#exported-widgets" aria-hidden="true">#</a></h2><ul><li><a href="https://rawgit.com/hpcc-systems/Visualization/trunk/demos/gallery/playground.html?./samples/layout/Carousel.js" target="_blank" rel="noopener noreferrer">Carousel</a></li><li><a href="https://rawgit.com/hpcc-systems/Visualization/trunk/demos/gallery/playground.html?./samples/layout/Chart%20Panel.js" target="_blank" rel="noopener noreferrer">ChartPanel</a></li><li><a href="https://rawgit.com/hpcc-systems/Visualization/trunk/demos/gallery/playground.html?./samples/layout/Dock%20Panel.js" target="_blank" rel="noopener noreferrer">DockPanel</a></li><li><a href="https://rawgit.com/hpcc-systems/Visualization/trunk/demos/gallery/playground.html?./samples/layout/FlexGrid.js" target="_blank" rel="noopener noreferrer">FlexGrid</a></li><li><a href="https://rawgit.com/hpcc-systems/Visualization/trunk/demos/gallery/playground.html?./samples/layout/HorizontalList.js" target="_blank" rel="noopener noreferrer">HorizontalList</a></li><li><a href="https://rawgit.com/hpcc-systems/Visualization/trunk/demos/gallery/playground.html?./samples/layout/Modal.js" target="_blank" rel="noopener noreferrer">Modal</a></li><li><a href="https://rawgit.com/hpcc-systems/Visualization/trunk/demos/gallery/playground.html?./samples/layout/VerticalList.js" target="_blank" rel="noopener noreferrer">VerticalList</a></li></ul><h2 id="stand-alone-html-example" tabindex="-1">Stand-alone HTML Example <a class="header-anchor" href="#stand-alone-html-example" aria-hidden="true">#</a></h2><div class="language-html"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">&gt;</span></span>Simple Carousel<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>https://unpkg.com/@hpcc-js/util<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>https://unpkg.com/@hpcc-js/common<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>https://unpkg.com/@hpcc-js/api<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>https://unpkg.com/@hpcc-js/chart<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>https://unpkg.com/@hpcc-js/layout<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>placeholder<span class="token punctuation">&quot;</span></span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token value css language-css"><span class="token property">width</span><span class="token punctuation">:</span>800px<span class="token punctuation">;</span><span class="token property">height</span><span class="token punctuation">:</span>600px<span class="token punctuation">;</span></span><span class="token punctuation">&quot;</span></span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
            <span class="token keyword">const</span> columns <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&quot;Subject&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Year 1&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Year 2&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Year 3&quot;</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token keyword">const</span> data <span class="token operator">=</span> <span class="token punctuation">[</span>
                <span class="token punctuation">[</span><span class="token string">&quot;Geography&quot;</span><span class="token punctuation">,</span> <span class="token number">75</span><span class="token punctuation">,</span> <span class="token number">68</span><span class="token punctuation">,</span> <span class="token number">65</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
                <span class="token punctuation">[</span><span class="token string">&quot;English&quot;</span><span class="token punctuation">,</span> <span class="token number">45</span><span class="token punctuation">,</span> <span class="token number">55</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">52</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
                <span class="token punctuation">[</span><span class="token string">&quot;Math&quot;</span><span class="token punctuation">,</span> <span class="token number">98</span><span class="token punctuation">,</span> <span class="token number">92</span><span class="token punctuation">,</span> <span class="token number">90</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
                <span class="token punctuation">[</span><span class="token string">&quot;Science&quot;</span><span class="token punctuation">,</span> <span class="token number">66</span><span class="token punctuation">,</span> <span class="token number">60</span><span class="token punctuation">,</span> <span class="token number">72</span><span class="token punctuation">]</span>
            <span class="token punctuation">]</span><span class="token punctuation">;</span>
            
            <span class="token keyword">const</span> carousel <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">window</span><span class="token punctuation">[</span><span class="token string">&quot;@hpcc-js/layout&quot;</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">Carousel</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">widgets</span><span class="token punctuation">(</span><span class="token punctuation">[</span>
                    <span class="token keyword">new</span> <span class="token class-name">window</span><span class="token punctuation">[</span><span class="token string">&quot;@hpcc-js/chart&quot;</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">Pie</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">columns</span><span class="token punctuation">(</span>columns<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">data</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">,</span>
                    <span class="token keyword">new</span> <span class="token class-name">window</span><span class="token punctuation">[</span><span class="token string">&quot;@hpcc-js/chart&quot;</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">Line</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">columns</span><span class="token punctuation">(</span>columns<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">data</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">,</span>
                    <span class="token keyword">new</span> <span class="token class-name">window</span><span class="token punctuation">[</span><span class="token string">&quot;@hpcc-js/chart&quot;</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">Column</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">columns</span><span class="token punctuation">(</span>columns<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">data</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">,</span>
                    <span class="token keyword">new</span> <span class="token class-name">window</span><span class="token punctuation">[</span><span class="token string">&quot;@hpcc-js/chart&quot;</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">Step</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">columns</span><span class="token punctuation">(</span>columns<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">data</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
                <span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">var</span> active <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token function">setInterval</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                carousel<span class="token punctuation">.</span><span class="token function">active</span><span class="token punctuation">(</span><span class="token operator">++</span>active <span class="token operator">%</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">3000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">&gt;</span></span>
</code></pre></div>`,6)),e(s,null,{default:c(()=>n[0]||(n[0]=[a("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[a("pre",null,[a("code",null,`<div id="target" style="height:600px">
</div>
<script type="module">
    import { Column, Pie, Line, Step } from "@hpcc-js/chart";
    import { Carousel } from "@hpcc-js/layout"; //  Has dependency on "dgrid" so can't be used in a module...

    const columns = ["Subject", "Year 1", "Year 2", "Year 3"];
    const data = [
        ["Geography", 75, 68, 65],
        ["English", 45, 55, -52],
        ["Math", 98, 92, 90],
        ["Science", 66, 60, 72]
    ];

    const carousel = new Carousel()
        .widgets([
            new Pie().columns(columns).data(data),
            new Line().columns(columns).data(data),
            new Column().columns(columns).data(data),
            new Step().columns(columns).data(data)
        ])
        .target("target")
        .render()
        ;

    var active = 0;
    setInterval(function () {
        carousel.active(++active % 4).render();
    }, 3000);
<\/script>
`)])],-1)])),_:1})])}var w=t(i,[["render",k]]);export{f as __pageData,w as default};
