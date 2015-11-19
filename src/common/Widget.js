"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "./Database"], factory);
    } else {
        root.require = root.require || function (paths, cb) {
            if (typeof paths === "function") {
                cb = paths;
                paths = [];
            }

            var objs = paths.map(function (path) {
                var pathIdx = path.indexOf("src/") === 0 ? "src/".length : 0;
                var prop = path.substring(pathIdx).split("/").join("_");
                return root[prop];
            });

            cb.apply(null, objs);
        };

        root.common_Widget = factory(root.d3, root.common_Database);
    }
}(this, function (d3, Database) {
    var widgetID = 0;
    function Widget() {
        this._class = Object.getPrototypeOf(this)._class;
        this._id = "_w" + widgetID++;

        this._db = new Database.Grid();
        this._pos = { x: 0, y: 0 };
        this._size = { width: 0, height: 0 };
        this._scale = 1;
        this._visible = true;

        for (var key in this) {
            if (key.indexOf("__meta_") === 0) {
                switch (this[key].type) {
                    case "array":
                    case "widgetArray":
                        this["__prop_" + this[key].id] = [];
                        break;
                }
            }
        }

        this._target = null;
        this._parentElement = null;
        this._parentWidget = null;

        this._element = d3.select();

        this._watchArr = [];

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
    Widget.prototype._class = "common_Widget";

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

    Widget.prototype.applyTheme = function (theme) {
        if (!theme) {
            return;
        }
        var clsArr = this._class.split(" ");
        for (var i in clsArr) {
            if (theme[clsArr[i]]) {
                for (var paramName in theme[clsArr[i]]) {
                    if (this["__meta_" + paramName]) {
                        this["__meta_" + paramName].defaultValue = theme[clsArr[i]][paramName];
                    }
                }
            }
        }
    };

    Widget.prototype.ieVersion = (function () {
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
    Widget.prototype.isIE = Widget.prototype.ieVersion !== null;
    Widget.prototype.svgMarkerGlitch = Widget.prototype.isIE && Widget.prototype.ieVersion <= 12;
    Widget.prototype.MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver || function (callback) {
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
        window.MutationObserver = Widget.prototype.MutationObserver;
    }

    Widget.prototype.implements = function (source) {
        for (var prop in source) {
            if (this[prop] === undefined && source.hasOwnProperty(prop)) {
                this[prop] = source[prop];
            }
        }
    };

    // Serialization  ---
    Widget.prototype.publish = function (id, defaultValue, type, description, set, ext) {
        if (this["__meta_" + id] !== undefined && !ext.override) {
            throw id + " is already published.";
        }
        this["__meta_" + id] = {
            id: id,
            type: type,
            origDefaultValue: defaultValue,
            defaultValue: defaultValue,
            description: description,
            set: set,
            ext: ext || {}
        };
        this[id] = function (_) {
            var isPrototype = this._id === undefined;
            if (!arguments.length) {
                return !isPrototype && this["__prop_" + id] !== undefined ? this["__prop_" + id] : this["__meta_" + id].defaultValue;
            }
            if (_ === "" && this["__meta_" + id].ext.optional) {
                _ = null;
            } else if (_ !== null) {
                switch (type) {
                    case "set":
                        if (!set || set.indexOf(_) < 0) {
                            console.log("Invalid value for '" + id + "':  " + _);
                        }
                        break;
                    case "html-color":
                        if (window.__hpcc_debug && _ && _ !== "red") {
                            var litmus = "red";
                            var d = document.createElement("div");
                            d.style.color = litmus;
                            d.style.color = _;
                            //Element's style.color will be reverted to litmus or set to "" if an invalid color is given
                            if (d.style.color === litmus || d.style.color === "") {
                                console.log("Invalid value for '" + id + "':  " + _);
                            }
                        }
                        break;
                    case "boolean":
                        _ = typeof (_) === "string" && ["false", "off", "0"].indexOf(_.toLowerCase()) >= 0 ? false : Boolean(_);
                        break;
                    case "number":
                        _ = Number(_);
                        break;
                    case "string":
                        _ = String(_);
                        break;
                    case "array":
                        if (!(_ instanceof Array)) {
                            console.log("Invalid value for '" + id);
                        }
                        break;
                    case "object":
                        if (!(_ instanceof Object)) {
                            console.log("Invalid value for '" + id);
                        }
                        break;
                }
            }
            if (isPrototype) {
                this["__meta_" + id].defaultValue = _;
            } else {
                this.broadcast(id, _, this["__prop_" + id]);
                if (_ === null) {
                    delete this["__prop_" + id];
                } else {
                    this["__prop_" + id] = _;
                }
            }
            return this;
        };
        this[id + "_modified"] = function () {
            var isPrototype = this._id === undefined;
            if (isPrototype) {
                return this["__meta_" + id].defaultValue !== defaultValue;
            }
            return this["__prop_" + id] !== undefined;
        };
        this[id + "_exists"] = function () {
            var isPrototype = this._id === undefined;
            if (isPrototype) {
                return this["__meta_" + id].defaultValue !== undefined;
            }
            return this["__prop_" + id] !== undefined || this["__meta_" + id].defaultValue !== undefined;
        };
        this[id + "_reset"] = function () {
            switch (type) {
                case "widget":
                    if (this["__prop_" + id]) {
                        this["__prop_" + id].target(null);
                    }
                    break;
                case "widgetArray":
                    if (this["__prop_" + id]) {
                        this["__prop_" + id].forEach(function (widget) {
                            widget.target(null);
                        });
                    }
                    break;
            }
            this["__prop_" + id] = undefined;
        };
        this["__prop_" + id] = undefined;
    };

    Widget.prototype.publishWidget = function (prefix, WidgetType, id) {
        for (var key in WidgetType.prototype) {
            if (key.indexOf("__meta") === 0) {
                var publishItem = WidgetType.prototype[key];
                this.publishProxy(prefix + "__prop_" + publishItem.id, id, publishItem.method || publishItem.id);
            }
        }
    };

    Widget.prototype.publishProxy = function (id, proxy, method, defaultValue) {
        method = method || id;
        if (this["__meta_" + id] !== undefined) {
            throw id + " is already published.";
        }
        this["__meta_" + id] = {
            id: id,
            type: "proxy",
            proxy: proxy,
            method: method,
            defaultValue: defaultValue
        };
        this[id] = function (_) {
            var isPrototype = this._id === undefined;
            if (isPrototype) {
                throw "Setting default value of proxied properties is not supported.";
            }
            if (!arguments.length) return !defaultValue || this[id + "_modified"]() ? this[proxy][method]() : defaultValue;
            this.broadcast(id, _, this[proxy][method]());
            if (defaultValue && _ === defaultValue) {
                this[proxy][method + "_reset"]();
            } else {
                this[proxy][method](_);
            }
            return this;
        };
        this[id + "_modified"] = function () {
            var isPrototype = this._id === undefined;
            if (isPrototype) {
                throw "Setting default values of proxied properties is not supported.";
            }
            return this[proxy][method + "_modified"]() && (!defaultValue || this[proxy][method]() !== defaultValue);
        };
        this[id + "_reset"] = function () {
            var isPrototype = this._id === undefined;
            if (isPrototype) {
                throw "Setting default values of proxied properties is not supported.";
            }
            this[proxy][method + "_reset"]();
        };
    };

    Widget.prototype.watch = function (func) {
        var context = this;
        var idx = this._watchArr.push(func) - 1;
        return {
            remove: function () {
                delete context._watchArr[idx];
            }
        };
    };

    Widget.prototype.broadcast = function (key, newVal, oldVal) {
        if (this._watchArr && newVal !== oldVal) {
            this._watchArr.forEach(function (func) {
                if (func) {
                    setTimeout(function () {
                        func(key, newVal, oldVal);
                    }, 0);
                }
            });
        }
    };

    //  Events  ---
    Widget.prototype.on = function (eventID, func, stopPropagation) {
        if (this[eventID] === undefined) {
            throw "Method:  " + eventID + " does not exist.";
        }
        var origFunc = this[eventID];
        this[eventID] = function () {
            if (stopPropagation) {
                d3.event.stopPropagation();
            } else {
                origFunc.apply(this, arguments);
            }
            func.apply(this, arguments);
        };
        return this;
    };

    //  Implementation  ---
    Widget.prototype.id = function (_) {
        if (!arguments.length) return this._id;
        this._id = _;
        return this;
    };

    Widget.prototype.class = function (_) {
        if (!arguments.length) return this._class;
        this._class = _;
        return this;
    };

    Widget.prototype.classID = function () {
        return this._class.split(" ").pop();
    };

    Widget.prototype.columns = function (_) {
        if (!arguments.length) return this._db.legacyColumns();
        this._db.legacyColumns(_);
        return this;
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
        this.columns().forEach(function(col, idx) {
            retVal[col] = row[idx];
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

    Widget.prototype._scrollBarWidth = null;
    Widget.prototype.getScrollbarWidth = function () {
        if (Widget.prototype._scrollBarWidth === null) {
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

            Widget.prototype._scrollBarWidth = widthNoScroll - widthWithScroll;
        }
        return Widget.prototype._scrollBarWidth;
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
        if (!domNode) {
            return null;
        }
        var widget = this.toWidget(domNode);
        if (widget) {
            return widget;
        }
        return this.locateParentWidget(domNode.parentNode);
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
        callback = callback || function () { };
        if (!this.visible()) {
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
        for (var key in this) {
            if (key.indexOf("__meta_") === 0) {
                var meta = this[key];
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
            }
        }
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

    Widget.prototype.enter = function (domNode, element) { };
    Widget.prototype.preUpdate = function (domeNode, element) { };
    Widget.prototype.update = function (domeNode, element) { };
    Widget.prototype.postUpdate = function (domeNode, element) { };
    Widget.prototype.exit = function (domeNode, element) { };

    //  Util  ---
    Widget.prototype.debounce = function (func, threshold, execAsap) {
        return function debounced() {
            var obj = this || {}, args = arguments;
            function delayed() {
                if (!execAsap)
                    func.apply(obj, args);
                obj.timeout = null;
            }
            if (obj.timeout)
                clearTimeout(obj.timeout);
            else if (execAsap)
                func.apply(obj, args);
            obj.timeout = setTimeout(delayed, threshold || 100);
        };
    };

    return Widget;
}));
