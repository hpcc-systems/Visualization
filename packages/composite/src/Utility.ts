import { Utility } from "@hpcc-js/common";

declare const require: any;
export function requireWidget(classID) {
    return new Promise(function (resolve, _reject) {
        const parsedClassID = Utility.parseClassID(classID);
        if (require) {
            require([parsedClassID.package], function (Package) {
                let Widget = null;
                if (Package && Package[parsedClassID.widgetID]) {
                    Widget = Package[parsedClassID.widgetID];
                }
                resolve(parsedClassID.memberWidgetID ? (Widget.prototype ? Widget.prototype[parsedClassID.memberWidgetID] : Widget[parsedClassID.memberWidgetID]) : Widget);
            });
        }
    });
}

export function requireWidgets(classIDs) {
    return Promise.all(classIDs.map(requireWidget));
}
