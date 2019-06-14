import { Editor } from "./Editor";

export class DOTEditor extends Editor {
    options(): any {
        return {
            ...super.options(),
            mode: "text/x-dot"
        };
    }

    dot(): string;
    dot(_: string): this;
    dot(_?: string): string | this {
        if (!arguments.length) return this.text();
        this.text(_);
        return this;
    }

}
DOTEditor.prototype._class += " codemirror_JSEditor";
