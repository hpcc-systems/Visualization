import { Editor } from "./Editor.ts";

export class SQLEditor extends Editor {
    options(): any {
        return {
            ...super.options(),
            mode: "text/x-pgsql",
            foldGutter: true,
            gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
        };
    }

    sql(): string;
    sql(_: string): this;
    sql(_?: string): string | this {
        if (!arguments.length) return this.text();
        this.text(_);
        return this;
    }

}
SQLEditor.prototype._class += " codemirror_SQLEditor";
