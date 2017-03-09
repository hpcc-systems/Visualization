import { map as d3Map } from "d3-collection";
import * as Persist from "../src/other/Persist";
import { chartFactory } from "./chartFactory";

const bundles = { chart: chartFactory };
const bundlesCatMap = {};
const bundlesWidgetMap = {};
d3Map(bundles).entries().forEach(function (bundle) {
    const folderID = bundle.key;
    d3Map(bundle.value).entries().forEach(function (widget) {
        const widgetID = widget.key;
        d3Map(widget.value).entries().forEach(function (sample) {
            const sampleID = sample.key;
            const widgetPath = "src/" + folderID + "/" + widgetID;
            const widgetTestData = {
                folder: folderID,
                file: widgetID,
                sample: sampleID,
                widgetPath,
                factory: sample.value
            };
            if (!bundlesCatMap[folderID]) {
                bundlesCatMap[folderID] = {};
            }
            if (!bundlesCatMap[folderID][widgetID]) {
                bundlesCatMap[folderID][widgetID] = {};
            }
            bundlesCatMap[folderID][widgetID][sampleID] = widgetTestData;

            if (!bundlesWidgetMap[widgetPath]) {
                bundlesWidgetMap[widgetPath] = {};
            }
            bundlesWidgetMap[widgetPath][sampleID] = widgetTestData;
        });
    });
});

export const categories = bundlesCatMap;
export const widgets = bundlesWidgetMap;

export function serializeToURL(testID2, widget) {
    const obj2 = Persist.serializeToObject(widget);
    return walkObj(obj2, testID2);

    function walkObj(obj, testID) {
        let retVal = testID || obj.__class;
        for (const key in obj.__properties) {
            if (obj.__properties.hasOwnProperty(key)) {
                switch (typeof (obj.__properties[key])) {
                    case "boolean":
                    case "number":
                    case "string":
                        let newParam = "&" + encodeURIComponent(key);
                        if (obj.__properties[key] !== undefined) {
                            newParam += "=" + encodeURIComponent(obj.__properties[key]);
                        }
                        if (retVal.length + newParam.length < 2000) { //  2000 comes from:  http://stackoverflow.com/a/417184
                            retVal += newParam;
                        }
                        break;
                    case "object":
                        switch (key) {
                            case "fields":
                                break;
                            default:
                                if (obj.__properties[key] instanceof Array) {
                                } else {
                                }
                        }
                        break;
                    default:
                }
            }
        }
        return retVal;
    }
}
export function deserializeFromURL(def, callback) {
    let widgetPath = "";
    let widgetTest = "";
    const params = {};
    if (def) {
        def.split("&").forEach(function (param) {
            const paramParts = param.split("=");
            if (paramParts[0] === "hpcc_debug") {
                (<any>window).__hpcc_debug = paramParts[1];
            } else if (widgetPath === "" && paramParts.length === 1) {
                widgetPath = decodeURIComponent(paramParts[0]);
                const wpParts = widgetPath.split(".");
                widgetPath = wpParts[0];
                widgetTest = wpParts[1];
            } else {
                params[decodeURIComponent(paramParts[0])] = decodeURIComponent(paramParts[1]);
            }
        });
    }
    if (widgetPath) {
        const func = widgetTest ? widgets[widgetPath][widgetTest].factory : (<any>d3Map(widgets[widgetPath]).values()[0]).factory;
        func(function (widget) {
            if (params) {
                for (const key in params) {
                    if (widget["__meta_" + key] !== undefined) {
                        if (widget["__meta_" + key].type === "array") {
                            widget[key](params[key].split(","));
                        } else {
                            widget[key](params[key]);
                        }
                    }
                }
            }
            callback(widget, widgetPath + (widgetTest ? "." + widgetTest : ""));
        });
    } else {
        callback(null);
    }
}
