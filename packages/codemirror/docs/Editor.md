# Editor

<!--meta

-->

Editor displays an editable snippet of text.

```sample-code
import { Editor } from "@hpcc-js/codemirror";

new Editor()
    .text(`Lorem ipsum dolor sit amet, consectetur adipiscing elit.

Nam hendrerit nisi sed sollicitudin pellentesque.

Nunc posuere purus rhoncus pulvinar aliquam.

Ut aliquet tristique nisl vitae volutpat.

Nulla aliquet porttitor venenatis.

Donec a dui et dui fringilla consectetur id nec massa. Aliquam erat volutpat.`)
    .target("target")
    .render()
    ;

```

### Hotkeys related to Search & Replace:

_Ctrl-F / Cmd-F_

>Start searching

_Ctrl-G / Cmd-G_

>Find next

_Shift-Ctrl-G / Shift-Cmd-G_

>Find previous

_Shift-Ctrl-F / Cmd-Option-F_

>Replace

_Shift-Ctrl-R / Shift-Cmd-Option-F_

>Replace all

_Alt-F_

>Persistent search (dialog doesn't autoclose, enter to find next, Shift-Enter to find previous)

_Alt-G_

>Jump to line

## API

## Published Properties
```@hpcc-js/codemirror:Editor
```
