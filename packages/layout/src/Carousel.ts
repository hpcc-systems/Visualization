import { HTMLWidget, Widget } from "@hpcc-js/common";
import { select as d3Select } from "d3-selection";
import "d3-transition";

import "../src/Carousel.css";

export class Carousel extends HTMLWidget {

    protected _prevActive: number = 0;
    protected _root;

    activeWidget(): Widget {
        return this.widgets()[this.active()];
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        this._root = element.append("div")
            .attr("id", `${this.id()}_root`)
            ;
    }

    update(domNode, element) {
        super.update(domNode, element);
        const active = this.active();
        const width = this.width();
        this._root
            .style("width", `${width}px`)
            .style("height", `${this.height()}px`)
            ;
        const widgetElements = this._root.selectAll(`#${this.id()}_root > .carouselItem`).data(this.widgets(), d => d.id());
        const update = widgetElements.enter().append("div")
            .attr("class", "carouselItem")
            .each(function (w) {
                w.target(this);
            })
            .merge(widgetElements)
            .style("left", (d, i) => `${(i - this._prevActive) * width}px`)
            .style("width", `${width}px`)
            ;
        if (this._prevActive !== active) {
            update
                .style("display", (d, i) => i === this._prevActive || i === active ? null : "none")  //  Must be called before render callback (not inside transition)
                .transition().duration(this.transitionDuration())
                .style("left", (d, i) => `${(i - active) * width}px`)
                .on("end", function (d, i) {
                    d3Select(this).style("display", () => i === active ? null : "none");
                })
                ;
            this._prevActive = active;
        }
        widgetElements.exit()
            .each(function (w) {
                w.target(null);
            })
            .remove()
            ;
    }

    exit(domNode, element) {
        this.widgets().forEach(w => w.target(null));
        super.exit(domNode, element);
    }

    render(callback): this {
        return super.render(w => {
            if (!this.visible() || this.isDOMHidden()) {
                if (callback) {
                    callback(w);
                }
            } else {
                const aw = this.activeWidget();
                if (aw) {
                    aw
                        .resize(this.size())
                        .render(w2 => {
                            if (callback) {
                                callback(w);
                            }
                        })
                        ;
                }
            }
        });
    }
}
Carousel.prototype._class += " layout_Carousel";

export interface Carousel {
    widgets(): Widget[];
    widgets(_: Widget[]): this;
    active(): number;
    active(_: number): this;
    transitionDuration(): Widget[];
    transitionDuration(_: Widget[]): this;
}

Carousel.prototype.publish("widgets", [], "widgetArray", "Widgets", null, { render: false });
Carousel.prototype.publish("active", 0, "number", "Active widget");
Carousel.prototype.publish("transitionDuration", 500, "number", "Transition duration");
