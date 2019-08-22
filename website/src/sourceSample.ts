import { JSEditor } from "@hpcc-js/codemirror";
import { publish } from "@hpcc-js/common";
import { SplitPanel } from "@hpcc-js/phosphor";
import { Sample } from "./sample.js";

export class SourceSample extends SplitPanel {

    @publish("", "string")
    javascript: publish<this, string>;

    jsEditor = new JSEditor()
        .on("changes", () => {
            this.sample
                .javascript(this.jsEditor.text())
                .lazyRender()
                ;
        });
    sample = new Sample();

    constructor() {
        super("horizontal");

        this
            .addWidget(this.jsEditor)
            .addWidget(this.sample)
            ;
    }

    private _prevJS;
    update(domNode, element) {
        super.update(domNode, element);
        if (this._prevJS !== this.javascript()) {
            this._prevJS = this.javascript();
            this.jsEditor.javascript(this.javascript());
        }
    }
}
