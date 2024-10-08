# markdown-it Plugin

This plugin adds support for ObservableHQ style notebooks in your generated markdown.

## Configuration

To enable ObservableHQ style notebooks in markdown-it, simply add the plugin to your markdown-it setup and add the `exec` annotation to the code block you wish to execute.

```js
import markdownit from "markdown-it";
import { observable } from "@hpcc-js/markdown-it-plugins";  // [!code focus]

const md = markdownit({
    html: true,
    linkify: true,
    typographer: true
});

const md = markdownit();
md.use(observable); // [!code focus]

const html = md.render(`\
# Hello World - I am ${age} years old!

\`\`\`js exec  // [!code focus]
age = 20 + 1;
\`\`\`
`);
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