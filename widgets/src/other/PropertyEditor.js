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
        var callbackJS = this._data._class === "chart_MultiChart" && this._data._chart ? formatJSCallback("_chart", formatJSProperties(this._data._chart, includeColumns, includeData), "") : "";
        return formatJSRequire(this._data, fieldName, formatJSProperties(this._data, includeColumns, includeData), callbackJS, postCreate);
    };

    PropertyEditor.prototype.getPersistString = function (fieldName) {
        return "var " + fieldName + " = " + JSON.stringify(Persist.serializeToObject(this._data), null, "  ") + ";"
    };

    PropertyEditor.prototype.onChange = function (propID) {
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

        var rows = this.tbody.selectAll("tr").data(Persist.discover(this._data), function (d) {return d.id + "_" + d.type});
        rows
            .enter()
            .append("tr")
            .each(function (d) {
                var tr = d3.select(this);
                tr.append("td").text(d.id);
                var td = tr.append("td");
                var input = null;
                switch (d.type) {
                    case "boolean":
                        var input = td.append("input")
                            .attr("type", "checkbox")
                        ;
                        break;
                    case "number":
                    case "string":
                        input = td.append("input");
                        break;
                    case "html-color":
                        input = td.append("input");
                        if (!context.isIE) {
                            try {
                                var inputColor = td.append("input")
                                    .attr("type", "color")
                                    .on("change", function () {
                                        input.node().value = this.value;
                                        input.node().onchange();
                                    })
                                ;
                                inputColor.node().value = context._data[d.id]();
                            } catch (e) {
                                inputColor.remove();
                            }
                        }
                        break;
                    case "set":
                        input = td.append("select");
                        d.set.forEach(function (item) {
                            var option = input.append("option")
                                .attr("value", item)
                                .text(item)
                            ;
                        });
                        break;
                    case "array":
                        var input = td.append("textarea")
                            .attr("rows", "4")
                            .attr("cols", "25")
                        ;
                        break;
                    default:
                        break;
                }
                function initInput(input) {
                    if (!input) return;
                    switch (input.node().type) {
                        case "checkbox":
                            input.node().checked = context._data[d.id]();
                            input.on("change", function () {
                                context._data[d.id](this.checked).render();
                                context.onChange(d.id);
                            });
                            break;
                        default:
                            switch (input.node().tagName) {
                                case "TEXTAREA":
                                    input.node().value = JSON.stringify(context._data[d.id](), null, "  ");
                                    input.on("change", function () {
                                        context._data[d.id](JSON.parse(this.value)).render();
                                        context.onChange(d.id);
                                    });

                                    break;
                                default:
                                    input.node().value = context._data[d.id]();
                                    input.on("change", function () {
                                        context._data[d.id](this.value).render(function () {
                                            context.onChange(d.id);
                                            if (context._data._class === "chart_MultiChart" && d.id === "chart_type") {
                                                context.updateContent();
                                            } else if (context._data._class === "marshaller_Graph") {
                                                context.updateContent();
                                            }
                                        });
                                    });
                            }
                    }
                }
                initInput(input);
                var td = tr.append("td");
                var button = td
                    .append("a")
                        .text(" Reset")
                ;
                button.on("click", function () {
                    context._data[d.id + "_reset"]();
                    context._data.render();
                    initInput(input);
                    context.onChange(d.id);
                });
            })
        ;
        this.updateContent();

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
                        .render()
                    ;
                    context.onChange("columns");
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
                        .render()
                    ;
                    context.onChange("data");
                })
            ;
            try {
                input.node().value = JSON.stringify(this._data._data);
            } catch (e) {
                input.node().value = e;
            }
        }

        rows.exit()
            .remove()
        ;
    };

    PropertyEditor.prototype.updateContent = function() {
        this._contentEditors.forEach(function (item) {
            item.target(null);
        });
        this._contentEditors = [];
        if (this.content_tr) {
            this.content_tr.remove();
        }
        if (this._data._class === "chart_MultiChart" && this._data._chart) {
            this.content_tr = this.tbody.append("tr");
            var td = this.content_tr.append("td")
                .text("chart")
            ;
            var div = this.content_tr.append("td").append("div")
                .attr("id", this._id + "_" + this._data._chart._id)
            ;
            this._contentEditors.push(new PropertyEditor()
                .target(this._id + "_" + this._data._chart._id)
                .data(this._data._chart)
                .render()
            );
        } else if (this._data._class === "marshaller_Graph") {
            var vertices = this._data.data().vertices;
            if (vertices) {
                this.content_tr = this.tbody.append("tr");
                var td = this.content_tr.append("td")
                    .text("vertices")
                ;
                var div = this.content_tr.append("td").append("div")
                    .attr("id", this._id + "_vertices")
                ;
                vertices.forEach(function (item) {
                    this._contentEditors.push(new PropertyEditor()
                        .target(this._id + "_vertices")
                        .data(item)
                        .render()
                    );
                }, this);
            }
        } else if (this._data._content) {
            var tr = this.tbody.append("tr");
            var td = tr.append("td")
                .text("content")
            ;
            var div = tr.append("td").append("div")
                .attr("id", this._id + "_content")
            ;
            this._contentEditors.push(new PropertyEditor()
                .target(this._id + "_content")
                .data(this._data._content)
                .render()
            );
        }
    };

    PropertyEditor.prototype.exit = function (domNode, element) {
        this.thead.remove();
        this.tbody.remove();
    };

    PropertyEditor.prototype.click = function (d) {
    };

    return PropertyEditor;
}));
