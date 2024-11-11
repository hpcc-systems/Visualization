# @hpcc-js/codemirror
This package is part of the mono repository "@hpcc-js" (aka Visualization Framework), for more information including [Quick Start](https://github.com/hpcc-systems/Visualization/wiki/Quick-Start), [Gallery](https://raw.githack.com/hpcc-systems/Visualization/trunk/demos/gallery/gallery.html) and [Tutorials](https://github.com/hpcc-systems/Visualization/wiki/Tutorials), please visit the main page on GitHub:  [hpcc-systems/Visualization](https://github.com/hpcc-systems/Visualization).

## Exported Widgets
* [CSSEditor](https://rawgit.com/hpcc-systems/Visualization/trunk/demos/gallery/playground.html?./samples/codemirror/CSSEditor.js)
* [ECLEditor](https://rawgit.com/hpcc-systems/Visualization/trunk/demos/gallery/playground.html?./samples/codemirror/ECLEditor.js)
* [HTMLEditor](https://rawgit.com/hpcc-systems/Visualization/trunk/demos/gallery/playground.html?./samples/codemirror/HTMLEditor.js)
* [JSEditor](https://rawgit.com/hpcc-systems/Visualization/trunk/demos/gallery/playground.html?./samples/codemirror/JSEditor.js)
* [JSONEditor](https://rawgit.com/hpcc-systems/Visualization/trunk/demos/gallery/playground.html?./samples/codemirror/JSONEditor.js)
* [XMLEditor](https://rawgit.com/hpcc-systems/Visualization/trunk/demos/gallery/playground.html?./samples/codemirror/XMLEditor.js)

## Stand-alone HTML Example
```html
<html>
    <head>
        <title>Simple JSONEditor</title>
        <script src="https://unpkg.com/@hpcc-js/common"></script>
        <script src="https://unpkg.com/@hpcc-js/api"></script>
        <script src="https://unpkg.com/@hpcc-js/codemirror"></script>
    </head>
    <body>
        <div id="placeholder" style="width:400px;height:400px;"></div>
        <script>
            var code = {"fruit": "Apple","size": "Large","color": "Red"};

            new window["@hpcc-js/codemirror"].JSONEditor()
                .target("placeholder")
                .json(code)
                .render()
                ;
        </script>
    </body>
</html>
```

```js exec echo
import { ECLEditor } from "./dist/index.js";
ECLEditor.version
```


<!-- <ClientOnly>
  <hpcc-vitepress style="width:100%;height:600px">
    <div id="target" style="height:600px">
    </div>
  <script type="module">
      import { ECLEditor } from "@hpcc-js/codemirror";

      const code = `\
    MySample := SAMPLE(Person,10,1) // get every 10th record
    SomeFile := DATASET([{'A'},{'B'},{'C'},{'D'},{'E'},
                        {'F'},{'G'},{'H'},{'I'},{'J'},
                        {'K'},{'L'},{'M'},{'N'},{'O'},
                        {'P'},{'Q'},{'R'},{'S'},{'T'},
                        {'U'},{'V'},{'W'},{'X'},{'Y'}],
                        {STRING1 Letter});
    Set1 := SAMPLE(SomeFile,5,1); // returns A, F, K, P, U`;

      new ECLEditor()
          .ecl(code)
          .target("target")
          .render()
          ;
  </script>
  </hpcc-vitepress>
</ClientOnly> -->
