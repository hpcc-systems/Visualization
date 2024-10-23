import{_ as a,c as n,a as e,o}from"./app.ab56574e.js";const q='{"title":"Palette","description":"","frontmatter":{},"headers":[{"level":2,"title":"Ordinal","slug":"ordinal"},{"level":3,"title":"Palette.ordinal","slug":"palette-ordinal"},{"level":3,"title":"Creating a custom palette","slug":"creating-a-custom-palette"},{"level":3,"title":"Using a custom palette","slug":"using-a-custom-palette"},{"level":2,"title":"Rainbow","slug":"rainbow"},{"level":3,"title":"Palette.rainbow","slug":"palette-rainbow"},{"level":3,"title":"Creating a custom palette","slug":"creating-a-custom-palette-1"},{"level":3,"title":"Using a custom palette","slug":"using-a-custom-palette-1"}],"relativePath":"packages/common/docs/Palette.md"}',s={};function u(l,t,p,c,r,i){return o(),n("div",null,t[0]||(t[0]=[e(`<h1 id="palette" tabindex="-1">Palette <a class="header-anchor" href="#palette" aria-hidden="true">#</a></h1><p>Palettes are managed in a global pool (by name / id), so that they can be shared between visualization instances. Not only is the range of colors shared, but also (in the case of Ordinal) any associations are also shared.</p><p>IOW if <strong>Chart A</strong> and <strong>Chart B</strong> are sharing the <em>category10</em> <code>paletteID</code> and <strong>Chart A</strong> associates &quot;red&quot; with the word &quot;Year 4&quot;, if <strong>Chart B</strong> also contains a data point called &quot;Year 4&quot; it will automatically be assigned the same Color (red).</p><ul><li><strong>Chart A</strong> - assigned palette <em>category10</em>:</li></ul><div class="language-sample-code"><pre><code>import { Bar } from &quot;@hpcc-js/chart&quot;;

new Bar()
    .target(&quot;target&quot;)
    .paletteID(&quot;category10&quot;)
    .columns([&quot;Subject&quot;, &quot;Year 1&quot;, &quot;Year 2&quot;, &quot;Year 3&quot;, &quot;Year 4&quot;])
    .data([
        [&quot;Geography&quot;, 75, 68, 65, 45],
        [&quot;English&quot;, 45, 55, 52, 46],
        [&quot;Math&quot;, 98, 92, 90, 47],
        [&quot;Science&quot;, 66, 60, 72, 48]
    ])
    .yAxisDomainLow(0)
    .yAxisDomainHigh(100)
    .render()
    ;
</code></pre></div><ul><li><strong>Chart B</strong> - also assigned palette <em>category10</em>:</li></ul><div class="language-sample-code"><pre><code>import { Pie } from &quot;@hpcc-js/chart&quot;;

new Pie()
    .target(&quot;target&quot;)
    .paletteID(&quot;category10&quot;)
    .columns([&quot;Category&quot;, &quot;Value&quot;])
    .data([
        [&quot;Year 1&quot;, 34],
        [&quot;Year 5&quot;, 34],
        [&quot;Year 6&quot;, 55],
        [&quot;Year 4&quot;, 89]
    ])
    .render()
    ;
</code></pre></div><p><strong>Note:</strong> &quot;Year 1&quot; and &quot;Year 4&quot; have been assigned consistent coloring!</p><p>If this behavior is undesirable, then individual widgets can set <em>useClonedPalette</em> to <code>true</code>, then they will have their own local cloned copy:</p><ul><li><strong>Chart C</strong> - assigned a &quot;cloned&quot; copy of palette <em>category10</em>:</li></ul><div class="language-sample-code"><pre><code>import { Pie } from &quot;@hpcc-js/chart&quot;;

new Pie()
    .target(&quot;target&quot;)
    .paletteID(&quot;category10&quot;)
    .useClonedPalette(true)
    .columns([&quot;Category&quot;, &quot;Value&quot;])
    .data([
        [&quot;Year 1&quot;, 34],
        [&quot;Year 5&quot;, 34],
        [&quot;Year 6&quot;, 55],
        [&quot;Year 4&quot;, 89]
    ])
    .render()
    ;
</code></pre></div><p><strong>Note:</strong> &quot;Year 5&quot; and &quot;Year 6&quot; now have the same colors as &quot;Year 2&quot; and &quot;Year 3&quot; from the first example above.</p><h2 id="ordinal" tabindex="-1">Ordinal <a class="header-anchor" href="#ordinal" aria-hidden="true">#</a></h2><p>Ordinal palettes are typically used in visualizations with discrete values. They include the following defaults:</p><div class="language-sample"><pre><code>import { OrdinalSample } from &quot;./palette/ordinal.js&quot;;

const os = new OrdinalSample()
    .target(&quot;target&quot;)
    .render()
    ;
</code></pre></div><h3 id="palette-ordinal" tabindex="-1">Palette.ordinal <a class="header-anchor" href="#palette-ordinal" aria-hidden="true">#</a></h3><p>Usage:</p><ul><li><code>Palette.ordinal()</code>: Returns a string array containing all the known ordinal palette IDs (equivalent to <em>Palette.ordinal.fetchOrdinalItem()</em>).</li><li><code>Palette.ordinal(&quot;hpcc10&quot;)</code>: Returns a function object that can then be used to convert string constants to colors (see example below).</li><li><code>Palette.ordinal(&quot;StarStipes&quot;, [&quot;red&quot;, &quot;white&quot;, &quot;blue&quot;])</code>: Create a new ordinal palette called &quot;StarStipes&quot; with the supplied colors and returns a function object that can then be used to convert string constants to colors (see example below).</li></ul><h3 id="creating-a-custom-palette" tabindex="-1">Creating a custom palette <a class="header-anchor" href="#creating-a-custom-palette" aria-hidden="true">#</a></h3><div class="language-javascript"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> Palette <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@hpcc-js/common&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> defPalette <span class="token operator">=</span> Palette<span class="token punctuation">.</span><span class="token function">ordinal</span><span class="token punctuation">(</span><span class="token string">&quot;default&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> jbPalette <span class="token operator">=</span> Palette<span class="token punctuation">.</span><span class="token function">ordinal</span><span class="token punctuation">(</span><span class="token string">&quot;Jackie Brown&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string">&quot;#BAA378&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;#382E1C&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;#453823&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;#BAA378&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;#2C2416&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;#C0A172&quot;</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> a_color <span class="token operator">=</span> <span class="token function">defPalette</span><span class="token punctuation">(</span><span class="token string">&quot;Year 1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> another_color <span class="token operator">=</span> <span class="token function">jbPalette</span><span class="token punctuation">(</span><span class="token string">&quot;Year 2&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


</code></pre></div><h3 id="using-a-custom-palette" tabindex="-1">Using a custom palette <a class="header-anchor" href="#using-a-custom-palette" aria-hidden="true">#</a></h3><div class="language-sample-code"><pre><code>import { Palette } from &quot;@hpcc-js/common&quot;;
import { Bubble } from &quot;@hpcc-js/chart&quot;;

Palette.ordinal(&quot;Pretty in Pink&quot;, [&quot;#ffc2cd&quot;, &quot;#ff93ac&quot;, &quot;#ff6289&quot;, &quot;#fc3468&quot;, &quot;#ff084a&quot;]);

new Bubble()
    .target(&quot;target&quot;)
    .paletteID(&quot;Pretty in Pink&quot;)
    .columns([&quot;Year&quot;, &quot;Value&quot;])
    .data([
        [&quot;Year 1&quot;, 34],
        [&quot;Year 5&quot;, 34],
        [&quot;Year 6&quot;, 55],
        [&quot;Year 4&quot;, 89]
    ])
    .render()
    ;
</code></pre></div><h2 id="rainbow" tabindex="-1">Rainbow <a class="header-anchor" href="#rainbow" aria-hidden="true">#</a></h2><p>Rainbow palettes are used with visualizations that represent a range of values. They include the following defaults:</p><div class="language-sample"><pre><code>import { RainbowSample } from &quot;./palette/ordinal.js&quot;;

const os = new RainbowSample()
    .target(&quot;target&quot;)
    .render()
    ;
</code></pre></div><h3 id="palette-rainbow" tabindex="-1">Palette.rainbow <a class="header-anchor" href="#palette-rainbow" aria-hidden="true">#</a></h3><ul><li><code>Palette.rainbow()</code>: Returns a string array containing all the known rainbow palette IDs.</li><li><code>Palette.rainbow(&quot;hpcc10&quot;)</code>: Returns a function object that can then be used to convert values to a color on the rainbow (see example below).</li><li><code>Palette.rainbow(&quot;StarStipes&quot;, [&quot;red&quot;, &quot;white&quot;, &quot;blue&quot;])</code>: Create a new rainbow palette called &quot;StarStipes&quot; with the supplied colors and returns a function object that can then be used to convert values to a color on the rainbow (see example below).</li></ul><h3 id="creating-a-custom-palette-1" tabindex="-1">Creating a custom palette <a class="header-anchor" href="#creating-a-custom-palette-1" aria-hidden="true">#</a></h3><div class="language-javascript"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> Palette <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@hpcc-js/common&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> shadesPalette <span class="token operator">=</span> Palette<span class="token punctuation">.</span><span class="token function">rainbow</span><span class="token punctuation">(</span><span class="token string">&quot;Shades&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string">&quot;#BAA378&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;#382E1C&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;#453823&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;#BAA378&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;#2C2416&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;#C0A172&quot;</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> col1 <span class="token operator">=</span> <span class="token function">shadesPalette</span><span class="token punctuation">(</span><span class="token number">33</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span>     <span class="token comment">//  col1 = &quot;#3f3420&quot;</span>
<span class="token keyword">const</span> col2 <span class="token operator">=</span> <span class="token function">shadesPalette</span><span class="token punctuation">(</span><span class="token number">66</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span>     <span class="token comment">//  col2 = &quot;#8e7c5a&quot;</span>


</code></pre></div><h3 id="using-a-custom-palette-1" tabindex="-1">Using a custom palette <a class="header-anchor" href="#using-a-custom-palette-1" aria-hidden="true">#</a></h3><div class="language-sample-code"><pre><code>import { Palette } from &quot;@hpcc-js/common&quot;;
import { ColumnFormat, Table } from &quot;@hpcc-js/dgrid&quot;;

Palette.rainbow(&quot;Shades&quot;, [&quot;#BAA378&quot;, &quot;#382E1C&quot;, &quot;#453823&quot;, &quot;#BAA378&quot;, &quot;#2C2416&quot;, &quot;#C0A172&quot;]);

new Table()
    .columnFormats([
        new ColumnFormat()
            .column(&quot;Series-1&quot;)
            .paletteID(&quot;Shades&quot;)
    ])
    .target(&quot;target&quot;)
    .columns([&quot;Series-1&quot;])
    .data([[0], [3], [4], [6], [9], [10], [12], [12], [14], [15], [21], [23]])
    .render()
    ;
</code></pre></div>`,31)]))}var h=a(s,[["render",u]]);export{q as __pageData,h as default};
