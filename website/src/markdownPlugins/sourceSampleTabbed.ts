import { JSEditor } from "@hpcc-js/codemirror";
import { TabPanel } from "@hpcc-js/phosphor";
import { Sample } from "./sample.js";

export class SourceSampleTabbed extends TabPanel {

    jsEditor = new JSEditor()
        .on("changes", () => {
            this.sample
                .data([[this.infostring(), this.jsEditor.text()]])
                .lazyRender()
                ;
        });
    sample = new Sample();

    constructor() {
        super();

        this
            .addWidget(this.sample, "Sample")
            .addWidget(this.jsEditor, "Source")
            ;
    }

    infostring(): string {
        return this.data()[0][0];
    }

    text(): string {
        return this.data()[0][1];
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        this.sample.data([[this.infostring(), this.text()]]);
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
