import{_ as o,c as e,a as n,o as u}from"./app.ab56574e.js";const d='{"title":"Table","description":"","frontmatter":{},"headers":[{"level":2,"title":"API","slug":"api"},{"level":2,"title":"Published Properties","slug":"published-properties"}],"relativePath":"packages/dgrid/docs/Table.md"}',a={};function r(q,t,s,l,p,i){return u(),e("div",null,t[0]||(t[0]=[n(`<h1 id="table" tabindex="-1">Table <a class="header-anchor" href="#table" aria-hidden="true">#</a></h1><p>The dgrid Table widget displays tabular data and offers sorting and cell background coloring by column.</p><div class="language-sample-code"><pre><code>import { Table } from &quot;@hpcc-js/dgrid&quot;;

new Table()
    .target(&quot;target&quot;)
    .columns([&quot;A&quot;, &quot;B&quot;])
    .data([
        [-25, -23],
        [-20, -21],
        [-18, -20],
        [-17, -17],
        [-16, -15]
    ])
    .render()
    ;
</code></pre></div><p><em>sortable</em> can be used to enable sorting via clicking on the table header.</p><p><em>sortBy</em> can also be used to specify a default column to sort.</p><p><em>sortByDescending</em> defaults to <em>false</em>, but can be set to <em>true</em> to use &#39;descending&#39; sort.</p><div class="language-sample-code"><pre><code>import { Table } from &quot;@hpcc-js/dgrid&quot;;

new Table()
    .target(&quot;target&quot;)
    .columns([&quot;A&quot;, &quot;B&quot;])
    .data([
        [-20, -21],
        [-18, -20],
        [-25, -23],
        [-17, -17],
        [-16, -15]
    ])
    .sortable(true)
    .sortBy(&quot;B&quot;)
    .sortByDescending(true)
    .render()
    ;
</code></pre></div><p><em>noDataMessage</em> can be used to specify the message to display when there are no rows.</p><div class="language-sample-code"><pre><code>import { Table } from &quot;@hpcc-js/dgrid&quot;;

new Table()
    .target(&quot;target&quot;)
    .columns([&quot;A&quot;, &quot;B&quot;])
    .data([])
    .noDataMessage(&quot;Nothing to display here&quot;)
    .render()
    ;
</code></pre></div><p><em>columnFormats</em> can be given an array of <em>ColumnFormat</em> instances to control the following properties of a column:</p><ul><li><em>column</em> - a string corresponding to the column to be formatted</li><li><em>width</em> - a number specifying the pixel width of the column</li><li><em>format</em> - a d3 string formatting rule to be applied to the cell contents of the column (see: <a href="./../../../docs/Getting Started/formatting.html">Formatting</a>)</li><li><em>paletteID</em> - a rainbow palette to be applied to the background of the column&#39;s cells based on the cell value relative to the linear scale created by <em>min</em> and <em>max</em></li><li><em>min</em> - a number used for determining the background color value range</li><li><em>max</em> - a number used for determining the background color value range</li><li><em>valueColumn</em> - a string allowing the background color to be based on an alternative column&#39;s values</li></ul><div class="language-sample-code"><pre><code>import { ColumnFormat, Table } from &quot;@hpcc-js/dgrid&quot;;

new Table()
    .columnFormats([
        new ColumnFormat()
            .column(&quot;A&quot;)
            .paletteID(&quot;YlGnBu&quot;)
            .min(-25)
            .max(-16)
    ])
    .target(&quot;target&quot;)
    .columns([&quot;A&quot;, &quot;B&quot;])
    .data([
        [-25, -23],
        [-20, -21],
        [-18, -20],
        [-17, -17],
        [-16, -15]
    ])
    .sortable(true)
    .render()
    ;
</code></pre></div><p>Below is an example of <em>format</em></p><div class="language-sample-code"><pre><code>import { ColumnFormat, Table } from &quot;@hpcc-js/dgrid&quot;;

new Table()
    .columnFormats([
        new ColumnFormat()
            .column(&quot;A&quot;)
            .paletteID(&quot;Blues&quot;)
            .min(-1754)
            .max(46452)
            .format(&quot;$,.2f&quot;),
        new ColumnFormat()
            .column(&quot;B&quot;)
            .paletteID(&quot;Reds&quot;)
            .min(-2165)
            .max(35615)
            .format(&quot;,.0f&quot;),
    ])
    .target(&quot;target&quot;)
    .columns([&quot;A&quot;, &quot;B&quot;])
    .data([
        [-1754, 11334],
        [20765, -2165],
        [18654, 12045],
        [17234, 21776],
        [46452, 35615]
    ])
    .sortable(true)
    .render()
    ;
</code></pre></div><p>Nested tables are also supported.</p><div class="language-sample-code"><pre><code>import { Table } from &quot;@hpcc-js/dgrid&quot;;

new Table()
    .target(&quot;target&quot;)
    .columns([&quot;Mother&quot;, &quot;Father&quot;, { label: &quot;Children&quot;, columns: [&quot;Name&quot;, &quot;sex&quot;, &quot;age&quot;] }, { label: &quot;Pets&quot;, columns: [&quot;Name&quot;, &quot;type&quot;] }])
    .data([
        [&quot;Jane&quot;, &quot;John&quot;, [[&quot;Mary&quot;, &quot;f&quot;, 4], [&quot;Bob&quot;, &quot;m&quot;, 6], [&quot;Tim&quot;, &quot;m&quot;, 1]], [[&quot;Spot&quot;, &quot;dog&quot;], [&quot;Smelly&quot;, &quot;cat&quot;], [&quot;Goldie&quot;, &quot;Fish&quot;], [&quot;Hammy&quot;, &quot;Hamster&quot;]]],
        [&quot;Penelope&quot;, &quot;Alex&quot;, [[&quot;Bill&quot;, &quot;m&quot;, 1]], []],
        [&quot;Jill&quot;, &quot;Marcus&quot;, [], [[&quot;Flappy&quot;, &quot;parrot&quot;], [&quot;Stinky&quot;, &quot;cat&quot;], [&quot;Rolf&quot;, &quot;dog&quot;]]],
        [&quot;Susan&quot;, &quot;Robert&quot;, [[&quot;Jack&quot;, &quot;m&quot;, 4], [&quot;Alice&quot;, &quot;f&quot;, 6]], []]
    ])
    .render()
    ;
</code></pre></div><p><em>pagination</em> can be set to <em>true</em> to enable pagination.</p><div class="language-sample-code"><pre><code>import { ColumnFormat, Table } from &quot;@hpcc-js/dgrid&quot;;

new Table()
    .columnFormats([
        new ColumnFormat()
            .column(&quot;NodeJS Module&quot;)
            .valueColumn(&quot;Quality&quot;)
            .paletteID(&quot;YlGnBu&quot;)
            .min(0)
            .max(1),
        new ColumnFormat()
            .column(&quot;Quality&quot;)
            .paletteID(&quot;YlGnBu&quot;)
            .min(0)
            .max(1),
        new ColumnFormat()
            .column(&quot;Popularity&quot;)
            .paletteID(&quot;Blues&quot;)
            .min(0)
            .max(1),
        new ColumnFormat()
            .column(&quot;Maintenance&quot;)
            .paletteID(&quot;Reds&quot;)
            .min(0)
            .max(1)
    ])
    .target(&quot;target&quot;)
    .columns([&quot;NodeJS Module&quot;, &quot;Quality&quot;, &quot;Popularity&quot;, &quot;Maintenance&quot;])
    .data([
        [&quot;passport&quot;,0.4938482129720376,0.5917779254146884,0.3327053316813829],
        [&quot;passport-jwt&quot;,0.8941115376785387,0.3860625059034481,0.10722018429805187],
        [&quot;passport-auth0&quot;,0.906503757498512,0.20287120015739957,0.32733453889827113],
        [&quot;passport-ldapauth&quot;,0.9093312747113799,0.20369792464785808,0.2639230908864721],
        [&quot;passport-saml&quot;,0.788425147481274,0.23959662046084446,0.3333333333333333],
        [&quot;passport-linkedin-oauth2&quot;,0.809906202729078,0.1765434496242106,0.329331372769146],
        [&quot;passport-local&quot;,0.6072168054659483,0.4710751041744176,0.01555048520752183],
        [&quot;passport-oauth2&quot;,0.6196090252859215,0.36119220403998,0.15005834618798797],
        [&quot;passport-facebook&quot;,0.6196090252859215,0.31885387796535664,0.15005834618798797],
        [&quot;@natlibfi/passport-atlassian-crowd&quot;,0.9243629515385932,0.040394076890184524,0.329331372769146],
        [&quot;@zhaow-de/chai-passport-strategy&quot;,0.9243629515385932,0.008938268177685983,0.3333333333333333],
        [&quot;passport-oauth&quot;,0.446648557461259,0.3159475341538345,0.2775842457494559],
        [&quot;passport-google-oauth&quot;,0.6196090252859215,0.29682205449704663,0.15005834618798797],
        [&quot;@nestjs/passport&quot;,0.6279412264455035,0.18011345318363794,0.33159592525764436],
        [&quot;passport-ldapauth-jnmly&quot;,0.9093312747113799,0.006521736837350932,0.3329170657460006],
        [&quot;passport-google-idtoken&quot;,0.8913052274786528,0.01832162699306179,0.3327053316813829],
        [&quot;passport-dropbox-auth&quot;,0.8941115376785387,0.010908472612337464,0.33332158530214756],
        [&quot;koa-passport&quot;,0.6196090252859215,0.22933297661431307,0.23186866090383487],
        [&quot;passport-strategy&quot;,0.5449391599402367,0.41029835547752164,0.01555048520752183],
        [&quot;passport-hubspot-auth&quot;,0.8941115376785387,0.010669613569030744,0.3329170657460006],
        [&quot;passport-evernote-auth&quot;,0.8941115376785387,0.009001270443071734,0.3316259552820558],
        [&quot;@sbaker/passport-jwt&quot;,0.8941115376785387,0.006978368170043919,0.3333333333333333],
        [&quot;passport-custom&quot;,0.6072168054659483,0.1710531137414241,0.32624672278142447],
        [&quot;@passport-next/chai-connect-middleware&quot;,0.9398245291997027,0.005253949689255811,0.3316259552820558],
        [&quot;passport-chaira&quot;,0.8794064090421898,0.0025007817462488965,0.331851703232178],
        [&quot;@sokratis/passport-linkedin-oauth2&quot;,0.809906202729078,0.05200395619187344,0.33120158747830747],
        [&quot;passport-namchey&quot;,0.9081968052080557,0.0035355351616939397,0.28638365247869985],
        [&quot;passport-google-oauth20&quot;,0.6196090252859215,0.2635237945056096,0.15005834618798797],
        [&quot;passport-verify&quot;,0.8951929404171473,0.007053636693140256,0.31210684274184985],
        [&quot;openid-client&quot;,0.55,0.2580091112907923,0.3333333333333333],
        [&quot;passport-oauth2-refresh&quot;,0.9386150722607559,0.1399406048845841,0.031077596847726322],
        [&quot;passport-kakao&quot;,0.7478736260382798,0.056618040059721784,0.3333333333333333],
        [&quot;passport-mocked&quot;,0.7963634427097461,0.03513108302171434,0.32797663355743617],
        [&quot;connect-ensure-authenticated&quot;,0.9277117692486642,0.007864570258758278,0.33319811528143006],
        [&quot;passport-appleid&quot;,0.809906202729078,0.011072123800069736,0.3333333333333333],
        [&quot;connect-ensure-authorization&quot;,0.9243629515385932,0.0058116558390899796,0.3328242421096128],
        [&quot;periodicjs.ext.passport_mfa&quot;,0.9243629515385932,0.005398185006465589,0.32827492199779656],
        [&quot;passport-worbli&quot;,0.809906202729078,0.008708186738006562,0.3333333333333333],
        [&quot;opentoken&quot;,0.809906202729078,0.06423811939905472,0.3266269782818823],
        [&quot;l-passport&quot;,0.8222984225490513,0.00570344610372109,0.3333333333333333]
    ])
    .columnWidth(&quot;none&quot;)
    .sortable(true)
    .pagination(true)
    .render()
    ;
</code></pre></div><h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-hidden="true">#</a></h2><h2 id="published-properties" tabindex="-1">Published Properties <a class="header-anchor" href="#published-properties" aria-hidden="true">#</a></h2><div class="language-@hpcc-js/dgrid:Table"><pre><code></code></pre></div>`,21)]))}var c=o(a,[["render",r]]);export{d as __pageData,c as default};
