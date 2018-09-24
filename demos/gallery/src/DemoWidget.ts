import { HTMLWidget, Widget } from "@hpcc-js/common";

declare const System: any;

export class DemoWidget extends HTMLWidget {
    _sampleDiv;
    _samplePath = "./samples/HelloWorld.js";

    constructor() {
        super();
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        this._sampleDiv = element.append("div")
            .attr("id", "target")
            .datum(null)
            ;
    }

    _info;
    _prevJS;
    _errCount = 0;
    _widget: Widget = null;
    update(domNode, element) {
        super.update(domNode, element);
        this._sampleDiv
            .style("width", `${this.width()}px`)
            .style("height", `${this.height()}px`)
            ;

        const js = window["cm_editor"].text();
        if (window["cm_editor"].text() && this._prevJS !== js) {
            this._prevJS = js;
            this._sampleDiv.text("");
            const loading = this._sampleDiv.append("div").text("...loading...");
            System.registry.delete(System.normalizeSync(`cm_editor_${this._errCount}!./plugins/cm.js`));
            this._widget = null;
            System.import(`cm_editor_${this._errCount}!./plugins/cm.js`).then((info) => {
                loading.remove();
                const element = this._sampleDiv.select(".common_Widget");
                if (!element.empty()) {
                    this._widget = element.datum();
                    this.changed(this._widget);
                }
            }).catch(e => {
                this.changed(this._widget);
                this._sampleDiv.node().innerText = e.message;
                System.registry.delete(System.normalizeSync(`cm_editor_${this._errCount++}!./plugins/cm.js`));
            });
        } else if (this._widget) {
            this._widget
                .resize()
                .render()
                ;
        }
    }

    changed(widget: Widget | null) {
    }

    debugSystem() {
        const keysItr = System.registry.keys();
        let k = keysItr.next();
        while (!k.done) {
            console.log(k.value);
            k = keysItr.next();
        }
    }
}
