"use strict";
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/SVGWidget", "../common/Utility", "../common/PropertyExt", "css!./Opportunity"], factory);
    } else {
        root.graph_Opportunity = factory(root.d3, root.common_SVGWidget, root.common_Utility, root.common_PropertyExt);
    }
}(this, function(d3, SVGWidget, Utility, PropertyExt) {
    function Column(owner) {
        PropertyExt.call(this);
        this._owner = owner;
    }
    Column.prototype = Object.create(PropertyExt.prototype);
    Column.prototype.constructor = Column;
    Column.prototype._class += " graph_Opportunity.Column";
    Column.prototype.publish("headerLabel", null, "string", "Header value of a table", function() { return this._owner ? this._owner.columns() : [];}, { tags: ["Basic"], optional: true });
    function mouseHoverColumn(owner) {
        PropertyExt.call(this);
        this._owner = owner;
    }
    mouseHoverColumn.prototype = Object.create(PropertyExt.prototype);
    mouseHoverColumn.prototype.constructor = mouseHoverColumn;
    mouseHoverColumn.prototype._class += " graph_Opportunity.mouseHoverColumn";
    mouseHoverColumn.prototype.publish("hoverValue", null, "string", "Hover value of a table", function() { return this._owner ? this._owner.columns() : []; }, { tags: ["Basic"], optional: true });
    mouseHoverColumn.prototype.publish("hoverList", null, "set", "Hover value of a table", function() { return this._owner ? this._owner.getIds() : []; }, { tags: ["Basic"], optional: true });
    function columnDropdown(owner) {
        PropertyExt.call(this);
        this._owner = owner;
    }
    columnDropdown.prototype = Object.create(PropertyExt.prototype);
    columnDropdown.prototype.constructor = columnDropdown;
    columnDropdown.prototype._class += " graph_Opportunity.columnDropdown";
    columnDropdown.prototype.publish("columnIndex", null, "number", "Column index for display context data based on column dropdown list selction",{}, {tags: ["Basic", "Shared"], });
    columnDropdown.prototype.publish("columnDropdownList", null, "set", "column value of a table",function() { return this._owner ? this._owner.getIds() : []; },{tags: ["Basic"], optional: true,});

    function Opportunity(target) {
        SVGWidget.call(this);
        this.groupCount = 7;
    }
    Opportunity.prototype = Object.create(SVGWidget.prototype);
    Opportunity.prototype.constructor = Opportunity;
    Opportunity.prototype.Column = Column;
    Opportunity.prototype.mouseHoverColumn = mouseHoverColumn;
    Opportunity.prototype.columnDropdown = columnDropdown;
    Opportunity.prototype._class += " graph_Opportunity";
    Opportunity.prototype.publish("opportunityId", "id", "set", "Id for label in Opportunity", function() { return this.getIds(); }, { tags: ["Basic", "Shared"]});
    Opportunity.prototype.publish("previousGroup", "", "set", "label in Opportunity", function() { return this.getIds(); }, { tags: ["Basic", "Shared"]});
    Opportunity.prototype.publish("currentGroup", "", "set", "label in Opportunity", function() { return this.getIds(); }, { tags: ["Basic", "Shared"]});
    Opportunity.prototype.publish("width", 1100, "number", "label in Opportunity", {}, { tags: ["Basic", "Shared"]});
    Opportunity.prototype.publish("addColumn", null, "string", "number of columns in a table", {}, { tags: ["Basic", "Shared"],
        editor_input: function(context, widget, cell, param) {
            cell.append("button")
                .attr("id", context.id() + "_addColumn" + param.id)
                .classed("property-input custom-editor-input addColumn", true)
                .attr("class", "update")
                .text("AddColumn")
                .on("click", function() {
                    widget.groupCount = widget.groupCount + 1;
                    var new_value_after_click = "Added a new column";
                    context.setProperty(widget, param.id, new_value_after_click);
                });
        }
    });
    Opportunity.prototype.publish("removeColumn", null, "string", "number of columns in a table", function() { return this.columns(); }, { tags: ["Basic", "Shared"],
        editor_input: function(context, widget, cell, param) {
            cell.append("button")
                .attr("id", context.id() + "_removeColumn" + param.id)
                .classed("property-input custom-editor-input removeColumn", true)
                .text("RemoveColumn")
                .on("click", function() {
                    widget.groupCount = widget.groupCount - 1;
                    var new_value_after_click = "Removed a column";
                    context.setProperty(widget, param.id, new_value_after_click);
                });
        }
    });
    Opportunity.prototype.publish("headerLabels", [], "propertyArray", "Source Columns", null, { autoExpand: Column });
    Opportunity.prototype.publish("mouseHover", [], "propertyArray", "mouse hover options", null, { autoExpand: mouseHoverColumn });
    Opportunity.prototype.publish("columnData", [], "propertyArray", "column data", null, { autoExpand: columnDropdown });

    Opportunity.prototype.enter = function(domNode, element) {
        SVGWidget.prototype.enter.apply(this, arguments);
        var paddingTop = 30;
        var nodeRectHeight = 14;
        var verticalPadding = 10;
        var h = (this.data().length + 1) * (nodeRectHeight + verticalPadding + 1) + paddingTop;
        this.svg = element.append("g")
            .attr("width", ((this.groupCount * 100) + 1))
            .attr("height", h);
    };
    Opportunity.prototype.getIds = function() {
        var dropdownList = this.columns();
        dropdownList.unshift("default");
        return dropdownList;
    };
    Opportunity.prototype.update = function(domNode, element) {
        SVGWidget.prototype.update.apply(this, arguments);
        var context = this;
        var data = this.data();
        var dropDownOption = this.opportunityId();
        var mouseHoverMapping = this.mouseHover();
        data.sort(function(a, b) {
            if (a.cur_group > b.cur_group) return 1;
            else if (a.cur_group < b.cur_group) return -1;
            else return 0;
        });
        var groups = [];
        for (var i = 1; i <= context.groupCount; i++) {
            groups.push(i);
        }
        var div = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);
        var div2 = d3.select("body").append("div2")
            .attr("class", "tooltip")
            .style("opacity", 0);
        var paddingTop = 30;
        var nodeRectHeight = 14;
        var verticalPadding = 10;
        var h = (data.length + 1) * (nodeRectHeight + verticalPadding + 1) + paddingTop;
        var w = this.width();
        var nodeRectWidthPadding = 30;
        var nodeRectWidth = ((w / context.groupCount) - nodeRectWidthPadding);
        var group = this.svg.selectAll(".group").data(groups);
        group.enter().append("rect")
            .classed("group", true);
        group.attr("width", function(d, i) {
             return w / context.groupCount;
        })
            .attr("height", h - paddingTop)
            .attr("x", function(d, i) {
                return (i * w / context.groupCount) + 1;
            })
            .attr("y", paddingTop);
        group.exit().remove();
        this.svg.selectAll("g.update").remove();
        var groupHeadings = this.svg.selectAll(".group_headings")
            .data(groups);
        groupHeadings.enter()
            .append("text")
            .attr("class", "group_headings update")
            .attr("x", function(d, i) {
                return (i * w / context.groupCount) + ((w / context.groupCount) / context.groupCount);
            })
            .attr("y", 20);
        groupHeadings.text(function(d, i) {
            if (context.headerLabels().length > 0) {
                if (context.headerLabels()[i] && (context.headerLabels()[i]).headerLabel()) {
                    return (context.headerLabels()[i]).headerLabel();
                }
            }
        });
        groupHeadings.exit().remove();
        
        if (this.previousGroup() === "prev_group" && this.currentGroup() === "cur_group") {
            var node_date_change = this.svg.selectAll(".node_date_change")
                .data(data)
                .enter()
                .append("g")
                .attr("class", "update")
                .attr("transform", function(d, i) {
                    return "translate(" + ((9 * w / context.groupCount) + (nodeRectWidthPadding) - 80) + "," + ((i + (i * (nodeRectHeight + verticalPadding))) + 12 + paddingTop) + ")";
                })
                .on("mouseover", function(d) {
                    div2.transition()
                        .duration(200)
                        .style("opacity", 0.9);
                    var htmlInput = "<span style='font-weight:bolder'>" + "Close Date Change " + "</span>" + "<br/>";
                    mouseHoverMapping.forEach(function(obj, index) {
                        if (obj.hoverValue() !== undefined) {
                            htmlInput = htmlInput + "<span style='font-weight:bold'>" + obj.hoverValue() + ":  " + "</span>" + d[obj.hoverList()] + "<br/>";
                        }
                    });
                    var prevDate = d.prevdate + "";
                    prevDate = prevDate.replace(/(\d\d\d\d)(\d\d)(\d\d)/g, '$3-$2-$1');
                    var fromDate = d.curdate + "";
                    fromDate = fromDate.replace(/(\d\d\d\d)(\d\d)(\d\d)/g, '$3-$2-$1');
                    htmlInput = htmlInput + "<span style='font-weight:bold'>" + "From: " + "</span>" + prevDate + "<br/>" + "<span style='font-weight:bold'>" + "To: " + "</span>" + fromDate + "<br/>";
                    div2.html(htmlInput)
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY - 50) + "px");
                })
                .on("mouseout", function(d) {
                    div2.transition()
                        .duration(500)
                        .style("opacity", 0);
                });
            node_date_change.append("rect")
                .classed("node_date_change", true)
                .attr("width", 5)
                .attr("height", nodeRectHeight)
                .attr("rx", 6)
                .attr("ry", 6);
            var node_prev_group = this.svg.selectAll(".node_prev_group")
                .data(data);
            node_prev_group.attr("class", "update");
            node_prev_group.enter()
                .append("g")
                .attr("class", function(d) {
                    if (d.delta !== 0) {
                        return "node_prev_group changed";
                    } else {
                        return "node_prev_group";
                    }
                })
                .attr("transform", function(d, i) {
                    return "translate(" + ((((d.prev_group - 1)) * w / context.groupCount) + (nodeRectWidthPadding / 2)) + "," + ((i + (i * (nodeRectHeight + verticalPadding))) + 10 + paddingTop) + ")";
                });
            node_prev_group.append("rect")
                .classed("node_prev_rect", true)
                .attr("width", nodeRectWidth)
                .attr("height", nodeRectHeight)
                .attr("rx", 6)
                .attr("ry", 6);
            var node_previous_text = node_prev_group.append("text");
            node_previous_text.attr("class", "update");
            node_previous_text.classed("node_prev_text", true)
                .attr("dy", (nodeRectHeight / 2) + 3)
                .attr("dx", (nodeRectWidth / 4));
            node_previous_text.text(function(d) {
                if (typeof d[dropDownOption] === "number")
                    return d[dropDownOption];
                else
                    return d[dropDownOption].substring(0, 14);
            });
            node_prev_group.exit().remove();

            var node_cur_group = this.svg.selectAll(".node_cur_group")
                .data(data)
                .enter()
                .append("g")
                .attr("class", "update")
                .attr("class", "node_cur_group")
                .attr("transform", function(d, i) {
                    return "translate(" + ((((d.prev_group - 1)) * w / context.groupCount) + (nodeRectWidthPadding / 2)) + "," + ((i + (i * (nodeRectHeight + verticalPadding))) + 10 + paddingTop) + ")";
                })
                .on("mouseover", function(d) {
                    div.transition()
                        .duration(200)
                        .style("opacity", 0.9);
                    var tooltipHtml = "";
                    mouseHoverMapping.forEach(function(obj, index) {
                        if (obj.hoverValue() !== undefined) {
                            tooltipHtml = tooltipHtml + "<span style='font-weight:bold'>" + obj.hoverValue() + ":  " + "</span>" + d[obj.hoverList()] + "<br/>";
                        }
                    });
                    div.html(tooltipHtml)
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY - 100) + "px");
                })
                .on("mouseout", function(d) {
                    div.transition()
                        .duration(500)
                        .style("opacity", 0);
                });
            node_cur_group.append("rect")
                .classed("node_cur_rect", true)
                .attr("width", nodeRectWidth)
                .attr("height", nodeRectHeight)
                .attr("fill", function(d) {
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
            node_cur_group.append("a")
                .attr("xlink:href", function(d) {
                    return "https://mycrm.rs.lexisnexis.net/callcenter_enu/start.swe?SWECmd=GotoView&SWEView=All+Opportunity+List+View&SWERF=1&SWEHo=mycrm.rs.lexisnexis.net&SWEBU=1&SWEApplet0=LNRS+Opportunity+List+Applet&SWERowId0=" + d.id;
                })
                .attr("xlink:show", "new");
            node_cur_group.attr("class", "update");
            var node_current_text = node_cur_group.append("text");
            node_current_text.attr("class", "update");
            node_current_text.classed("node_cur_text", true)
                .attr("dy", (nodeRectHeight / 2) + 3)
                .attr("dx", (nodeRectWidth / 4))
                .style("fill", "blue");
            node_current_text.text(function(d) {
                if (typeof d[dropDownOption] === "number")
                    return d[dropDownOption];
                else
                    return d[dropDownOption].substring(0, 14);
            });
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

            var changeLines = d3.selectAll('.changed').append("svg:line");
            changeLines.attr("class", "update");
            changeLines.classed("arrow", true);
            changeLines.attr("x1", function(d) {
                return (d.delta > 0) ? nodeRectWidth : 0;
            });
            changeLines.attr("y1", nodeRectHeight / 2);
            changeLines.attr("x2", function(d) {
                return (d.delta > 0) ? (nodeRectWidth + nodeRectWidthPadding - 4) + ((Math.abs(d.delta) - 1)) * (w / context.groupCount) : ((-nodeRectWidthPadding - ((Math.abs(d.delta) - 1)) * (w / context.groupCount)) + 4);
            })
                .attr("y2", nodeRectHeight / 2)
                .style("stroke-dasharray", ("3, 3"))
                .style("stroke", "rgb(100,100,100)")
                .style("marker-end", "url(#end-arrow)")
                .attr("opacity", "1");
            node_cur_group.transition()
                .duration(800)
                .ease("linear")
                .attr("transform", function(d, i) {
                    return "translate(" + ((((d.cur_group) - 1) * w / context.groupCount) + (nodeRectWidthPadding / 2)) + "," + ((i + (i * (nodeRectHeight + verticalPadding))) + 10 + paddingTop) + ")";
                })
                .each("end", function() {
                    d3.selectAll(".arrow").attr("opacity", "1");
                });

            for (var colIndex = 0; colIndex < context.columnData().length; colIndex++) {
                if ((context.columnData()[colIndex]) && (context.columnData()[colIndex]).columnDropdownList()) {
                    var columnData = this.svg.selectAll(".columnDataText_"+colIndex)
                        .data(data)
                        .enter()
                        .append("g");

                    columnData.attr("transform", function(d, i) {
                        return "translate(" + (((context.columnData()[colIndex]).columnIndex() * w / context.groupCount) + (nodeRectWidthPadding / 2)) + "," + ((i + (i * (nodeRectHeight + verticalPadding))) + 12 + paddingTop) + ")";
                    });

                    columnData.classed("columnDataText_"+colIndex+" update", true)
                        .attr("width", 5)
                        .attr("height", nodeRectHeight)
                        .attr("rx", 6)
                        .attr("ry", 6);

                    var textLable = columnData.append("text");
                    textLable.classed("columnDatatextLable_"+colIndex+" update", true);
                    textLable.attr("y", -6)
                        .attr("dy", (nodeRectHeight) + 14)
                        .attr("dx", 0)
                        .attr("height", 20)
                        .attr("width", 29);
                    textLable.text(function(d , i) {
                        return d[(context.columnData()[colIndex]).columnDropdownList()];
                    });
                }
            }
        }
    };
    Opportunity.prototype.exit = function(domNode, element) {
        SVGWidget.prototype.exit.apply(this, arguments);
    };
    return Opportunity;
}));
