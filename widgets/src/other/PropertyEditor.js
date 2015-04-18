"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["../common/Widget", "../common/HTMLWidget", "./Persist"], factory);
    } else {
        root.other_PropertyEditor = factory(root.Common_Widget, root.common_HTMLWidget, root.other_Persist);
    }
}(this, function (Widget, HTMLWidget, Persist) {
    function PropertyEditor() {
        HTMLWidget.call(this);
        this._class = "other_PropertyEditor";

        this._tag = "div";

        this._columns = ["Key", "Value"];//, ""];
        this._contentEditors = [];
    };
    PropertyEditor.prototype = Object.create(HTMLWidget.prototype);

    PropertyEditor.prototype.publish("show_columns", false, "boolean", "Show Columns");
    PropertyEditor.prototype.publish("show_data", false, "boolean", "Show Data");

    var formatJSRequire = function (widget, fieldName, properties, renderCallback, postCreate) {
        if (!widget) {
            return "";
        }
        var classParts = widget._class.split("_");
        var path = "src/" + classParts.join("/");
        var label = classParts[classParts.length - 1];
        var propertiesString = properties.split("\n").map(function (item) {
            return item.length ? "        " + item : "";
        }).join("\n");
        propertiesString += propertiesString.length ? "\n" : "";

        postCreate += postCreate.length ? "\n" : "";
        return "require([\"" + path + "\"], function(" + label + ") {\n" +
        "    var " + fieldName + " = new " + label + "()\n" +
        "        .target(\"divID\")\n" +
        propertiesString +
        "        .render(" + renderCallback.split("\n").join("\n        ") +")\n" +
        "    ;\n" +
        postCreate +
        "});"
    };

    var formatJSCallback = function (innerProp, properties, renderCallback) {
        var propertiesString = properties.split("\n").map(function (item) {
            return item.length ? "        " + item : "";
        }).join("\n");
        propertiesString += propertiesString.length ? "\n" : "";
        return "function(widget) {\n" +
        "    widget." + innerProp + "\n" +
        propertiesString +
        "        .render(" + renderCallback + ")\n" +
        "    ;\n" +
        "}"
    };

    var formatJSProperties = function (widget, includeColumns, includeData) {
        if (!widget) {
            return "";
        }
        var propsStr = Persist.discover(widget).map(function (prop) {
            if (!widget[prop.id + "_modified"]()) {
                return "";
            }
            return "." + prop.id + "(" + JSON.stringify(widget[prop.id]()) + ")"
        }).filter(function (str) {
            return str !== "";
        }).join("\n");
        if (includeColumns) {
            var columns = widget.columns();
            if (columns instanceof Array) {
                if (columns.length) {
                    propsStr += (propsStr.length ? "\n" : "")
                    propsStr += ".columns(" + JSON.stringify(columns) + ")"
                }
            } else if (columns) {
                propsStr += (propsStr.length ? "\n" : "")
                propsStr += ".columns(" + JSON.stringify(columns) + ")"
            }
        }
        if (includeData) {
            var data = widget.data();
            if (data instanceof Array) {
                if (data.length) {
                    propsStr += (propsStr.length ? "\n" : "")
                    propsStr += ".data(" + JSON.stringify(data) + ")"
                }
            } else if (data) {
                propsStr += (propsStr.length ? "\n" : "")
                try {
                    propsStr += ".data(" + JSON.stringify(data) + ")"
                } catch (e) {
                    propsStr += ".data(" + e + ")"
                }
            }
        }
        return propsStr;
    };

    PropertyEditor.prototype.getJavaScript = function (fieldName, includeColumns, includeData, postCreate) {
        postCreate = postCreate || "";
        var callbackJS = "";
        /*if (this._data._class === "chart_MultiChart" && this._data._chart) {
            callbackJS = formatJSCallback("_chart", formatJSProperties(this._data._chart, includeColumns, includeData), "");
        } else*/ if (this._data._content) {
            callbackJS = formatJSCallback("_content", formatJSProperties(this._data._content, includeColumns, includeData), "");
        }
        return formatJSRequire(this._data, fieldName, formatJSProperties(this._data, includeColumns, includeData), callbackJS, postCreate);
    };

    PropertyEditor.prototype.getPersistString = function (fieldName) {
        return "var " + fieldName + " = " + JSON.stringify(Persist.serializeToObject(this._data, null, false), null, "  ") + ";"
    };

    PropertyEditor.prototype.onChange = function (widget, propID) {
    };

    PropertyEditor.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        this._parentElement.style("overflow", "auto");
    };

    PropertyEditor.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        var context = this;

        var table = element.selectAll("#" + this._id + " > table").data(this._data, function (d) { return d._id; });
        table.enter().append("table")
            .each(function (widget) {
                //console.log("PE: <table>: Enter: table: " + context._id + " widget:  " + widget._id);
                var element = d3.select(this);
                var thead = element.append("thead").append("tr");
                var tbody = element.append("tbody");
                var th = thead.selectAll("th").data(context._columns, function (d) { return d; });
                th
                    .enter()
                    .append("th")
                        .text(function (column) {
                            return column;
                        })
                ;
                th.exit()
                    .remove()
                ;
            })
        ;
        table.select("tbody")
            .each(function (widget) {
                var tbody = d3.select(this);
                var rows = tbody.selectAll(".tr_" + widget._id).data(Persist.discover(widget), function (d) { return widget._id + "_" + d.id + "_" + d.type });
                var row = rows
                    .enter()
                    .append("tr")
                    .attr("class", "tr_" + widget._id)
                    .each(function (d) {
                        //console.log("PE: <tbody>: Update: widget:  " + widget._id + " <tr_" + widget._id + ">: Enter: widget:  " + widget._id + " Property:" + d.id);
                        var tr = d3.select(this)
                        tr.append("td")
                            .attr("class", "label")
                            .text(function (d) { return d.id; })
                        ;
                        var td_input = tr.append("td")
                            .attr("class", "field")
                            .each(function () {
                                var td = d3.select(this);
                                var input = null;
                                switch (d.type) {
                                    case "boolean":
                                        input = td.append("input")
                                            .attr("class", "input_" + widget._id)
                                            .attr("type", "checkbox")
                                            .on("change", function () {
                                                widget[d.id](this.checked).render(function () {
                                                    context.onChange(widget, d.id);
                                                    context.render();
                                                })
                                            })
                                        ;
                                        break;
                                    case "number":
                                    case "string":
                                        input = td.append("input")
                                            .attr("class", "input_" + widget._id)
                                            .on("change", function () {
                                                widget[d.id](this.value).render(function (widget) {
                                                    context.onChange(widget, d.id);
                                                    context.render();
                                                })
                                            })
                                        ;
                                        break;
                                    case "html-color":
                                        input = td.append("input")
                                            .attr("class", "input_" + widget._id)
                                            .on("change", function () {
                                                widget[d.id](this.value).render(function (widget) {
                                                    context.onChange(widget, d.id);
                                                    context.render();
                                                })
                                            })
                                        ;
                                        if (!context.isIE) {
                                            try {
                                                var colorInput = input;
                                                var inputColor = td.append("input")
                                                    .attr("type", "color")
                                                    .on("change", function () {
                                                        var node = colorInput.node();
                                                        node.value = this.value;
                                                        colorInput.on("change").apply(colorInput.node());
                                                    })
                                                ;
                                                inputColor.node().value = widget[d.id]();
                                            } catch (e) {
                                                inputColor.remove();
                                            }
                                        }
                                        break;
                                    case "set":
                                        input = td.append("select")
                                            .attr("class", "input_" + widget._id)
                                            .on("change", function () {
                                                widget[d.id](this.value).render(function (widget) {
                                                    context.onChange(widget, d.id);
                                                    context.render();
                                                })
                                            })
                                        ;
                                        d.set.forEach(function (item) {
                                            var option = input.append("option")
                                                .attr("value", item)
                                                .text(item)
                                            ;
                                        });
                                        break;
                                    case "array":
                                        input = td.append("textarea")
                                            .attr("class", "input_" + widget._id)
                                            .attr("rows", "4")
                                            .attr("cols", "25")
                                            .on("change", function () {
                                                widget[d.id](JSON.parse(this.value)).render(function () {
                                                    context.onChange(widget, d.id);
                                                    context.render();
                                                })
                                            })
                                        ;
                                        break;
                                    case "widget":
                                    case "widgetArray":
                                        input = td.append("div")
                                            .attr("class", "input_" + widget._id)
                                        ;
                                        widget["_propertyEditor_" + d.id] = new PropertyEditor()
                                            .target(input.node())
                                        ;
                                        widget["_propertyEditor_" + d.id].onChange = function (widget, propID) {
                                            context.onChange(widget, propID)
                                            //  No render needed  ---
                                        };
                                        break;
                                    default:
                                        break;
                                }
                            })
                        ;
                        /*
                        var td = tr.append("td");
                        var button = td
                            .append("a")
                                .text("Reset")
                        ;
                        button.on("click", function () {
                            widget[d.id + "_reset"]();
                            widget.render(function () {
                                context.onChange(widget, d.id);
                                context.render();
                            });
                        });
                        */
                    })
                ;
                rows.select(".input_" + widget._id)
                    .each(function (d) {
                        //console.log("PE: <tbody>: Update: widget:  " + widget._id + " <input_" + widget._id + ">: Update: widget:  " + widget._id + " Property:" + d.id);
                        var input = d3.select(this);
                        switch (d.type) {
                            case "boolean":
                                input.node().checked = widget[d.id]();
                                break
                            case "html-color":
                                input.node().value = widget[d.id]();
                                break;
                            case "array":
                                input.node().value = JSON.stringify(widget[d.id](), null, "  ");
                                break;
                            case "widget":
                                var innerWidget = widget[d.id]();
                                widget["_propertyEditor_" + d.id]
                                    .data(innerWidget ? [innerWidget] : [])
                                    .render()
                                ;
                                break;
                            case "widgetArray":
                                widget["_propertyEditor_" + d.id]
                                    .data(widget[d.id]())
                                    .render()
                                ;
                                break;
                            case "number":
                            case "string":
                            case "set":
                            default:
                                input.node().value = widget[d.id]();
                                break;
                        }
                    })
                ;
                rows.exit()
                    .each(function (d) {
                        var element = d3.select(this);
                        console.log("PropertyEditor exit:" + d._class + d._id);
                        switch (d.type) {
                            case "widget":
                                d.propertyEditor
                                    .target(null)
                                ;
                                break;
                            case "widgetArray":
                                element.html("");
                                break;
                        }
                    })
                    .remove()
                ;

                //  Columns  ---
                if (this._show_columns) {
                    var tr = this.tbody.append("tr");
                    var td = tr.append("td")
                        .text("columns")
                    ;
                    td = tr.append("td")
                    var input = td.append("textarea")
                        .attr("rows", "4")
                        .attr("cols", "25")
                        .on("change", function () {
                            widget
                                .columns(JSON.parse(this.value))
                                .render(function () {
                                    context.onChange(widget, "columns");
                                })
                            ;
                        })
                    ;
                    input.node().value = JSON.stringify(this._data._columns);

                }
                //  Data  ---
                if (this._show_columns) {
                    var tr = this.tbody.append("tr");
                    var td = tr.append("td")
                        .text("data")
                    ;
                    td = tr.append("td")
                    input = td.append("textarea")
                        .attr("rows", "4")
                        .attr("cols", "25")
                        .on("change", function () {
                            widget
                                .data(JSON.parse(this.value))
                                .render(function () {
                                    context.onChange("data");
                                })
                            ;
                        })
                    ;
                    try {
                        input.node().value = JSON.stringify(this._data._data);
                    } catch (e) {
                        input.node().value = e;
                    }
                }
            })
        ;
        table.exit()
            .each(function (widget) {
            })
            .remove()
        ;
    };

    PropertyEditor.prototype.exit = function (domNode, element) {
        HTMLWidget.prototype.exit.apply(this, arguments);
    };

    PropertyEditor.prototype.click = function (d) {
    };

    return PropertyEditor;
}));
