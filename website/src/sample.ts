import { HTMLWidget, publish, Widget } from "@hpcc-js/common";

declare const System: any;

export class Sample extends HTMLWidget {

    private _sampleDiv;

    @publish("", "string")
    javascript: publish<this, string>;

    constructor() {
        super();
    }

    htmlNodeID(): string {
        return this.id() + "-html";
    }

    systemJSUrl(): string {
        return `${this.id()}!./src-umd/sample.js`;
    }

    systemsRegistryDelete() {
        System.registry.delete(System.normalizeSync(this.systemJSUrl()));
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        this._sampleDiv = element.append("div")
            .attr("id", this.htmlNodeID())
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
            this.systemsRegistryDelete();
            this._widget = null;
            System.import(this.systemJSUrl()).then(() => {
                loading.remove();
                const element = this._sampleDiv.select(".common_Widget");
                if (!element.empty()) {
                    this._widget = element.datum();
                    this.changed(this._widget);
                }
            }).catch(e => {
                this.changed(this._widget);
                this._sampleDiv.node().innerText = e.message;
                this.systemsRegistryDelete();
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

//  SystemJS Plugin (converts javascript into a html <script> instance via babel) ---
export function fetch(url) {
    const parts = url.address.split("/");
    const sampleWidget: Sample = document.getElementById(parts.pop())["__data__"];
    return sampleWidget.javascript().replace('.target("target")', `.target("${sampleWidget.htmlNodeID()}")`);
}
