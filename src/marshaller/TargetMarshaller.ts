import { HTMLWidget } from '../common/HTMLWidget';
import { HipieDDLMixin } from './HipieDDLMixin';

export function TargetMarshaller() {
    HTMLWidget.call(this);
    HipieDDLMixin.call(this);
    this._tag = "div";
}
TargetMarshaller.prototype = Object.create(HTMLWidget.prototype);
TargetMarshaller.prototype.constructor = TargetMarshaller;
TargetMarshaller.prototype.mixin(HipieDDLMixin);
TargetMarshaller.prototype._class += " marshaller_TargetMarshaller";

TargetMarshaller.prototype.publish("configObject", {}, "object", "TargetMarshaller setup object", null, { tags: ["Basic"] });


TargetMarshaller.prototype.content = function () {
    return [];
};

TargetMarshaller.prototype.populateContent = function () {
    var _configObject = this.configObject();
    for (var key in this._ddlDashboards) {
        this._ddlDashboards[key].visualizations.forEach(function (viz, idx) {
            var widget_config = _configObject[viz.id];
            if (widget_config !== undefined) {
                if (widget_config.target !== undefined) {
                    viz.newWidgetSurface.target(widget_config.target);
                } else {
                    console.log("Target not specified for the following:");
                    console.log("this._ddlDashboards[" + key + "].visualizations[" + idx + "].id = " + viz.id);
                }
                if (typeof widget_config.callback === "function") {
                    widget_config.callback(viz.widget, viz.newWidgetSurface);
                } else {
                    console.warn("Callback not specified for the following:");
                    console.log("this._ddlDashboards[" + key + "].visualizations[" + idx + "].id = " + viz.id);
                }
            } else {
                console.warn("Config not specified for the following:");
                console.log("this._ddlDashboards[" + key + "].visualizations[" + idx + "].id = " + viz.id);
            }
        }, this);
    }
};

TargetMarshaller.prototype.enter = function (domNode, element) {
    HTMLWidget.prototype.enter.apply(this, arguments);
};

TargetMarshaller.prototype.render = function (callback) {
    this.marshallerRender(HTMLWidget.prototype, callback);
    return this;
};

TargetMarshaller.prototype.commsError = function (source, error) {
    alert("Comms Error:\n" + source + "\n" + error);
};
