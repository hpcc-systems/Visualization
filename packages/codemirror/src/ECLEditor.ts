import { Editor } from "./Editor";

import "../src/ECLEditor.css";

export class ECLEditor extends Editor {
    options(): any {
        return {
            ...super.options(),
            mode: "text/x-ecl",
            foldGutter: true,
            gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
        };
    }
}
ECLEditor.prototype._class += " codemirror_ECLEditor";
