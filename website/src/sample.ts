import { HTMLWidget, publish, Widget } from "@hpcc-js/common";

declare const System: any;

export class Sample extends HTMLWidget {
    private _jsEditorID: string;

    private _sampleDiv;

    @publish("", "string")
    javascript: publish<this, string>;

    constructor(jsEditorID: string) {
        super();
        this._jsEditorID = jsEditorID;
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        this._sampleDiv = element.append("div")
            .attr("id", `${this._jsEditorID}-sample`)
            .datum(null)
            ;
    }

    private _prevJS;
    private _widget: Widget = null;
    update(domNode, element) {
        super.update(domNode, element);
        this._sampleDiv
            .style("width", `${this.width()}px`)
            .style("height", `${this.height()}px`)
            ;

        const js = this.javascript();
        if (js && this._prevJS !== js) {
            this._prevJS = js;
            this._sampleDiv.text("");
            const loading = this._sampleDiv.append("div").text("...loading...");
            System.registry.delete(System.normalizeSync(`${this._jsEditorID}!./plugins/cm.js`));
            this._widget = null;
            System.import(`${this._jsEditorID}!./plugins/cm.js`).then(() => {
                loading.remove();
                const element = this._sampleDiv.select(".common_Widget");
                if (!element.empty()) {
                    this._widget = element.datum();
                    this.changed(this._widget);
                }
            }).catch(e => {
                this.changed(this._widget);
                this._sampleDiv.node().innerText = e.message;
                System.registry.delete(System.normalizeSync(`${this._jsEditorID}!./plugins/cm.js`));
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
}
