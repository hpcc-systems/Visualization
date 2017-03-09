import * as Utility from "../common/Utility";

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
            this.__vertices = vertices.map(function (item) {
                return this.serializeToObject(item, null, includeData, includeState && !widget.serializeState);
            }, this);
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

export function deserializeFromObject(widget2, state, callback) {
    const context = this;
    return new Promise(function (resolve, _reject) {
        let createCount = 0;
        widgetPropertyWalker(widget2, null, function (widget, item) {
            widget[item.id + "_reset"]();
            if (state.__properties[item.id] !== undefined) {
                switch (item.type) {
                    case "widget":
                        ++createCount;
                        const widgetKey = item.id;
                        context.create(state.__properties[item.id], function (widgetItem) {
                            widget[widgetKey](widgetItem);
                            --createCount;
                        });
                        break;
                    case "widgetArray":
                    case "propertyArray":
                        const widgetArrayKey = item.id;
                        const widgetStateArray = state.__properties[item.id];
                        if (widgetStateArray.length) {
                            ++createCount;
                            const widgetArray = [];
                            widgetArray.length = widgetStateArray.length;
                            let arrayCreateCount = 0;
                            widgetStateArray.forEach(function (widgetState, idx) {
                                ++arrayCreateCount;
                                context.create(widgetState, function (widgetItem) {
                                    widgetItem._owner = widget;
                                    widgetArray[idx] = widgetItem;
                                    --arrayCreateCount;
                                });
                                const arrayIntervalHandler = setInterval(function () {
                                    if (arrayCreateCount <= 0) {
                                        clearInterval(arrayIntervalHandler);
                                        arrayCreateCount = undefined;
                                        widget[widgetArrayKey](widgetArray);
                                        --createCount;
                                    }
                                }, 20);
                            });
                        }
                        break;
                    default:
                        widget[item.id](state.__properties[item.id]);
                        break;
                }
            }
        });
        const intervalHandler = setInterval(function () {
            if (createCount <= 0) {
                clearInterval(intervalHandler);
                createCount = undefined;
                if (state.__data) {
                    for (const key in state.__data) {
                        if (state.__data.HasOwnProperty(key)) {
                            switch (key) {
                                case "data":
                                    widget2.data(state.__data[key]);
                                    break;
                                default:
                                    console.log("Unexpected __data item:  " + key);
                                    widget2[key](state.__data[key]);
                                    break;
                            }
                        }
                    }
                }
                if (state.__state) {
                    if (widget2.deserializeState) {
                        widget2.deserializeState(state.__state);
                    } else if (state.__state.data && widget2.data) {
                        widget2.data(state.__state.data);
                    }
                }
                if (callback) {
                    console.log("Deprecated:  callback, use promise (Persist.deserializeFromObject)");
                    callback(widget2);
                }
                resolve(widget2);
            }
        }, 20);
    });
}

export function deserialize(widget, state, callback) {
    if (typeof state === "string") {
        state = JSON.parse(state);
    }
    if (state.__id && state.__id.indexOf(widget._idSeed) !== 0 && widget._id !== state.__id) {
        console.log("Deserialize:  IDs do not match - " + widget._id);
    }
    deserializeFromObject(widget, state, callback);
}

export function create(state, callback) {
    if (typeof state === "string") {
        state = JSON.parse(state);
    }
    const context = this;
    return Utility.requireWidget(state.__class).then(function (Widget: any) {
        const widget = new Widget();
        if (state.__id && state.__id.indexOf(widget._idSeed) !== 0 && state.__id.indexOf("_pe") !== 0) {
            widget._id = state.__id;
        }
        return context.deserializeFromObject(widget, state, callback);
    }).catch(function (e) {
        console.log("Persist.create:  ***exception***");
        console.log(e);
        if (callback) {
            console.log("Deprecated:  callback, use promise (Persist.create)");
            callback(null);
        }
    });
}

export function clone(widget, callback) {
    create(serializeToObject(widget, [], true, true), callback);
}
