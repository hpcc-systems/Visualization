# ObservableHQ VitePress Plugin

This plugin adds support for ObservableHQ style notebooks in VitePress markdown.

## VitePress Configuration

To enable ObservableHQ style notebooks in VitePress requires ammending both the config.ts and the themes config.

1. Add the following to your `.vitepress/config.js`:

```js
import { defineConfig } from "vitepress";
import { observable } from "@hpcc-js/markdown-it-plugins";  // [!code focus]
import { eclLang } from "@hpcc-js/markdown-it-plugins/ecl-lang";

export default async () => {

    return defineConfig({
        ...

        markdown: {
            config: md => {                               // [!code focus]
                md.use(observable, { vitePress: true });  // [!code focus]
            },                                            // [!code focus]
            languages: [eclLang()]
        },
```

2. Add the following to your `.vitepress/theme/index.ts`:

```ts
import { h } from "vue";
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import RenderComponent from "@hpcc-js/markdown-it-plugins/vitepress/RenderComponent.vue"; // [!code focus]

export default {
    extends: DefaultTheme,
    Layout: () => {
        return h(DefaultTheme.Layout, null, {
            // https://vitepress.dev/guide/extending-default-theme#layout-slots
        });
    },
    enhanceApp({ app }) {                                   // [!code focus]
        app.component("RenderComponent", RenderComponent);  // [!code focus]
    },                                                      // [!code focus]
} satisfies Theme;
```

## Usage

To use ObservableHQ style notebooks in your markdown, simply add the `exec` annotation to the `js` or `javascript` code block.  The code block will then be executed and the result will be displayed in the markdown.

### Annotations

The following annotations are supported:

- `exec` - Executes the code block.
- `echo` - Echoes the code block.
- `hide` - Hides any output from the code block.

### Examples

1. `js exec`

_The following example will execute the contents of the code block and display the result, replacing the code block block in the markdown:_

````markdown
```js exec
pi = Math.PI;
```
````

Produces:

```js exec
pi = Math.PI;
```

---

2. `js echo`

_The following example will display the result of the execution and include the origonal code block in the markdown:_

````markdown
```js exec echo
piEcho = Math.PI;
```
````

Produces:

```js exec echo
piEcho = Math.PI;
```

3. `js exec echo hide`

_The following example will execute the code block and hide its result.  It will echo  origonal code block in the markdown:_

````markdown
```js exec echo hide
piEchoHide = Math.PI;
```
````

Produces:

```js exec echo hide
piEchoHide = Math.PI;
```

4. `js exec hide`

_The following example will execute the code block and hide its result.  It will not echo the origonal code block in the markdown:_

````markdown
```js exec hide
piHide = Math.PI;
```
````

Produces:

```js exec hide
piHide = Math.PI;
```

...no output, but the code block is executed...