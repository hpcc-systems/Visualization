import { Editor } from "@hpcc-js/codemirror";

export class Source extends Editor {

    constructor(private _mode: "text/javascript") {
        super();
    }

    infostring(): string {
        return this.data()[0][0];
    }

    text2(): string {
        return this.data()[0][1];
    }

    options(): any {
        return {
            ...super.options(),
            mode: this._mode,
            foldGutter: true,
            gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
        };
    }

    update(domNode, element) {
        this.height(Math.max((this.text2().split("\n").length + 1) * 14, 180));
        super.update(domNode, element);
        this.text(this.text2());
    }
}
