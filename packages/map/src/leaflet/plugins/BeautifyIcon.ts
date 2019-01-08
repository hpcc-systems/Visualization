import { Icon, point, Util } from "leaflet";

import "../../../src/leaflet/plugins/BeautifyIcon.css";

/*  Ported from https://github.com/marslan390/BeautifyMarker
    Changes:
        * Ported to TypeScript
        * Added @hpcc-js "selection" support
*/

const defaults = {

    iconColor: "#1EB300",

    iconAnchor: {
        "marker": [14, 34]
        , "circle": [11, 10]
        , "circle-dot": [5, 5]
        , "rectangle-dot": [5, 6]
        , "doughnut": [8, 8]
    },

    popupAnchor: {
        "marker": [0, -25]
        , "circle": [-3, -76]
        , "circle-dot": [0, -2]
        , "rectangle-dot": [0, -2]
        , "doughnut": [0, -2]
    },

    innerIconAnchor: {
        marker: [-2, 5]
        , circle: [0, 2]
    },

    iconSize: {
        "marker": [28, 28]
        , "circle": [22, 22]
        , "circle-dot": [2, 2]
        , "rectangle-dot": [2, 2]
        , "doughnut": [15, 15]
    }
};

const IconClass = Icon.extend({

    options: {
        icon: "leaf"
        , iconSize: defaults.iconSize.circle
        , iconAnchor: defaults.iconAnchor.marker
        , iconShape: "marker"
        , iconStyle: ""
        , innerIconAnchor: [0, 3] // circle with fa or glyphicon or marker with text
        , innerIconStyle: ""
        , isAlphaNumericIcon: false
        , text: 1
        , borderColor: defaults.iconColor
        , borderWidth: 2
        , borderStyle: "solid"
        , backgroundColor: "white"
        , textColor: defaults.iconColor
        , customClasses: ""
        , spin: false
        , prefix: "fa"
        , html: ""
    },

    initialize(options) {

        this.applyDefaults(options);
        this.options = (!options || !options.html) ? Util.setOptions(this, options) : options;
    },

    applyDefaults(options) {

        if (options) {
            if (!options.iconSize && options.iconShape) {
                options.iconSize = defaults.iconSize[options.iconShape];
            }

            if (!options.iconAnchor && options.iconShape) {
                options.iconAnchor = defaults.iconAnchor[options.iconShape];
            }

            if (!options.popupAnchor && options.iconShape) {
                options.popupAnchor = defaults.popupAnchor[options.iconShape];
            }

            if (!options.innerIconAnchor) {
                // if icon is type of circle or marker
                if (options.iconShape === "circle" || options.iconShape === "marker") {
                    if (options.iconShape === "circle" && options.isAlphaNumericIcon) { // if circle with text
                        options.innerIconAnchor = [0, -1];
                    } else if (options.iconShape === "marker" && !options.isAlphaNumericIcon) {// marker with icon
                        options.innerIconAnchor = defaults.innerIconAnchor[options.iconShape];
                    }
                }
            }
        }
    },

    createIcon() {

        const iconDiv = document.createElement("div");
        const options = this.options;

        iconDiv.innerHTML = !options.html ? this.createIconInnerHtml() : options.html;
        this._setIconStyles(iconDiv);

        // having a marker requires an extra parent div for rotation correction
        if (this.options.iconShape === "marker") {
            const wrapperDiv = document.createElement("div");
            wrapperDiv.className = "beautify-marker" + (options.props.owner._currSelRow === options.props.row ? " selected" : "");
            wrapperDiv.appendChild(iconDiv);
            return wrapperDiv;
        }

        return iconDiv;
    },

    createIconInnerHtml() {

        const options = this.options;

        if (options.iconShape === "circle-dot" || options.iconShape === "rectangle-dot" || options.iconShape === "doughnut") {
            return "";
        }

        const innerIconStyle = this.getInnerIconStyle(options);
        if (options.isAlphaNumericIcon) {
            return '<div style="' + innerIconStyle + '">' + options.text + "</div>";
        }

        let spinClass = "";
        if (options.spin) {
            spinClass = " fa-spin";
        }

        return '<i class="' + options.prefix + " " + options.icon + spinClass + '" style="' + innerIconStyle + '"></i>';
    },

    getInnerIconStyle(options) {

        const innerAnchor = point(options.innerIconAnchor);
        return "color:" + options.textColor + ";margin-top:" + innerAnchor.y + "px; margin-left:" + innerAnchor.x + "px;" + options.innerIconStyle;
    },

    _setIconStyles(iconDiv) {

        const options = this.options;
        const size = point(options.iconSize);
        const anchor = point(options.iconAnchor);

        iconDiv.className = "beautify-marker ";

        if (options.iconShape) {
            iconDiv.className += options.iconShape;
        }

        if (options.customClasses) {
            iconDiv.className += " " + options.customClasses;
        }

        iconDiv.style.backgroundColor = options.backgroundColor;
        iconDiv.style.color = options.textColor;
        iconDiv.style.borderColor = options.borderColor;
        iconDiv.style.borderWidth = options.borderWidth + "px";
        iconDiv.style.borderStyle = options.borderStyle;

        if (size) {
            iconDiv.style.width = size.x + "px";
            iconDiv.style.height = size.y + "px";
        }

        if (anchor) {
            iconDiv.style.marginLeft = (-anchor.x) + "px";
            iconDiv.style.marginTop = (-anchor.y) + "px";
        }

        if (options.iconStyle) {
            let cStyle = iconDiv.getAttribute("style");
            cStyle += options.iconStyle;
            iconDiv.setAttribute("style", cStyle);
        }
    }
});

export function BeautifyIcon(options) {
    return new (IconClass as any)(options);
}
