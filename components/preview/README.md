# @hpcc-js/wc-preview

**@hpcc-js/wc-preview** is a Web Component library for embedding live html / JavaScript snippets in your website, ideal for hosting demos in documentation.

* [Installing](#installing)
* [Preview](src/preview)

## Installing

For use with Webpack, Rollup, or other Node-based bundlers, @hpcc-js/wc-preview is typically installed via a package manager such as Yarn or npm. (@hpcc-js/wc-preview is distributed primarily as an ES module.)

```bash
npm install --save @hpcc-js/wc-preview
```

@hpcc-js/wc-preview can then be imported as a namespace:

```js
import * as preview from "@hpcc-js/wc-preview";
```

In vanilla HTML, @hpcc-js/wc-preview can be imported as an ES module, say from Skypack:

```html
<script type="module">

import "https://cdn.skypack.dev/@hpcc-js/wc-preview";

</script>

<hpcc-preview preview_border="0px" content_selector="pre > code" style="width:100%;height:400px">
    <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@hpcc-js/common/font-awesome/css/font-awesome.min.css">
        <script src="https://cdn.jsdelivr.net/npm/@hpcc-js/wc-layout"></script>
    </head>

    <body>
        <hpcc-tabpanel style="width:100%;height:100%">
        <div data-label="AAA" style="overflow:auto;min-width:48px">
            <h1>AAA Ipsum Presents</h1>
            <p><strong>Pellentesque habitant morbi tristique</strong> senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. <em>Aenean ultricies mi vitae est.</em> Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, <code>commodo vitae</code>, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. <a href="#">Donec non enim</a> in turpis pulvinar facilisis. Ut felis.</p>
        </div>
        <div data-label="BBB" style="overflow:auto;min-width:48px">
            <h1>BBB Ipsum Presents</h1>
            <p><strong>Pellentesque habitant morbi tristique</strong> senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. <em>Aenean ultricies mi vitae est.</em> Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, <code>commodo vitae</code>, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. <a href="#">Donec non enim</a> in turpis pulvinar facilisis. Ut felis.</p>
        </div>
        </hpcc-tabpanel>
    </body>
</hpcc-preview>

```

@hpcc-js/wc-preview is also available as a UMD bundle for legacy browsers.

```html
<head>
    <script src="https://cdn.jsdelivr.net/npm/@hpcc-js/wc-preview"></script>
</head>

<body>
    <hpcc-preview>
        <head>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@hpcc-js/common/font-awesome/css/font-awesome.min.css">
            <script src="https://cdn.jsdelivr.net/npm/@hpcc-js/wc-layout"></script>
        </head>

        <body>
            <hpcc-tabpanel style="width:100%;height:100%">
            <div data-label="AAA" style="overflow:auto;min-width:48px">
                <h1>AAA Ipsum Presents</h1>
                <p><strong>Pellentesque habitant morbi tristique</strong> senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. <em>Aenean ultricies mi vitae est.</em> Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, <code>commodo vitae</code>, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. <a href="#">Donec non enim</a> in turpis pulvinar facilisis. Ut felis.</p>
            </div>
            <div data-label="BBB" style="overflow:auto;min-width:48px">
                <h1>BBB Ipsum Presents</h1>
                <p><strong>Pellentesque habitant morbi tristique</strong> senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. <em>Aenean ultricies mi vitae est.</em> Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, <code>commodo vitae</code>, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. <a href="#">Donec non enim</a> in turpis pulvinar facilisis. Ut felis.</p>
            </div>
            </hpcc-tabpanel>
        </body>
    </hpcc-preview>
</body>
```
