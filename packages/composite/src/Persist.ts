import { Platform, Utility, Widget } from "@hpcc-js/common";
import { Persist } from "@hpcc-js/other";
import { requireWidget } from "./Utility";

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

export function deserializeFromObject(widget, state) {
    const promises = [];
    Persist.widgetPropertyWalker(widget, null, (w, item) => {
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
    return requireWidget(state.__class).then((WidgetClass: any) => {
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
    create(Persist.serializeToObject(widget, [], true, true));
}
