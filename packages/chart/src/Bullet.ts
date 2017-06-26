import { HTMLWidget } from "@hpcc-js/common";
import { Utility } from "@hpcc-js/common";
import { bullet as d3Bullet } from "@hpcc-js/d3-bullet";
import { select as d3Select } from "d3-selection";

import "../src/Bullet.css";

export class Bullet extends HTMLWidget {
    constructor() {
        super();
        Utility.SimpleSelectionMixin.call(this, true);
    }

    bulletData() {
        const columns = this.columns();
        return this.data().map(function (row) {
            return {
                title: valueOf(row, this.titleColumn()),
                subtitle: valueOf(row, this.subtitleColumn()),
                ranges: valueOf(row, this.rangesColumn()),
                measures: valueOf(row, this.measuresColumn()),
                markers: valueOf(row, this.markersColumn()),
                origRow: row
            };
        }, this);

        function valueOf(row, column) {
            const colIdx = columns.indexOf(column);
            if (colIdx >= 0) {
                if (row[colIdx] instanceof Array) {
                    return row[colIdx];
                }
                return [row[colIdx]];
            }
            return [];
        }
    }

    enter(domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        d3Select(domNode.parentNode).style("overflow", "auto");
        this._selection.widgetElement(element);
    }

    update(_domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        const context = this;

        const margin = { left: 2, top: 8, right: 2, bottom: 8 };
        const width = this.width() - margin.left - margin.right;
        const height = 40 - margin.top - margin.bottom;

        const svg = element.selectAll("svg").data(this.bulletData());
        const svgUpdate = svg.enter().append("svg")
            .attr("class", "bullet")
            .call(this._selection.enter.bind(this._selection))
            .on("click", function (d) {
                context.click(context.rowToObj(d.origRow), context.titleColumn(), context._selection.selected(this));
            })
            .on("dblclick", function (d) {
                context.dblclick(context.rowToObj(d.origRow), context.titleColumn(), context._selection.selected(this));
            })
            .each(function () {
                const element2 = d3Select(this);
                const bulletBar = element2.append("g")
                    .attr("class", "bulletBar")
                    ;
                const bulletTitle = bulletBar.append("g")
                    .attr("class", "bulletTitle")
                    ;
                bulletTitle.append("text")
                    .attr("class", "title")
                    ;
                bulletTitle.append("text")
                    .attr("class", "subtitle")
                    .attr("dy", "1em")
                    ;
            })
            .merge(svg)
            ;

        //  Title ---
        const title = svgUpdate.select(".bulletTitle")
            .style("text-anchor", "end")
            .attr("transform", "translate(-6," + height / 2 + ")")
            ;
        title.select(".title")
            .text(function (d) { return d.title; })
            ;
        title.select(".subtitle")
            .text(function (d) { return d.subtitle; })
            ;

        let titleWidth = 0;
        title.each(function () {
            const bbox = this.getBBox();
            console.log(bbox.width);
            if (bbox.width > titleWidth) {
                titleWidth = bbox.width;
            }
        });
        titleWidth; //  Gap between title and bullet bar.

        //  Bullet Chart ---
        const chart = d3Bullet()
            .width(width - titleWidth - 6)
            .height(height)
            ;
        svgUpdate
            .attr("width", width)
            .attr("height", height + margin.top + margin.bottom)
            .style("margin-left", `${margin.left}px`)
            ;
        svgUpdate.select(".bulletBar")
            .attr("transform", "translate(" + (titleWidth + 6) + "," + margin.top + ")")
            .call(chart)
            ;

        svg.exit().remove();
    }

    exit(_domNode, _element) {
        HTMLWidget.prototype.exit.apply(this, arguments);
    }

    titleColumn: (_?: string) => string | Bullet;
    subtitleColumn: (_?: string) => string | Bullet;
    rangesColumn: (_?: string) => string | Bullet;
    measuresColumn: (_?: string) => string | Bullet;
    markersColumn: (_?: string) => string | Bullet;

    //  Events ---
    click(row, column, selected) {
        console.log("Click:  " + JSON.stringify(row) + ", " + column + "," + selected);
    }

    dblclick(row, column, selected) {
        console.log("Double click:  " + JSON.stringify(row) + ", " + column + "," + selected);
    }

    //  SimpleSelectionMixin
    _selection;
}
Bullet.prototype._class += " chart_Bullet";

Bullet.prototype.publish("titleColumn", null, "set", "Title Column", function () { return this.columns(); }, { optional: true });
Bullet.prototype.publish("subtitleColumn", null, "set", "Subtitle Column", function () { return this.columns(); }, { optional: true });
Bullet.prototype.publish("rangesColumn", null, "set", "Ranges Column", function () { return this.columns(); }, { optional: true });
Bullet.prototype.publish("measuresColumn", null, "set", "Measures Column", function () { return this.columns(); }, { optional: true });
Bullet.prototype.publish("markersColumn", null, "set", "Markers Column", function () { return this.columns(); }, { optional: true });
