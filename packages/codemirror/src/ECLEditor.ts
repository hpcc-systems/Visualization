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

    ecl(): string;
    ecl(_: string): this;
    ecl(_?: string): string | this {
        if (!arguments.length) return this.text();
        this.text(_);
        return this;
    }

}
ECLEditor.prototype._class += " codemirror_ECLEditor";
