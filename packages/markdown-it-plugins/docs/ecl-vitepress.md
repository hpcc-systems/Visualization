# ECL Code Highlighting

This plugin adds support for highlighting ECL code blocks in VitePress markdown.

## VitePress Configuration

To enable ECL code highlighting in VitePress, add the following to your `.vitepress/config.js`:

```js
import { defineConfig } from "vitepress";
import { eclLang } from "@hpcc-js/markdown-it-plugins/ecl-lang";  // [!code focus]

export default async () => {

    return defineConfig({
        ...

        markdown: {
            ...

            languages: [eclLang()] // [!code focus]
        },
```

## Usage

To use ECL code highlighting in your markdown, simply specify `ecl` as the fenced code block type:

````markdown
```ecl
/* Simple ECL */

Layout_Person := RECORD
    UNSIGNED1 PersonID;
    STRING15 FirstName;
    STRING25 LastName;
END;

allPeople := DATASET([  {1, 'Fred', 'Smith'},
                        {2, 'Joe', 'Blow'},
                        {3, 'Jane', 'Smith'}], Layout_Person);

somePeople := allPeople(LastName = 'Smith');
```
````

Produces:

```ecl
/* Simple ECL */

Layout_Person := RECORD
    UNSIGNED1 PersonID;
    STRING15 FirstName;
    STRING25 LastName;
END;

allPeople := DATASET([  {1, 'Fred', 'Smith'},
                        {2, 'Joe', 'Blow'},
                        {3, 'Jane', 'Smith'}], Layout_Person);

somePeople := allPeople(LastName = 'Smith');
```
