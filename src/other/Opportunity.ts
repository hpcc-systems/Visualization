import * as d3 from 'd3';
import { SVGWidget } from "../common/SVGWidget";
import { PropertyExt } from "../common/PropertyExt";
import "./Opportunity";

function Column(owner) {
    PropertyExt.call(this);
    this._owner = owner;
}
Column.prototype = Object.create(PropertyExt.prototype);
Column.prototype.constructor = Column;
Column.prototype._class += " graph_Opportunity.Column";
Column.prototype.publish("headerLabel", null, "string", "Header value of a table", function () { return this._owner ? this._owner.columns() : []; }, { tags: ["Basic"], optional: true });
function MouseHoverColumn(owner) {
    PropertyExt.call(this);
    this._owner = owner;
}
MouseHoverColumn.prototype = Object.create(PropertyExt.prototype);
MouseHoverColumn.prototype.constructor = MouseHoverColumn;
MouseHoverColumn.prototype._class += " graph_Opportunity.MouseHoverColumn";
MouseHoverColumn.prototype.publish("hoverValue", null, "string", "Hover value of a table", function () { return this._owner ? this._owner.columns() : []; }, { tags: ["Basic"], optional: true });
MouseHoverColumn.prototype.publish("hoverList", null, "set", "Hover value of a table", function () { return this._owner ? this._owner.getIds() : []; }, { tags: ["Basic"], optional: true });
function ColumnDropdown(owner) {
    PropertyExt.call(this);
    this._owner = owner;
}
ColumnDropdown.prototype = Object.create(PropertyExt.prototype);
ColumnDropdown.prototype.constructor = ColumnDropdown;
ColumnDropdown.prototype._class += " graph_Opportunity.ColumnDropdown";
ColumnDropdown.prototype.publish("columnIndex", null, "number", "Column index for display context data based on column dropdown list selction", {}, { tags: ["Basic", "Shared"], });
ColumnDropdown.prototype.publish("ColumnDropdownList", null, "set", "column value of a table", function () { return this._owner ? this._owner.getIds() : []; }, { tags: ["Basic"], optional: true, });
export function Opportunity(target) {
    SVGWidget.call(this);
    this._drawStartPos = "origin";
    this.groupCount = 7;
}

Opportunity.prototype = Object.create(SVGWidget.prototype);
Opportunity.prototype.constructor = Opportunity;
Opportunity.prototype.Column = Column;
Opportunity.prototype.MouseHoverColumn = MouseHoverColumn;
Opportunity.prototype.ColumnDropdown = ColumnDropdown;
Opportunity.prototype._class += " graph_Opportunity";
Opportunity.prototype.publish("previousGroup", "", "set", "label in Opportunity", function () { return this.getIds(); }, { tags: ["Basic", "Shared"] });
Opportunity.prototype.publish("currentGroup", "", "set", "label in Opportunity", function () { return this.getIds(); }, { tags: ["Basic", "Shared"] });
Opportunity.prototype.publish("opportunityId", "id", "set", "Id for label in Opportunity", function () { return this.getIds(); }, { tags: ["Basic", "Shared"] });
Opportunity.prototype.publish("url", null, "string", "URL in Opportunity", {}, { tags: ["Basic", "Shared"] });
Opportunity.prototype.publish("width", 1100, "number", "label in Opportunity", {}, { tags: ["Basic", "Shared"] });
Opportunity.prototype.publish("addColumn", null, "string", "number of columns in a table", {}, {
    tags: ["Basic", "Shared"],
    editor_input: function (context, widget, cell, param) {
        cell.append("button")
            .attr("id", context.id() + "_addColumn" + param.id)
            .classed("property-input custom-editor-input addColumn update", true)
            .text("AddColumn")
            .on("click", function () {
                widget.groupCount = widget.groupCount + 1;
                var new_value_after_click = "Added a new column";
                context.setProperty(widget, param.id, new_value_after_click);
            });
    }
});
Opportunity.prototype.publish("removeColumn", null, "string", "number of columns in a table", function () { return this.columns(); }, {
    tags: ["Basic", "Shared"],
    editor_input: function (context, widget, cell, param) {
        cell.append("button")
            .attr("id", context.id() + "_removeColumn" + param.id)
            .classed("property-input custom-editor-input removeColumn update", true)
            .text("RemoveColumn")
            .on("click", function () {
                widget.groupCount = widget.groupCount - 1;
                var new_value_after_click = "Removed a column";
                context.setProperty(widget, param.id, new_value_after_click);
            });
    }
});
Opportunity.prototype.publish("headerLabels", [], "propertyArray", "Source Columns", null, { autoExpand: Column });
Opportunity.prototype.publish("mouseHover", [], "propertyArray", "mouse hover options", null, { autoExpand: MouseHoverColumn });
Opportunity.prototype.publish("columnData", [], "propertyArray", "column data", null, { autoExpand: ColumnDropdown });
Opportunity.prototype.getIds = function () {
    var dropdownList = this.columns();
    dropdownList.unshift("default");
    return dropdownList;
};
Opportunity.prototype.enter = function (domNode, element) {
    SVGWidget.prototype.enter.apply(this, arguments);
    var paddingTop = 30;
    var nodeRectHeight = 14;
    var verticalPadding = 10;
    var h = (this.data().length + 1) * (nodeRectHeight + verticalPadding + 1) + paddingTop;
    this.svg = element.append("g")
        .attr("width", ((this.groupCount * 100) + 1))
        .attr("height", h);
    this.svg.append('defs').append('marker')
        .classed("arrowhead", true)
        .attr('id', 'end-arrow')
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 6)
        .attr('markerWidth', 8)
        .attr('markerHeight', 8)
        .attr('orient', 'auto')
        .append('svg:path')
        .attr('d', 'M0,-5L10,0L0,5')
        .attr('fill', 'rgb(100,100,100)');
    this.tooltipdiv = d3.select("body").append("div")
        .attr("class", "graph_Opportunity-tooltip tooltip")
        .style("opacity", 0);
};
Opportunity.prototype.update = function (domNode, element) {
    SVGWidget.prototype.update.apply(this, arguments);
    var context = this;
    var data = this.data();
    var dropDownOption = this.opportunityId();
    data.sort(function (a, b) {
        if (a.cur_group > b.cur_group) return 1;
        else if (a.cur_group < b.cur_group) return -1;
        else return 0;
    });
    var groups = [];
    for (var i = 1; i <= context.groupCount; i++) {
        groups.push(i);
    }
    var paddingTop = 30;
    var nodeRectHeight = 14;
    var verticalPadding = 10;
    var h = (data.length + 1) * (nodeRectHeight + verticalPadding + 1) + paddingTop;
    var w = this.width();
    var nodeRectWidthPadding = 30;
    var nodeRectWidth = ((w / context.groupCount) - nodeRectWidthPadding);
    //  Groups  ---
    var group = this.svg.selectAll(".group").data(groups);
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
    var groupHeadings = this.svg.selectAll(".group_headings").data(groups);
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
        var node_date_change = this.svg.selectAll(".node_date_change").data(data);
        node_date_change.enter().append("g")
            .attr("class", "node_date_change update")
            .on("mouseover", function (d) {
                context.tooltipdiv.transition()
                    .duration(200)
                    .style("opacity", 0.9);
                var htmlInput = "<span style='font-weight:bolder'>" + "Close Date Change " + "</span>" + "<br/>";
                var mouseHoverMapping = context.mouseHover();
                mouseHoverMapping.forEach(function (obj, index) {
                    if (obj.hoverValue() !== undefined) {
                        htmlInput = htmlInput + "<span style='font-weight:bold'>" + obj.hoverValue() + ":  " + "</span>" + d[obj.hoverList()] + "<br/>";
                    }
                });
                var prevDate = d.prevdate + "";
                prevDate = prevDate.replace(/(\d\d\d\d)(\d\d)(\d\d)/g, '$3-$2-$1');
                var fromDate = d.curdate + "";
                fromDate = fromDate.replace(/(\d\d\d\d)(\d\d)(\d\d)/g, '$3-$2-$1');
                htmlInput = htmlInput + "<span style='font-weight:bold'>" + "From: " + "</span>" + prevDate + "<br/>" + "<span style='font-weight:bold'>" + "To: " + "</span>" + fromDate + "<br/>";
                context.tooltipdiv.html(htmlInput)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 50) + "px");
            })
            .on("mouseout", function (d) {
                context.tooltipdiv.transition()
                    .duration(500)
                    .style("opacity", 0);
            })
            .each(function (d) {
                var element = d3.select(this);
                element.append("rect")
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
        var node_prev_group = this.svg.selectAll(".node_prev_group").data(data);
        node_prev_group.enter().append("g")
            .attr("class", "node_prev_group")
            .on("mouseover", function (d, i) {
                context.tooltipdiv.transition()
                    .duration(200)
                    .style("opacity", 0.9);
                var tooltipHtml = "";
                var mouseHoverMapping = context.mouseHover();
                mouseHoverMapping.forEach(function (obj, index) {
                    if (obj.hoverValue() !== undefined) {
                        tooltipHtml = tooltipHtml + "<span style='font-weight:bold'>" + obj.hoverValue() + ":  " + "</span>" + d[obj.hoverList()] + "<br/>";
                    }
                });
                context.tooltipdiv.html(tooltipHtml)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 100) + "px");
            })
            .on("mouseout", function (d) {
                context.tooltipdiv.transition()
                    .duration(500)
                    .style("opacity", 0);
            })
            .each(function (d) {
                var element = d3.select(this);
                element.append("rect")
                    .attr("class", "node_prev_rect")
                    .attr("rx", 6)
                    .attr("ry", 6);
                element.append("text")
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
                var element = d3.select(this);
                //  Change Lines  --- 
                var changeLines = element.selectAll('.arrow').data(d.delta !== 0 ? [d] : []);
                changeLines.enter().append("line")
                    .attr("class", "arrow update");
                changeLines
                    .attr("x1", function (d) {
                        return (d.delta > 0) ? nodeRectWidth : 0;
                    })
                    .attr("y1", nodeRectHeight / 2)
                    .attr("x2", function (d) {
                        return (d.delta > 0) ? (nodeRectWidth + nodeRectWidthPadding - 4) + ((Math.abs(d.delta) - 1)) * (w / context.groupCount) : ((-nodeRectWidthPadding - ((Math.abs(d.delta) - 1)) * (w / context.groupCount)) + 4);
                    })
                    .attr("y2", nodeRectHeight / 2)
                    .style("stroke-dasharray", ("3, 3"))
                    .style("stroke", "rgb(100,100,100)")
                    .style("marker-end", "url(#end-arrow)")
                    .style("opacity", "1");
                changeLines.exit().remove();
            });
        var node_previous_rect = node_prev_group.select(".node_prev_rect");
        node_previous_rect
            .attr("width", nodeRectWidth)
            .attr("height", nodeRectHeight);
        var node_previous_text = node_prev_group.select(".node_prev_text");
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
        var node_cur_group = this.svg.selectAll(".node_cur_group").data(data);
        node_cur_group.enter().append("g")
            .attr("class", "node_cur_group")
            .attr("transform", function (d, i) {
                return "translate(" + ((((d.prev_group - 1)) * w / context.groupCount) + (nodeRectWidthPadding / 2)) + "," + ((i + (i * (nodeRectHeight + verticalPadding))) + 10 + paddingTop) + ")";
            })
            .on("mouseover", function (d, i) {
                context.tooltipdiv.transition()
                    .duration(200)
                    .style("opacity", 0.9);
                var tooltipHtml = "";
                var mouseHoverMapping = context.mouseHover();
                mouseHoverMapping.forEach(function (obj, index) {
                    if (obj.hoverValue() !== undefined) {
                        tooltipHtml = tooltipHtml + "<span style='font-weight:bold'>" + obj.hoverValue() + ":  " + "</span>" + d[obj.hoverList()] + "<br/>";
                    }
                });
                context.tooltipdiv.html(tooltipHtml)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 100) + "px");
            })
            .on("mouseout", function (d) {
                context.tooltipdiv.transition()
                    .duration(500)
                    .style("opacity", 0);
            })
            .each(function (d) {
                var element = d3.select(this);
                element.append("rect")
                    .attr("class", "node_cur_rect")
                    .attr("fill", function (d) {
                        var color;
                        if (d.delta < 0 || d.cur_group === 7) {
                            color = "#F78181";
                        } else {
                            color = "#A9F5A9";
                        }
                        return color;
                    })
                    .attr("rx", 6)
                    .attr("ry", 6);
                element.append("a")
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
                d3.selectAll(".arrow").style("opacity", "1");
            });
        var node_current_anchor = node_cur_group.select(".node_cur_group a");
        node_current_anchor.classed("update", true)
            .attr("xlink:href", function (d) {
                return context.url() + d.id;
            })
            .attr("xlink:show", "new");
        var node_current_rect = node_cur_group.select(".node_cur_rect");
        node_current_rect
            .attr("width", nodeRectWidth)
            .attr("height", nodeRectHeight);
        var node_current_text = node_cur_group.select(".node_cur_text");
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
    for (var colIndex = 0; colIndex < context.columnData().length; colIndex++) {
        if ((context.columnData()[colIndex]) && (context.columnData()[colIndex]).ColumnDropdownList()) {
            var columnData = this.svg.selectAll(".columnDataText_" + colIndex).data(data);
            columnData.enter().append("g")
                .attr("class", "columnDataText_" + colIndex + " update")
                .each(function (d) {
                    var element = d3.select(this);
                    element.append("text");
                });
            columnData
                .attr("transform", function (d, i) {
                    return "translate(" + (((context.columnData()[colIndex]).columnIndex() * w / context.groupCount) + (nodeRectWidthPadding / 2)) + "," + ((i + (i * (nodeRectHeight + verticalPadding))) + 12 + paddingTop) + ")";
                })
                .attr("width", 5)
                .attr("height", nodeRectHeight)
                .attr("rx", 6)
                .attr("ry", 6);
            var textLable = columnData.select("text");
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
};
Opportunity.prototype.exit = function (domNode, element) {
    SVGWidget.prototype.exit.apply(this, arguments);
};
