import { PropertyExt, SVGWidget } from "@hpcc-js/common";
import { event as d3Event, select as d3Select, selectAll as d3SelectAll } from "d3-selection";

import "../src/Opportunity.css";

export class Column extends PropertyExt {
    _owner: Opportunity;

    constructor() {
        super();
    }

    owner(): Opportunity;
    owner(_: Opportunity): this;
    owner(_?: Opportunity): Opportunity | this {
        if (!arguments.length) return this._owner;
        this._owner = _;
        return this;
    }

    valid(): boolean {
        return !!this.headerLabel();
    }
}
Column.prototype._class += " other_Opportunity.Column";

export interface Column {
    headerLabel(): string;
    headerLabel(_: string): this;
}
Column.prototype.publish("headerLabel", null, "string", "Header value of a table", function (this: Column) { return this._owner ? this._owner.columns() : []; }, { tags: ["Basic"], optional: true });

export class MouseHoverColumn extends PropertyExt {
    _owner: Opportunity;

    constructor() {
        super();
    }

    owner(): Opportunity;
    owner(_: Opportunity): this;
    owner(_?: Opportunity): Opportunity | this {
        if (!arguments.length) return this._owner;
        this._owner = _;
        return this;
    }

    valid(): boolean {
        return !!this.hoverValue() && !!this.hoverList();
    }
}
MouseHoverColumn.prototype._class += " other_Opportunity.MouseHoverColumn";

export interface MouseHoverColumn {
    hoverValue(): string;
    hoverValue(_: string): this;
    hoverList(): string;
    hoverList(_: string): this;
}
MouseHoverColumn.prototype.publish("hoverValue", null, "string", "Hover value of a table", function () { return this._owner ? this._owner.columns() : []; }, { tags: ["Basic"], optional: true });
MouseHoverColumn.prototype.publish("hoverList", null, "set", "Hover value of a table", function () { return this._owner ? this._owner.getIds() : []; }, { tags: ["Basic"], optional: true });

export class ColumnDropdown extends PropertyExt {
    _owner: Opportunity;

    constructor() {
        super();
    }

    owner(): Opportunity;
    owner(_: Opportunity): this;
    owner(_?: Opportunity): Opportunity | this {
        if (!arguments.length) return this._owner;
        this._owner = _;
        return this;
    }

    valid(): boolean {
        return !!this.columnIndex() && !!this.ColumnDropdownList();
    }
}
ColumnDropdown.prototype._class += " other_Opportunity.ColumnDropdown";

export interface ColumnDropdown {
    columnIndex(): number;
    columnIndex(_: number): this;
    ColumnDropdownList(): string;
    ColumnDropdownList(_: string): this;
}
ColumnDropdown.prototype.publish("columnIndex", null, "number", "Column index for display context data based on column dropdown list selction", {}, { tags: ["Basic", "Shared"] });
ColumnDropdown.prototype.publish("ColumnDropdownList", null, "set", "column value of a table", function () { return this._owner ? this._owner.getIds() : []; }, { tags: ["Basic"], optional: true });

export class Opportunity extends SVGWidget {
    groupCount;
    svg;
    tooltipdiv;
    Column;
    MouseHoverColumn;
    ColumnDropdown;

    constructor() {
        super();
        this._drawStartPos = "origin";
        this.groupCount = 7;
    }
    enter(domNode, element) {
        SVGWidget.prototype.enter.apply(this, arguments);
        const paddingTop = 30;
        const nodeRectHeight = 14;
        const verticalPadding = 10;
        const h = (this.data().length + 1) * (nodeRectHeight + verticalPadding + 1) + paddingTop;
        this.svg = element.append("g")
            .attr("width", ((this.groupCount * 100) + 1))
            .attr("height", h);
        this.svg.append("defs").append("marker")
            .classed("arrowhead", true)
            .attr("id", "end-arrow")
            .attr("viewBox", "0 -5 10 10")
            .attr("refX", 6)
            .attr("markerWidth", 8)
            .attr("markerHeight", 8)
            .attr("orient", "auto")
            .append("svg:path")
            .attr("d", "M0,-5L10,0L0,5")
            .attr("fill", "rgb(100,100,100)");
        this.tooltipdiv = d3Select("body").append("div")
            .attr("class", "other_Opportunity-tooltip tooltip")
            .style("opacity", 0);
    }
    update(domNode, element) {
        SVGWidget.prototype.update.apply(this, arguments);
        const context = this;
        const data = this.data();
        const dropDownOption = this.opportunityId();
        data.sort(function (a, b) {
            if (a.cur_group > b.cur_group) return 1;
            else if (a.cur_group < b.cur_group) return -1;
            else return 0;
        });
        const groups = [];
        for (let i = 1; i <= context.groupCount; i++) {
            groups.push(i);
        }
        const paddingTop = 30;
        const nodeRectHeight = 14;
        const verticalPadding = 10;
        const h = (data.length + 1) * (nodeRectHeight + verticalPadding + 1) + paddingTop;
        const w = this.width();
        const nodeRectWidthPadding = 30;
        const nodeRectWidth = ((w / context.groupCount) - nodeRectWidthPadding);
        //  Groups  ---
        const group = this.svg.selectAll(".group").data(groups);
        group.enter().append("rect")
            .attr("class", "group");
        group
            .attr("x", function (d, i) {
                return (i * w / context.groupCount) + 1;
            })
            .attr("y", paddingTop)
            .attr("width", w / this.groupCount)
            .attr("height", h - paddingTop);
        group.exit().remove();
        //  Group Headings  ---
        const groupHeadings = this.svg.selectAll(".group_headings").data(groups);
        groupHeadings.enter().append("text")
            .attr("class", "group_headings")
            .attr("y", 20);
        groupHeadings
            .attr("x", function (d, i) {
                return (i * w / context.groupCount) + ((w / context.groupCount) / context.groupCount);
            })
            .text(function (d, i) {
                if (context.headerLabels().length > 0) {
                    if (context.headerLabels()[i] && (context.headerLabels()[i]).headerLabel()) {
                        return (context.headerLabels()[i]).headerLabel();
                    }
                }
                return "";
            });
        groupHeadings.exit().remove();
        if (this.previousGroup() === "prev_group" && this.currentGroup() === "cur_group") {
            //  Node Date Change  ---
            const node_date_change = this.svg.selectAll(".node_date_change").data(data);
            node_date_change.enter().append("g")
                .attr("class", "node_date_change update")
                .on("mouseover", function (d) {
                    context.tooltipdiv.transition()
                        .duration(200)
                        .style("opacity", 0.9);
                    let htmlInput = "<span style='font-weight:bolder'>" + "Close Date Change " + "</span>" + "<br/>";
                    const mouseHoverMapping = context.mouseHover();
                    mouseHoverMapping.forEach(function (obj, index) {
                        if (obj.hoverValue() !== undefined) {
                            htmlInput = htmlInput + "<span style='font-weight:bold'>" + obj.hoverValue() + ":  " + "</span>" + d[obj.hoverList()] + "<br/>";
                        }
                    });
                    let prevDate = d.prevdate + "";
                    prevDate = prevDate.replace(/(\d\d\d\d)(\d\d)(\d\d)/g, "$3-$2-$1");
                    let fromDate = d.curdate + "";
                    fromDate = fromDate.replace(/(\d\d\d\d)(\d\d)(\d\d)/g, "$3-$2-$1");
                    htmlInput = htmlInput + "<span style='font-weight:bold'>" + "From: " + "</span>" + prevDate + "<br/>" + "<span style='font-weight:bold'>" + "To: " + "</span>" + fromDate + "<br/>";
                    context.tooltipdiv.html(htmlInput)
                        .style("left", (d3Event.pageX) + "px")
                        .style("top", (d3Event.pageY - 50) + "px");
                })
                .on("mouseout", function (d) {
                    context.tooltipdiv.transition()
                        .duration(500)
                        .style("opacity", 0);
                })
                .each(function (d) {
                    const element2 = d3Select(this);
                    element2.append("rect")
                        .attr("class", "node_date_change_rect")
                        .attr("width", 5)
                        .attr("height", nodeRectHeight)
                        .attr("rx", 6)
                        .attr("ry", 6);
                });
            node_date_change
                .attr("transform", function (d, i) {
                    return "translate(" + ((9 * w / context.groupCount) + (nodeRectWidthPadding) - 80) + "," + ((i + (i * (nodeRectHeight + verticalPadding))) + 12 + paddingTop) + ")";
                });
            node_date_change.exit().remove();
            //  Node Prev Group  ---
            const node_prev_group = this.svg.selectAll(".node_prev_group").data(data);
            node_prev_group.enter().append("g")
                .attr("class", "node_prev_group")
                .on("mouseover", function (d, i) {
                    context.tooltipdiv.transition()
                        .duration(200)
                        .style("opacity", 0.9);
                    let tooltipHtml = "";
                    const mouseHoverMapping = context.mouseHover();
                    mouseHoverMapping.forEach(function (obj, index) {
                        if (obj.hoverValue() !== undefined) {
                            tooltipHtml = tooltipHtml + "<span style='font-weight:bold'>" + obj.hoverValue() + ":  " + "</span>" + d[obj.hoverList()] + "<br/>";
                        }
                    });
                    context.tooltipdiv.html(tooltipHtml)
                        .style("left", (d3Event.pageX) + "px")
                        .style("top", (d3Event.pageY - 100) + "px");
                })
                .on("mouseout", function (d) {
                    context.tooltipdiv.transition()
                        .duration(500)
                        .style("opacity", 0);
                })
                .each(function (d) {
                    const element2 = d3Select(this);
                    element2.append("rect")
                        .attr("class", "node_prev_rect")
                        .attr("rx", 6)
                        .attr("ry", 6);
                    element2.append("text")
                        .attr("class", "node_prev_text");
                });
            node_prev_group
                .classed("update", true)
                .classed("changed", function (d) {
                    return d.delta !== 0;
                })
                .attr("transform", function (d, i) {
                    return "translate(" + ((((d.prev_group - 1)) * w / context.groupCount) + (nodeRectWidthPadding / 2)) + "," + ((i + (i * (nodeRectHeight + verticalPadding))) + 10 + paddingTop) + ")";
                })
                .each(function (d) {
                    const element2 = d3Select(this);
                    //  Change Lines  ---
                    const changeLines = element2.selectAll(".arrow").data(d.delta !== 0 ? [d] : []);
                    changeLines.enter().append("line")
                        .attr("class", "arrow update");
                    changeLines
                        .attr("x1", function (d2) {
                            return (d2.delta > 0) ? nodeRectWidth : 0;
                        })
                        .attr("y1", nodeRectHeight / 2)
                        .attr("x2", function (d2) {
                            return (d2.delta > 0) ? (nodeRectWidth + nodeRectWidthPadding - 4) + ((Math.abs(d2.delta) - 1)) * (w / context.groupCount) : ((-nodeRectWidthPadding - ((Math.abs(d2.delta) - 1)) * (w / context.groupCount)) + 4);
                        })
                        .attr("y2", nodeRectHeight / 2)
                        .style("stroke-dasharray", ("3, 3"))
                        .style("stroke", "rgb(100,100,100)")
                        .style("marker-end", "url(#end-arrow)")
                        .style("opacity", "1");
                    changeLines.exit().remove();
                });
            const node_previous_rect = node_prev_group.select(".node_prev_rect");
            node_previous_rect
                .attr("width", nodeRectWidth)
                .attr("height", nodeRectHeight);
            const node_previous_text = node_prev_group.select(".node_prev_text");
            node_previous_text
                .attr("dy", (nodeRectHeight / 2) + 3)
                .attr("dx", (nodeRectWidth / 4))
                .text(function (d) {
                    if (typeof d[dropDownOption] === "number")
                        return d[dropDownOption];
                    else
                        return d[dropDownOption].substring(0, 14);
                });
            node_prev_group.exit().remove();
            //  Node Cur Group  ---
            const node_cur_group = this.svg.selectAll(".node_cur_group").data(data);
            node_cur_group.enter().append("g")
                .attr("class", "node_cur_group")
                .attr("transform", function (d, i) {
                    return "translate(" + ((((d.prev_group - 1)) * w / context.groupCount) + (nodeRectWidthPadding / 2)) + "," + ((i + (i * (nodeRectHeight + verticalPadding))) + 10 + paddingTop) + ")";
                })
                .on("mouseover", function (d, i) {
                    context.tooltipdiv.transition()
                        .duration(200)
                        .style("opacity", 0.9);
                    let tooltipHtml = "";
                    const mouseHoverMapping = context.mouseHover();
                    mouseHoverMapping.forEach(function (obj, index) {
                        if (obj.hoverValue() !== undefined) {
                            tooltipHtml = tooltipHtml + "<span style='font-weight:bold'>" + obj.hoverValue() + ":  " + "</span>" + d[obj.hoverList()] + "<br/>";
                        }
                    });
                    context.tooltipdiv.html(tooltipHtml)
                        .style("left", (d3Event.pageX) + "px")
                        .style("top", (d3Event.pageY - 100) + "px");
                })
                .on("mouseout", function (d) {
                    context.tooltipdiv.transition()
                        .duration(500)
                        .style("opacity", 0);
                })
                .each(function (d) {
                    const element2 = d3Select(this);
                    element2.append("rect")
                        .attr("class", "node_cur_rect")
                        .attr("fill", function (d2: any) {
                            let color;
                            if (d2.delta < 0 || d2.cur_group === 7) {
                                color = "#F78181";
                            } else {
                                color = "#A9F5A9";
                            }
                            return color;
                        })
                        .attr("rx", 6)
                        .attr("ry", 6);
                    element2.append("a")
                        .append("text")
                        .attr("class", "node_cur_text");
                });
            node_cur_group
                .classed("update", true)
                .classed("changed", function (d) {
                    return d.delta !== 0;
                })
                .transition().duration(800)
                .ease("linear")
                .attr("transform", function (d, i) {
                    return "translate(" + ((((d.cur_group) - 1) * w / context.groupCount) + (nodeRectWidthPadding / 2)) + "," + ((i + (i * (nodeRectHeight + verticalPadding))) + 10 + paddingTop) + ")";
                })
                .each("end", function () {
                    d3SelectAll(".arrow").style("opacity", "1");
                });
            const node_current_anchor = node_cur_group.select(".node_cur_group a");
            node_current_anchor.classed("update", true)
                .attr("xlink:href", function (d) {
                    return context.url() + d.id;
                })
                .attr("xlink:show", "new");
            const node_current_rect = node_cur_group.select(".node_cur_rect");
            node_current_rect
                .attr("width", nodeRectWidth)
                .attr("height", nodeRectHeight);
            const node_current_text = node_cur_group.select(".node_cur_text");
            node_current_text
                .classed("update", true)
                .attr("dy", (nodeRectHeight / 2) + 3)
                .attr("dx", (nodeRectWidth / 4))
                .style("fill", "blue")
                .text(function (d) {
                    if (typeof d[dropDownOption] === "number")
                        return d[dropDownOption];
                    else
                        return d[dropDownOption].substring(0, 14);
                });
            node_cur_group.exit().remove();
        }
        for (let colIndex = 0; colIndex < context.columnData().length; colIndex++) {
            if ((context.columnData()[colIndex]) && (context.columnData()[colIndex]).ColumnDropdownList()) {
                const columnData = this.svg.selectAll(".columnDataText_" + colIndex).data(data);
                columnData.enter().append("g")
                    .attr("class", "columnDataText_" + colIndex + " update")
                    .each(function (d) {
                        const element2 = d3Select(this);
                        element2.append("text");
                    });
                columnData
                    .attr("transform", function (d, i) {
                        return "translate(" + (((context.columnData()[colIndex]).columnIndex() * w / context.groupCount) + (nodeRectWidthPadding / 2)) + "," + ((i + (i * (nodeRectHeight + verticalPadding))) + 12 + paddingTop) + ")";
                    })
                    .attr("width", 5)
                    .attr("height", nodeRectHeight)
                    .attr("rx", 6)
                    .attr("ry", 6);
                const textLable = columnData.select("text");
                textLable
                    .attr("y", -6)
                    .attr("dy", (nodeRectHeight) + 14)
                    .attr("dx", 0)
                    .attr("height", 20)
                    .attr("width", 29)
                    .text(function (d, i) {
                        return d[(context.columnData()[colIndex]).ColumnDropdownList()];
                    });
                columnData.exit().remove();
            }
        }
    }
    exit(domNode, element) {
        SVGWidget.prototype.exit.apply(this, arguments);
    }

    getIds() {
        const dropdownList = this.columns();
        dropdownList.unshift("default");
        return dropdownList;
    }
    previousGroup: { (): string; (_: string): Opportunity };
    previousGroup_exists: () => boolean;
    currentGroup: { (): string; (_: string): Opportunity };
    currentGroup_exists: () => boolean;
    opportunityId: { (): string; (_: string): Opportunity };
    opportunityId_exists: () => boolean;
    url: { (): string; (_: string): Opportunity };
    url_exists: () => boolean;
    // width: { (): number; (_: number): Opportunity };
    width_exists: () => boolean;
    addColumn: { (): string; (_: string): Opportunity };
    addColumn_exists: () => boolean;
    removeColumn: { (): string; (_: string): Opportunity };
    removeColumn_exists: () => boolean;
    headerLabels: { (): any[]; (_: any[]): Opportunity };
    headerLabels_exists: () => boolean;
    mouseHover: { (): any[]; (_: any[]): Opportunity };
    mouseHover_exists: () => boolean;
    columnData: { (): any[]; (_: any[]): Opportunity };
    columnData_exists: () => boolean;
}
Opportunity.prototype._class += " other_Opportunity";
Opportunity.prototype.Column = Column;
Opportunity.prototype.MouseHoverColumn = MouseHoverColumn;
Opportunity.prototype.ColumnDropdown = ColumnDropdown;

Opportunity.prototype.publish("previousGroup", "", "set", "label in Opportunity", function () { return this.getIds(); }, { tags: ["Basic", "Shared"] });
Opportunity.prototype.publish("currentGroup", "", "set", "label in Opportunity", function () { return this.getIds(); }, { tags: ["Basic", "Shared"] });
Opportunity.prototype.publish("opportunityId", "id", "set", "Id for label in Opportunity", function () { return this.getIds(); }, { tags: ["Basic", "Shared"] });
Opportunity.prototype.publish("url", null, "string", "URL in Opportunity", {}, { tags: ["Basic", "Shared"] });
Opportunity.prototype.publish("width", 1100, "number", "label in Opportunity", {}, { tags: ["Basic", "Shared"] });
Opportunity.prototype.publish("addColumn", null, "string", "number of columns in a table", {}, {
    tags: ["Basic", "Shared"],
    editor_input: (context, widget, cell, param) => {
        cell.append("button")
            .attr("id", context.id() + "_addColumn" + param.id)
            .classed("property-input custom-editor-input addColumn update", true)
            .text("AddColumn")
            .on("click", function () {
                widget.groupCount = widget.groupCount + 1;
                const new_value_after_click = "Added a new column";
                context.setProperty(widget, param.id, new_value_after_click);
            });
    }
});
Opportunity.prototype.publish("removeColumn", null, "string", "number of columns in a table", function () { return this.columns(); }, {
    tags: ["Basic", "Shared"],
    editor_input: (context, widget, cell, param) => {
        cell.append("button")
            .attr("id", context.id() + "_removeColumn" + param.id)
            .classed("property-input custom-editor-input removeColumn update", true)
            .text("RemoveColumn")
            .on("click", function () {
                widget.groupCount = widget.groupCount - 1;
                const new_value_after_click = "Removed a column";
                context.setProperty(widget, param.id, new_value_after_click);
            });
    }
});
Opportunity.prototype.publish("headerLabels", [], "propertyArray", "Source Columns", null, { autoExpand: Column });
Opportunity.prototype.publish("mouseHover", [], "propertyArray", "mouse hover options", null, { autoExpand: MouseHoverColumn });
Opportunity.prototype.publish("columnData", [], "propertyArray", "column data", null, { autoExpand: ColumnDropdown });
