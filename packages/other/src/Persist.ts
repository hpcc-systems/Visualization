import { Platform, Utility, Widget } from "@hpcc-js/common";

export function discover(widget) {
    return widget.publishedProperties(false, true);
}

export function widgetWalker(widget, visitor) {
    if (!widget)
        return;
    visitor(widget);
    discover(widget).forEach(function (publishItem) {
        switch (publishItem.type) {
            case "widget":
                widgetWalker(widget[publishItem.id](), visitor);
                break;
            case "widgetArray":
            case "propertyArray":
                widgetArrayWalker(widget[publishItem.id](), visitor);
                break;
            default:
        }
    });
}

export function widgetArrayWalker(widgets, visitor) {
    if (!widgets)
        return;
    widgets.forEach(function (widget) {
        widgetWalker(widget, visitor);
    });
}

export function propertyWalker(widget, filter, visitor) {
    widget.propertyWalker(filter, visitor);
}

export function widgetPropertyWalker(widget2, filter, visitor) {
    widgetWalker(widget2, function (widget) {
        propertyWalker(widget, filter, visitor);
    });
}

export function retrofit_114_serialization(state, replacement_version) {
    replacement_version = !replacement_version || replacement_version === "1.14.2-dev" ? "1.18.0" : replacement_version;
    if (!state.__version) return state;
    const state_version_obj = Utility.parseVersionString(state.__version);
    const target_version_obj = Utility.parseVersionString(replacement_version);
    if (state_version_obj.major === 1 && state_version_obj.minor === 14) {
        console.log("Upgrading old persist from " + state.__version + " to " + replacement_version);
        let _json_str = JSON.stringify(state);
        _json_str = _json_str.split('"' + state.__version).join('"' + replacement_version);

        const ret_obj = JSON.parse(_json_str);
        if (ret_obj.__properties && ret_obj.__properties.content) {
            ret_obj.__properties.content.forEach(function (n) {// FOR EACH top tier layout_Cell
                if (JSON.stringify(n).split("graph_Graph").length > 1 && target_version_obj.minor >= 16) {
                    n.__properties.widget.__id = n.__properties.widget.__properties.widget.__id;
                    n.__properties.widget.__class = "composite_MegaChart";
                    n.__properties.widget.__properties.showCSV = false;
                    n.__properties.widget.__properties.chartType = "GRAPH";
                    n.__properties.widget.__properties.chart = n.__properties.widget.__properties.widget;
                    delete n.__properties.widget.__properties.chart.__id;
                    delete n.__properties.widget.__properties.widget;
                }
                if ("undefined" === typeof n.__properties.fields) {
                    n.__properties.fields = [];
                }
            });
        }
        return ret_obj;
    } else {
        return state;
    }
}

export function serializeTheme(widget, filter) {
    return JSON.stringify(serializeThemeToObject(widget, filter));
}

export function serializeThemeToObject(widget2, filter?) {
    filter = filter || ["surface", "Color", "Font", "palette"];

    const propObj = {};
    widgetPropertyWalker(widget2, null, function (widget, item) {
        if (widget[item.id + "_modified"]() || widget.publishedProperty(item.id).origDefaultValue !== widget.publishedProperty(item.id).defaultValue) {
            if (_isFilterMatch(item.id, filter)) {
                const classParts = widget._class.trim().split(" ");
                for (const i in classParts) {
                    if (classParts.HasOwnProperty(i)) {
                        if (propObj[classParts[i]] === undefined) {
                            propObj[classParts[i]] = {};
                        }
                        if (propObj[classParts[i]][item.id] === undefined) {
                            propObj[classParts[i]][item.id] = widget[item.id]();
                            break;
                        } else if (propObj[classParts[i]][item.id] === widget[item.id]()) {
                            break;
                        }
                    }
                }
            }
        }
    });

    function _isFilterMatch(str, arr) {
        let ret = false;
        for (const i in arr) {
            if (str.indexOf(arr[i]) !== -1) {
                ret = true;
                break;
            }
        }
        return ret;
    }
    return propObj;
}
export function removeTheme(widget2, callback) {
    widgetPropertyWalker(widget2, null, function (widget, item) {
        widget.publishedProperty(item.id).defaultValue = widget.publishedProperty(item.id).origDefaultValue;
    });

    if (typeof (callback) === "function") {
        callback.call(this);
    }
}
export function applyTheme(widget2, themeObj, callback) {
    const context = this;
    widgetPropertyWalker(widget2, null, function (widget3, item) {
        switch (item.type) {
            case "widget":
                context.applyTheme(widget3[item.id](), themeObj);
                return true;
            case "widgetArray":
                const widgetArray = widget3[item.id]();
                widgetArray.forEach(function (widget) {
                    context.applyTheme(widget, themeObj);
                }, this);
                return true;
            default:
                widget3.applyTheme(themeObj);
                break;
        }
    });
    if (typeof (callback) === "function") {
        callback.call(this);
    }
}

export function serializeToObject(widget, filter?, includeData?, includeState?) {
    const retVal: any = {
        __class: widget.classID(),
    };
    if (widget._id.indexOf(widget._idSeed) !== 0) {
        retVal.__id = widget._id;
    }
    if (widget.version) {
        retVal.__version = widget.version();
    }
    retVal.__properties = {};

    propertyWalker(widget, filter, (childWwidget2, item) => {
        if (childWwidget2[item.id + "_modified"]()) {
            switch (item.type) {
                case "widget":
                    retVal.__properties[item.id] = serializeToObject(childWwidget2[item.id](), null, includeData, includeState && !widget.serializeState);  //  Only include state once
                    return true;
                case "widgetArray":
                case "propertyArray":
                    retVal.__properties[item.id] = [];
                    const widgetArray = childWwidget2[item.id]();
                    widgetArray.forEach((childWwidget) => {
                        retVal.__properties[item.id].push(serializeToObject(childWwidget, null, includeData, includeState && !widget.serializeState));  //  Only include state once
                    });
                    return true;
                default:
                    retVal.__properties[item.id] = childWwidget2[item.id]();
                    break;
            }
        }
    });

    if (widget.classID() === "marshaller_Graph") {
        const vertices = widget.data().vertices;
        if (vertices) {
            this.__vertices = vertices.map(item => {
                return serializeToObject(item, null, includeData, includeState && !widget.serializeState);
            });
        }
    }
    if (includeData && widget.data) {
        if (!retVal.__data) retVal.__data = {};
        retVal.__data.data = widget.data();
    }
    if (includeState) {
        if (widget.serializeState) {
            retVal.__state = widget.serializeState();
        } else if (widget.data) {
            retVal.__state = {
                data: widget.data()
            };
        }
    }
    return retVal;
}

export function serialize(widget, filter?, includeData?, includeState?) {
    return JSON.stringify(serializeToObject(widget, filter, includeData, includeState));
}

export function deserializeFromObject(widget, state) {
    const promises = [];
    widgetPropertyWalker(widget, null, (w, item) => {
        w[item.id + "_reset"]();
        if (state.__properties[item.id] !== undefined) {
            switch (item.type) {
                case "widget":
                    const widgetKey = item.id;
                    promises.push(create(state.__properties[item.id]).then((w2: any) => {
                        w2._owner = w;
                        w[widgetKey](w2);
                        return w2;
                    }));
                    break;
                case "widgetArray":
                case "propertyArray":
                    const widgetArrayKey = item.id;
                    const widgetStateArray = state.__properties[item.id];
                    if (widgetStateArray.length) {
                        const arrPromises = [];
                        for (const widgetState of widgetStateArray) {
                            arrPromises.push(create(widgetState).then((widgetItem: any) => {
                                widgetItem._owner = w;
                                return widgetItem;
                            }));
                        }
                        promises.push(Promise.all(arrPromises).then(widgetArray => {
                            w[widgetArrayKey](widgetArray);
                        }));
                    }
                    break;
                default:
                    w[item.id](state.__properties[item.id]);
                    break;
            }
        }
    });
    return Promise.all(promises).then(widgets => {
        if (state.__data) {
            for (const key in state.__data) {
                if (state.__data.HasOwnProperty(key)) {
                    switch (key) {
                        case "data":
                            widget.data(state.__data[key]);
                            break;
                        default:
                            console.log("Unexpected __data item:  " + key);
                            widget[key](state.__data[key]);
                            break;
                    }
                }
            }
        }
        if (state.__state) {
            if (widget.deserializeState) {
                widget.deserializeState(state.__state);
            } else if (state.__state.data && widget.data) {
                widget.data(state.__state.data);
            }
        }
        return widget;
    });
}

export function deserialize(widget, state) {
    if (typeof state === "string") {
        state = JSON.parse(state);
    }
    if (state.__id && state.__id.indexOf(widget._idSeed) !== 0 && widget._id !== state.__id) {
        console.log("Deserialize:  IDs do not match - " + widget._id);
    }
    deserializeFromObject(widget, state);
}

export function create(state: any): Promise<Widget> {
    if (typeof state === "string") {
        state = JSON.parse(state);
    }
    state = retrofit_114_serialization(state, Platform.version());
    return Utility.requireWidget(state.__class).then((WidgetClass: any) => {
        const widget = new WidgetClass();
        if (state.__id && state.__id.indexOf(widget._idSeed) !== 0 && state.__id.indexOf("_pe") !== 0) {
            widget._id = state.__id;
        }
        return deserializeFromObject(widget, state);
    }).catch(function (e) {
        console.log("Persist.create:  ***exception***");
        console.log(e);
    });
}

export function clone(widget) {
    create(serializeToObject(widget, [], true, true));
}
