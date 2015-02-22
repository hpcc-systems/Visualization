"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["../common/HTMLWidget", "./Persist"], factory);
    } else {
        root.Entity = factory(root.HTMLWidget, root.Persist);
    }
}(this, function (HTMLWidget, Persist) {
    function PropertyEditor() {
        HTMLWidget.call(this);
        this._class = "other_PropertyEditor";

        this._tag = "table";

        this._columns = ["Key", "Value", ""];
        this._contentEditors = [];
    };
    PropertyEditor.prototype = Object.create(HTMLWidget.prototype);

    PropertyEditor.prototype.publish("show_columns", false, "boolean", "Show Columns");
    PropertyEditor.prototype.publish("show_data", false, "boolean", "Show Data");


    PropertyEditor.prototype.dataXXX = function (_) {
        var retVal = HTMLWidget.prototype.data.apply(this, arguments);
        if (arguments.length) {
            this._data_properties = Persist.discover(this._data);
        }
        return retVal;
    };

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
        this.thead = element.append("thead").append("tr");
        this.tbody = element.append("tbody");
    };

    PropertyEditor.prototype.update = function (domNode, element) {
        var context = this;

        var th = this.thead.selectAll("th").data(this._columns, function (d) { return d; });
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

        var rows = this.tbody.selectAll(".tr_" + this._id).data(Persist.discover(this._data), function (d) { return d.id + "_" + d.type });
        var row = rows
            .enter()
            .append("tr")
            .attr("class", "tr_" + this._id)
            .each(function (d) {
                console.log("Enter: type:  " + d.type + ", id:  " + d.id);
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
                                    .attr("class", "input")
                                    .attr("type", "checkbox")
                                    .on("change", function () {
                                        context._data[d.id](this.checked).render(function () {
                                            context.onChange(context._data, d.id);
                                            context.render();
                                        })
                                    })
                                ;
                                break;
                            case "number":
                            case "string":
                                input = td.append("input")
                                    .attr("class", "input")
                                    .on("change", function () {
                                        context._data[d.id](this.value).render(function (widget) {
                                            context.onChange(context._data, d.id);
                                            context.render();
                                        })
                                    })
                                ;
                                break;
                            case "html-color":
                                input = td.append("input")
                                    .attr("class", "input")
                                    .on("change", function () {
                                        context._data[d.id](this.value).render(function (widget) {
                                            context.onChange(context._data, d.id);
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
                                        inputColor.node().value = context._data[d.id]();
                                    } catch (e) {
                                        inputColor.remove();
                                    }
                                }
                                break;
                            case "set":
                                input = td.append("select")
                                    .attr("class", "input")
                                    .on("change", function () {
                                        context._data[d.id](this.value).render(function (widget) {
                                            context.onChange(context._data, d.id);
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
                                    .attr("class", "input")
                                    .attr("rows", "4")
                                    .attr("cols", "25")
                                    .on("change", function () {
                                        context._data[d.id](JSON.parse(this.value)).render(function () {
                                            context.onChange(context._data, d.id);
                                            context.render();
                                        })
                                    })
                                ;
                                break;
                            case "widget":
                                input = td.append("div")
                                    .attr("class", "input")
                                ;
                                d.propertyEditor = new PropertyEditor()
                                    .target(input.node())
                                ;
                                d.propertyEditor.onChange = function (widget, propID) {
                                    context.onChange(widget, propID)
                                    //  No render needed  ---
                                };
                                break;
                            default:
                                break;
                        }
                    })
                ;
                var td = tr.append("td");
                var button = td
                    .append("a")
                        .text(" Reset")
                ;
                button.on("click", function () {
                    context._data[d.id + "_reset"]();
                    context._data.render(function () {
                        context.onChange(context._data, d.id);
                        context.render();
                    });
                });

            })
        ;
        rows.exit()
            .each(function (d) {
                console.log("Exit: type:  " + d.type + ", id:  " + d.id);
            })
            .remove()
        ;
        rows.select(".input")
            .each(function (d) {
                console.log("Update: type:  " + d.type + ", id:  " + d.id + ", value:  " + context._data[d.id]());
                var input = d3.select(this);
                switch (d.type) {
                    case "boolean":
                        input.node().checked = context._data[d.id]();
                        break
                    case "html-color":
                        input.node().value = context._data[d.id]();
                        break;
                    case "array":
                        input.node().value = JSON.stringify(context._data[d.id](), null, "  ");
                        break;
                    case "widget":
                        d.propertyEditor
                            .data(context._data[d.id]())
                            .render()
                        ;
                        break;
                    case "number":
                    case "string":
                    case "set":
                    default:
                        input.node().value = context._data[d.id]();
                        break;
                }
            })
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
                    context._data
                        .columns(JSON.parse(this.value))
                        .render(function () {
                            context.onChange(context._data, "columns");
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
                    context._data
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
    };

    PropertyEditor.prototype.updateContent = function() {
        this._contentEditors.forEach(function (item) {
            item.target(null);
        });
        this._contentEditors = [];
        if (this.content_tr) {
            this.content_tr.remove();
        }
        var context = this;
        function createPropertyEditor(id, label, data) {
            context.content_tr.append("td")
                .text(label)
            ;
            context.content_tr.append("td").append("div")
                .attr("id", id)
            ;
            var retVal = new PropertyEditor()
                .target(id)
                .data(data)
                .render()
            ;
            retVal.onChange = function (widget, propID) {
                //context.onChange(widget, propID)
            };
            return retVal;
        }
        /*
        if (this._data._class === "marshaller_Graph") {
            var vertices = this._data.data().vertices;
            if (vertices) {
                this.content_tr = this.tbody.append("tr");
                vertices.forEach(function (item) {
                    this._contentEditors.push(createPropertyEditor(this._id + "_" + item._id, item._title || "Vertex", item));
                }, this);
            }
        }
        */
    };

    PropertyEditor.prototype.exit = function (domNode, element) {
        this.thead.remove();
        this.tbody.remove();
    };

    PropertyEditor.prototype.click = function (d) {
    };

    return PropertyEditor;
}));
