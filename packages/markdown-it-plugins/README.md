# @hpcc-js/markdown-it-plugins

_Collection of plugins and extensions for [markdown-it](https://github.com/markdown-it/markdown-it) and [VitePress](https://vitepress.dev)._

## Quick Start

_Simple example of using the `exec` directive to execute ObservableHQ style JavaScript code in markdown:_

1. Install with your package manager of choice:

```bash
npm install --save @hpcc-js/markdown-it-plugins
```

2. Initialise `markdown-it` as normal and `use` the `observable` plugin:

```js
import markdownit from "markdown-it";
import { observable } from "@hpcc-js/markdown-it-plugins";

const md = markdownit({
    html: true,
    linkify: true,
    typographer: true
});

const md = markdownit();
md.use(observable);

const html = md.render(`\
# Hello World - I am ${age} years old!

\`\`\`js exec
age = 20 + 1;
\`\`\`
`);
```

Which will produce: `Hello World - I am 21 years old!`

## Documentation

* ObservableHQ style notebook Integration:
    * [markdown-it](docs/observablehq-markdown-it.md)
    * [VitePress](docs/observablehq-vitepress.md)
* ECL Code Highlighting
    * [VitePress](docs/ecl-vitepress.md)
d