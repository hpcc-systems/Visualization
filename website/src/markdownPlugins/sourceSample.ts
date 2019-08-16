import { JSEditor } from "@hpcc-js/codemirror";
import { SplitPanel } from "@hpcc-js/phosphor";
import { Sample } from "./sample.js";

export class SourceSample extends SplitPanel {

    jsEditor = new JSEditor()
        .on("changes", () => {
            this.sample
                .data([[this.infostring(), this.jsEditor.text()]])
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

    infostring(): string {
        return this.data()[0][0];
    }

    text(): string {
        return this.data()[0][1];
    }

    private _prevJS;
    update(domNode, element) {
        this.height(Math.max((this.text().split("\n").length + 1) * 14, 180));
        super.update(domNode, element);
        if (this._prevJS !== this.text()) {
            this._prevJS = this.text();
            this.jsEditor.javascript(this.text());
        }
    }
}
