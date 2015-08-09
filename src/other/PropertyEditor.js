"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/Widget", "../common/HTMLWidget", "./Persist", "css!./PropertyEditor"], factory);
    } else {
        root.other_PropertyEditor = factory(root.d3, root.common_Widget, root.common_HTMLWidget, root.other_Persist);
    }
}(this, function (d3, Widget, HTMLWidget, Persist) {
    function PropertyEditor() {
        HTMLWidget.call(this);

        this._tag = "div";
        this._columns = ["Key", "Value"];
        this._contentEditors = [];
        this._show_settings = true;
    }
    PropertyEditor.prototype = Object.create(HTMLWidget.prototype);
    PropertyEditor.prototype.constructor = PropertyEditor;
    PropertyEditor.prototype._class += " other_PropertyEditor";

    PropertyEditor.prototype.publish("themeMode", false, "boolean", "Edit default values",null,{tags:['Basic','TODO2']});
    PropertyEditor.prototype.publish("showColumns", true, "boolean", "Show Columns",null,{tags:['Intermediate','TODO2']});
    PropertyEditor.prototype.publish("showData", true, "boolean", "Show Data",null,{tags:['Intermediate','TODO2']});
    PropertyEditor.prototype.publish("shareCountMin", 2, "number", "Share Count Min",null,{tags:['Basic','TODO2']});
    PropertyEditor.prototype.publish("paramGrouping", "By Widget", "set", "Param Grouping", ["By Param", "By Widget"],{tags:['Basic','TODO2']});
    PropertyEditor.prototype.publish("sectionTitle", "", "string", "Section Title",null,{tags:['Private','TODO2']});
    PropertyEditor.prototype.publish("collapsibleSections", true, "boolean", "Collapsible Sections",null,{tags:['Basic','TODO2']});

    PropertyEditor.prototype.show_settings = function (_) {
        if (!arguments.length) {
            return this._show_settings;
        }
        this._show_settings = _;
        return this;
    };
    var formatJSRequire = function (widget, fieldName, properties, renderCallback, postCreate) {
        if (!widget) {
            return "";
        }
        var classParts = widget.classID().split("_");
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
        "        .render(" + renderCallback.split("\n").join("\n        ") + ")\n" +
        "    ;\n" +
        postCreate +
        "});";
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
        "}";
    };

    var formatJSProperties = function (widget, includeColumns, includeData) {
        if (!widget) {
            return "";
        }
        var context = this;
        var propsStr = Persist.discover(this.theme_mode() ? Object.getPrototypeOf(widget) : widget).map(function (prop) {
            if (!context.widgetPropertyModified(widget, prop.id)) {
                return "";
            }
            return "." + prop.id + "(" + JSON.stringify(context.widgetProperty(widget, prop.id)) + ")";
        }).filter(function (str) {
            return str !== "";
        }).join("\n");
        if (includeColumns) {
            var columns = widget.columns();
            if (columns instanceof Array) {
                if (columns.length) {
                    propsStr += (propsStr.length ? "\n" : "");
                    propsStr += ".columns(" + JSON.stringify(columns) + ")";
                }
            } else if (columns) {
                propsStr += (propsStr.length ? "\n" : "");
                propsStr += ".columns(" + JSON.stringify(columns) + ")";
            }
        }
        if (includeData) {
            var data = widget.data();
            if (data instanceof Array) {
                if (data.length) {
                    propsStr += (propsStr.length ? "\n" : "");
                    propsStr += ".data(" + JSON.stringify(data) + ")";
                }
            } else if (data) {
                propsStr += (propsStr.length ? "\n" : "");
                try {
                    propsStr += ".data(" + JSON.stringify(data) + ")";
                } catch (e) {
                    propsStr += ".data(" + e + ")";
                }
            }
        }
        return propsStr;
    };

    PropertyEditor.prototype.getJavaScript = function (fieldName, includeColumns, includeData, postCreate) {
        postCreate = postCreate || "";
        var callbackJS = "";
        if (this._data._content) {
            callbackJS = formatJSCallback("_content", formatJSProperties(this._data._content, includeColumns, includeData), "");
        }
        return formatJSRequire(this._data, fieldName, formatJSProperties(this._data, includeColumns, includeData), callbackJS, postCreate);
    };

    PropertyEditor.prototype.getPersistString = function (fieldName) {
        return "var " + fieldName + " = " + JSON.stringify(Persist.serializeToObject(this._data, null, false), null, "  ") + ";";
    };

    PropertyEditor.prototype.onChange = function (widget, propID) {
    };

    PropertyEditor.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        this._parentElement.style("overflow", "auto");
    };
    
    PropertyEditor.prototype.findSharedProperties = function (data, themeMode) {
        var propsByID = {};

        if (typeof (data) !== 'undefined' && data.length > 0) {
            var allProps = [];
            data.forEach(function (widget) {
                var gpResponse = this._getParams(themeMode ? Object.getPrototypeOf(widget) : widget, 0);
                allProps = allProps.concat(gpResponse);
            }, this);
            allProps.forEach(function (prop) {
                if (['widget', 'widgetArray'].indexOf(prop.type) === -1) {
                    var tempIdx = prop.id + '_' + prop.description;
                    if (typeof (propsByID[tempIdx]) === 'undefined') {
                        propsByID[tempIdx] = { arr: [] };
                    }
                    propsByID[tempIdx].id = prop.id;
                    propsByID[tempIdx].description = prop.description;
                    propsByID[tempIdx].type = prop.type;
                    propsByID[tempIdx].set = prop.set;
                    propsByID[tempIdx].arr.push(prop);
                }
            });
        }
        return propsByID;
    };

    PropertyEditor.prototype._getParams = function(widgetObj, depth) {
        var retArr = [];
        var paramArr = Persist.discover(widgetObj);
        paramArr.forEach(function (param, i1) {
            retArr.push({
                id: param.id,
                type: param.type,
                description: param.description,
                set: param.set,
                widget: widgetObj
            });
            if (param.type === "widgetArray") {
                var childWidgetArray = this.widgetProperty(widgetObj, param.id);
                childWidgetArray.forEach(function (childWidget) {
                    var cwArr = this._getParams(childWidget, depth + 1);
                    retArr = retArr.concat(cwArr);
                }, this);
            }
            else if (param.type === "widget") {
                var childWidget = this.widgetProperty(widgetObj, param.id);
                var temp = this._getParams(childWidget, depth + 1);
                retArr = retArr.concat(temp);
            }
        }, this);
        return retArr;
    };
    var tableNeedsRedraw = function (context) {
        var needsRedraw = false;
        if (typeof (context._current_grouping) === 'undefined') {
            context._current_grouping = context._group_params_by;
        } else if (context._current_grouping !== context._group_params_by) {
            needsRedraw = true;
        }
        if (typeof (context._showing_columns) === 'undefined') {
            context._showing_columns = context.showColumns();
        } else if (context._showing_columns !== context.showColumns()) {
            needsRedraw = true;
        }
        if (typeof (context._showing_data) === 'undefined') {
            context._showing_data = context.showData();
        } else if (context._showing_data !== context.showData()) {
            needsRedraw = true;
        }
        if (typeof (context._showing_themeMode) === 'undefined') {
            context._showing_themeMode = context.themeMode();
        } else if (context._showing_themeMode !== context.themeMode()) {
            needsRedraw = true;
        }
        return needsRedraw;
    };
    PropertyEditor.prototype.widgetPropertyModified = function (widget, propID) {
        return !this.themeMode() || this === widget ? widget[propID + "_modified"]() : Object.getPrototypeOf(widget)[propID + "_modified"]();
    };
    PropertyEditor.prototype.widgetProperty = function (widget, propID, _) {
        if (_ === undefined) {
            return !this.themeMode() || this === widget ? widget[propID]() : Object.getPrototypeOf(widget)[propID]();
        }
        return !this.themeMode() || this === widget ? widget[propID](_) : Object.getPrototypeOf(widget)[propID](_);
    };

    PropertyEditor.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        var context = this;
        if (tableNeedsRedraw(this)) {
            element.selectAll("#" + this._id + " > table").remove();
        }
        this._current_grouping = this.paramGrouping();
        if (this._show_settings) {
            //Display table containing PropertyEditor settings
            var editorTable = element.selectAll("#" + this._id + " > div").data([this], function (d) {
                return d._id;
            });
            editorTable.enter().append("div").each(function (widget) {
                new PropertyEditor()
                    .showColumns(false)
                    .showData(false)
                    .show_settings(false)
                    .paramGrouping('By Widget')
                    .sectionTitle('Property Editor Settings')
                    .target(d3.select(this).node())
                    .data([widget])
                    .render()
                ;
            });
        }
        //Update tables based on "group by" setting
        if (this.paramGrouping() === "By Param") {
            var sharedPropsMainSections = [];
            var sPropSections = [];
            if (this._data.length > 0) {
                sharedPropsMainSections.push(this.findSharedProperties(this._data, this.themeMode()));
                for (var k1 in sharedPropsMainSections) {
                    var sectionArr = [];
                    for (var k2 in sharedPropsMainSections[k1]) {
                        var widgetArr = [];
                        sharedPropsMainSections[k1][k2].arr.forEach(function (n) {
                            widgetArr.push(n.widget);
                        });
                        if (this.shareCountMin() <= widgetArr.length || widgetArr[0]._class.indexOf('PropertyEditor') !== -1) {
                            sectionArr.push({
                                rowType: 'shared',
                                widgetArr: widgetArr,
                                id: sharedPropsMainSections[k1][k2].id,
                                description: sharedPropsMainSections[k1][k2].description,
                                type: sharedPropsMainSections[k1][k2].type,
                                set: sharedPropsMainSections[k1][k2].set
                            });
                            sharedPropsMainSections[k1][k2].arr.forEach(function (widgetNode) {
                                sectionArr.push({
                                    rowType: 'individual',
                                    widgetArr: [widgetNode.widget],
                                    id: sharedPropsMainSections[k1][k2].id,
                                    description: sharedPropsMainSections[k1][k2].description,
                                    type: sharedPropsMainSections[k1][k2].type,
                                    set: sharedPropsMainSections[k1][k2].set
                                });
                            });
                        }
                    }
                    sPropSections.push(sectionArr);
                }
            }
        }
        //Creating Table and THEAD
        var table = null;
        if (true) {
            table = element.selectAll("#" + this._id + " > table").data(this._data, function (d) {
                return d._id;
            });
            table.enter().append("table")
                .each(function (widget) {
                    var element = d3.select(this);
                    var thead = element.append("thead");
                    if (context.collapsibleSections()) {
                        thead.attr("class", "mm-label max").on("click", function () {
                            var elm = d3.select(this);
                            if (elm.classed("min")) {
                                elm.classed("max", true);
                                elm.classed("min", false);
                            } else {
                                elm.classed("max", false);
                                elm.classed("min", true);
                            }
                        });
                    }

                    thead.append("tr").append("th").attr("colspan", context._columns.length).attr("class", "th-widget-class").text(function () {
                        var text = '';
                        if (context.sectionTitle()) {
                            text = context.sectionTitle();
                        } else {
                            var splitClass = widget.classID().split('_');
                            if (splitClass.length > 1) {
                                text = "Widget: " + splitClass[splitClass.length - 1];
                            } else {
                                text = "Widget: " + widget._class;
                            }
                        }
                        return text;
                    });
                    thead = thead.append("tr").attr("class", "mm-content");
                    element.append("tbody").attr("class", "mm-content");
                    var th = thead.selectAll("th").data(context._columns, function (d) {
                        return d;
                    });
                    th.enter()
                        .append("th")
                        .text(function (column) {
                            return column;
                        })
                    ;
                    th.exit().remove();
                })
            ;
        }
        //Creating TBODY
        if (true) {
            table.select("tbody").each(function (widget, widgetIdx) {
                var tbody = d3.select(this);
                var rows;
                //  Columns  ---
                var tr;
                var td;
                var input = null;
                if (context.showColumns()) {
                    tr = tbody.append("tr");
                    td = tr.append("td").text("Columns");
                    td = tr.append("td");
                    input = td.append("textarea")
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
                    input.node().value = JSON.stringify(widget._columns);
                }
                //  Data  ---

                if (context.showData()) {
                    tr = tbody.append("tr");
                    td = tr.append("td")
                        .text("Data")
                    ;
                    td = tr.append("td");
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
                        input.node().value = JSON.stringify(widget._data);
                    } catch (e) {
                        input.node().value = e;
                    }
                }
                //Updating TR 'By Param'
                if (context.paramGrouping() === "By Param") {
                    rows = tbody.selectAll(".tr_" + widget._id).data(sPropSections[widgetIdx]);
                    rows.enter().append("tr").each(function (d) {
                        var tr = d3.select(this);
                        var rowClass = "propertyRow";
                        if (d.rowType === 'shared') {
                            rowClass = "sharedPropertyRow";
                        }
                        else if (d.rowType === 'individual') {
                            this.hidden = true;
                        }
                        tr.attr("class", "tr_" + widget._id + " " + rowClass);
                        tr.append("td").attr("class", "pe-label").html(function (sProp) {
                            var text = '';
                            switch (sProp.rowType) {
                                case 'shared':
                                    text = sProp.id;
                                    break;
                                case 'individual':
                                    var splitClass = sProp.widgetArr[0].classID().split('_');
                                    var displayClass = splitClass[splitClass.length - 1];
                                    text = displayClass + ' [' + sProp.widgetArr[0]._id + ']';
                                    break;
                            }
                            return text;
                        })
                        .on("click", function (sProp) {
                            var hidden, classList = this.className.split(' ');
                            if (classList.indexOf('expanded') === -1) {
                                hidden = false;
                                classList.push('expanded');
                                this.className = classList.join(' ');
                            } else {
                                hidden = true;
                                var newClassList = '';
                                classList.forEach(function (c) {
                                    if (c !== 'expanded') {
                                        newClassList += c;
                                    }
                                });
                                this.className = newClassList;
                            }
                            var childCount = sProp.widgetArr.length;
                            var childNode = this.parentNode.nextSibling;
                            for (var i = 0; i < childCount; i++) {
                                childNode.hidden = hidden;
                                childNode = childNode.nextSibling;
                            }
                        });
                        //Setting the td.field content
                        tr.append("td").attr("class", "field").each(function () {
                            var td = d3.select(this);
                            var input = null;
                            switch (d.type) {
                                case "boolean":
                                    input = td.append("input")
                                        .attr("class", "input_" + widget._id)
                                        .attr("type", "checkbox")
                                        .on("change", function () {
                                            var that = this;
                                            d.widgetArr.forEach(function (w) {
                                                context.widgetProperty(w, d.id, that.checked).render(function (w) {
                                                    context.onChange(w, d.id);
                                                    context.render();
                                                });
                                            });
                                        })
                                    ;
                                    break;
                                case "number":
                                    if (typeof (d.ext) !== 'undefined' && typeof (d.ext.inputType) !== 'undefined') {
                                        if (d.ext.inputType === "textarea") {
                                            input = td.append('textarea');
                                        }
                                        else if (d.ext.inputType === 'range') {
                                            input = td.append('input')
                                                .attr('type', 'range')
                                                .attr('min', d.ext.min)
                                                .attr('max', d.ext.max)
                                                .attr('step', d.ext.step)
                                            ;
                                        }
                                    }
                                    if (typeof (input) === 'undefined' || input === null) {
                                        input = td.append('input');
                                    }
                                    input.attr("class", "input_" + widget._id)
                                        .on("change", function () {
                                            var that = this;
                                            d.widgetArr.forEach(function (w) {
                                                context.widgetProperty(w, d.id, that.value);
                                            });
                                            widget.render();
                                        });
                                    break;
                                case "string":
                                    if (typeof (d.ext) !== 'undefined' && typeof (d.ext.inputType) !== 'undefined') {
                                        if (d.ext.inputType === "textarea") {
                                            input = td.append('textarea');
                                        }
                                    }
                                    if (typeof (input) === 'undefined' || input === null) {
                                        input = td.append('input');
                                    }
                                    input.attr("class", "input_" + widget._id)
                                        .on("change", function () {
                                            var that = this;
                                            d.widgetArr.forEach(function (w) {
                                                context.widgetProperty(w, d.id, that.value);
                                            });
                                            widget.render();
                                        })
                                    ;
                                    break;
                                case "html-color":
                                    input = td.append("input")
                                        .attr("class", "input_" + widget._id)
                                        .on("change", function () {
                                            var that = this;
                                            d.widgetArr.forEach(function (w) {
                                                context.widgetProperty(w, d.id, that.value).render(function (w) {
                                                    context.onChange(w, d.id);
                                                    context.render();
                                                });
                                            });
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
                                            d.widgetArr.forEach(function (w) {
                                                inputColor.node().value = context.widgetProperty(w, d.id);
                                            });
                                        } catch (e) {
                                            inputColor.remove();
                                        }
                                    }
                                    break;
                                case "set":
                                    input = td.append("select")
                                        .attr("class", "input_" + widget._id)
                                        .on("change", function () {
                                            var that = this;
                                            d.widgetArr.forEach(function (w) {
                                                context.widgetProperty(w, d.id, that.value).render(function (w) {
                                                    context.onChange(w, d.id);
                                                    context.render();
                                                });
                                            });
                                        })
                                    ;
                                    d.set.forEach(function (item) {
                                        input.append("option")
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
                                            var that = this;
                                            d.widgetArr.forEach(function (w) {
                                                context.widgetProperty(w, d.id, JSON.parse(that.value)).render(function (w) {
                                                    context.onChange(w, d.id);
                                                    context.render();
                                                });
                                            });
                                        })
                                    ;
                                    break;
                                default:
                                    break;
                            }
                        });
                    });
                    //Setting the td.pe-label html content
                    rows.selectAll('td.pe-label').each(function (sProp) {
                        var text = '';
                        switch (sProp.rowType) {
                            case 'shared':
                                text = sProp.id;
                                break;
                            case 'individual':
                                var displayClass = sProp.widgetArr[0].classID().split('_')[1];
                                text = displayClass + ' [' + sProp.widgetArr[0]._id + ']';
                                break;
                        }
                        this.innerHTML = text;
                    });
                    //Setting the state of the inputs
                    rows.select(".input_" + widget._id).each(function (sProp) {
                        var input = d3.select(this);
                        if (sProp.rowType === 'individual') {
                            sProp.widgetArr.forEach(function (w) {
                                switch (sProp.type) {
                                    case "boolean":
                                        input.node().checked = context.widgetProperty(w, sProp.id);
                                        break;
                                    case "html-color":
                                        input.node().value = context.widgetProperty(w, sProp.id);
                                        break;
                                    case "array":
                                        input.node().value = JSON.stringify(context.widgetProperty(w, sProp.id), null, "  ");
                                        break;
                                    case "widget":
                                        var innerWidget = context.widgetProperty(w, sProp.id);
                                        w["_propertyEditor_" + sProp.id]
                                            .data(innerWidget ? [innerWidget] : [])
                                            .render()
                                        ;
                                        break;
                                    case "widgetArray":
                                        w["_propertyEditor_" + sProp.id]
                                            .data(context.widgetProperty(sProp.widget, sProp.id))
                                            .render()
                                        ;
                                        break;
                                    case "number":
                                    case "string":
                                    case "set":
                                        /* falls through */
                                    default:
                                        input.node().value = context.widgetProperty(w, sProp.id);
                                        break;
                                }
                            });
                        }
                    });
                    //On Exit
                    rows.exit().each(function (d) {
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
                    }).remove();
                } else if (context.paramGrouping() === "By Widget") {
                    //Updating TR 'By Widget'
                    rows = tbody.selectAll(".tr_" + widget._id).data(Persist.discover(context.themeMode() ? Object.getPrototypeOf(widget) : widget), function (d) {
                        return widget._id + "_" + d.id + "_" + d.type;
                    });
                    rows.enter().append("tr").each(function (d) {
                        var tr = d3.select(this);
                        tr.attr("class", "tr_" + widget._id);
                        tr.append("td").attr("class", "pe-label").text(function (d) {
                            return d.id;
                        });
                        var inputType = 'input';
                        if (typeof (d.ext) !== 'undefined' &&
                            typeof (d.ext.inputType) !== 'undefined' &&
                            d.ext.inputType === "textarea") {
                            inputType = 'textarea';
                        }
                        tr.append("td")
                            .attr("class", "field")
                            .each(function () {
                                var td = d3.select(this);
                                var input = null;
                                switch (d.type) {
                                    case "boolean":
                                        input = td.append(inputType)
                                            .attr("class", "input_" + widget._id)
                                            .attr("type", "checkbox")
                                            .on("change", function () {
                                                context.widgetProperty(widget, d.id, this.checked).render(function () {
                                                    context.onChange(widget, d.id);
                                                    context.render();
                                                });
                                            })
                                        ;
                                        break;
                                    case "number":
                                    case "string":
                                        if (typeof (d.ext) !== 'undefined' && typeof (d.ext.inputType) !== 'undefined') {
                                            if (d.ext.inputType === "textarea") {
                                                input = td.append('textarea');
                                            }
                                            else if (d.type === 'number' && d.ext.inputType === 'range') {
                                                input = td.append('input')
                                                    .attr('type', 'range')
                                                    .attr('min', d.ext.min)
                                                    .attr('max', d.ext.max)
                                                    .attr('step', d.ext.step)
                                                ;
                                            }
                                        }
                                        if (input === null) {
                                            input = td.append('input');
                                        }
                                        input.attr("class", "input_" + widget._id)
                                            .on("change", function () {
                                                context.widgetProperty(widget, d.id, this.value).render(function (widget) {
                                                    context.onChange(widget, d.id);
                                                    context.render();
                                                });
                                            })
                                        ;
                                        break;
                                    case "html-color":
                                        input = td.append("input")
                                            .attr("class", "input_" + widget._id)
                                            .on("change", function () {
                                                context.widgetProperty(widget, d.id, this.value).render(function (widget) {
                                                    context.onChange(widget, d.id);
                                                    context.render();
                                                });
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
                                                inputColor.node().value = context.widgetProperty(widget, d.id);
                                            } catch (e) {
                                                inputColor.remove();
                                            }
                                        }
                                        break;
                                    case "set":
                                        input = td.append("select")
                                            .attr("class", "input_" + widget._id)
                                            .on("change", function () {
                                                context.widgetProperty(widget, d.id, this.value).render(function (widget) {
                                                    context.onChange(widget, d.id);
                                                    context.render();
                                                });
                                            })
                                        ;
                                        d.set.forEach(function (item) {
                                            input.append("option")
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
                                                context.widgetProperty(widget, d.id, JSON.parse(this.value)).render(function () {
                                                    context.onChange(widget, d.id);
                                                    context.render();
                                                });
                                            })
                                        ;
                                        break;
                                    case "widget":
                                    case "widgetArray":
                                        input = td.append("div")
                                            .attr("class", "input_" + widget._id)
                                        ;
                                        widget["_propertyEditor_" + d.id] = new PropertyEditor()
                                            .paramGrouping('By Widget')
                                            .showColumns(context.showColumns())
                                            .showData(context.showData())
                                            .show_settings(false)
                                            .target(input.node())
                                        ;
                                        widget["_propertyEditor_" + d.id].onChange = function (widget, propID) {
                                            context.onChange(widget, propID);
                                            //  No render needed  ---
                                        };
                                        break;
                                    default:
                                        break;
                                }
                            })
                        ;
                    });
                    rows.select(".input_" + widget._id).each(function (d) {
                        var input = d3.select(this);
                        switch (d.type) {
                            case "boolean":
                                input.node().checked = context.widgetProperty(widget, d.id);
                                break;
                            case "html-color":
                                input.node().value = context.widgetProperty(widget, d.id);
                                break;
                            case "array":
                                input.node().value = JSON.stringify(context.widgetProperty(widget, d.id), null, "  ");
                                break;
                            case "widget":
                                var innerWidget = context.widgetProperty(widget, d.id);
                                widget["_propertyEditor_" + d.id].data(innerWidget ? [innerWidget] : []).render();
                                break;
                            case "widgetArray":
                                widget["_propertyEditor_" + d.id].data(context.widgetProperty(widget, d.id)).render();
                                break;
                            case "number":
                            case "string":
                            case "set":
                                /* falls through */
                            default:
                                input.node().value = context.widgetProperty(widget, d.id);
                                break;
                        }
                    });
                    rows.exit().each(function (d) {
                        var element = d3.select(this);
                        console.log("PropertyEditor exit:" + d._class + d._id);
                        switch (d.type) {
                            case "widget":
                                d.propertyEditor.target(null);
                                break;
                            case "widgetArray":
                                element.html("");
                                break;
                        }
                    }).remove();
                }
            });
        }
        table.exit().remove();
    };

    PropertyEditor.prototype.exit = function (domNode, element) {
        HTMLWidget.prototype.exit.apply(this, arguments);
    };

    PropertyEditor.prototype.click = function (d) {
    };

    return PropertyEditor;
}));