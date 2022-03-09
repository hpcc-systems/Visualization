# @hpcc-js/wc-layout

**@hpcc-js/wc-layout** is a Web Component library to simplify advanced layouts in HTML.

* [Installing](#installing)
* [Docking Panel](src/lumino/dockPanel)
* [Drag and Zoom](src/zoom)
* [Split Panel](src/lumino/splitPanel)
* [Tab Panel](src/lumino/tabPanel)
* [Changelog](./CHANGELOG.md)

## Installing

For use with Webpack, Rollup, or other Node-based bundlers, @hpcc-js/wc-layout is typically installed via a package manager such as Yarn or npm. (@hpcc-js/wc-layout is distributed primarily as an ES module.)

```bash
npm install --save @hpcc-js/wc-layout
```

@hpcc-js/wc-layout can then be imported as a namespace:

```js
import * as layout from "@hpcc-js/wc-layout";
```

In vanilla HTML, @hpcc-js/wc-layout can be imported as an ES module, say from Skypack:

```html
<script type="module">

import * as layout from "https://cdn.skypack.dev/@hpcc-js/wc-layout";

document.body.innerHTML("<hpcc-splitpanel>...</hpcc-splitpanel>");

</script>

<hpcc-splitpanel orientation="horizontal" style="width:100%;height:400px">
...
</<hpcc-splitpanel>

```

@hpcc-js/wc-layout is also available as a UMD bundle for legacy browsers.

```html
<head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@hpcc-js/common/font-awesome/css/font-awesome.min.css">
    <script src="https://cdn.jsdelivr.net/npm/@hpcc-js/wc-layout"></script>
</head>

<body>
    <h1>Splitters</h1>
    <hpcc-splitpanel orientation="horizontal" style="width:100%;height:400px">
        <div style="overflow:auto;min-width:48px">
            <h1>HTML Ipsum Presents</h1>
            <p><strong>Pellentesque habitant morbi tristique</strong> senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. <em>Aenean ultricies mi vitae est.</em> Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, <code>commodo vitae</code>, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. <a href="#">Donec non enim</a> in turpis pulvinar facilisis. Ut felis.</p>
        </div>
        <hpcc-splitpanel orientation="vertical" style="width:100%;height:100%;border:0px;padding:0px;min-width:48px">
            <div style="overflow:auto;min-height:48px">
                <h1>HTML Ipsum Presents</h1>
                <p><strong>Pellentesque habitant morbi tristique</strong> senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.</p>
            </div>
            <div style="overflow:auto;min-height:48px">
                <h1>HTML Ipsum Presents</h1>
                <p><strong>Pellentesque habitant morbi tristique</strong> senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.</p>
            </div>
        </hpcc-splitpanel>
    </hpcc-splitpanel>
</body>
```
