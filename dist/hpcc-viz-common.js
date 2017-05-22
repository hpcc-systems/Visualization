
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('common/Class.js',[], factory);
    } else {
        root.common_Class = factory();
    }
}(this, function () {
    function Class() {
    }
    Class.prototype.constructor = Class;
    Class.prototype._class = "common_Class";

    Class.prototype.class = function (_) {
        if (!arguments.length) return this._class;
        this._class = _;
        return this;
    };

    Class.prototype.classID = function () {
        return this._class.split(" ").pop();
    };

    Class.prototype.implements = function (source) {
        for (var prop in source) {
            if (source.hasOwnProperty(prop)) {
                if (this[prop] === undefined) {
                    this[prop] = source[prop];
                } else if (window.__hpcc_debug) {
                    console.log("Duplicate member:  " + prop);
                }
            }
        }
    };

    Class.prototype.mixin = function (mixinClass) {
        this.implements(mixinClass.prototype);
        //  Special case mixins  ---
        if (mixinClass.prototype.hasOwnProperty("_class")) {
            this._class += " " + mixinClass.prototype._class.split(" ").pop();
        }
    };

    Class.prototype.overrideMethod = function (methodID, newMethod) {
        if (this[methodID] === undefined) {
            throw "Method:  " + methodID + " does not exist.";
        }
        var origMethod = this[methodID];
        this[methodID] = function () {
            return newMethod(origMethod, arguments);
        };
        return this;
    };

    return Class;
}));


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('common/Platform.js',["d3", "es6-promise"], factory);
    } else {
        root.require = root.require || function (paths, cb) {
            if (typeof paths === "function") {
                cb = paths;
                paths = [];
            }

            var objs = paths.map(function (path) {
                var pathIdx = path.indexOf("src/") === 0 ? "src/".length :
                    path.indexOf("hpcc-viz/") === 0 ? "hpcc-viz/".length : 
                    path.indexOf("../") === 0 ? "../".length : 0;
                var prop = path.substring(pathIdx).split("/").join("_");
                return root[prop];
            });

            cb.apply(null, objs);
        };
        root.common_Platform = factory(root.d3);
    }
}(this, function (d3) {
    //  Do not touch - updated by gulp bump  ---
    var version = "1.16.0-beta3";

    function Platform() {
    }

    Platform.prototype.version = function () {
        return version;
    };

    Platform.prototype.ieVersion = (function () {
        var ua = navigator.userAgent, tem,
            M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if (/trident/i.test(M[1])) {
            tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
            return parseFloat(tem[1]);
        }
        if (/msie/i.test(M[1])) {
            return parseFloat(M[2]);
        }
        return null;
    })();
    Platform.prototype.isIE = Platform.prototype.ieVersion !== null;
    Platform.prototype.svgMarkerGlitch = Platform.prototype.isIE && Platform.prototype.ieVersion <= 12;
    Platform.prototype.MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver || function (callback) {
        //  Just enough for HTMLOverlay and C3  ---
        this.callback = callback;
        this.listeners = [];

        var MutationListener = function (callback, domNode, type) {
            this.callback = callback;
            this.domNode = domNode;
            this.type = type;
        };
        MutationListener.prototype = {
            handleEvent: function (evt) {
                var mutation = {
                    type: this.type,
                    target: this.domNode,
                    addedNodes: [],
                    removedNodes: [],
                    previousSibling: evt.target.previousSibling,
                    nextSibling: evt.target.nextSibling,
                    attributeName: null,
                    attributeNamespace: null,
                    oldValue: null
                };
                this.callback([mutation]);
            }
        };

        this.observe = function (domNode, config) {
            var listener = null;
            if (config.attributes) {
                listener = new MutationListener(this.callback, domNode, "attributes");
                this.listeners.push(listener);
                domNode.addEventListener("DOMAttrModified", listener, true);
            }

            if (config.characterData) {
                listener = new MutationListener(this.callback, domNode, "characterData");
                this.listeners.push(listener);
                domNode.addEventListener("DOMCharacterDataModified", listener, true);
            }

            if (config.childList) {
                listener = new MutationListener(this.callback, domNode, "childList");
                this.listeners.push(listener);
                domNode.addEventListener("DOMNodeInserted", listener, true);
                domNode.addEventListener("DOMNodeRemoved", listener, true);
            }
        };

        this.disconnect = function () {
            this.listeners.forEach(function (item) {
                switch (item.type) {
                    case "attributes":
                        item.domNode.removeEventListener("DOMAttrModified", item, true);
                        break;
                    case "characterData":
                        item.domNode.removeEventListener("DOMCharacterDataModified", item, true);
                        break;
                    case "childList":
                        item.domNode.removeEventListener("DOMNodeRemoved", item, true);
                        item.domNode.removeEventListener("DOMNodeInserted", item, true);
                        break;
                }
            });
            this.listeners = [];
        };
    };
    if (!window.MutationObserver) {
        window.MutationObserver = Platform.prototype.MutationObserver;
    }

    Platform.prototype._scrollBarWidth = null;
    Platform.prototype.getScrollbarWidth = function () {
        if (Platform.prototype._scrollBarWidth === null) {
            var outer = document.createElement("div");
            outer.style.visibility = "hidden";
            outer.style.width = "100px";
            outer.style.msOverflowStyle = "scrollbar";

            document.body.appendChild(outer);

            var widthNoScroll = outer.offsetWidth;
            outer.style.overflow = "scroll";

            var inner = document.createElement("div");
            inner.style.width = "100%";
            outer.appendChild(inner);

            var widthWithScroll = inner.offsetWidth;

            outer.parentNode.removeChild(outer);

            Platform.prototype._scrollBarWidth = widthNoScroll - widthWithScroll;
        }
        return Platform.prototype._scrollBarWidth;
    };

    Platform.prototype.debounce = function (func, threshold, execAsap) {
        return function debounced() {
            var obj = this || {}, args = arguments;
            function delayed() {
                if (!execAsap)
                    func.apply(obj, args);
                obj.__hpcc_debounce_timeout = null;
            }
            if (obj.__hpcc_debounce_timeout)
                clearTimeout(obj.__hpcc_debounce_timeout);
            else if (execAsap)
                func.apply(obj, args);
            obj.__hpcc_debounce_timeout = setTimeout(delayed, threshold || 100);
        };
    };

    Math.sign = Math.sign || function (x) {
        x = +x; // convert to a number
        if (x === 0 || isNaN(x)) {
            return x;
        }
        return x > 0 ? 1 : -1;
    };

    return Platform;
}));


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('common/PropertyExt.js',["./Class"], factory);
    } else {
        root.common_PropertyExt = factory(root.common_Class);
    }
}(this, function (Class) {
    var __meta_ = "__meta_";
    var __private_ = "__private_";
    var __prop_ = "__prop_";
    var __default_ = "__default_";

    function isMeta(key) {
        return key.indexOf(__meta_) === 0;
    }

    function isPrivate(obj, key) {
        return obj[__private_ + key];
    }

    function Meta(id, defaultValue, type, description, set, ext) {
        ext = ext || {};
        this.id = id;
        this.type = type;
        this.origDefaultValue = defaultValue;
        this.defaultValue = ext.optional && defaultValue === null ? undefined : defaultValue;
        this.description = description;
        this.set = set;
        this.ext = ext;

        switch (type) {
            case "set":
                this.checkedAssign = function (_) {
                    var options = typeof set === "function" ? set.call(this) : set;
                    if (!options || options.indexOf(_) < 0) {
                        console.error("Invalid value for '" + id + "':  " + _ + " expected " + type);
                    }
                    return _;
                };
                break;
            case "html-color":
                this.checkedAssign = function (_) {
                    if (window.__hpcc_debug && _ && _ !== "red") {
                        var litmus = "red";
                        var d = document.createElement("div");
                        d.style.color = litmus;
                        d.style.color = _;
                        //Element's style.color will be reverted to litmus or set to "" if an invalid color is given
                        if (d.style.color === litmus || d.style.color === "") {
                            console.error("Invalid value for '" + id + "':  " + _ + " expected " + type);
                        }
                    }
                    return _;
                };
                break;
            case "boolean":
                this.checkedAssign = function (_) {
                    return typeof (_) === "string" && ["false", "off", "0"].indexOf(_.toLowerCase()) >= 0 ? false : Boolean(_);
                };
                break;
            case "number":
                this.checkedAssign = function (_) {
                    return Number(_);
                };
                break;
            case "string":
                this.checkedAssign = function (_) {
                    return String(_);
                };
                break;
            case "array":
                this.checkedAssign = function (_) {
                    if (!(_ instanceof Array)) {
                        console.error("Invalid value for '" + id + "':  " + _ + " expected " + type);
                    }
                    return _;
                };
                break;
            case "object":
                this.checkedAssign = function (_) {
                    if (!(_ instanceof Object)) {
                        console.error("Invalid value for '" + id + "':  " + _ + " expected " + type);
                    }
                    return _;
                };
                break;
            case "widget":
                this.checkedAssign = function (_) {
                    if (!_._class || _._class.indexOf("common_PropertyExt") < 0) {
                        console.error("Invalid value for '" + id + "':  " + _ + " expected " + type);
                    }
                    return _;
                };
                break;
            case "widgetArray":
                this.checkedAssign = function (_) {
                    if (_.some(function (row) { return (!row._class || row._class.indexOf("common_Widget") < 0); })) {
                        console.error("Invalid value for '" + id + "':  " + _ + " expected " + type);
                    }
                    return _;
                };
                break;
            case "propertyArray":
                this.checkedAssign = function (_) {
                    if (_.some(function (row) { return !row.publishedProperties; })) {
                        console.log("Invalid value for '" + id + "':  " + _ + " expected " + type);
                    }
                    return _;
                };
                break;
            default:
                this.checkedAssign = function (_) {
                    if (window.__hpcc_debug) {
                        console.error("Unchecked property type for '" + id + "':  " + _ + " expected " + type);
                    }
                    return _;
                };
                break;
        }
    }

    function MetaProxy(id, proxy, method, defaultValue, ext) {
        this.id = id;
        this.type = "proxy";
        this.proxy = proxy;
        this.method = method;
        this.defaultValue = defaultValue;
        this.ext = ext || {};
    }

    var propExtID = 0;
    function PropertyExt() {
        Class.call(this);

        this._id = "_pe" + (++propExtID);
        this._watchArrIdx = 0;
        this._watchArr = {};

        this.publishedProperties(true).forEach(function (meta) {
            switch (meta.type) {
                case "array":
                case "widgetArray":
                case "propertyArray":
                    this[meta.id + "_reset"]();
                    break;
            }
        }, this);
    }
    PropertyExt.prototype = Object.create(Class.prototype);
    PropertyExt.prototype._class += " common_PropertyExt";

    PropertyExt.prototype.id = function () {
        return this._id;
    };

    // Publish Properties  ---
    PropertyExt.prototype.publishedProperties = function (includePrivate, expandProxies) {
        var retVal = [];
        for (var key in this) {
            if (isMeta(key) && (includePrivate || !isPrivate(this, key))) {
                var meta = this[key];
                if (expandProxies && meta.type) {
                    var item = this;
                    while (meta.type === "proxy") {
                        item = item[meta.proxy];
                        meta = item.publishedProperty(meta.method);
                    }
                    if (meta.id !== this[key].id) {
                        meta = JSON.parse(JSON.stringify(meta));  //  Clone meta so we can safely replace the id.
                        meta.id = this[key].id;
                    }
                }
                retVal.push(meta);
            }
        }
        return retVal;
    };

    PropertyExt.prototype.propertyWalker = function (filter, visitor) {
        this.publishedProperties(false, true).forEach(function (publishItem) {
            if (typeof (filter) !== "function" || !filter(this, publishItem)) {
                visitor(this, publishItem);
            }
        }, this);
    };

    PropertyExt.prototype.publishedProperty = function (id) {
        return this[__meta_ + id];
    };

    PropertyExt.prototype.publishedModified = function (id) {
        return this.publishedProperties().some(function (prop) {
            return this[prop.id + "_modified"]();
        }, this);
    };

    PropertyExt.prototype.publishReset = function (privateArr, exceptionsArr) {
        privateArr = (privateArr || []).map(function (id) { return __meta_ + id; });
        exceptionsArr = (exceptionsArr || []).map(function (id) { return __meta_ + id; });
        for (var key in this) {
            if (isMeta(key)) {
                var isPrivate = !privateArr.length || (privateArr.length && privateArr.indexOf(key) >= 0);
                var isException = exceptionsArr.indexOf(key) >= 0;
                if (isPrivate && !isException) {
                    this[__private_ + key] = true;
                }
            }
        }
    };

    PropertyExt.prototype.publish = function (id, defaultValue, type, description, set, ext) {
        ext = ext || {};
        if (this[__meta_ + id] !== undefined && !ext.override) {
            throw id + " is already published.";
        }
        var meta = this[__meta_ + id] = new Meta(id, defaultValue, type, description, set, ext);
        if (meta.ext.internal) {
            this[__private_ + id] = true;
        }
        this[id] = function (_) {
            if (!arguments.length) {
                if (this[id + "_disabled"]()) return this[id + "_default"]();
                return this[__prop_ + id] !== undefined ? this[__prop_ + id] : this[id + "_default"]();
            }
            if (_ === undefined) {
                _ = null;
            } else if (_ === "" && meta.ext.optional) {
                _ = null;
            } else if (_ !== null) {
                _ = meta.checkedAssign.call(this, _);
            }
            this.broadcast(id, _, this[__prop_ + id]);
            if (_ === null) {
                delete this[__prop_ + id];
            } else {
                this[__prop_ + id] = _;
            }
            return this;
        };
        this[id + "_disabled"] = function () {
            return ext && ext.disable ? !!ext.disable(this) : false;
        };
        this[id + "_modified"] = function () {
            return this[__prop_ + id] !== undefined;
        };
        this[id + "_exists"] = function () {
            return this[__prop_ + id] !== undefined || this[id + "_default"]() !== undefined;
        };
        this[id + "_default"] = function (_) {
            if (!arguments.length) return this[__default_ + id] !== undefined ? this[__default_ + id] : meta.defaultValue;
            if (_ === "") {
                _ = null;
            }
            if (_ === null) {
                delete this[__default_ + id];
            } else {
                this[__default_ + id] = _;
            }
            return this;
        };
        this[id + "_reset"] = function () {
            switch (type) {
                case "widget":
                    if (this[__prop_ + id]) {
                        this[__prop_ + id].target(null);
                    }
                    break;
                case "widgetArray":
                    if (this[__prop_ + id]) {
                        this[__prop_ + id].forEach(function (widget) {
                            widget.target(null);
                        });
                    }
                    break;
            }

            switch (type) {
                case "array":
                case "widgetArray":
                case "propertyArray":
                    this[__default_ + id] = this[id + "_default"]().map(function (row) { return row; });
                    break;
            }
            delete this[__prop_ + id];
            return this;
        };
        this[id + "_options"] = function () {
            if (typeof set === "function") {
                var retVal = meta.ext.optional ? [null] : [];
                return retVal.concat(set.apply(this, arguments));
            }
            return set;
        };
    };

    PropertyExt.prototype.publishWidget = function (prefix, WidgetType, id) {
        for (var key in WidgetType.prototype) {
            if (key.indexOf("__meta") === 0) {
                var publishItem = WidgetType.prototype[key];
                this.publishProxy(prefix + __prop_ + publishItem.id, id, publishItem.method || publishItem.id);
            }
        }
    };

    PropertyExt.prototype.publishProxy = function (id, proxy, method, defaultValue) {
        method = method || id;
        if (this[__meta_ + id] !== undefined) {
            throw id + " is already published.";
        }
        this[__meta_ + id] = new MetaProxy(id, proxy, method, defaultValue);
        this[id] = function (_) {
            if (!arguments.length) return defaultValue === undefined || this[id + "_modified"]() ? this[proxy][method]() : defaultValue;
            if (defaultValue !== undefined && _ === defaultValue) {
                this[proxy][method + "_reset"]();
            } else {
                this[proxy][method](_);
            }
            return this;
        };
        this[id + "_disabled"] = function () {
            return this[proxy][method + "_disabled"]();
        };
        this[id + "_modified"] = function () {
            return this[proxy][method + "_modified"]() && (defaultValue === undefined || this[proxy][method]() !== defaultValue);
        };
        this[id + "_exists"] = function () {
            return this[proxy][method + "_exists"]();
        };
        this[id + "_default"] = function (_) {
            if (!arguments.length) return this[proxy][method + "_default"]();
            this[proxy][method + "_default"](_);
            return this;
        };
        this[id + "_reset"] = function () {
            this[proxy][method + "_reset"]();
            return this;
        };
        this[id + "_options"] = function () {
            return this[proxy][method + "_options"]();
        };
    };

    PropertyExt.prototype.monitorProperty = function (propID, func) {
        var meta = this.publishedProperty(propID);
        switch (meta.type) {
            case "proxy":
                if (this[meta.proxy]) {
                    return this[meta.proxy].monitorProperty(meta.method, function (key, newVal, oldVal) {
                        func(meta.id, newVal, oldVal);
                    });
                } else {
                    return {
                        remove: function () {
                        }
                    };
                }
                break;
            default:
                var idx = this._watchArrIdx++;
                this._watchArr[idx] = { propertyID: propID, callback: func };
                var context = this;
                return {
                    remove: function () {
                        delete context._watchArr[idx];
                    }
                };
        }
        return null;
    };

    PropertyExt.prototype.monitor = function (func) {
        return {
            _watches: this.publishedProperties().map(function (meta) {
                    return this.monitorProperty(meta.id, func);
                }, this),
            remove: function () {
                this._watches.forEach(function (watch) {
                    watch.remove();
                });
            }
        };
    };

    PropertyExt.prototype.broadcast = function (key, newVal, oldVal, source) {
        source = source || this;
        if (newVal !== oldVal) {
            for (var idx in this._watchArr) {
                var monitor = this._watchArr[idx];
                if ((monitor.propertyID === undefined || monitor.propertyID === key) && monitor.callback) {
                    setTimeout(function (monitor) {
                        monitor.callback(key, newVal, oldVal, source);
                    }, 0, monitor);
                }
            }
        }
    };

    PropertyExt.prototype.applyTheme = function (theme) {
        if (!theme) {
            return;
        }
        var clsArr = this._class.split(" ");
        for (var i in clsArr) {
            if (theme[clsArr[i]]) {
                for (var paramName in theme[clsArr[i]]) {
                    if (paramName === "overrideTags" && theme[clsArr[i]][paramName] instanceof Object) {
                        for (var param in theme[clsArr[i]][paramName]) {
                            if(this.publishedProperty(paramName).ext){
                                this.publishedProperty(paramName).ext.tags = theme[clsArr[i]][paramName][param];
                            }
                        }
                        continue;
                    }
                    if (this.publishedProperty(paramName)) {
                        this.publishedProperty(paramName).defaultValue = theme[clsArr[i]][paramName];
                    }
                }
            }
        }
    };

    PropertyExt.prototype.copyPropsTo = function (other) {
        this.publishedProperties(false).forEach(function (meta) {
            if (this[meta.id + "_exists"]()) {
                other[meta.id](this[meta.id]());
            } else {
                other[meta.id + "_reset"]();
            }
        }, this);
    };

    return PropertyExt;
}));


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('common/Utility.js',["d3", "require", "es6-promise"], factory);
    } else {
        root.common_Utility = factory(root.d3, root.require);
    }
}(this, function (d3, require) {

    function _naturalSort(a, b, order, idx, sortCaseSensitive) {
        var re = /(^([+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?)?$|^0x[0-9a-f]+$|\d+)/gi,
            sre = /(^[ ]*|[ ]*$)/g,
            dre = /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/,
            hre = /^0x[0-9a-f]+$/i,
            ore = /^0/,
            i = function(s) { return !sortCaseSensitive && ("" + s).toLowerCase() || "" + s; },
            // convert all to strings strip whitespace
            x = i(idx ? a[idx] : a).replace(sre, "") || "",
            y = i(idx ? b[idx] : b).replace(sre, "") || "",
            // chunk/tokenize
            xN = x.replace(re, "\0$1\0").replace(/\0$/,"").replace(/^\0/,"").split("\0"),
            yN = y.replace(re, "\0$1\0").replace(/\0$/,"").replace(/^\0/,"").split("\0"),
            // numeric, hex or date detection
            xD = parseInt(x.match(hre), 16) || (xN.length !== 1 && x.match(dre) && Date.parse(x)),
            yD = parseInt(y.match(hre), 16) || xD && y.match(dre) && Date.parse(y) || null,
            oFxNcL, oFyNcL;
        // first try and sort Hex codes or Dates
        if (yD) {
            if ( xD < yD ) { return order === "ascending" ? -1 : 1; }
            else if ( xD > yD ) { return order === "ascending" ? 1 : -1; }
        }
        // natural sorting through split numeric strings and default strings
        for(var cLoc=0, numS=Math.max(xN.length, yN.length); cLoc < numS; cLoc++) {
            // find floats not starting with "0", string or 0 if not defined (Clint Priest)
            oFxNcL = !(xN[cLoc] || "").match(ore) && parseFloat(xN[cLoc]) || xN[cLoc] || 0;
            oFyNcL = !(yN[cLoc] || "").match(ore) && parseFloat(yN[cLoc]) || yN[cLoc] || 0;
            // handle numeric vs string comparison - number < string - (Kyle Adams)
            if (isNaN(oFxNcL) !== isNaN(oFyNcL)) { return (isNaN(oFxNcL)) ? 1 : -1; }
            // rely on string comparison if different types - i.e. "02" < 2 != "02" < "2"
            else if (typeof oFxNcL !== typeof oFyNcL) {
                oFxNcL += "";
                oFyNcL += "";
            }
            if (oFxNcL < oFyNcL) { return order === "ascending" ? -1 : 1; }
            if (oFxNcL > oFyNcL) { return order === "ascending" ? 1 : -1; }
        }
        return 0;
    }

    //  Selection Bag(s)  ---
    function SelectionBag() {
        this.items = {};
    }

    SelectionBag.prototype.clear = function () {
        for (var key in this.items) {
            this.items[key].element().classed("selected", false);
        }
        this.items = {};
    };

    SelectionBag.prototype.isEmpty = function () {
        for (var key in this.items) { // jshint ignore:line
            return false;
        }
        return true;
    };

    SelectionBag.prototype.append = function (item) {
        this.items[item._id] = item;
        item.element().classed("selected", true);
    };

    SelectionBag.prototype.remove = function (item) {
        this.items[item._id].element().classed("selected", false);
        delete this.items[item._id];
    };

    SelectionBag.prototype.isSelected = function (item) {
        return this.items[item._id] !== undefined;
    };

    SelectionBag.prototype.get = function () {
        var retVal = [];
        for (var key in this.items) {
            retVal.push(this.items[key]);
        }
        return retVal;
    };

    SelectionBag.prototype.set = function (itemArray) {
        this.clear();
        itemArray.forEach(function (item, idx) {
            this.append(item);
        }, this);
    };

    SelectionBag.prototype.click = function (item, d3Event) {
        if (d3Event.ctrlKey) {
            if (this.items[item._id]) {
                this.remove(item);
            } else {
                this.append(item);
            }
        } else {
            this.clear();
            this.append(item);
        }
    };

    function SimpleSelection(widgetElement, skipBringToTop) {
        this.widgetElement(widgetElement);
        this.skipBringToTop(skipBringToTop);
    }
    SimpleSelection.prototype.widgetElement = function (_) {
        if (!arguments.length) return this._widgetElement;
        this._widgetElement = _;
        return this;
    };
    SimpleSelection.prototype.skipBringToTop = function (_) {
        if (!arguments.length) return this._skipBringToTop;
        this._skipBringToTop = _;
        return this;
    };
    SimpleSelection.prototype.enter = function (elements) {
        var context = this;
        elements
            .each(function (d) {
                var selected = context._initialSelection ? context._initialSelection.indexOf(JSON.stringify(d)) >= 0 : false;
                d3.select(this)
                    .classed("selected", selected)
                    .classed("deselected", !selected)
                ;
            })
            .on("click.SimpleSelection", function (d, idx) {
                if (!context._skipBringToTop) {
                    this.parentNode.appendChild(this);
                }
                var element = d3.select(this);
                var wasSelected = element.classed("selected");
                context._widgetElement.selectAll(".selected")
                    .classed("selected", false)
                    .classed("deselected", true)
                ;
                if (!wasSelected) {
                    element
                        .classed("selected", true)
                        .classed("deselected", false)
                    ;
                }
            })
            .on("mouseover.SimpleSelection", function (d, idx) {
                d3.select(this)
                    .classed("over", true)
                ;
            })
            .on("mouseout.SimpleSelection", function (d, idx) {
                d3.select(this)
                    .classed("over", null)
                ;
            })
        ;
    };
    SimpleSelection.prototype.selected = function (domNode) {
        return d3.select(domNode).classed("selected");
    };
    SimpleSelection.prototype.selection = function (_) {
        if (!arguments.length) {
            var retVal = [];
            if (this._widgetElement) {
                this._widgetElement.selectAll(".selected")
                    .each(function (d) { retVal.push(JSON.stringify(d)); })
                ;
            }
            return retVal;
        }
        if (this._widgetElement) {
            this._widgetElement.selectAll(".selected,.deselected")
                .each(function (d) {
                    var selected = _.indexOf(JSON.stringify(d)) >= 0;
                    d3.select(this)
                        .classed("selected", selected)
                        .classed("deselected", !selected)
                    ;
                })
            ;
        } else {
            this._initialSelection = _;
        }
        return this;
    };

    function SimpleSelectionMixin(skipBringToTop) {
        this._selection = new SimpleSelection(null, skipBringToTop);
    }

    SimpleSelectionMixin.prototype.serializeState = function () {
        return {
            selection: this._selection.selection(),
            data: this.data()
        };
    };

    SimpleSelectionMixin.prototype.deserializeState = function (state) {
        if (state) {
            this._selection.selection(state.selection);
            if (state.data) {
                this.data(state.data);
            }
        }
        return this;
    };

    var perf = window.performance;
    var now = perf && (perf.now || perf.mozNow || perf.msNow || perf.oNow || perf.webkitNow);

    return {
        naturalSort: function(data, order, idx, sortCaseSensitive) {
            return data.slice(0).sort(function(a,b) {
                return _naturalSort(a,b,order,idx,sortCaseSensitive);
            });
        },

        multiSort: function (data, sortBy) {
            if (sortBy && sortBy.length) {
                data.sort(function (l, r) {
                    for (var i = 0; i < sortBy.length; ++i) {
                        var lVal = l[sortBy[i].idx];
                        var rVal = r[sortBy[i].idx];
                        if (lVal !== rVal) {
                            return sortBy[i].reverse ? d3.descending(lVal, rVal) : d3.ascending(lVal, rVal);
                        }
                    }
                    return 0;
                });
            }
            return data;
        },

        Selection: SelectionBag,
        SimpleSelection: SimpleSelection,
        SimpleSelectionMixin: SimpleSelectionMixin,

        urlParams: function () {
            var def = window.location.search.split("?")[1];
            var retVal = {};
            if (def) {
                def.split("&").forEach(function (param, idx) {
                    var paramParts = param.split("=");
                    switch (paramParts.length) {
                        case 1:
                            retVal[decodeURIComponent(paramParts[0])] = undefined;
                            break;
                        case 2:
                            retVal[decodeURIComponent(paramParts[0])] = decodeURIComponent(paramParts[1]);
                            break;
                        default:
                            throw "Invalid URL Param:  " + param;
                    }
                });
            }
            return retVal;
        },
        endsWith: function(str, searchStr, pos) {
            var subjectString = str.toString();
            if (typeof pos !== "number" || !isFinite(pos) || Math.floor(pos) !== pos || pos > subjectString.length) {
                pos = subjectString.length;
            }
            pos -= searchStr.length;
            var lastIndex = subjectString.indexOf(searchStr, pos);
            return lastIndex !== -1 && lastIndex === pos;
        },
        d3ArrayAdapter: function (array) {
            return {
                ownerDocument: {
                    createElement: function (tagName) {
                        return {
                            get __data__() { return this.row; },
                            set __data__(_) { this.row = array[this.index] = _; }
                        };
                    },
                    createElementNS: function (ns, tagName) {
                        return this.createElement(tagName);
                    }
                },
                querySelectorAll: function (selectors) {
                    if (selectors) throw "unsupported";
                    var context = this;
                    return array.map(function (row, idx) {
                        return {
                            ownerDocument: context.ownerDocument,
                            parentNode: context,
                            get __data__() { return row; },
                            set __data__(_) { array[idx] = _; }
                        };
                    });
                },
                appendChild: function (node) {
                    node.parentNode = this;
                    node.index = array.length;
                    array.push(null);
                    return node;
                },
                insertBefore: function (node, referenceNode) {
                    var idx = array.indexOf(node.__data__);
                    var refIdx = array.indexOf(referenceNode.__data__);
                    if (idx > refIdx) {
                        array.splice(refIdx, 0, array.splice(idx, 1)[0]);
                    } else if (idx < refIdx - 1) {
                        array.splice(refIdx - 1, 0, array.splice(idx, 1)[0]);
                    }
                    return node;
                },
                removeChild: function (node) {
                    array.splice(array.indexOf(node.__data__), 1);
                    return node;
                }
            };
        },
        downloadBlob: function (format, blob, id, ext) {
            var currentdate = new Date(); 
            var timeFormat =  d3.time.format("%Y-%m-%dT%H_%M_%S");
            var now = timeFormat(currentdate);
            id = id || "data" + "_" + now + "." + format.toLowerCase();

            var filename = id + (ext ? "." + ext : "");
            
            var mimeType = "";
            switch (format) {
                case "TSV":
                    mimeType = "text/tab-seperated-values";
                    break;
                case "JSON":
                    mimeType = "application/json";
                    break;
                default:
                    mimeType = "text/csv";
            }

            var a = document.createElement('a');
            if (navigator.msSaveBlob) { // IE10+
                a = null;
                return navigator.msSaveBlob(new Blob([blob], { type: mimeType }), filename);
            } else if ('download' in a) { //html 5
                a.href = 'data:' + mimeType + ',' + encodeURIComponent(blob);
                a.setAttribute('download', filename);
                document.body.appendChild(a);
                setTimeout(function() {
                    a.click();
                    document.body.removeChild(a);
                }, 10);
                return true;
            } else { //old chrome and FF:
                a = null;
                var frame = document.createElement('iframe');
                document.body.appendChild(frame);
                frame.src = 'data:' + mimeType + ',' + encodeURIComponent(blob);

                setTimeout(function() {
                    document.body.removeChild(frame);
                }, 100);
                return true;
            }

            return false;
        },
        widgetPath: function (classID) {
            return "../" + classID.split("_").join("/");
        },
        parseClassID: function (classID, prefix) {
            prefix = prefix || "..";
            var parts = classID.split(".");
            return {
                path: prefix + "/" + parts[0].split("_").join("/"),
                memberWidgetID: parts.length > 1 ? parts[1] : null
            };
        },
        requireWidget: function (classID) {
            var context = this;
            return new Promise(function (resolve, reject) {
                var parsedClassID = context.parseClassID(classID);
                require([parsedClassID.path], function (Widget) {
                    resolve(parsedClassID.memberWidgetID ? (Widget.prototype ? Widget.prototype[parsedClassID.memberWidgetID] : Widget[parsedClassID.memberWidgetID]) : Widget);
                });
            });
        },
        checksum: function (s) {
            if (s instanceof Array) {
                s = s.join("") + s.length;
            }
            switch (typeof s) {
                case "string":
                    break;
                default:
                    s = "" + s;
            }
            var chk = 0x12345678;
            for (var i = 0, l = s.length; i < l; ++i) {
                chk += (s.charCodeAt(i) * (i + 1));
            }
            return (chk & 0xffffffff).toString(16);
        },
        getTime: function () {
            return (now && now.call(perf)) || (new Date().getTime());
        },
        mixin: function (dest, sources) {
            dest = dest || {};
            for (var i = 1, l = arguments.length; i < l; i++) {
                _mixin(dest, arguments[i]);
            }
            return dest;

            function _mixin(dest, source) {
                var s, empty = {};
                for (var key in source) {
                    s = source[key];
                    if (!(key in dest) || (dest[key] !== s && (!(key in empty) || empty[key] !== s))) {
                        dest[key] = s;
                    }
                }
                return dest;
            }
        },
        exists: function (prop, scope) {
            if (!prop || !scope) {
                return false;
            }
            var propParts = prop.split(".");
            var testScope = scope;
            for (var i = 0; i < propParts.length; ++i) {
                var item = propParts[i];
                if (testScope[item] === undefined) {
                    return false;
                }
                testScope = testScope[item];
            }
            return true;
        },
        logStringify: function (obj) {
            var cache = [];
            return JSON.stringify(obj, function (key, value) {
                if (typeof value === 'object' && value !== null) {
                    if (cache.indexOf(value) !== -1) {
                        return;
                    }

                    cache.push(value);
                }
                return value;
            });
        }
    };
}));


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('common/Database.js',["d3", "./Class", "./PropertyExt", "./Utility"], factory);
    } else {
        root.common_Database = factory(root.d3, root.common_Class, root.common_PropertyExt, root.common_Utility);
    }
}(this, function (d3, Class, PropertyExt, Utility) {
    //  Field  ---
    function Field(id) {
        Class.call(this);
        PropertyExt.call(this);

        this._id = id || this._id;
    }
    Field.prototype = Object.create(Class.prototype);
    Field.prototype.constructor = Field;
    Field.prototype.mixin(PropertyExt);
    Field.prototype._class += " common_Database.Field";

    Field.prototype.id = function () {
        return this._id;
    };

    Field.prototype.checksum = function () {
        return Utility.checksum(this.label() + this.type() + this.mask() + this.format());
    };

    Field.prototype.publish("label", "", "string", "Label", null, { optional: true });
    Field.prototype.publish("type", "", "set", "Type", ["", "string", "number", "boolean", "time", "hidden"], { optional: true });
    Field.prototype.publish("mask", "", "string", "Time Mask", null, { disable: function (w) { return w.type() !== "time"; }, optional: true });
    Field.prototype.publish("format", "", "string", "Format", null, { optional: true });

    Field.prototype.typeTransformer = function (_) {
        switch (this.type()) {
            case "number":
                return Number(_);
            case "string":
                return String(_);
            case "boolean":
                return typeof (_) === "string" && ["false", "off", "0"].indexOf(_.toLowerCase()) >= 0 ? false : Boolean(_);
            case "time":
            case "date":
                return this.maskTransformer(_);
        }
        return _;
    };

    Field.prototype.maskTransformer = function (_) {
        return this.formatter(this.mask()).parse(_);
    };

    Field.prototype.formatTransformer = function (_) {
        return this.formatter(this.format())(_);
    };

    Field.prototype.parse = function (_) {
        if (!_) {
            return _;
        }
        try {
            return this.typeTransformer(_);
        } catch (e) {
            console.log("Unable to parse:  " + _);
            return null;
        }
    };

    Field.prototype.transform = function (_) {
        if (!_) {
            return _;
        }
        try {
            return this.formatTransformer(this.typeTransformer(_));
        } catch (e) {
            console.log("Unable to transform:  " + _);
            return null;
        }
    };

    Field.prototype.clone = function () {
        var context = this;
        var retVal = new Field(this._id);
        cloneProp(retVal, "label");
        cloneProp(retVal, "type");
        cloneProp(retVal, "mask");
        cloneProp(retVal, "format");

        function cloneProp(dest, key) {
            dest[key + "_default"](context[key + "_default"]());
            if (context[key + "_exists"]()) {
                dest[key](context[key]());
            }
        }
        return retVal;
    };

    Field.prototype.formatter = function (format) {
        var retVal;
        if (!format) {
            retVal = function (_) {
                return _;
            };
            retVal.parse = function (_) {
                return _;
            };
            return retVal;
        }
        switch (this.type()) {
            case "time":
            case "date":
                return d3.time.format(format);
        }
        retVal = d3.format(format);
        retVal.parse = function (_) {
            return _;
        };
        return retVal;
    };

    //  Grid  ---
    function Grid(dataChecksum) {
        dataChecksum = dataChecksum || false;
        Class.call(this);
        PropertyExt.call(this);
        this._dataChecksum = dataChecksum;
        this._dataVersion = 0;
        this.clear();
    }
    Grid.prototype = Object.create(Class.prototype);
    Grid.prototype.constructor = Grid;
    Grid.prototype.mixin(PropertyExt);
    Grid.prototype._class += " common_Database.Grid";

    Grid.prototype.publish("fields", [], "propertyArray", "Fields");

    Grid.prototype.clear = function () {
        this.fields([]);
        this._data = [];
        this._dataChecksums = [];
        ++this._dataVersion;
        return this;
    };

    //  Backward compatability  ---
    Grid.prototype.resetColumns = function (_) {
        var fields = this.fields();
        this.legacyColumns([]);
        this.legacyColumns(fields.map(function (field) {
            return field.label();
        }));
    };

    Grid.prototype.legacyColumns = function (_, asDefault) {
        if (!arguments.length) return this.row(0);
        this.row(0, _, asDefault);
        return this;
    };

    Grid.prototype.legacyData = function (_, clone) {
        return Grid.prototype.data.apply(this, arguments);
    };

    //  Meta  ---
    Grid.prototype.field = function (idx) {
        return this.fields()[idx];
    };

    var fieldsOrig = Grid.prototype.fields;
    Grid.prototype.fields = function (_, clone) {
        if (!arguments.length) return fieldsOrig.apply(this, arguments);
        return fieldsOrig.call(this, clone ? _.map(function (d) { return d.clone(); }) : _);
    };

    Grid.prototype.fieldByLabel = function (_, ignoreCase) {
        return this.fields().filter(function (field, idx) { field.idx = idx; return ignoreCase ? field.label().toLowerCase() === _.toLowerCase() : field.label() === _; })[0];
    };

    Grid.prototype.data = function (_, clone) {
        if (!arguments.length) return this._data;
        this._data = clone ? _.map(function (d) { return d.map(function (d2) { return d2; }); }) : _;
        this._dataCalcChecksum();
        return this;
    };

    Grid.prototype.parsedData = function () {
        var context = this;
        return this._data.map(function (row) {
            return row.map(function (cell, idx) {
                return context.fields()[idx].parse(cell);
            });
        });
    };

    Grid.prototype.formattedData = function () {
        var context = this;
        return this._data.map(function (row) {
            return row.map(function (cell, idx) {
                return context.fields()[idx].transform(cell);
            });
        });
    };

    Grid.prototype.fieldsChecksum = function () {
        return Utility.checksum(this.fields().map(function (field) { return field.checksum(); }));
    };

    Grid.prototype.dataChecksum = function () {
        return Utility.checksum(this._dataChecksum ? this._dataChecksums : this._dataVersion);
    };

    Grid.prototype.checksum = function () {
        return Utility.checksum([this.dataChecksum(), this.fieldsChecksum()]);
    };

    //  Row Access  ---
    Grid.prototype._dataCalcChecksum = function (idx) {
        ++this._dataVersion;
        if (this._dataChecksum) {
            if (arguments.length) {
                this._dataChecksums[idx] = Utility.checksum(this._data[idx]);
            } else {
                this._dataChecksums = this._data.map(function (row) { return Utility.checksum(row); });
            }
        }
        return this;
    };

    Grid.prototype.row = function (row, _, asDefault) {
        if (arguments.length < 2) return row === 0 ? this.fields().map(function (d) { return d.label(); }) : this._data[row - 1];
        if (row === 0) {
            var fieldsArr = this.fields();
            this.fields(_.map(function (label, idx) {
                if (asDefault) {
                    return (fieldsArr[idx] || new Field()).label_default(label);
                } else {
                    return (fieldsArr[idx] || new Field()).label(label);
                }
            }, this));
        } else {
            this._data[row - 1] = _;
            this._dataCalcChecksum(row - 1);
        }
        return this;
    };

    Grid.prototype.rows = function (_) {
        if (!arguments.length) return [this.row(0)].concat(this._data);
        this.row(0, _[0]);
        this._data = _.filter(function (row, idx) { return idx > 0; });
        this._dataCalcChecksum();
        return this;
    };

    //  Column Access  ---
    Grid.prototype.column = function (col, _) {
        if (arguments.length < 2) return [this.fields()[col].label()].concat(this._data.map(function (row, idx) { return row[col]; }));
        _.forEach(function (d, idx) {
            if (idx === 0) {
                this.fields()[col] = new Field().label(_[0]);
            } else {
                this._data[idx - 1][col] = d;
                this._dataCalcChecksum(idx - 1);
            }
        }, this);
        return this;
    };

    Grid.prototype.columnData = function (col, _) {
        if (arguments.length < 2) return this._data.map(function (row, idx) { return row[col]; });
        _.forEach(function (d, idx) {
            this._data[idx][col] = d;
            this._dataCalcChecksum(idx);
        }, this);
        return this;
    };

    Grid.prototype.columns = function (_) {
        if (!arguments.length) return this.fields().map(function (col, idx) {
            return this.column(idx);
        }, this);
        _.forEach(function (col, idx) {
            this.column(idx, _[idx]);
        }, this);
        return this;
    };

    //  Cell Access  ---
    Grid.prototype.cell = function (row, col, _) {
        if (arguments.length < 3) return this.row(row)[col];
        if (row === 0) {
            this.fields()[col] = new Field().label(_);
        } else {
            this._data[row][col] = _;
            this._dataCalcChecksum(row);
        }
        return this;
    };

    //  Grid Access  ---
    Grid.prototype.grid = function (_) {
        return Grid.prototype.rows.apply(this, arguments);
    };

    //  Hipie Helpers  ---
    Grid.prototype.hipieMapSortArray = function (sort) {
        return sort.map(function (sortField) {
            var reverse = false;
            if (sortField.indexOf("-") === 0) {
                sortField = sortField.substring(1);
                reverse = true;
            }
            var field = this.fieldByLabel(sortField, true);
            if (!field) {
                console.log("Grid.prototype.hipieMapSortArray:  Invalid sort array - " + sortField);
            }
            return {
                idx: field ? field.idx : -1,
                reverse: reverse
            };
        }, this).filter(function(d) { return d.idx >= 0; });
    };

    Grid.prototype.hipieMappings = function (columns, missingDataString) {
        missingDataString = missingDataString || "";
        if (!this.fields().length || !this._data.length) {
            return [];
        }
        var mappedColumns = [];
        var hasRollup = false;
        columns.forEach(function (mapping, idx) {
            var mappedColumn = {
                groupby: false,
                func: "",
                params: []
            };
            if (mapping.hasFunction()) {
                mappedColumn.func = mapping.function();
                if (mappedColumn.func === "SCALE") {
                    mappedColumn.groupby = true;
                } else {
                    hasRollup = true;
                }

                mapping.params().forEach(function (param) {
                    var field = this.fieldByLabel(param, true);
                    mappedColumn.params.push(field ? field.idx : -1);
                }, this);
            } else {
                mappedColumn.groupby = true;
                var field = this.fieldByLabel(mapping.id(), true);
                mappedColumn.params.push(field ? field.idx : -1);
            }
            mappedColumns.push(mappedColumn);
        }, this);

        if (hasRollup) {
            var retVal = [];
            this.rollup(mappedColumns.filter(function (mappedColumn) {
                return mappedColumn.groupby === true;
            }).map(function (d) {
                return d.params[0];
            }), function (leaves) {
                var row = mappedColumns.map(function (mappedColumn) {
                    var param1 = mappedColumn.params[0];
                    var param2 = mappedColumn.params[1];
                    switch (mappedColumn.func) {
                        case "SUM":
                            return d3.sum(leaves, function (d) { return d[param1]; });
                        case "AVE":
                            return d3.mean(leaves, function (d) { return d[param1] / d[param2]; });
                        case "MIN":
                            return d3.min(leaves, function (d) { return d[param1]; });
                        case "MAX":
                            return d3.max(leaves, function (d) { return d[param1]; });
                        case "SCALE":
                            console.log("Unexpected function:  " + mappedColumn.func);
                            //  All leaves should have the same values, use mean just in case they don't?  
                            return d3.mean(leaves, function (d) { return d[param1] / +param2; });
                    }
                    //  All leaves should have the same value.
                    return leaves[0][param1];
                });
                retVal.push(row);
                return row;
            });
            return retVal;
        } else {
            return this._data.map(function (row) {
                return mappedColumns.map(function (mappedColumn) {
                    var param1 = mappedColumn.params[0];
                    var param2 = mappedColumn.params[1];
                    switch (mappedColumn.func) {
                        case "SCALE":
                            return row[param1] / +param2;
                        case "SUM":
                        case "AVE":
                        case "MIN":
                        case "MAX":
                            console.log("Unexpected function:  " + mappedColumn.func);
                    }
                    return row[param1];
                });
            });
        }
    };

    //  Views  ---
    function LegacyView(grid) {
        this._grid = grid;
        d3.rebind(this, this._grid, "checksum", "fields");
    }
    LegacyView.prototype.constructor = LegacyView;

    LegacyView.prototype.grid = function () {
        return this._grid;
    };
    LegacyView.prototype.columns = function (_) {
        if (!arguments.length) return this._grid.legacyColumns();
        this._grid.legacyColumns(_);
        return this;
    };
    LegacyView.prototype.rawData = function (_) {
        if (!arguments.length) return this._grid.legacyData();
        this._grid.legacyData(_);
        return this;
    };
    LegacyView.prototype.formattedData = function () {
        if (this._formattedDataChecksum !== this._grid.checksum()) {
            this._formattedDataChecksum = this._grid.checksum();
            this._formattedData = this._grid.formattedData();
        }
        return this._formattedData;
    };
    LegacyView.prototype.parsedData = function () {
        if (this._parsedDataChecksum !== this._grid.checksum()) {
            this._parsedDataChecksum = this._grid.checksum();
            this._parsedData = this._grid.parsedData();
        }
        return this._parsedData;
    };
    LegacyView.prototype._whichData = function (opts) {
        if (opts) {
            if (opts.parsed) {
                return this.formattedData();
            } else if (opts.formatted) {
                return this.formattedData();
            }
        }
        return this.rawData();
    };
    LegacyView.prototype.data = function (_) {
        return LegacyView.prototype.rawData.apply(this, arguments);
    };

    function RollupView(grid, columns, rollup) {
        LegacyView.call(this, grid);
        if (!(columns instanceof Array)) {
            columns = [columns];
        }
        this._columnIndicies = columns.filter(function (column) { return column; }).map(function (column) {
            switch (typeof column) {
                case "string":
                    return this._grid.fieldByLabel(column).idx;
            }
            return column;
        }, this);

        rollup = rollup || function (d) { return d; };
        this._rollup = rollup;
    }
    RollupView.prototype = Object.create(LegacyView.prototype);
    RollupView.prototype.constructor = RollupView;

    RollupView.prototype.nest = function () {
        if (this._nestChecksum !== this._grid.checksum()) {
            this._nestChecksum = this._grid.checksum();

            var nest = d3.nest();
            this._columnIndicies.forEach(function (idx) {
                nest.key(function (d) {
                    return d[idx];
                });
            });
            this._nest = nest
                .rollup(this._rollup)
            ;
        }
        return this._nest;
    };
    RollupView.prototype.entries = function (opts) {
        return this.nest().entries(this._whichData(opts));
    };
    RollupView.prototype.map = function (opts) {
        return this.nest().map(this._whichData(opts));
    };
    RollupView.prototype.d3Map = function (opts) {
        return this.nest().map(this._whichData(opts), d3.map);
    };
    RollupView.prototype._walkData = function (entries, prevRow) {
        prevRow = prevRow || [];
        var retVal = [];
        entries.forEach(function (entry) {
            if (entry instanceof Array) {
                retVal.push(prevRow.concat([entry]));
            } else {
                retVal = retVal.concat(this._walkData(entry.values, prevRow.concat([entry.key])));
            }
        }, this);
        return retVal;
    };
    RollupView.prototype.data = function (opts) {
        return this._walkData(this.entries(opts));
    };

    Grid.prototype.legacyView = function () {
        return new LegacyView(this);
    };

    Grid.prototype.nestView = function (columnIndicies) {
        return new RollupView(this, columnIndicies);
    };

    Grid.prototype.rollupView = function (columnIndicies, rollupFunc) {
        return new RollupView(this, columnIndicies, rollupFunc);
    };

    Grid.prototype.aggregateView = function (columnIndicies, aggrType, aggrColumn, aggrDeltaColumn) {
        var context = this;
        return new RollupView(this, columnIndicies, function (values) {
            switch (aggrType) {
                case null:
                case undefined:
                case "":
                    values.aggregate = values.length;
                    return values;
                default:
                    var columns = context.legacyColumns();
                    var colIdx = columns.indexOf(aggrColumn);
                    var deltaIdx = columns.indexOf(aggrDeltaColumn);
                    values.aggregate = d3[aggrType](values, function (value) {
                        return (+value[colIdx] - (deltaIdx >= 0 ? +value[deltaIdx] : 0)) / (deltaIdx >= 0 ? +value[deltaIdx] : 1);
                    });
                    return values;
            }
        });
    };

    //  Nesting  ---
    Grid.prototype._nest = function (columnIndicies, rollup) {
        if (!(columnIndicies instanceof Array)) {
            columnIndicies = [columnIndicies];
        }
        var nest = d3.nest();
        columnIndicies.forEach(function (idx) {
            nest.key(function (d) {
                return d[idx];
            });
        });
        return nest;
    };

    Grid.prototype.nest = function (columnIndicies) {
        return this._nest(columnIndicies)
            .entries(this._data)
        ;
    };

    Grid.prototype.rollup = function (columnIndicies, rollup) {
        return this._nest(columnIndicies)
            .rollup(rollup)
            .entries(this._data)
        ;
    };

    //  Util  ---
    Grid.prototype.length = function () {
        return this._data.length + 1;
    };

    Grid.prototype.width = function () {
        return this.fields().length;
    };

    Grid.prototype.pivot = function () {
        this.resetColumns();
        this.rows(this.columns());
        return this;
    };

    Grid.prototype.clone = function (deep) {
        return new Grid()
            .fields(this.fields(), deep)
            .data(this.data(), deep)
        ;
    };

    Grid.prototype.filter = function (filter) {
        var filterIdx = {};
        this.row(0).forEach(function(col, idx) {
            filterIdx[col] = idx;
        });
        return new Grid()
            .fields(this.fields(), true)
            .data(this.data().filter(function (row) {
                for (var key in filter) {
                    if (filter[key] !== row[filterIdx[key]]) {
                        return false;
                    }
                }
                return true;
            }))
        ;
    };

    var lastFoundFormat = null;
    Grid.prototype.analyse = function (columns) {
        if (!(columns instanceof Array)) {
            columns = [columns];
        }
        var retVal = [];
        columns.forEach(function (col) {
            var rollup = this.rollup(col, function (leaves) {
                return leaves.length;
            });
            retVal.push(rollup);
            var keys = rollup.map(function (d) { return d.key; });
            this.fields()[col].isBoolean = typeTest(keys, isBoolean);
            this.fields()[col].isNumber = typeTest(keys, isNumber);
            this.fields()[col].isString = !this.fields()[col].isNumber && typeTest(keys, isString);
            this.fields()[col].isUSState = this.fields()[col].isString && typeTest(keys, isUSState);
            this.fields()[col].isDateTime = this.fields()[col].isString && typeTest(keys, isDateTime);
            this.fields()[col].isDateTimeFormat = lastFoundFormat;
            this.fields()[col].isDate = !this.fields()[col].isDateTime && typeTest(keys, isDate);
            this.fields()[col].isDateFormat = lastFoundFormat;
            this.fields()[col].isTime = this.fields()[col].isString && !this.fields()[col].isDateTime && !this.fields()[col].isDate && typeTest(keys, isTime);
            this.fields()[col].isTimeFormat = lastFoundFormat;
        }, this);
        return retVal;
    };

    //  Import/Export  ---
    Grid.prototype.jsonObj = function (_) {
        if (!arguments.length) return this._data.map(function (row) {
            var retVal = {};
            this.row(0).forEach(function (col, idx) {
                retVal[col] = row[idx];
            });
            return retVal;
        }, this);
        this.clear();
        this.data(_.map(function (row, idx) {
            var retVal = [];
            for (var key in row) {
                var colIdx = this.row(0).indexOf(key);
                if (colIdx < 0) {
                    colIdx = this.fields().length;
                    this.fields().push(new Field().label(key));
                }
                retVal[colIdx] = row[key];
            }
            return retVal;
        }, this));
        return this;
    };

    Grid.prototype.json = function (_) {
        if (!arguments.length) return JSON.stringify(this.jsonObj(), null, "  ");
        this.jsonObj(JSON.parse(_));
        return this;
    };

    Grid.prototype.csv = function (_) {
        if (!arguments.length) return d3.csv.formatRows(this.grid());
        this.jsonObj(d3.csv.parse(_));
        return this;
    };

    Grid.prototype.tsv = function (_) {
        if (!arguments.length) return d3.tsv.formatRows(this.grid());
        this.jsonObj(d3.tsv.parse(_));
        return this;
    };

    //  --- --- ---
    function typeTest(cells, test) {
        if (!(cells instanceof Array)) {
            cells = [cells];
        }
        return cells.filter(function (d) { return d !== ""; }).every(test);
    }
    function isBoolean(cell) {
        return typeof cell === "boolean";
    }
    function isNumber(cell) {
        return typeof cell === "number" || !isNaN(cell);
    }
    function isString(cell) {
        return typeof cell === "string";
    }
    var dateTimeFormats = [
    ];
    var dateFormats = [
        "%Y-%m-%d",
        "%Y%m%d",
    ];
    var timeFormats = [
        "%H:%M:%S.%LZ",
        "%H:%M:%SZ",
        "%H:%M:%S"
    ];
    dateFormats.forEach(function(d) {
        timeFormats.forEach(function(t) {
            dateTimeFormats.push(d + "T" + t);
        });
    });
    function formatPicker(formats, cell) {
        for (var i = 0; i < formats.length; ++i) {
            var date = d3.time.format(formats[i]).parse(cell);
            if (date) {
                lastFoundFormat = formats[i];
                return formats[i];
            }
        }
        return null;
    }
    function isDateTime(cell) {
        return formatPicker(dateTimeFormats, cell);
    }
    function isDate(cell) {
        return formatPicker(dateFormats, cell);
    }
    function isTime(cell) {
        return formatPicker(timeFormats, cell);
    }
    function isUSState(cell) {
        return ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY", "AS", "DC", "FM", "GU", "MH", "MP", "PW", "PR", "VI"].indexOf(String(cell).toUpperCase()) >= 0;
    }

    return {
        Field: Field,
        Grid: Grid
    };
}));


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('common/Widget.js',["d3", "./Class", "./Platform", "./PropertyExt", "./Database"], factory);
    } else {
        root.common_Widget = factory(root.d3, root.common_Class, root.common_Platform, root.common_PropertyExt, root.common_Database);
    }
}(this, function (d3, Class, Platform, PropertyExt, Database) {
    var widgetID = 0;
    function Widget() {
        Class.call(this);
        Platform.call(this);
        PropertyExt.call(this);
        this._class = Object.getPrototypeOf(this)._class;
        this._id = this._idSeed + widgetID++;

        this._db = new Database.Grid();
        this._pos = { x: 0, y: 0 };
        this._size = { width: 0, height: 0 };
        this._scale = 1;
        this._visible = true;

        this._target = null;
        this._parentElement = null;
        this._parentWidget = null;

        this._element = d3.select();

        this._renderCount = 0;

        if (window.__hpcc_debug) {
            if (window.g_all === undefined) {
                window.g_all = {};
            }
            window.g_all[this._id] = this;
        }
        if (window.__hpcc_theme) {
            this.applyTheme(window.__hpcc_theme);
        }
    }
    Widget.prototype = Object.create(Class.prototype);
    Widget.prototype.constructor = Widget;
    Widget.prototype.mixin(Platform);
    Widget.prototype.mixin(PropertyExt);
    Widget.prototype._class += " common_Widget";

    Widget.prototype._idSeed = "_w";

    Widget.prototype.publishProxy("fields", "_db", "fields");
    Widget.prototype.publish("classed", {}, "object", "HTML Classes", null, { tags: ["Private"] });

    Widget.prototype.export = function (_) {
        switch(_) {
            case "TSV":
                return this._db.tsv();
            case "JSON":
                return this._db.json();
        }
        return this._db.csv();
    };

    Widget.prototype.leakCheck = function (newNode) {
        var context = this;
        var watchArray = [newNode];
        var destructObserver = new this.MutationObserver(function (mutations) {
            var leaks = false;
            mutations.forEach(function (mutation) {
                for (var i = 0; i < mutation.removedNodes.length; ++i) {
                    var node = mutation.removedNodes.item(i);
                    if (watchArray.indexOf(node) >= 0 && context._target) {
                        leaks = true;
                        destructObserver.disconnect();
                    }
                }
            });
            if (leaks) {
                console.log("leak:  " + context.id() + " - " + context.classID() + "\t\twidget.target(null); was not called for this widget before it was removed from the page.");
            }
        });
        var pNode = newNode.parentNode;
        while (pNode) {
            destructObserver.observe(pNode, { childList: true });
            watchArray.push(pNode);
            pNode = pNode.parentNode;
        }
    };

    //  Events  ---
    Widget.prototype.on = function (eventID, func, stopPropagation) {
        var context = this;
        this.overrideMethod(eventID, function (origFunc, args) {
            var retVal;
            if (stopPropagation) {
                if (d3.event) {
                    d3.event.stopPropagation();
                }
            } else {
                retVal = origFunc.apply(context, args);
            }
            return func.apply(context, args) || retVal;
        });
        return this;
    };

    //  Implementation  ---
    Widget.prototype.id = function (_) {
        if (!arguments.length) return this._id;
        this._id = _;
        return this;
    };

    Widget.prototype.columns = function (_, asDefault) {
        if (!arguments.length) return this._db.legacyColumns();
        this._db.legacyColumns(_, asDefault);
        return this;
    };

    Widget.prototype.parsedData = function () {
        return this._db.parsedData();
    };

    Widget.prototype.formattedData = function () {
        return this._db.formattedData();
    };

    Widget.prototype.data = function (_) {
        if (!arguments.length) return this._db.legacyData();
        this._db.legacyData(_);
        return this;
    };

    Widget.prototype.cloneData = function () {
        return this.data().map(function (row) { return row.slice(0); });
    };

    Widget.prototype.flattenData = function () {
        var retVal = [];
        this.data().forEach(function (row, rowIdx) {
            this.columns().filter(function (col, idx) { return idx > 0; }).forEach(function (col, idx) {
                var val = row[idx + 1];
                if (val) {
                    var newItem = {
                        rowIdx: rowIdx,
                        colIdx: idx + 1,
                        label: row[0],
                        value: val
                    };
                    retVal.push(newItem);
                }
            }, this);
        }, this);
        return retVal;
    };

    Widget.prototype.rowToObj = function (row) {
        var retVal = {};
        this.fields().forEach(function (field, idx) {
            retVal[field.label_default() || field.label()] = row[idx];
        });
        if (row.length === this.columns().length + 1) {
            retVal.__lparam = row[this.columns().length];
        }
        return retVal;
    };

    Widget.prototype.pos = function (_) {
        if (!arguments.length) return this._pos;
        this._pos = _;
        if (this._overlayElement) {
            this._overlayElement
                .attr("transform", "translate(" + _.x + "," + _.y + ")scale(" + this._scale + ")")
            ;
        }
        return this;
    };

    Widget.prototype.x = function (_) {
        if (!arguments.length) return this._pos.x;
        this.pos({ x: _, y: this._pos.y });
        return this;
    };

    Widget.prototype.y = function (_) {
        if (!arguments.length) return this._pos.y;
        this.pos({ x: this._pos.x, y: _ });
        return this;
    };

    Widget.prototype.size = function (_) {
        if (!arguments.length) return this._size;
        this._size = _;
        if (this._overlayElement) {
            this._overlayElement
                .attr("width", _.width)
                .attr("height", _.height)
            ;
        }
        return this;
    };

    Widget.prototype.width = function (_) {
        if (!arguments.length) return this._size.width;
        this.size({ width: _, height: this._size.height });
        return this;
    };

    Widget.prototype.height = function (_) {
        if (!arguments.length) return this._size.height;
        this.size({ width: this._size.width, height: _ });
        return this;
    };

    Widget.prototype.resize = function (size, delta) {
        delta = delta || { width: 0, height: 0 };
        var width, height;
        if (size && size.width && size.height) {
            width = size.width;
            height = size.height;
        } else {
            var style = window.getComputedStyle(this._target, null);
            width = parseFloat(style.getPropertyValue("width")) - delta.width;
            height = parseFloat(style.getPropertyValue("height")) - delta.height;
        }
        this.size({
            width: width,
            height: height
        });
        return this;
    };

    Widget.prototype.scale = function (_) {
        if (!arguments.length) return this._scale;
        this._scale = _;
        if (this._overlayElement) {
            this._overlayElement
                .attr("transform", "translate(" + _.x + "," + _.y + ")scale(" + this._scale + ")")
            ;
        }
        return this;
    };

    Widget.prototype.visible = function (_) {
        if (!arguments.length) return this._visible;
        this._visible = _;
        if (this._parentElement) {
            this._parentElement.style({
                visibility: this._visible ? null : "hidden",
                opacity: this._visible ? null : 0
            });
        }
        return this;
    };

    Widget.prototype.display = function (_) {
        if (!arguments.length) return this._display;
        this._display = _;
        if (this._element) {
            this._element.style("display", this._display ? null : "none");
        }
        return this;
    };

    Widget.prototype.calcSnap = function (snapSize) {
        function snap(x, gridSize) {
            function snapDelta(x, gridSize) {
                var dx = x % gridSize;
                if (Math.abs(dx) > gridSize - Math.abs(dx)) {
                    dx = (gridSize - Math.abs(dx)) * (dx < 0 ? 1 : -1);
                }
                return dx;
            }
            return x - snapDelta(x, gridSize);
        }
        var l = snap(this._pos.x - this._size.width / 2, snapSize);
        var t = snap(this._pos.y - this._size.height / 2, snapSize);
        var r = snap(this._pos.x + this._size.width / 2, snapSize);
        var b = snap(this._pos.y + this._size.height / 2, snapSize);
        var w = r - l;
        var h = b - t;
        return [{ x: l + w /2, y: t + h / 2 }, { width: w, height: h }];
    };

    //  DOM/SVG Node Helpers  ---
    Widget.prototype.toWidget = function (domNode) {
        if (!domNode) {
            return null;
        }
        var element = d3.select(domNode);
        if (element) {
            var widget = element.datum();
            if (widget && widget instanceof Widget) {
                return widget;
            }
        }
        return null;
    };

    Widget.prototype.locateParentWidget = function (domNode) {
        domNode = domNode || (this._target ? this._target.parentNode : null);
        if (domNode) {
            var widget = this.toWidget(domNode);
            if (widget) {
                return widget;
            } else if (domNode.parentNode) {
                return this.locateParentWidget(domNode.parentNode);
            }
        }
        return null;
    };

    Widget.prototype.locateSVGNode = function (domNode) {
        if (!domNode) {
            return null;
        }
        if (domNode.tagName === "svg") {
            return domNode;
        }
        return this.locateSVGNode(domNode.parentNode);
    };

    Widget.prototype.locateOverlayNode = function () {
        var widget = this.locateParentWidget(this._target);
        while (widget) {
            if (widget._parentOverlay) {
                return widget._parentOverlay;
            }
            widget = this.locateParentWidget(widget._target.parentNode);
        }
        return null;
    };

    Widget.prototype.locateAncestor = function (classID) {
        var widget = this.locateParentWidget(this._target);
        while (widget) {
            if (widget.classID() === classID) {
                return widget;
            }
            widget = this.locateParentWidget(widget._target.parentNode);
        }
        return null;
    };

    Widget.prototype.getAbsolutePos = function (domNode, w, h) {
        var root = this.locateSVGNode(domNode);
        if (!root) {
            return null;
        }
        var pos = root.createSVGPoint();
        var ctm = domNode.getCTM();
        pos = pos.matrixTransform(ctm);
        var retVal = {
            x: pos.x,
            y: pos.y
        };
        if (w !== undefined && h !== undefined) {
            var size = root.createSVGPoint();
            size.x = w;
            size.y = h;
            size = size.matrixTransform(ctm);
            retVal.width = size.x - pos.x;
            retVal.height = size.y - pos.y;
        }
        return retVal;
    };

    Widget.prototype.hasOverlay = function () {
        return this._overlayElement;
    };

    Widget.prototype.syncOverlay = function () {
        if (this._size.width && this._size.height) {
            var newPos = this.getAbsolutePos(this._overlayElement.node(), this._size.width, this._size.height);
            if (newPos && (this.oldPos === null || this.oldPos === undefined || newPos.x !== this.oldPos.x || newPos.y !== this.oldPos.y || newPos.width !== this.oldPos.width || newPos.height !== this.oldPos.height)) {
                var xScale = newPos.width / this._size.width;
                var yScale = newPos.height / this._size.height;
                this._parentElement
                    .style({
                        left: newPos.x - (newPos.width / xScale) / 2 + "px",
                        top: newPos.y - (newPos.height / yScale) / 2 + "px",
                        width: newPos.width / xScale + "px",
                        height: newPos.height / yScale + "px"
                    })
                ;
                var transform = "scale(" + xScale + "," + yScale + ")";
                this._parentElement
                    .style("transform", transform)
                    .style("-moz-transform", transform)
                    .style("-ms-transform", transform)
                    .style("-webkit-transform", transform)
                    .style("-o-transform", transform)
                ;
            }
            this.oldPos = newPos;
        }
    };

    Widget.prototype.element = function () {
        return this._element;
    };

    Widget.prototype.node = function () {
        return this._element.node();
    };

    //  Render  ---
    Widget.prototype.render = function (callback) {
        if (window.__hpcc_debug) {
            var now = Date.now();
            if (now - this._prevNow < 500) {
                console.log("Double Render:  " + (now - this._prevNow) + " - " + this.id() + " - " + this.classID());
            }
            this._prevNow = now;
        }

        callback = callback || function () { };
        if (!this._parentElement || !this.visible()) {
            callback(this);
            return this;
        }
        if (this._parentElement) {
            if (!this._tag)
                throw "No DOM tag specified";

            var elements = this._parentElement.selectAll("#" + this._id).data([this], function (d) { return d._id; });
            elements.enter().append(this._tag)
                .classed(this._class, true)
                .attr("id", this._id)
                //.attr("opacity", 0.50)  //  Uncomment to debug position offsets  ---
                .each(function (context) {
                    context._element = d3.select(this);
                    context.enter(this, context._element);
                    if (window.__hpcc_debug) {
                        context.leakCheck(this);
                    }
                })
            ;
            elements
                .classed(this.classed())
                .each(function (context) {
                    context.preUpdate(this, context._element);
                    context.update(this, context._element);
                    context.postUpdate(this, context._element);
                })
            ;
            elements.exit()
                .each(function (context) {
                    d3.select(this).datum(null);
                    context.exit(this, context._element);
                })
                .remove()
            ;
            this._renderCount++;
        }

        //  ASync Render Contained Widgets  ---
        var widgets = [];
        this.publishedProperties(true).forEach(function (meta) {
            if (!meta.ext || meta.ext.render !== false) {
                switch (meta.type) {
                    case "widget":
                        var widget = this[meta.id]();
                        if (widget) {
                            widgets.push(this[meta.id]());
                        }
                        break;
                    case "widgetArray":
                        widgets = widgets.concat(this[meta.id]());
                        break;
                }
            }
        }, this);

        var context = this;
        switch (widgets.length) {
            case 0:
                callback(this);
                break;
            case 1:
                widgets[0].render(function () {
                    callback(context);
                });
                break;
            default:
                var renderCount = widgets.length;
                widgets.forEach(function (widget, idx) {
                    setTimeout(function () {
                        widget.render(function () {
                            if (--renderCount === 0) {
                                callback(context);
                            }
                        });
                    }, 0);
                });
                break;
        }
        return this;
    };

    Widget.prototype.lazyRender = Widget.prototype.debounce(function () {
        this.render();
    }, 100);

    Widget.prototype.enter = function (domNode, element) { };
    Widget.prototype.preUpdate = function (domNode, element) { };
    Widget.prototype.update = function (domNode, element) { };
    Widget.prototype.postUpdate = function (domNode, element) { };
    Widget.prototype.exit = function (domNode, element) { };

    return Widget;
}));



(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('common/CanvasWidget.js',["d3", "./Widget"], factory);
    } else {
        root.common_CanvasWidget = factory(root.d3, root.common_Widget);
    }
}(this, function (d3, Widget) {
    function CanvasWidget() {
        Widget.call(this);
        this._tag = "canvas";
    }
    CanvasWidget.prototype = Object.create(Widget.prototype);
    CanvasWidget.prototype.constructor = CanvasWidget;
    CanvasWidget.prototype._class += " common_CanvasWidget";

    CanvasWidget.prototype.resize = function (size) {
        var retVal = Widget.prototype.resize.apply(this, arguments);
        this._parentElement
            .style("width", this._size.width + "px")
            .style("height", this._size.height + "px")
        ;
        this._element.attr("width", this._size.width);
        this._element.attr("height", this._size.height);
        return retVal;
    };

    //  Properties  ---
    CanvasWidget.prototype.target = function (_) {
        if (!arguments.length) return this._target;
        if (this._target && _) {
            throw "Target can only be assigned once.";
        }
        this._target = _;

        //  Target is a DOM Node ID ---
        if (typeof (this._target) === "string" || this._target instanceof String) {
            this._target = document.getElementById(this._target);
        }

        if (this._target) {
            this._parentElement = d3.select(this._target);
            if (!this._size.width && !this._size.height) {
                var width = parseFloat(this._parentElement.style("width"));
                var height = parseFloat(this._parentElement.style("height"));
                this.size({
                    width: width,
                    height: height
                });
                this.resize(this._size);
            }
        } else {
            this.exit();
        }
        
        return this;
    };

    CanvasWidget.prototype.exit = function() {
        if (this._parentElement) {
            this._parentElement.remove();
        }
        Widget.prototype.exit.apply(this, arguments);
    };

    return CanvasWidget;
}));


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('common/Transition.js',[], factory);
    } else {
        root.common_Transition = factory();
    }
}(this, function () {
    function Transition(widget) {
        this._widget = widget;
        this._duration = 250;
        this._delay = 0;
        this._ease = "cubic-in-out";
    }

    Transition.prototype.duration = function (_) {
        if (!arguments.length) return this._duration;
        this._duration = _;
        return this._widget;
    };

    Transition.prototype.delay = function (_) {
        if (!arguments.length) return this._delay;
        this._delay = _;
        return this._widget;
    };

    Transition.prototype.ease = function (_) {
        if (!arguments.length) return this._ease;
        this._ease = _;
        return this._widget;
    };

    Transition.prototype.apply = function (selection) {
        if (this._duration || this._delay) {
            return selection.transition()
                .duration(this._duration)
                .delay(this._delay)
                .ease(this._ease)
            ;
        }
        return selection;
    };

    return Transition;
}));


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('common/SVGWidget.js',["d3", "./Widget", "./Transition"], factory);
    } else {
        root.common_SVGWidget = factory(root.d3, root.common_Widget, root.common_Transition);
    }
}(this, function (d3, Widget, Transition) {
    function SVGWidget() {
        Widget.call(this);

        this._tag = "g";

        this._boundingBox = null;

        this.transition = new Transition(this);

        this._drawStartPos = "center";
    }
    SVGWidget.prototype = Object.create(Widget.prototype);
    SVGWidget.prototype.constructor = SVGWidget;
    SVGWidget.prototype._class += " common_SVGWidget";

    //  Properties  ---
    SVGWidget.prototype.move = function (_, transitionDuration) {
        var retVal = this.pos.apply(this, arguments);
        if (arguments.length) {
            (transitionDuration ? this._element.transition().duration(transitionDuration) : this._element)
                .attr("transform", "translate(" + _.x + " " + _.y + ")")
            ;
        }
        return retVal;
    };

    SVGWidget.prototype.size = function (_) {
        var retVal = Widget.prototype.size.apply(this, arguments);
        if (arguments.length) {
            this._boundingBox = null;
        }
        return retVal;
    };

    SVGWidget.prototype.resize = function (size) {
        var retVal = Widget.prototype.resize.apply(this, arguments);
        if (this._parentRelativeDiv) {
            this._parentRelativeDiv
                .style({
                    width: this._size.width + "px",
                    height: this._size.height + "px"
                })
            ;
            switch (this._drawStartPos) {
                case "origin":
                    this.pos({
                        x: 0,
                        y: 0
                    });
                    break;
                case "center":
                    /* falls through */
                default:
                    this.pos({
                        x: this._size.width / 2,
                        y: this._size.height / 2
                    });
                    break;
            }
        }
        this._parentElement
            .attr("width", this._size.width)
            .attr("height", this._size.height)
        ;
        return retVal;
    };

    SVGWidget.prototype.target = function (_) {
        if (!arguments.length) return this._target;
        if (this._target && _ && (this._target.__data__.id !== _.__data__.id)) {
            throw "Target can only be assigned once.";
        }
        this._target = _;

        //  Target is a DOM Node ID ---
        if (typeof (this._target) === "string" || this._target instanceof String) {
            this._target = document.getElementById(this._target);
        }

        if (this._target instanceof SVGElement) {
            this._parentElement = d3.select(this._target);
            this._parentWidget = this._parentElement.datum();
            if (!this._parentWidget || this._parentWidget._id === this._id) {
                this._parentWidget = this.locateParentWidget(this._target.parentNode);
            }
            this._parentOverlay = this.locateOverlayNode();
        } else if (this._target) {
            //  Target is a DOM Node, so create a SVG Element  ---
            this._parentRelativeDiv = d3.select(this._target).append("div")
                .style({
                    position: "relative"
                })
            ;
            this._parentElement = this._parentRelativeDiv.append("svg")
                .style({
                    position: "absolute",
                    top: 0,
                    left: 0
                })
            ;
            this._parentOverlay = this._parentRelativeDiv.append("div")
                .style({
                    position: "absolute",
                    top: 0,
                    left: 0
                })
            ;
            this.resize(this._size);
        } else {
            this.exit();
        }
        return this;
    };

    SVGWidget.prototype.enter = function (domNode, element) {
        Widget.prototype.enter.apply(this, arguments);
    };

    SVGWidget.prototype.update = function (domNode, element) {
        Widget.prototype.update.apply(this, arguments);
    };

    SVGWidget.prototype.postUpdate = function (domNode, element) {
        Widget.prototype.postUpdate.apply(this, arguments);
        if (this._drawStartPos === "origin" && this._target instanceof SVGElement) {
            this._element.attr("transform", "translate(" + (this._pos.x - this._size.width / 2) + "," + (this._pos.y - this._size.height / 2) + ")scale(" + this._scale + ")");
        } else {
            this._element.attr("transform", "translate(" + this._pos.x + "," + this._pos.y + ")scale(" + this._scale + ")");
        }
    };

    SVGWidget.prototype.exit = function (domNode, element) {
        if (this._parentRelativeDiv) {
            this._parentOverlay.remove();
            this._parentElement.remove();
            this._parentRelativeDiv.remove();
        }
        Widget.prototype.exit.apply(this, arguments);
    };

    SVGWidget.prototype.getOffsetPos = function () {
        var retVal = { x: 0, y: 0 };
        if (this._parentWidget) {
            retVal = this._parentWidget.getOffsetPos();
            retVal.x += this._pos.x;
            retVal.y += this._pos.y;
            return retVal;
        }
        return retVal;
    };

    SVGWidget.prototype.getBBox = function (refresh, round) {
        if (refresh || this._boundingBox === null) {
            var svgNode = this._element.node();
            if (svgNode instanceof SVGElement) {
                this._boundingBox = svgNode.getBBox();
            }
        }
        if (this._boundingBox === null) {
            return {
                x: 0,
                y: 0,
                width: 0,
                height: 0
            };
        }
        return {
            x: (round ? Math.round(this._boundingBox.x) : this._boundingBox.x) * this._scale,
            y: (round ? Math.round(this._boundingBox.y) : this._boundingBox.y) * this._scale,
            width: (round ? Math.round(this._boundingBox.width) : this._boundingBox.width) * this._scale,
            height: (round ? Math.round(this._boundingBox.height) : this._boundingBox.height) * this._scale
        };
    };

    //  Intersections  ---
    SVGWidget.prototype.intersection = function (pointA, pointB) {
        return this.intersectRect(pointA, pointB);
    };

    var lerp = function (point, that, t) {
        //  From https://github.com/thelonious/js-intersections
        return {
            x: point.x + (that.x - point.x) * t,
            y: point.y + (that.y - point.y) * t
        };
    };

    var intersectLineLine = function (a1, a2, b1, b2) {
        //  From https://github.com/thelonious/js-intersections
        var result = { type: "", points: [] };
        var ua_t = (b2.x - b1.x) * (a1.y - b1.y) - (b2.y - b1.y) * (a1.x - b1.x);
        var ub_t = (a2.x - a1.x) * (a1.y - b1.y) - (a2.y - a1.y) * (a1.x - b1.x);
        var u_b = (b2.y - b1.y) * (a2.x - a1.x) - (b2.x - b1.x) * (a2.y - a1.y);

        if (u_b !== 0) {
            var ua = ua_t / u_b;
            var ub = ub_t / u_b;

            if (0 <= ua && ua <= 1 && 0 <= ub && ub <= 1) {
                result.type = "Intersection";
                result.points.push({
                    x: a1.x + ua * (a2.x - a1.x),
                    y: a1.y + ua * (a2.y - a1.y)
                });
            } else {
                result.type = "No Intersection";
            }
        } else {
            if (ua_t === 0 || ub_t === 0) {
                result.type = "Coincident";
            } else {
                result.type = "Parallel";
            }
        }

        return result;
    };

    SVGWidget.prototype.intersectRect = function (pointA, pointB) {
        var center = this.getOffsetPos();
        var size = this.getBBox();
        if (pointA.x === pointB.x && pointA.y === pointB.y) {
            return pointA;
        }
        var TL = { x: center.x - size.width / 2, y: center.y - size.height / 2 };
        var TR = { x: center.x + size.width / 2, y: center.y - size.height / 2 };
        var BR = { x: center.x + size.width / 2, y: center.y + size.height / 2 };
        var BL = { x: center.x - size.width / 2, y: center.y + size.height / 2 };
        var intersection = intersectLineLine(TL, TR, pointA, pointB);
        if (intersection.points.length) {
            return { x: intersection.points[0].x, y: intersection.points[0].y };
        }
        intersection = intersectLineLine(TR, BR, pointA, pointB);
        if (intersection.points.length) {
            return { x: intersection.points[0].x, y: intersection.points[0].y };
        }
        intersection = intersectLineLine(BR, BL, pointA, pointB);
        if (intersection.points.length) {
            return { x: intersection.points[0].x, y: intersection.points[0].y };
        }
        intersection = intersectLineLine(BL, TL, pointA, pointB);
        if (intersection.points.length) {
            return { x: intersection.points[0].x, y: intersection.points[0].y };
        }
        return null;
    };

    var intersectCircleLine = function (c, r, a1, a2) {
        //  From https://github.com/thelonious/js-intersections
        var result = { type: "", points: [] };
        var a = (a2.x - a1.x) * (a2.x - a1.x) +
                 (a2.y - a1.y) * (a2.y - a1.y);
        var b = 2 * ((a2.x - a1.x) * (a1.x - c.x) +
                       (a2.y - a1.y) * (a1.y - c.y));
        var cc = c.x * c.x + c.y * c.y + a1.x * a1.x + a1.y * a1.y -
                 2 * (c.x * a1.x + c.y * a1.y) - r * r;
        var deter = b * b - 4 * a * cc;

        if (deter < 0) {
            result.type = "Outside";
        } else if (deter === 0) {
            result.type = "Tangent";
            // NOTE: should calculate this point
        } else {
            var e = Math.sqrt(deter);
            var u1 = (-b + e) / (2 * a);
            var u2 = (-b - e) / (2 * a);

            if ((u1 < 0 || u1 > 1) && (u2 < 0 || u2 > 1)) {
                if ((u1 < 0 && u2 < 0) || (u1 > 1 && u2 > 1)) {
                    result.type = "Outside";
                } else {
                    result.type = "Inside";
                }
            } else {
                result.type = "Intersection";

                if (0 <= u1 && u1 <= 1)
                    result.points.push(lerp(a1, a2, u1));

                if (0 <= u2 && u2 <= 1)
                    result.points.push(lerp(a1, a2, u2));
            }
        }

        return result;
    };

    SVGWidget.prototype.intersectCircle = function (pointA, pointB) {
        var center = this.getOffsetPos();
        var radius = this.radius();
        var intersection = intersectCircleLine(center, radius, pointA, pointB);
        if (intersection.points.length) {
            return { x: intersection.points[0].x, y: intersection.points[0].y };
        }
        return null;
    };

    SVGWidget.prototype.distance = function (pointA, pointB) {
        return Math.sqrt((pointA.x - pointB.x) * (pointA.x - pointB.x) + (pointA.y - pointB.y) * (pointA.y - pointB.y));
    };

    //  IE Fixers  ---
    SVGWidget.prototype._pushMarkers = function (element, d) {
        if (this.svgMarkerGlitch) {
            element = element || this._element;
            element.selectAll("path[marker-start],path[marker-end]")
                .attr("fixme-start", function (d) { return this.getAttribute("marker-start"); })
                .attr("fixme-end", function (d) { return this.getAttribute("marker-end"); })
                .attr("marker-start", null)
                .attr("marker-end", null)
            ;
        }
    };

    SVGWidget.prototype._popMarkers = function (element, d) {
        if (this.svgMarkerGlitch) {
            element = element || this._element;
            element.selectAll("path[fixme-start],path[fixme-end]")
                .attr("marker-start", function (d) {
                    return this.getAttribute("fixme-start");
                })
                .attr("marker-end", function (d) { return this.getAttribute("fixme-end"); })
                .attr("fixme-start", null)
                .attr("fixme-end", null)
            ;
        }
    };

    SVGWidget.prototype._popMarkersDebounced = Widget.prototype.debounce(function (element, d) {
        if (this.svgMarkerGlitch) {
            this._popMarkers(element, d);
        }
    }, 250);

    SVGWidget.prototype._fixIEMarkers = function (element, d) {
        if (this.svgMarkerGlitch) {
            this._pushMarkers(element, d);
            this._popMarkersDebounced(element, d);
        }
    };

    return SVGWidget;
}));

if (typeof define === "function" && define.amd) {
  define('css',[], function () { 
    return {
      load: function ($1, $2, load) { load() }
    } 
  })
};


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('common/Text.js',["./SVGWidget", "css!./Text"], factory);
    } else {
        root.common_Text = factory(root.common_SVGWidget);
    }
}(this, function (SVGWidget) {
    function Text() {
        SVGWidget.call(this);
    }
    Text.prototype = Object.create(SVGWidget.prototype);
    Text.prototype.constructor = Text;
    Text.prototype._class += " common_Text";

    Text.prototype.publish("text", "", "string", "Display Text",null,{tags:["Basic"]});
    Text.prototype.publish("fontFamily", null, "string", "Font Family", null, { tags: ["Intermediate"], optional: true});
    Text.prototype.publish("fontSize", null, "number", "Font Size (px)", null, { tags: ["Intermediate"] });
    Text.prototype.publish("anchor", "middle", "set", "Anchor Position", ["start", "middle", "end"], { tags: ["Intermediate"] });
    Text.prototype.publish("colorFill", null, "html-color", "Fill Color", null, { tags: ["Basic"] });
    
    Text.prototype.publish("rotation", 0, "number", "Degrees of rotation", null, { tags: ["Basic"] });

    Text.prototype.enter = function (domNode, element) {
        SVGWidget.prototype.enter.apply(this, arguments);
        this._textElement = element.append("text");
    };

    Text.prototype.update = function (domNode, element) {
        SVGWidget.prototype.update.apply(this, arguments);
        var context = this;
        this._textElement
            .attr("font-family", this.fontFamily())
            .attr("font-size", this.fontSize())
        ;
        var textParts = this.text().split("\n");
        var textLine = this._textElement.selectAll("tspan").data(textParts);
        textLine.enter().append("tspan")
            .attr("class", function (d, i) { return "tspan_" + i; })
            .attr("dy", "1em")
            .attr("x", "0")
        ;
        textLine
            .style("fill", this.colorFill())
            .text(function (d) { return d; })
        ;
        textLine.exit()
            .remove()
        ;

        var bbox = { width: 0, height: 0 };
        try {   //  https://bugzilla.mozilla.org/show_bug.cgi?id=612118
            bbox = this._textElement.node().getBBox();
        } catch (e) {
        }
        var xOffset = -(bbox.x + bbox.width / 2);
        var yOffset = -(bbox.y + bbox.height / 2);
        switch(this.anchor()) {
            case "start":
                xOffset = -bbox.x + bbox.width / 2;
                break;
            case "end":
                xOffset = bbox.x + bbox.width / 2;
                break;
        }
        
        var theta = -this.rotation() * Math.PI/180;
        xOffset = -1*Math.abs(xOffset*Math.cos(theta) + yOffset*Math.sin(theta));
        yOffset = -1*Math.abs(xOffset*Math.sin(theta) + yOffset*Math.cos(theta));
        
        this._textElement
            .style("text-anchor", this.anchor())
            .attr("transform", function (d) { return "translate(" + xOffset + "," + yOffset + ")rotate(" + context.rotation() + ")"; })
        ;
    };

    return Text;
}));




(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('common/FAChar',["./SVGWidget", "./Text", "css!font-awesome", "css!./FAChar"], factory);
    } else {
        root.common_FAChar = factory(root.common_SVGWidget, root.common_Text);
    }
}(this, function (SVGWidget, Text) {
    function FAChar() {
        SVGWidget.call(this);

        this._text = new Text()
            .fontFamily("FontAwesome")
        ;
    }
    FAChar.prototype = Object.create(SVGWidget.prototype);
    FAChar.prototype.constructor = FAChar;
    FAChar.prototype._class += " common_FAChar";

    FAChar.prototype.publish("char", "", "string", "Font Awesome Item",null,{tags:["Private"]});
    FAChar.prototype.publish("fontSize", null, "number", "Font Size",null,{tags:["Private"]});
    FAChar.prototype.publishProxy("text_colorFill", "_text", "colorFill");

    FAChar.prototype.enter = function (domNode, element) {
        SVGWidget.prototype.enter.apply(this, arguments);
        this._text
            .target(domNode)
        ;
    };

    FAChar.prototype.update = function (domNode, element) {
        SVGWidget.prototype.update.apply(this, arguments);
        this._text
            .text(this.char())
            .scale((this.fontSize() || 14) / 14) //  Scale rather than fontSize to prevent Chrome glitch  ---
            .render()
        ;
    };

    FAChar.prototype.exit = function (domNode, element) {
        this._text
            .target(null)
        ;
        SVGWidget.prototype.exit.apply(this, arguments);
    };

    return FAChar;
}));


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('common/HTMLWidget',["d3", "./Widget", "./Transition"], factory);
    } else {
        root.common_HTMLWidget = factory(root.d3, root.common_Widget, root.common_Transition);
    }
}(this, function (d3, Widget, Transition) {
    function HTMLWidget() {
        Widget.call(this);

        this._drawStartPos = "origin";
        this._tag = "div";
        this._boundingBox = null;
    }
    HTMLWidget.prototype = Object.create(Widget.prototype);
    HTMLWidget.prototype.constructor = HTMLWidget;
    HTMLWidget.prototype._class += " common_HTMLWidget";

    HTMLWidget.prototype.calcFrameWidth = function (element) {
        var retVal = parseFloat(element.style("padding-left")) +
            parseFloat(element.style("padding-right")) +
            parseFloat(element.style("margin-left")) +
            parseFloat(element.style("margin-right")) +
            parseFloat(element.style("border-left-width")) +
            parseFloat(element.style("border-right-width"))
        ;
        return retVal;
    };

    HTMLWidget.prototype.calcWidth = function (element) {
        return parseFloat(element.style("width")) - this.calcFrameWidth(element);
    };

    HTMLWidget.prototype.calcFrameHeight = function (element) {
        var retVal = parseFloat(element.style("padding-top")) +
            parseFloat(element.style("padding-bottom")) +
            parseFloat(element.style("margin-top")) +
            parseFloat(element.style("margin-bottom")) +
            parseFloat(element.style("border-top-width")) +
            parseFloat(element.style("border-bottom-width"))
        ;
        return retVal;
    };

    HTMLWidget.prototype.calcHeight = function (element) {
        return parseFloat(element.style("height")) + this.calcFrameHeight(element);
    };

    HTMLWidget.prototype.hasHScroll = function (element) {
        element = element || this._element;
        return element.property("scrollWidth") > element.property("clientWidth");
    };

    HTMLWidget.prototype.hasVScroll = function (element) {
        element = element || this._element;
        return element.property("scrollHeight") > element.property("clientHeight");
    };

    HTMLWidget.prototype.clientWidth = function () {
        return this._size.width - this.calcFrameWidth(this._element);
    };

    HTMLWidget.prototype.clientHeight = function () {
        return this._size.height - this.calcFrameHeight(this._element);
    };

    HTMLWidget.prototype.getBBox = function (refresh, round) {
        if (refresh || this._boundingBox === null) {
            var domNode = this._element.node() ? this._element.node().firstElementChild : null;   //  Needs to be first child, as element has its width/height forced onto it.
            if (domNode instanceof Element) {
                var rect = domNode.getBoundingClientRect();
                this._boundingBox = {
                    x: rect.left,
                    y: rect.top,
                    width: rect.width,
                    height: rect.height
                };
            }
        }
        if (this._boundingBox === null) {
            return {
                x: 0,
                y: 0,
                width: 0,
                height: 0
            };
        }
        return {
            x: (round ? Math.round(this._boundingBox.x) : this._boundingBox.x) * this._scale,
            y: (round ? Math.round(this._boundingBox.y) : this._boundingBox.y) * this._scale,
            width: (round ? Math.round(this._boundingBox.width) : this._boundingBox.width) * this._scale,
            height: (round ? Math.round(this._boundingBox.height) : this._boundingBox.height) * this._scale
        };
    };

    HTMLWidget.prototype.resize = function (size) {
        var retVal = Widget.prototype.resize.apply(this, arguments);
        this._parentElement
            .style("width", this._size.width + "px")
            .style("height", this._size.height + "px")
        ;
        return retVal;
    };

    //  Properties  ---
    HTMLWidget.prototype.target = function (_) {
        if (!arguments.length) return this._target;
        if (this._target && _) {
            throw "Target can only be assigned once.";
        }
        this._target = _;

        //  Target is a DOM Node ID ---
        if (typeof (this._target) === "string" || this._target instanceof String) {
            this._target = document.getElementById(this._target);
        }

        if (this._target instanceof SVGElement) {
            //  Target is a SVG Node, so create an item in the Overlay and force it "over" the overlay element (cough)  ---
            var overlay = this.locateOverlayNode();
            this._parentElement = overlay.append("div")
                .style({
                    position: "absolute",
                    top: 0,
                    left: 0,
                    overflow: "hidden"
                })
            ;
            this._overlayElement = d3.select(this._target);

            var context = this;
            this.oldPos = null;
            this.observer = new this.MutationObserver(function (mutation) {
                context.syncOverlay();
            });

            var domNode = this._overlayElement.node();
            while (domNode) {
                this.observer.observe(domNode, { attributes: true });
                domNode = domNode.parentNode;
            }
        } else if (this._target) {
            this._parentElement = d3.select(this._target);
            if (!this._size.width && !this._size.height) {
                var width = parseFloat(this._parentElement.style("width"));
                var height = parseFloat(this._parentElement.style("height"));
                this.size({
                    width: width,
                    height: height
                });
            }
            this._parentElement = d3.select(this._target).append("div");
        } else {
            this.exit();
        }
        return this;
    };

    HTMLWidget.prototype.postUpdate = function (domNode, element) {
        Widget.prototype.postUpdate.apply(this, arguments);
        if (this._drawStartPos === "origin") {
            this._element.style({
                position: "relative",
                left: this._pos.x + "px",
                top: this._pos.y + "px"
            });
        } else {
            var bbox = this.getBBox(true);
            this._element.style({
                position: "relative",
                float: "left",
                left: this._pos.x + (this._size.width - bbox.width) / 2 + "px",
                top: this._pos.y + (this._size.height - bbox.height) / 2 + "px"
            });
        }
    };

    HTMLWidget.prototype.exit = function (domNode, element) {
        if (this.observer) {
            this.observer.disconnect();
        }
        this.oldPos = null;
        if (this._parentElement) {
            this._parentElement.remove();
        }
        Widget.prototype.exit.apply(this, arguments);
    };

    return HTMLWidget;
}));



(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('common/Shape.js',["d3", "./SVGWidget", "css!./Shape"], factory);
    } else {
        root.common_Shape = factory(root.d3, root.common_SVGWidget);
    }
}(this, function (d3, SVGWidget) {
    function Shape() {
        SVGWidget.call(this);
    }
    Shape.prototype = Object.create(SVGWidget.prototype);
    Shape.prototype.constructor = Shape;
    Shape.prototype._class += " common_Shape";

    Shape.prototype.publish("shape", "circle", "set", "Shape Type", ["circle", "square", "rect", "ellipse"],{tags:["Private"]});
    Shape.prototype.publish("width", 24, "number", "Width",null,{tags:["Private"]});
    Shape.prototype.publish("height", 24, "number", "Height",null,{tags:["Private"]});
    Shape.prototype.publish("colorStroke", null, "html-color", "Stroke Color", null, {tags:["Private"]});
    Shape.prototype.publish("colorFill", null, "html-color", "Fill Color", null, {tags:["Private"]});
    Shape.prototype.publish("radius", null, "number", "Radius", null, { tags: ["Private"] });
    Shape.prototype.publish("tooltip", "", "string", "Tooltip", null, { tags: ["Private"] });

    Shape.prototype._origRadius = Shape.prototype.radius;
    Shape.prototype.radius = function (_) {
        var retVal = Shape.prototype._origRadius.apply(this, arguments);
        if (arguments.length) {
            this.width(_);
            this.height(_);
            return retVal;
        }
        return Math.max(this.width(), this.height()) / 2;
    };

    Shape.prototype.intersection = function (pointA, pointB) {
        switch (this.shape()) {
            case "circle":
                return this.intersectCircle(pointA, pointB);
        }
        return SVGWidget.prototype.intersection.apply(this, arguments);
    };

    Shape.prototype.update = function (domNode, element) {
        var shape = element.selectAll("rect,circle,ellipse").data([this.shape()], function (d) { return d; });

        var context = this;
        shape.enter().append(this.shape() === "square" ? "rect" : this.shape())
            .attr("class", "common_Shape")
            .each(function (d) {
                var element = d3.select(this);
                context._tooltipElement = element.append("title");
            })
        ;
        shape
            .style("fill", this.colorFill())
            .style("stroke", this.colorStroke())
            .each(function (d) {
                var element = d3.select(this);
                context._tooltipElement.text(context.tooltip());
                switch (context.shape()) {
                    case "circle":
                        var radius = context.radius();
                        element
                            .attr("r", radius)
                        ;
                        break;
                    case "square":
                        var width = Math.max(context.width(), context.height());
                        element
                            .attr("x", -width / 2)
                            .attr("y", -width / 2)
                            .attr("width", width)
                            .attr("height", width)
                        ;
                        break;
                    case "rect":
                        element
                            .attr("x", -context.width() / 2)
                            .attr("y", -context.height() / 2)
                            .attr("width", context.width())
                            .attr("height", context.height())
                        ;
                        break;
                    case "ellipse":
                        element
                            .attr("rx", context.width() / 2)
                            .attr("ry", context.height() / 2)
                        ;
                        break;
                }
            })
        ;
        shape.exit().remove();
    };

    return Shape;
}));



(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('common/Icon',["./SVGWidget", "./Shape", "./FAChar", "css!./Icon"], factory);
    } else {
        root.common_Icon = factory(root.common_SVGWidget, root.common_Shape, root.common_FAChar);
    }
}(this, function (SVGWidget, Shape, FAChar) {
    function Icon() {
        SVGWidget.call(this);

        this._shapeWidget = new Shape();
        this._faChar = new FAChar();
    }
    Icon.prototype = Object.create(SVGWidget.prototype);
    Icon.prototype.constructor = Icon;
    Icon.prototype._class += " common_Icon";

    Icon.prototype.publish("shape", "circle", "set", "Shape Type", ["circle", "square"],{tags:["Private"]});
    Icon.prototype.publishProxy("faChar", "_faChar", "char");
    Icon.prototype.publish("imageUrl", null, "string", "Image URL", null, { optional: true });
    Icon.prototype.publishProxy("image_colorFill", "_faChar", "text_colorFill");
    Icon.prototype.publish("tooltip", "", "string", "Tooltip",null,{tags:["Private"]});
    Icon.prototype.publish("diameter", 24, "number", "Diameter",null,{tags:["Private"]});
    Icon.prototype.publish("paddingPercent", 45, "number", "Padding Percent",null,{tags:["Private"]});
    Icon.prototype.publishProxy("shape_colorFill", "_shapeWidget", "colorFill");
    Icon.prototype.publishProxy("shape_colorStroke", "_shapeWidget", "colorStroke");

    Icon.prototype.intersection = function (pointA, pointB) {
        return this._shapeWidget.intersection(pointA, pointB);
    };

    Icon.prototype.enter = function (domNode, element) {
        SVGWidget.prototype.enter.apply(this, arguments);
        this._defs = element.append("defs");
        this._defs.append("clipPath")
            .attr("id", "clip_" + this.id() + "_circle")
            .append("circle")
                .attr("x", 0)
                .attr("y", 0)
        ;
        this._defs.append("clipPath")
            .attr("id", "clip_" + this.id() + "_square")
            .append("rect")
        ;
        this._root = element.append("g");
        this._shapeWidget
            .target(this._root.node())
            .render()
        ;
        this._faChar
            .target(element.node())
            .render()
        ;
        this._tooltipElement = element.append("title");
        var context = this;
        element
            .on("click", function (el) {
                context.click(el);
            })
            .on("dblclick", function (el) {
                context.dblclick(el);
            })
        ;
    };

    Icon.prototype.click = function (domNode) {
        console.log("Clicked the icon");
    };

    Icon.prototype.dblclick = function (domNode) {
        console.log("Double clicked the icon");
    };

    Icon.prototype.update = function (domNode, element) {
        SVGWidget.prototype.update.apply(this, arguments);

        var diameter = this.diameter();
        var radius = diameter / 2;
        this._defs.select("circle")
            .attr("r", radius)
        ;
        this._defs.select("rect")
            .attr("x", -radius)
            .attr("y", -radius)
            .attr("width", diameter)
            .attr("height", diameter)
        ;
        this._faChar
            .fontSize(diameter * (100 - this.paddingPercent()) / 100)
            .render()
        ;
        this._shapeWidget
            .shape(this.shape())
            .width(diameter)
            .height(diameter)
            .render()
        ;
        var image = this._root.selectAll("image").data(this.imageUrl() ? [this.imageUrl()] : [], function (d) { return d; });
        image.enter()
            .append("image")
            .attr("xlink:href", this.imageUrl())
        ;
        image
            .attr("clip-path", "url(#clip_" + this.id() + "_" + this.shape() + ")")
            .attr("x", -radius)
            .attr("y", -radius)
            .attr("width", diameter)
            .attr("height", diameter)
        ;
        image.exit()
            .remove()
        ;
        this._tooltipElement.text(this.tooltip());
    };

    Icon.prototype.exit = function (domNode, element) {
        SVGWidget.prototype.exit.apply(this, arguments);
        this._shapeWidget
            .target(null)
        ;
        this._faChar
            .target(null)
        ;
    };

    return Icon;
}));


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('common/IList',[], factory);
    } else {
        root.common_IList = factory();
    }
}(this, function () {
    function IList() {
    }
    
    //  Properties  ---

    //  Events  ---
    IList.prototype.click = function (d) {
        console.log("Click:  " + d);
    };

    IList.prototype.dblclick = function (d) {
        console.log("Double click:  " + d);
    };

    return IList;
}));


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('common/Image.js',["./HTMLWidget"], factory);
    } else {
        root.common_Image = factory(root.common_HTMLWidget);
    }
}(this, function (HTMLWidget) {
    function Image() {
        HTMLWidget.call(this);
        this._drawStartPos = "center";
    }
    Image.prototype = Object.create(HTMLWidget.prototype);
    Image.prototype.constructor = Image;
    Image.prototype._class += " common_Image";

    Image.prototype.publish("source", null, "string", "Image Source", null, { tags: ["Basic"] });
    Image.prototype.publish("sizing", "actual", "set", "Controls sizing mode", ["actual", "fit", "custom"], { tags: ["Basic"] });
    Image.prototype.publish("customWidth", "50%", "string", "Applies this width to IMG element if 'sizing' is set to 'custom'", null, { tags: ["Basic"], disable: function (w) { return w.sizing() !== "custom"; } });
    Image.prototype.publish("customHeight", "20%", "string", "Applies this height to IMG element if 'sizing' is set to 'custom'", null, { tags: ["Basic"], disable: function (w) { return w.sizing() !== "custom"; } });
    Image.prototype.publish("lockAspectRatio", true, "boolean", "Locks the aspect ratio when scaling/stretching", null, { tags: ["Basic"], disable: function (w) { return w.sizing() !== "fit"; } });
    Image.prototype.publish("alignment", "center", "set", "Image Alignment", ["center", "origin"], { tags: ["Basic"] });

    Image.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
    };

    Image.prototype.update = function (domNode, element) {
        this._drawStartPos = this.alignment();
        HTMLWidget.prototype.update.apply(this, arguments);
        var context = this;
        var img = element.selectAll("img").data(this.source() ? [this.source()] : [], function (d) { return d; });
        img.enter()
            .append("img")
            .attr("src", this.source())
            .on("load", function (d) {
                img.style(context.calcSize());
            })
        ;
        img.style(this.calcSize());
        img.exit()
            .remove()
        ;
    };

    Image.prototype.calcSize = function () {
        var retVal = {
            width: "auto",
            height: "auto"
        };
        switch (this.sizing()) {
            case "fit":
                if (this.lockAspectRatio()) {
                    var img = this.element().select("img");
                    img.style({ width: "auto", height: "auto" });
                    var bbox = img.node().getBoundingClientRect();
                    var xScale = bbox.width / this.width();
                    var yScale = bbox.height / this.height();
                    if (xScale > yScale) {
                        retVal.width = this.width() + "px";
                        retVal.height = (bbox.height / xScale) + "px";
                    } else {
                        retVal.width = (bbox.width / yScale) + "px";
                        retVal.height = this.height() + "px";
                    }
                } else {
                    retVal.width = this.width() + "px";
                    retVal.height = this.height() + "px";
                }
                break;
            case "custom":
                retVal.width = this.customWidth();
                retVal.height = this.customHeight();
                break;
        }
        return retVal;
    };

    Image.prototype.exit = function (domNode, element) {
        HTMLWidget.prototype.exit.apply(this, arguments);
    };

    return Image;
}));


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('common/IMenu',[], factory);
    } else {
        root.common_IMenu = factory();
    }
}(this, function () {
    function IMenu() {
    }

    //  Properties  ---

    //  Events  ---
    IMenu.prototype.click = function (d) {
        console.log("Click:  " + d);
    };
    IMenu.prototype.preShowMenu = function () {
        console.log("preShowMenu");
    };
    IMenu.prototype.postHideMenu = function (d) {
        console.log("postHideMenu");
    };

    return IMenu;
}));



(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('common/TextBox.js',["./SVGWidget", "./Shape", "./Text", "css!./TextBox"], factory);
    } else {
        root.common_TextBox = factory(root.common_SVGWidget, root.common_Shape, root.common_Text);
    }
}(this, function (SVGWidget, Shape, Text) {
    function TextBox() {
        SVGWidget.call(this);

        this._shape = new Shape()
            .shape("rect")
        ;
        this._text = new Text();
    }
    TextBox.prototype = Object.create(SVGWidget.prototype);
    TextBox.prototype.constructor = TextBox;
    TextBox.prototype._class += " common_TextBox";

    TextBox.prototype.publishProxy("text", "_text");
    TextBox.prototype.publishProxy("shape_colorStroke", "_shape", "colorStroke");
    TextBox.prototype.publishProxy("shape_colorFill", "_shape", "colorFill");
    TextBox.prototype.publishProxy("text_colorFill", "_text", "colorFill");
    TextBox.prototype.publish("paddingLeft", 4, "number", "Padding:  Left",null,{tags:["Private"]});
    TextBox.prototype.publish("paddingRight", 4, "number", "Padding:  Right",null,{tags:["Private"]});
    TextBox.prototype.publish("paddingTop", 4, "number", "Padding:  Top",null,{tags:["Private"]});
    TextBox.prototype.publish("paddingBottom", 4, "number", "Padding:  Bottom",null,{tags:["Private"]});
    TextBox.prototype.publishProxy("anchor", "_text");
    TextBox.prototype.publish("fixedSize", null);

    TextBox.prototype.publish("tooltip", "", "string", "Tooltip", null, { tags: ["Private"] });

    TextBox.prototype.padding = function (_) {
        this.paddingLeft(_);
        this.paddingRight(_);
        this.paddingTop(_);
        this.paddingBottom(_);
        return this;
    };

    TextBox.prototype.enter = function (domNode, element) {
        SVGWidget.prototype.enter.apply(this, arguments);
        this._tooltipElement = element.append("title");
        this._shape
            .target(domNode)
            .render()
        ;
        this._text
            .target(domNode)
            .render()
        ;
    };

    TextBox.prototype.update = function (domNode, element) {
        SVGWidget.prototype.update.apply(this, arguments);
        this._tooltipElement.text(this.tooltip());
        this._text
            .render()
        ;
        var textBBox = this._text.getBBox(true);
        var size = {
            width: this.fixedSize() ? this.fixedSize().width : textBBox.width + this.paddingLeft() + this.paddingRight(),
            height: this.fixedSize() ? this.fixedSize().height : textBBox.height + this.paddingTop() + this.paddingBottom()
        };
        this._shape
            .width(size.width)
            .height(size.height)
            .render()
        ;
        if (this.fixedSize()) {
            switch (this.anchor()) {
                case "start":
                    this._text
                        .x(-this.fixedSize().width / 2 + textBBox.width / 2 + (this.paddingLeft() + this.paddingRight()) / 2)
                        .render()
                    ;
                    break;
                case "end":
                    this._text
                        .x(this.fixedSize().width / 2 - textBBox.width / 2 - (this.paddingLeft() + this.paddingRight()) / 2)
                        .render()
                    ;
                    break;
            }
        }
    };

    TextBox.prototype.exit = function (domNode, element) {
        this._shape
            .target(null)
        ;
        this._text
            .target(null)
        ;
        SVGWidget.prototype.exit.apply(this, arguments);
    };

    return TextBox;
}));



(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('common/List',["d3", "../common/SVGWidget", "./IList", "../common/TextBox", "css!./List"], factory);
    } else {
        root.common_List = factory(root.d3, root.common_SVGWidget, root.common_IList, root.common_TextBox);
    }
}(this, function (d3, SVGWidget, IList, TextBox) {
    function List(target) {
        SVGWidget.call(this);
        IList.call(this);

        this._listWidgets = {};
    }
    List.prototype = Object.create(SVGWidget.prototype);
    List.prototype.constructor = List;
    List.prototype._class += " common_List";
    List.prototype.implements(IList.prototype);

    List.prototype.publish("anchor", "start", "set", "Anchor Position", ["", "start", "middle", "end"],{tags:["Private"]});

    List.prototype.update = function (domNode, element) {
        SVGWidget.prototype.update.apply(this, arguments);
        var context = this;

        var line = element.selectAll(".line").data(this.data(), function (d) { return d; });
        line.enter().append("g")
            .attr("class", "line")
            .each(function (d) {
                var newTextBox = new TextBox()
                    .target(this)
                    .paddingTop(0)
                    .paddingBottom(0)
                    .paddingLeft(8)
                    .paddingRight(8)
                    .text(d)
                    .render()
                ;
                newTextBox.element()
                    .on("click", function (d) {
                        context.click(d.text());
                    })
                    .on("dblclick", function (d) {
                        context.dblclick(d.text());
                    })
                ;
                context._listWidgets[d] = newTextBox;
            })
        ;

        var listHeight = 0;
        var listWidth = 0;
        var listCount = 0;
        for (var key in this._listWidgets) {
            if (!this._listWidgets.hasOwnProperty(key)) continue;
            var bbox = this._listWidgets[key].getBBox();
            listHeight += bbox.height;
            if (listWidth < bbox.width)
                listWidth = bbox.width;
            ++listCount;
        }

        var yPos = -listHeight / 2;// + lineHeight / 2;
        line.each(function (d) {
            var widget = context._listWidgets[d];
            var bbox = widget.getBBox();
            widget
                .pos({ x: 0, y: yPos + bbox.height / 2 })
                .anchor(context.anchor())
                .fixedSize({ width: listWidth, height: bbox.height })
                .render()
            ;
            yPos += bbox.height;
        });
        line.exit()
            .remove()
            .each(function (d) {
                context._listWidgets[d].target(null);
                delete context._listWidgets[d];
            })
        ;
    };

    List.prototype.exit = function (domNode, element) {
        for (var key in this._listWidgets) {
            this._listWidgets[key].target(null);
        }
        SVGWidget.prototype.exit.apply(this, arguments);
    };

    return List;
}));



(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('common/Menu',["d3", "./SVGWidget", "./IMenu", "./Icon", "./List", "css!./Menu"], factory);
    } else {
        root.common_Menu = factory(root.d3, root.common_SVGWidget, root.common_IMenu, root.common_Icon, root.common_List);
    }
}(this, function (d3, SVGWidget, IMenu, Icon, List) {
    function Menu() {
        SVGWidget.call(this);
        IMenu.call(this);

        this._icon = new Icon()
            .shape("square")
            .diameter(14)
        ;
        this._list = new List();

        var context = this;
        this._list.click = function (d) {
            d3.event.stopPropagation();
            context.hideMenu();
            context.click(d);
        };
        this._open = false;
    }
    Menu.prototype = Object.create(SVGWidget.prototype);
    Menu.prototype.constructor = Menu;
    Menu.prototype._class += " common_Menu";
    Menu.prototype.implements(IMenu.prototype);

    Menu.prototype.publishProxy("faChar", "_icon", null, "\uf0c9");
    Menu.prototype.publishProxy("paddingPercent", "_icon", null, 10);

    Menu.prototype.toggleMenu = function () {
        if (!this._open) {
            this.showMenu();
        } else {
            this.hideMenu();
        }
    };

    Menu.prototype.showMenu = function () {
        this.preShowMenu();
        this._open = true;
        this._list
            .data(this.data())
            .render()
        ;

        var bbox = this._icon.getBBox(true);
        var menuBBox = this._list.getBBox(true);
        var pos = {
            x: bbox.width / 2 - menuBBox.width / 2,
            y: bbox.height / 2 + menuBBox.height / 2
        };
        this._list
            .move(pos)
        ;
        var context = this;
        d3.select("body")
            .on("click." + this._id, function () {
                console.log("click:  body - " + context._id);
                if (context._open) {
                    context.hideMenu();
                }
            })
        ;
    };

    Menu.prototype.hideMenu = function () {
        d3.select("body")
            .on("click." + this._id, null)
        ;
        this._open = false;
        this._list
            .data([])
            .render()
        ;
        this.postHideMenu();
    };

    Menu.prototype.enter = function (domNode, element) {
        SVGWidget.prototype.enter.apply(this, arguments);

        this._icon
            .target(domNode)
            .render()
        ;

        this._list
            .target(domNode)
            .render()
        ;

        var context = this;
        this._icon.element()
            .on("click", function (d) {
                d3.event.stopPropagation();
                context.toggleMenu();
            })
        ;
    };

    Menu.prototype.update = function (domNode, element) {
        SVGWidget.prototype.update.apply(this, arguments);
        element
            .classed("disabled", this.data().length === 0)
        ;

        this._icon
            .faChar(this.faChar())
            .paddingPercent(this.paddingPercent())
            .render()
        ;
    };

    Menu.prototype.exit = function (domNode, element) {
        this._icon
            .target(null)
        ;

        this._list
            .target(null)
        ;

        SVGWidget.prototype.exit.apply(this, arguments);
    };

    return Menu;
}));

(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('common/Palette.js',["d3", "colorbrewer"], factory);
    } else {
        root.common_Palette = factory(root.d3);
    }
}(this, function (d3) {
    var d3Ordinal = [
        "category10", "category20", "category20b", "category20c"
    ];
    var brewerOrdinal = [
        "Accent", "Dark2", "Paired", "Pastel1", "Pastel2", "Set1", "Set2", "Set3"
    ];
    var hpccOrdinal = [
        "hpcc10", "hpcc20"
    ];

    var ordinalCache = {};

    function fetchOrdinalItem(id, colors) {
        if (!id) return palette_ordinal();
        var retVal = ordinalCache[id];
        if (!retVal) {
            retVal = palette_ordinal(id, colors);
            ordinalCache[id] = retVal;
        }
        return retVal;
    }

    function palette_ordinal(id, colors) {
        if (!id) return ["default"].concat(d3Ordinal.concat(brewerOrdinal).concat(hpccOrdinal));
        var scale = null;

        if (colors) {
            scale = d3.scale.ordinal().range(colors);
        } else {
            if (d3Ordinal.indexOf(id) >= 0) {
                scale = new d3.scale[id]();
            } else if (hpccOrdinal.indexOf(id) >= 0) {
                var newColors = [];
                switch (id) {
                    case "hpcc10":
                        var defColors = palette_ordinal("default").colors();
                        newColors = defColors.filter(function (item, idx) {
                            if (idx % 2) {
                                return true;
                            }
                            return false;
                        });
                        break;
                    case "hpcc20":
                        newColors = palette_ordinal("category10").colors().concat(palette_ordinal("hpcc10").colors());
                        break;
                }
                scale = d3.scale.ordinal().range(newColors);
            } else if (brewerOrdinal.indexOf(id) > 0) {
                var largestPalette = 12;
                while (largestPalette > 0) {
                    if (colorbrewer[id][largestPalette]) {
                        scale = d3.scale.ordinal().range(colorbrewer[id][largestPalette]);
                        break;
                    }
                    --largestPalette;
                }
            }
            if (!scale) {
                //  Default to Category20  ---
                scale = d3.scale.category20();
            }
            colors = scale.range();
        }
        function ordinal(_) {
            return scale(_);
        }
        ordinal.type = function () {
            return "ordinal";
        };
        ordinal.id = function (_) {
            if (!arguments.length) return id;
            id = _;
            return ordinal;
        };
        ordinal.colors = function (_) {
            if (!arguments.length) return colors;
            colors = _;
            return ordinal;
        };
        ordinal.clone = function (newID) {
            ordinalCache[newID] = palette_ordinal(newID, this.colors());
            return ordinalCache[newID];

        };
        ordinal.cloneNotExists = function (newID) {
            if (ordinalCache[newID]) {
                return ordinalCache[newID];
            }
            return this.clone(newID);
        };
        ordinal.switch = function (_id, _colors) {
            if (id === _id) {
                return this;
            }
            return arguments.length ? fetchOrdinalItem(_id, _colors) : fetchOrdinalItem();
        };

        return ordinal;
    }

    var rainbowCache = {};
    function fetchRainbowItem(id, colors, steps) {
        if (!id) return palette_rainbow();
        var retVal = rainbowCache[id];
        if (!retVal) {
            retVal = palette_rainbow(id, colors, steps);
            rainbowCache[id] = retVal;
        }
        return retVal;
    }

    function palette_rainbow(id, _colors, _steps) {
        if (!arguments.length) {
            var retVal = ["default"];
            for (var key in colorbrewer) {
                if (brewerOrdinal.indexOf(key) === -1) {
                    retVal.push(key);
                }
            }
            return retVal;
        }

        var scale = null;
        var colors = _colors;

        var _custom = function (colors, steps) {
            steps = steps || 32;
            var subPaletteSize = Math.ceil(steps / (colors.length - 1));
            var range = [];
            var prevColor = null;
            colors.forEach(function (color) {
                if (prevColor) {
                    var scale = d3.scale.linear()
                        .domain([0, subPaletteSize])
                        .range([prevColor, color])
                        .interpolate(d3.interpolateLab)
                    ;
                    for (var i = 0; i < subPaletteSize; ++i) {
                        range.push(scale(i));
                    }
                }
                prevColor = color;
            });
            scale = d3.scale.quantize().domain([0, 100]).range(range);
            return scale;
        };

        if (_colors) {
            scale = _custom(_colors, _steps);
        } else {
            if (colorbrewer[id]) {
                var largestPalette = 12;
                while (largestPalette > 0) {
                    if (colorbrewer[id][largestPalette]) {
                        scale = _custom(colorbrewer[id][largestPalette]);
                        break;
                    }
                    --largestPalette;
                }
            }
            if (!scale) {
                scale = _custom(colorbrewer.RdYlGn[11]);
            }
            colors = scale.range();

        }
        function rainbow(x, low, high) {
            if (low === high) {
                return scale.domain([low - 1, high + 1])(x);
            }
            return scale.domain([low, high])(x);
        }
        rainbow.type = function () {
            return "rainbow";
        };
        rainbow.id = function (_) {
            if (!arguments.length) return id;
            id = _;
            return rainbow;
        };
        rainbow.colors = function (_) {
            if (!arguments.length) return colors;
            colors = _;
            return rainbow;
        };
        rainbow.clone = function (newID) {
            rainbowCache[newID] = palette_rainbow(newID, this.color());
            return rainbowCache[newID];
        };
        rainbow.cloneNotExists = function (newID) {
            if (rainbowCache[newID]) {
                return rainbowCache[newID];
            }
            return this.clone(newID);
        };
        rainbow.switch = function (_id, _colors) {
            if (id === _id) {
                return this;
            }
            return arguments.length ? fetchRainbowItem(_id, _colors) : fetchRainbowItem();
        };

        return rainbow;
    }

    var test = function(ordinalDivID, brewerDivID, customDivID, customArr, steps) {
        d3.select(ordinalDivID)
          .selectAll(".palette")
            .data(palette_ordinal(), function (d) { return d; })
          .enter().append("span")
            .attr("class", "palette")
            .attr("title", function(d) { return d; })
            .on("click", function(d) {
                console.log(d3.values(d.value).map(JSON.stringify).join("\n"));
            })
          .selectAll(".swatch").data(function (d) { return palette_ordinal(d).colors(); })
          .enter().append("span")
            .attr("class", "swatch")
            .style("background-color", function(d) { return d; });

        d3.select(brewerDivID)
          .selectAll(".palette")
            .data(palette_rainbow(), function (d) { return d; })
          .enter().append("span")
            .attr("class", "palette")
            .attr("title", function(d) { return d; })
            .on("click", function(d) {
                console.log(d3.values(d.value).map(JSON.stringify).join("\n"));
            })
          .selectAll(".swatch2").data(function (d) { return palette_rainbow(d).colors(); })
          .enter().append("span")
            .attr("class", "swatch2")
            .style("height", (256 / 32)+"px")
            .style("background-color", function(d) { return d; });

        var palette = { id: customArr.join("_") + steps, scale: palette_rainbow("custom", customArr, steps) };
        d3.select(customDivID)
          .selectAll(".palette")
            .data([palette], function (d) { return d.id; })
          .enter().append("span")
            .attr("class", "palette")
            .attr("title", function(d) { return "aaa";/*d.from + "->" + d.to;*/ })
            .on("click", function(d) {
                console.log(d3.values(d.value).map(JSON.stringify).join("\n"));
            })
          .selectAll(".swatch2").data(function(d) {
                var retVal = [];
                for (var i = 0; i <= 255; ++i) {
                    retVal.push(palette.scale(i, 0, 255));
                }
                return retVal;
          })
          .enter().append("span")
            .attr("class", "swatch2")
            .style("background-color", function(d) { return d; });
    };

    colorbrewer.RdWhGr = {
        3: ["red", "white", "green"]
    };
    return {
        ordinal: fetchOrdinalItem,
        rainbow: fetchRainbowItem,
        test: test
    };
}));


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('common/Surface.js',["d3", "./SVGWidget", "./Icon", "./Shape", "./Text", "./FAChar", "./Menu", "css!./Surface"], factory);
    } else {
        root.common_Surface = factory(root.d3, root.common_SVGWidget, root.common_Icon, root.common_Shape, root.common_Text, root.common_FAChar, root.common_Menu);
    }
}(this, function (d3, SVGWidget, Icon, Shape, Text, FAChar, Menu) {
    function Surface() {
        SVGWidget.call(this);

        this._icon = new Icon()
            .faChar("\uf07b")
            .paddingPercent(50)
        ;
        this._container = new Shape()
            .class("container")
            .shape("rect")
        ;
        this._titleRect = new Shape()
            .class("title")
            .shape("rect")
        ;
        this._text = new Text()
            .class("title")
        ;
        this._menu = new Menu()
            .paddingPercent(0)
        ;
        var context = this;
        this._menu.preShowMenu = function () {
            if (context.content() && context.content().hasOverlay()) {
                context.content().visible(false);
            }
        };
        this._menu.postHideMenu = function () {
            if (context.content() && context.content().hasOverlay()) {
                context.content().visible(true);
            }
        };

        this._surfaceButtons = [];
    }
    Surface.prototype = Object.create(SVGWidget.prototype);
    Surface.prototype.constructor = Surface;
    Surface.prototype._class += " common_Surface";

    Surface.prototype.publish("showTitle", true, "boolean", "Show Title",null,{tags:["Basic"]});
    Surface.prototype.publish("title", "", "string", "Title",null,{tags:["Basic"]});
    Surface.prototype.publishProxy("titleFontSize", "_text", "fontSize");
    Surface.prototype.publish("showIcon", true, "boolean", "Show Title",null,{tags:["Advanced"]});
    Surface.prototype.publishProxy("icon_faChar", "_icon", "faChar");
    Surface.prototype.publishProxy("icon_shape", "_icon", "shape");

    Surface.prototype.publish("content", null, "widget", "Content",null,{tags:["Private"]});

    Surface.prototype.publish("buttonAnnotations", [], "array", "Button Array",null,{tags:["Intermediate"]});
    Surface.prototype.publish("buttonGutter", 25, "number", "Space Between Menu and Buttons",null,{tags:["Intermediate"]});

    Surface.prototype.publish("showContent", true, "boolean", "Show Content",null,{tags:["Intermediate"]});
    Surface.prototype.publish("menu", [], "array", "Menu List Data",null,{tags:["Intermediate"]});
    Surface.prototype.publish("menuPadding", 2, "number", "Menu Padding",null,{tags:["Advanced"]});

    Surface.prototype._origMenuParam = Surface.prototype.menu;
    Surface.prototype.menu = function (_) {
        Surface.prototype._origMenuParam.apply(this, arguments);
        if (arguments.length) {
            this._menu.data(_);
            return this;
        }
        return this._menu.data();
    };

    Surface.prototype._origShowContent = Surface.prototype.showContent;
    Surface.prototype.showContent = function (_) {
        var retVal = Surface.prototype._origShowContent.apply(this, arguments);
        if (arguments.length) {
            if (this.content()) {
                this.content().visible(this.showContent());
            }
        }
        return retVal;
    };

    Surface.prototype.enter = function (_domNode, _element) {
        SVGWidget.prototype.enter.apply(this, arguments);
        var element = _element.append("g").attr("class", "frame");
        var domNode = element.node();
        this._clipRect = element.append("defs").append("clipPath")
            .attr("id", this.id() + "_clip")
            .append("rect")
                .attr("x", 0)
                .attr("y", 0)
                .attr("width", this._size.width)
                .attr("height", this._size.height)
        ;
        this._titleRect
            .target(domNode)
            .render()
            .display(this.showTitle() && this.showIcon())
        ;
        this._icon
            .target(domNode)
            .render()
        ;
        this._menu
            .target(_domNode)
        ;
        this._text
            .target(domNode)
        ;
        this._container
            .target(domNode)
        ;
        this.buttonContainer = d3.select(this._target).append("div").attr("class", "svg-button-container");
    };

    Surface.prototype.update = function (domNode, element) {
        SVGWidget.prototype.update.apply(this, arguments);
        var context = this;

        var width = this.width() - 1;
        var height = this.height() - 1;

        this._icon
            .display(this.showTitle() && this.showIcon())
            .shape(this.icon_shape())
            .render()
        ;
        this._menu
            .render()
        ;
        this._text
            .text(this.title())
            .display(this.showTitle())
            .render()
        ;

        var surfaceButtons = this.buttonContainer.selectAll(".surface-button").data(this.buttonAnnotations());
        surfaceButtons.enter().append("button").attr("class","surface-button")
            .each(function (button, idx) {
                var el = context._surfaceButtons[idx] = d3.select(this)
                    .attr("class", "surface-button " + (button.class ? button.class : ""))
                    .attr("id", button.id)
                    .style("padding", button.padding)
                    .style("width", button.width)
                    .style("height", button.height)
                    .style("cursor","pointer")
                    .on("click", function(d) { context.click(d); });
                if (button.font === "FontAwesome") {
                    el
                      .append("i")
                      .attr("class","fa")
                      .text(function(d) { return button.label; });
                } else {
                    el
                      .text(function(d) { return button.label; });
                }
            })
        ;
        surfaceButtons.exit()
            .each(function (d, idx) {
                var element = d3.select(this);
                delete context._surfaceButtons[idx];
                element.remove();
            })
        ;

        var buttonClientHeight = this.showTitle() ? Math.max.apply(null,this._surfaceButtons.map(function(d) { return d.node().offsetHeight; })) : 0;
        var iconClientSize = this.showTitle() && this.showIcon() ? this._icon.getBBox(true) : {width:0, height: 0};
        var textClientSize = this._text.getBBox(true);
        var menuClientSize = this._menu.getBBox(true);
        var _titleRegionHeight = Math.max(iconClientSize.height, textClientSize.height, menuClientSize.height, buttonClientHeight);
        var titleRegionHeight = this.showTitle() ? _titleRegionHeight : 0;
        var yTitle = (-height + _titleRegionHeight) / 2;

        var titleTextHeight = this.showTitle() ? Math.max(textClientSize.height, menuClientSize.height, buttonClientHeight) : 0;

        var topMargin = titleRegionHeight <= titleTextHeight ? 0 : (titleRegionHeight - titleTextHeight) / 2;
        var leftMargin = topMargin;

        this._titleRect
            .pos({ x: leftMargin, y: yTitle })
            .width(width - leftMargin * 2)
            .height(titleTextHeight)
            .display(this.showTitle())
            .render()
        ;
        this._icon
            .move({ x: -width / 2 + iconClientSize.width / 2, y: yTitle })
        ;
        this._menu
            .move({ x: width / 2 - menuClientSize.width / 2 - this.menuPadding(), y: yTitle })
        ;
        this._text
            .move({ x: (iconClientSize.width / 2 - menuClientSize.width / 2) / 2, y: yTitle })
        ;

        var xPos = context._titleRect.node().getBoundingClientRect().left + (context._size.width - leftMargin * 2) - context.buttonGutter() - this.buttonContainer.node().offsetWidth;
        var yPos = context._titleRect.node().getBoundingClientRect().top + ((titleTextHeight - this.buttonContainer.node().offsetHeight) / 2);
        if (!isNaN(xPos)) {
            this.buttonContainer.style("left", xPos + "px");
        }
        if (!isNaN(yPos)) {
            this.buttonContainer.style("top", yPos + "px");
        }

        if (this.showTitle()) {
            this._container
                .pos({ x: leftMargin / 2, y: titleRegionHeight / 2 - topMargin / 2 })
                .width(width - leftMargin)
                .height(height - titleRegionHeight + topMargin)
                .render()
            ;
        } else {
            this._container
                .pos({ x: 0, y: 0 })
                .width(width)
                .height(height)
                .render()
            ;
        }

        if (this.showContent()) {
            var xOffset = leftMargin;
            var yOffset = titleRegionHeight - topMargin;

            var content = element.selectAll(".content").data(this.content() ? [this.content()] : [], function (d) { return d._id; });
            content.enter().append("g")
                .attr("class", "content")
                .attr("clip-path", "url(#" + this.id() + "_clip)")
                .each(function (d) {
                    d.target(this);
                })
            ;
            content
                .attr("transform", "translate(" + (leftMargin / 2) + ", " + (titleRegionHeight / 2 - topMargin / 2) +")")
                .each(function (d) {
                    var padding = {
                        left: 0,
                        top: 0,
                        right: 1,
                        bottom: 1
                    };
                    d
                        .resize({
                            width: width - xOffset - (padding.left + padding.right),
                            height: height - yOffset - (padding.top + padding.bottom)
                        })
                    ;
                })
            ;
            if (this.content()) {
                this._clipRect
                    .attr("x", -(width - xOffset) / 2)
                    .attr("y", -(height - yOffset) / 2)
                    .attr("width", width - xOffset)
                    .attr("height", height - yOffset)
                ;
            }
            content.exit().transition()
                .each(function (d) { d.target(null); })
                .remove()
            ;
        }

        if (this._menu.element() && this._menu.element().node() && this._menu.element().node().parentNode) {
            this._menu.element().node().parentNode.appendChild(this._menu.element().node()); // Make sure menu is on top (Z-Order POV)
        }
    };

    Surface.prototype.exit = function (domNode, element) {
        this._titleRect
            .target(null)
        ;
        this._icon
            .target(null)
        ;
        this._menu
            .target(null)
        ;
        this._text
            .target(null)
        ;
        this._container
            .target(null)
        ;
        if (this.content()) {
            this.content().target(null);
        }
        SVGWidget.prototype.exit.apply(this, arguments);
    };

    Surface.prototype.intersection = function (pointA, pointB) {
        var hits = [];
        var i1 = this._icon.intersection(pointA, pointB, this._pos);
        if (i1) {
            hits.push({i: i1, d: this.distance(i1, pointB)});
        }
        var i2 = this._titleRect.intersection(pointA, pointB);
        if (i2) {
            hits.push({i: i2, d: this.distance(i2, pointB)});
        }
        var i3 = this._container.intersection(pointA, pointB);
        if (i3) {
            hits.push({i: i3, d: this.distance(i3, pointB)});
        }
        var nearest = null;
        hits.forEach(function (item) {
            if (nearest === null || nearest.d > item.d) {
                nearest = item;
            }
        });
        return nearest && nearest.i ? nearest.i : null;
    };

    Surface.prototype.click = function(obj, widget) {
        console.log("Clicked: " + obj.id);
    };

    return Surface;
}));


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('common/ResizeSurface.js',["d3", "./Surface", "css!./ResizeSurface"], factory);
    } else {
        root.common_ResizeSurface = factory(root.d3, root.common_Surface);
    }
}(this, function (d3, Surface) {
    function ResizeSurface() {
        Surface.call(this);

        this.handleWidth = 8;
        this.handles = [{ loc: "NW" }, { loc: "N" }, { loc: "NE" }, { loc: "E" }, { loc: "SE" }, { loc: "S" }, { loc: "SW" }, { loc: "W" }];

        var context = this;
        this.dispatch = d3.dispatch("sizestart", "size", "sizeend");
        this.drag = d3.behavior.drag()
            .origin(function (d) { return d; })
            .on("dragstart", function (d) {
                context.dispatch.sizestart(context, d.loc);
                if (context.allowResize()) {
                    d3.event.sourceEvent.stopPropagation();
                    context._dragHandlePos = { x: d.x, y: d.y };
                    context._dragStartPos = context.pos();
                    context._dragStartSize = context.size();
                    context._prevPosSize = {
                        x: context._dragStartPos.x,
                        y: context._dragStartPos.y,
                        width: context._dragStartSize.width,
                        height: context._dragStartSize.height
                    };
                    context._textPosSize = context._text.getBBox(true);
                    context._iconPosSize = context._icon.getBBox(true);
                    context.showContent(false);
                }
            })
            .on("drag", function (d) {
                if (context.allowResize()) {
                    d3.event.sourceEvent.stopPropagation();
                    var _dx = d3.event.x - context._dragHandlePos.x;
                    var _dy = d3.event.y - context._dragHandlePos.y;
                    var delta = { x: 0, y: 0, w: 0, h: 0 };
                    switch (d.loc) {
                        case "NW":
                            delta.x = _dx / 2;
                            delta.w = -_dx;
                            /* falls through */
                        case "N":
                            delta.y = _dy / 2;
                            delta.h = -_dy;
                            break;
                        case "NE":
                            delta.y = _dy / 2;
                            delta.h = -_dy;
                            /* falls through */
                        case "E":
                            delta.x = _dx / 2;
                            delta.w = _dx;
                            break;
                        case "SE":
                            delta.x = _dx / 2;
                            delta.w = _dx;
                            /* falls through */
                        case "S":
                            delta.y = _dy / 2;
                            delta.h = _dy;
                            break;
                        case "SW":
                            delta.y = _dy / 2;
                            delta.h = _dy;
                            /* falls through */
                        case "W":
                            delta.x = _dx / 2;
                            delta.w = -_dx;
                            break;
                    }
                    var posSize = {
                        x: context._dragStartPos.x + delta.x,
                        y: context._dragStartPos.y + delta.y,
                        width: context._dragStartSize.width + delta.w,
                        height: context._dragStartSize.height + delta.h
                    };
                    if (posSize.width < context._iconPosSize.width * 2 + context._textPosSize.width) {
                        posSize.x = context._prevPosSize.x;
                        posSize.width = context._prevPosSize.width;
                    }
                    if (posSize.height < context._textPosSize.height + 48) {
                        posSize.y = context._prevPosSize.y;
                        posSize.height = context._prevPosSize.height;
                    }
                    context
                        .pos({ x: posSize.x, y: posSize.y }, false, false)
                        .size({ width: posSize.width, height: posSize.height })
                        .render()
                        .getBBox(true)
                    ;
                    context.dispatch.size(context, d.loc);
                    context._prevPosSize = posSize;
                }
            })
            .on("dragend", function (d) {
                if (context.allowResize()) {
                    d3.event.sourceEvent.stopPropagation();
                    context
                        .showContent(true)
                        .render()
                    ;
                    context._container.getBBox(true);
                    context._titleRect.getBBox(true);
                    context.dispatch.sizeend(context, d.loc);
                }
            })
        ;
    }
    ResizeSurface.prototype = Object.create(Surface.prototype);
    ResizeSurface.prototype.constructor = ResizeSurface;
    ResizeSurface.prototype._class += " common_ResizeSurface";

    ResizeSurface.prototype.publish("allowResize", true, "boolean", "Sets if surface can be resized",null,{tags:["Private","Shared"]});

    ResizeSurface.prototype.move = function (_) {
        var retVal = Surface.prototype.move.apply(this, arguments);
        this.updateHandles(this._domNode, this._element);
        return retVal;
    };

    ResizeSurface.prototype.update = function (domNode, element) {
        Surface.prototype.update.apply(this, arguments);
        this.updateHandles(domNode, element);
    };

    ResizeSurface.prototype.updateHandles = function (domNode, element) {
        var sizeHandles = this._parentElement.selectAll("rect").data(this.handles, function (d) { return d.loc; });
        sizeHandles.enter().append("rect")
            .attr("class", function (d) { return "resize" + d.loc; })
            .call(this.drag)
        ;

        var l = this._pos.x + this._container._pos.x - this._container.width() / 2;
        var t = this._pos.y + this._titleRect._pos.y - this._titleRect.height() / 2;
        var r = this._pos.x + this._container._pos.x + this._container.width() / 2;
        var b = this._pos.y + this._container._pos.y + this._container.height() / 2;
        var w = r - l;
        var h = b - t;
        var context = this;
        sizeHandles
            .each(function (d) {
                switch (d.loc) {
                    case "NW":
                        d.x = l - context.handleWidth / 2;
                        d.y = t - context.handleWidth / 2;
                        d.width = context.handleWidth;
                        d.height = context.handleWidth;
                        break;
                    case "N":
                        d.x = l + context.handleWidth / 2;
                        d.y = t - context.handleWidth / 2;
                        d.width = w - context.handleWidth;
                        d.height = context.handleWidth;
                        break;
                    case "NE":
                        d.x = r - context.handleWidth / 2;
                        d.y = t - context.handleWidth / 2;
                        d.width = context.handleWidth;
                        d.height = context.handleWidth;
                        break;
                    case "E":
                        d.x = r - context.handleWidth / 2;
                        d.y = t + context.handleWidth / 2;
                        d.width = context.handleWidth;
                        d.height = h - context.handleWidth;
                        break;
                    case "SE":
                        d.x = r - context.handleWidth / 2;
                        d.y = b - context.handleWidth / 2;
                        d.width = context.handleWidth;
                        d.height = context.handleWidth;
                        break;
                    case "S":
                        d.x = l + context.handleWidth / 2;
                        d.y = b - context.handleWidth / 2;
                        d.width = w - context.handleWidth;
                        d.height = context.handleWidth;
                        break;
                    case "SW":
                        d.x = l - context.handleWidth / 2;
                        d.y = b - context.handleWidth / 2;
                        d.width = context.handleWidth;
                        d.height = context.handleWidth;
                        break;
                    case "W":
                        d.x = l - context.handleWidth / 2;
                        d.y = t + context.handleWidth / 2;
                        d.width = context.handleWidth;
                        d.height = h - context.handleWidth;
                        break;
                }
                d3.select(this)
                    .attr("x", d.x)
                    .attr("y", d.y)
                    .attr("width", d.width)
                    .attr("height", d.height)
                ;
            })
        ;
    };

    return ResizeSurface;
}));



(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('common/SVGZoomWidget.js',["d3", "../common/SVGWidget", "../common/Icon", "css!./SVGZoomWidget"], factory);
    } else {
        root.common_SVGZoomWidget = factory(root.d3, root.common_SVGWidget, root.common_Icon);
    }
}(this, function (d3, SVGWidget, Icon) {
    function SVGZoomWidget(target) {
        SVGWidget.call(this);
    }
    SVGZoomWidget.prototype = Object.create(SVGWidget.prototype);
    SVGZoomWidget.prototype.constructor = SVGZoomWidget;
    SVGZoomWidget.prototype._class += " common_SVGZoomWidget";

    SVGZoomWidget.prototype.publish("zoomToolbar", true, "boolean", "Show Zoom Toolbar");
    SVGZoomWidget.prototype.publish("zoomDuration", 250, "number", "Transition Duration");

    SVGZoomWidget.prototype.zoomTo = function (translate, scale, transitionDuration) {
        translate = translate || this._zoom.translate();
        scale = scale || this._zoom.scale();
        transitionDuration = transitionDuration === undefined ? this.zoomDuration() : 0;

        this._zoomElement.transition().duration(transitionDuration)
                .call(this._zoom.translate(translate).scale(scale).event)
        ;
    };

    SVGZoomWidget.prototype.zoomToFit = function (transitionDuration) {
        var bbox = this._renderElement.node().getBBox();
        if (bbox.width && bbox.height) {
            var x = bbox.x + bbox.width / 2;
            var y = bbox.y + bbox.height / 2;
            var dx = bbox.width;
            var dy = bbox.height;
            var width = this.width();
            var height = this.height();

            var scale = 1 / Math.max(dx / width, dy / height);
            var translate = [width / 2 - scale * x, height / 2 - scale * y];
            this.zoomTo(translate, scale, transitionDuration);
        }
    };

    SVGZoomWidget.prototype.enter = function (domNode, element) {
        SVGWidget.prototype.enter.apply(this, arguments);

        this._zoomElement = element.append("g");
        this._zoomGrab = this._zoomElement.append("rect")
            .attr("class", "background")
        ;
        this._zoomG = this._zoomElement.append("g");
        this._renderElement = this._zoomG.append("g");

        var context = this;
        this._zoom = d3.behavior.zoom()
            .scaleExtent([0.05, 20])
            .on("zoom", function () {
                context._zoomG.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
            })
        ;
        this._zoomElement.call(this._zoom);
    };

    SVGZoomWidget.prototype.update = function (domNode, element) {
        SVGWidget.prototype.update.apply(this, arguments);

        this._zoomGrab
            .attr("width", this.width())
            .attr("height", this.height())
        ;

        var context = this;
        var toolbar = element.selectAll(".toolbar").data(this.zoomToolbar() ? ["dummy"] : []);
        var iconDiameter = 24;
        var faCharHeight = 14;
        toolbar.enter().append("g")
            .attr("class", "toolbar")
            .each(function (d) {
                context._buttonToFit = new Icon()
                    .target(this)
                    .faChar("\uf0b2")
                    .shape("square")
                    .diameter(iconDiameter)
                    .paddingPercent((1 - faCharHeight / iconDiameter) * 100)
                    .on("click", function () {
                        context.zoomToFit();
                    })
                ;
                context._buttonPlus = new Icon()
                    .target(this)
                    .faChar("\uf067")
                    .shape("square")
                    .diameter(iconDiameter)
                    .paddingPercent((1 - faCharHeight / iconDiameter) * 100)
                    .on("click", function () {
                        context.zoomTo(null, context._zoom.scale() * 1.20);
                    })
                ;
                context._buttonMinus = new Icon()
                    .target(this)
                    .faChar("\uf068")
                    .shape("square")
                    .diameter(iconDiameter)
                    .paddingPercent((1 - faCharHeight / iconDiameter) * 100)
                    .on("click", function () {
                        context.zoomTo(null, context._zoom.scale() / 1.20);
                    })
                ;
                context._buttonLast = context._buttonMinus;
            })
        ;
        if (this.zoomToolbar()) {
            this._buttonToFit
                .x(this.width() - iconDiameter / 2 - 4)
                .y(iconDiameter / 2 + 4)
                .render()
            ;
            this._buttonPlus
                .x(this.width() - iconDiameter / 2 - 4)
                .y(this._buttonToFit.y() + 4 + iconDiameter)
                .render()
            ;
            this._buttonMinus
                .x(this.width() - iconDiameter / 2 - 4)
                .y(this._buttonPlus.y() + iconDiameter)
                .render()
            ;
        }
        toolbar.exit()
            .each(function () {
                context._buttonToFit
                    .target(null)
                    .render()
                ;
                delete context._buttonToFit;
            })
            .remove()
        ;
    };
    SVGZoomWidget.prototype.exit = function (domNode, element) {
        SVGWidget.prototype.exit.apply(this, arguments);
    };

    return SVGZoomWidget;
}));


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('common/WidgetArray.js',["./Widget"], factory);
    } else {
        root.common_WidgetArray = factory(root.common_Widget);
    }
}(this, function (Widget) {
    function WidgetArray() {
        Widget.call(this);
    }
    WidgetArray.prototype = Object.create(Widget.prototype);
    WidgetArray.prototype.constructor = WidgetArray;
    WidgetArray.prototype._class += " common_WidgetArray";

    WidgetArray.prototype.publish("content", [], "widgetArray", "Widget Array");

    WidgetArray.prototype.target = function (target) {
        if (!target) {
            this.content_reset();
            this.exit();
        }
    };

    return WidgetArray;
}));

