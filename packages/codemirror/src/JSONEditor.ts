import { Editor } from "./Editor";

export class JSONEditor extends Editor {
    options(): any {
        return {
            ...super.options(),
            ...{
                mode: "application/json"
            }
        };
    }

    json(): object;
    json(_: object): this;
    json(_?: object): object | this {
        if (!arguments.length) return JSON.parse(this.text());
        this.text(JSON.stringify(_, null, "\t"));
        return this;
    }

}
JSONEditor.prototype._class += " codemirror_JSONEditor";
