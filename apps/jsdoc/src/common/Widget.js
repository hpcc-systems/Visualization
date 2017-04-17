/**
* @file Base Widget Class
* @author HPCC Systems
*/

"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3"], factory);
    } else {
        root.require = root.require || function (paths, cb) {
            if (typeof paths === "function") {
                cb = paths;
                paths = [];
            }

            var objs = paths.map(function (path) {
                var prop = path.substring("src/".length).split("/").join("_");
                return root[prop];
            });

            cb.apply(null, objs);
        };

        root.common_Widget = factory(root.d3);
    }
}(this, function (d3) {
    var widgetID = 0;

    /**
     * @class common_Widget
     * @abstract
     * @noinit
     */

    /**
     * D3 Selection Object returned by d3.select() .
     * @typedef D3Selection
     * @type {Object}
    */

    /**
     * HPCC Visualization Widget Object
     * @typedef Widget
     * @type {Object}
    */

    /**
     * HTML/Javascript DOM Node Object
     * @typedef HTMLElement
     * @type {Object}
    */

    /**
     * SVG DOM Node Object
     * @typedef SVGEelement
     * @type {Object}
    */

    function Widget() {
        this._class = Object.getPrototypeOf(this)._class;
        this._id = "_w" + widgetID++;

        this._columns = [];
        this._data = [];
        this._pos = { x: 0, y: 0 };
        this._size = { width: 0, height: 0 };

        this._scale = 1;

        this._target = null;
        /**
         * Reference to parent element of the current widget.
         * @member {HTMLElement|SVGElement} _parentElement
         * @memberof common_Widget
         * @private
         */
        this._parentElement = null;
        /**
         * (SVG Widgets Only) - contains reference to parent widget.
         * @member {HTMLElement|SVGElement} _parentElement
         * @memberof common_Widget
         * @private
         */
        this._parentWidget = null;

        this._element = d3.select();

        this._watchArr = [];

        /**
         * Variable containing how many times the widget has been rendered.
         * @member {Number} _renderCount
         * @memberof common_Widget
         * @private
         */
        this._renderCount = 0;

        if (window.__hpcc_debug) {
            if (window.g_all === undefined) {
                window.g_all = {};
            }
            window.g_all[this._id] = this;
        }
    }
    Widget.prototype._class = " common_Widget";

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

    /**
     * Method used to implement a given interface file.
     * @method implements
     * @memberof common_Widget
     * @instance
     * @param {Object} source A given interface's object prototype.
     * @example Area.prototype.implements(INDChart.prototype);
     */
    Widget.prototype.implements = function (source) {
        for (var prop in source) {
            if (this[prop] === undefined && source.hasOwnProperty(prop)) {
                this[prop] = source[prop];
            }
        }
    };

    /**
     * Method used for defining a publish parameter for a widget. Creates a getter/setter function for the widget public "parameter".
     * @method publish
     * @memberof common_Widget
     * @instance
     * @param {String} id Name of the publish parameter.
     * @param {Mixed} defaultValue Default value for parameter.
     * @param {String} type Type of publish parameter. Available options include: [set, html-color, boolean, number, string, array].
     * @param {String} description Short description string of the parameter.
     * @param {Array|null} set The available "set" type values that the parameter can accept. Null if not set type parameter.
     * @param {Object} ext An object containing miscellaneous parameter settings.
     * @example Icon.prototype.publish("shape", "circle", "set", "Shape Type", ["circle", "square"],{tags:['Private']});
     * @example Icon.prototype.publish("diameter", 24, "number", "Diameter",null,{tags:['Private']});
     * @example Column.prototype.publish("isStacked", false, "boolean", "Stack Chart",null,{tags:['Basic','Shared']});
     * @example Pie.prototype.publish("pieSliceBorderColor", null, "html-color", "The Color of The Slice Borders",null,{tags:['Intermediate']});
     * @example Pie.prototype.publish("slicesOffset", [], "array", "Per Slice Offset",null,{tags:['Advanced']});
     * @example Pie.prototype.publish("pieResidueSliceLabel", "Other", "string", "A Label For The combination Slice That Holds All Slices Below SliceVisibilityThreshold",null,{tags:['Advanced']});
     */
    Widget.prototype.publish = function (id, defaultValue, type, description, set, ext) {
        if (this["__meta_" + id] !== undefined) {
            throw id + " is already published.";
        }
        this["__meta_" + id] = {
            id: id,
            type: type,
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
                    _ = typeof(_) === "string" && ["false", "off", "0"].indexOf(_.toLowerCase()) >= 0 ? false : Boolean(_);
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
            }
            if (isPrototype) {
                this["__meta_" + id].defaultValue = _;
            } else {
                this.broadcast(id, _, this["__prop_" + id]);
                this["__prop_" + id] = _;
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
        this[id + "_reset"] = function () {
            this["__prop_" + id] = undefined;
        };
        this["__prop_" + id] = undefined;
    };

    /**
     * TODO
     * @method publishWidget
     * @memberof common_Widget
     * @instance
     * @param {String} prefix Name of the publish parameter.
     * @param {Object} WidgetType Default value for parameter.
     * @param {String} id Type of publish parameter. Available options include: [set, html-color, boolean, number, string, array].
     * @example TODO
     */
    Widget.prototype.publishWidget = function (prefix, WidgetType, id) {
        for (var key in WidgetType.prototype) {
            if (key.indexOf("__meta") === 0) {
                var publishItem = WidgetType.prototype[key];
                this.publishProxy(prefix + "__prop_" + publishItem.id, id, publishItem.method || publishItem.id);
            }
        }
    };

    /**
     * TODO
     * Method used for allowing pass through of consumed widgets publish parameters in another widget.
     * @method publishProxy
     * @memberof common_Widget
     * @instance
     * @param {String} id Name of the pass through parameter.
     * @param {Object} proxy the widget object variable name used in the widget.
     * @param {String} method TODO
     * @param {Mixed} defaultValue Default value for new proxied parameter.
     * @example Menu.prototype.publishProxy("faChar", "_icon", null, "\uf0c9");
     */
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
        if (this._watchArr) {
            this._watchArr.forEach(function (func) {
                if (func) {
                    setTimeout(function () {
                        func(key, newVal, oldVal);
                    }, 0);
                }
            });
        }
    };

    /**
     * A mandatory callback function as parameter. The current widget object being operated on is passed to the function. The function will execute ater the widget has completed rendering.
     * @name Widget~EventCb
     * @function
     * @param {Mixed} data - The serialized data about what was clicked
     * @return undefined
     */

    /**
     * Sets event (click) callback function.
     * @method on
     * @memberof common_Widget
     * @instance
     * @param {String} eventID The name of the event. Ex: "click".
     * @param {Widget~EventCb} callback - The callback that is called when event is fired.
     * @param {Boolean} [stopPropagation=False] Sets whether the event is propogated.
     * @returns {Widget}
     * @example <caption>Example click callback.</caption>
     * var cb = function(data) { console.log(data); };
     * widget.on("click",cb,true).render();
     */
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

    /**
     * Sets or returns the widget ID. Normally "w_[x]" where x is the number id of the widget.
     * @method id
     * @memberof common_Widget
     * @instance
     * @param [String] _ String ID of widget.
     * @returns {Widget|String}
     */
    Widget.prototype.id = function (_) {
        if (!arguments.length) return this._id;
        this._id = _;
        return this;
    };

    /**
     * Sets or returns the class(es) set on the widgets container
     * @method class
     * @memberof common_Widget
     * @instance
     * @param [String] _ String class of widget.
     * @returns {Widget|String}
     */
    Widget.prototype.class = function (_) {
        if (!arguments.length) return this._class;
        this._class = _;
        return this;
    };

    Widget.prototype.classID = function () {
        return this._class.split(" ").pop();
    };

    /**
     * Sets the columns for the data being passed into the widget via .data() method.
     * @method columns
     * @memberof common_Widget
     * @instance
     * @param [String[]] _ An array of strings representing the column names for data passed to widget.
     * @returns {Widget}
     * @example widget
     * .columns(["ID", "Year 1", "Year 2"])
     * .data([ [40, 66, 60], [30, 98, 92]  ])
     * .render();
     */
    Widget.prototype.columns = function (_) {
        if (!arguments.length) return this._columns;
        this._columns = _;
        return this;
    };

    /**
     * Sets data to be render within widget.
     * @method data
     * @memberof common_Widget
     * @instance
     * @param {Mixed} _ The data being rendered.
     * @returns {Widget}
     * @example widget
     * .columns(["ID", "Year 1", "Year 2"])
     * .data([ [40, 66, 60], [30, 98, 92]  ])
     * .render();
     */
    Widget.prototype.data = function (_) {
        if (!arguments.length) return this._data;
        this._data = _;
        return this;
    };

    Widget.prototype.cloneData = function () {
        return this._data.map(function (row) { return row.slice(0); });
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

    /**
     * Returns an object representation of row data of a widget. This function is normally used to return an object containing the data about what was clicked on a chart/widget.
     * @method rowToObj
     * @memberof common_Widget
     * @instance
     * @param {Mixed[]} row A row of data from .data() of a widget
     * @returns {Object}
     * @example TODO
     */
    Widget.prototype.rowToObj = function (row) {
        var retVal = {};
        this._columns.forEach(function(col, idx) {
            retVal[col] = row[idx];
        });
        if (row.length === this._columns.length + 1) {
            retVal.__lparam = row[this._columns.length];
        }
        return retVal;
    };

    //TODO: doc
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

    /**
     * Sets/Gets size of widget.
     * @method size
     * @memberof common_Widget
     * @instance
     * @param {Object} [size] An object with the properties "width" and "height".
     * @param {Mixed} [size.width] Width in pixels.
     * @param {Mixed} [size.height] Height in pixels.
     * @returns {Widget|Object}
     * @example <caption>Example with specific height and width in pixels.</caption>
     * widget.size({width:"100",height:"100"}).render();
     * @example <caption>Example getting size.</caption>
     * var size = widget.size();
     */
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

    /**
     * Gets/Sets width of widget.
     * @method width
     * @memberof common_Widget
     * @instance
     * @param {Number} [_] Width in pixels.
     * @returns {Widget|Number}
     */
    Widget.prototype.width = function (_) {
        if (!arguments.length) return this._size.width;
        this.size({ width: _, height: this._size.height });
        return this;
    };

    /**
     * Gets/Sets height of widget.
     * @method height
     * @memberof common_Widget
     * @instance
     * @param {Number} [_] Height in pixels.
     * @returns {Widget|Number}
     */
    Widget.prototype.height = function (_) {
        if (!arguments.length) return this._size.height;
        this.size({ width: this._size.width, height: _ });
        return this;
    };

    /**
     * Resizes widget. If no argument is passed, it will resize to the maximum container width and height.
     * @method resize
     * @memberof common_Widget
     * @instance
     * @param {Object} [size] An object with the properties "width" and "height".
     * @param {Object} [delta] An object with the properties "width" and "height".
     * @param {Mixed} [size.width] Width in pixels.
     * @param {Mixed} [size.height] Height in pixels.
     * @param {Mixed} [delta.width] Width in pixels.
     * @param {Mixed} [delta.height] Height in pixels.
     * @returns {Widget}
     * @example <caption>Example with specific height and width in pixels.</caption>
     * widget.resize({width:"100",height:"100"}).render();
     * @example <caption>Example resize to maximum container dimensions</caption>
     * widget.resize().render();
     */
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

    /**
     * Returns scrollbar width.
     * @method getScrollbarWidth
     * @memberof common_Widget
     * @instance
     * @returns {Number}
     */
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

    /**
     * Gets/Sets scale/zoom of widget. Translation via css transform translate.
     * @method scale
     * @memberof common_Widget
     * @instance
     * @param {Object} [_] An object with "x" and "y" properties
     * @param {Number} [_.x] Horizontal translation in pixels.
     * @param {Number} [_.y] Vertical translation in pixels.
     * @returns {Widget|Number}
     * @TODO RETURN TYPE ISNT CORRECT NEEDS FIXING
     */
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

    /**
     * Gets/Sets visibility of widget via css attribute "visibility".
     * @method visible
     * @memberof common_Widget
     * @instance
     * @param {Boolean} _ True/False
     * @returns {Widget|Boolean}
     */
    Widget.prototype.visible = function (_) {
        if (!arguments.length) return this._visible;
        this._visible = _;
        if (this._parentElement) {
            this._parentElement.style("visibility", this._visible ? null : "hidden");
        }
        return this;
    };

    /**
     * Gets/Sets visibility of widget via css attribute "display".
     * @method display
     * @memberof common_Widget
     * @instance
     * @param {Boolean} _ True/False
     * @returns {Widget}
     */
    Widget.prototype.display = function (_) {
        if (!arguments.length) return this._display;
        this._display = _;
        if (this._element) {
            this._element.style("display", this._display ? null : "none");
        }
        return this;
    };

    /**
     * TODO
     * Returns an object with the position for which the widget should snap to.
     * @method calcSnap
     * @memberof common_Widget
     * @instance
     * @param {Object} snapSize
     * @returns {Object}
     *
     */
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
            if (widget) {
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

    /**
     * TODO
     * Returns the absolute position of a widget. { x:[x], y:[y] }
     * @method getAbsolutePos
     * @memberof common_Widget
     * @instance
     * @param {HTMLElement} domNode
     * @param {Number} w Width.
     * @param {Number} h Height.
     * @returns {Object}
     *
     */
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

    /**
     * Returns widget._overlayElement (used for testing if a widget has an overlay).
     * @method hasOverlay
     * @memberof common_Widget
     * @instance
     * @returns {HTMLElement}
     */
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

    /**
     * Returns D3 Selection Object of widget.
     * @method element
     * @memberof common_Widget
     * @instance
     * @returns {HTMLElement}
     */
    Widget.prototype.element = function () {
        return this._element;
    };

    /**
     * Returns HTML DOM Node.
     * @method node
     * @memberof common_Widget
     * @instance
     * @returns {HTMLElement}
     */
    Widget.prototype.node = function () {
        return this._element.node();
    };

    /**
     * An optional callback function as parameter. The current widget object being operated on is passed to the function. The function will execute ater the widget has completed rendering.
     * @name Widget~RenderCb
     * @function
     * @param {Widget} widget - The rendered widget.
     * @return undefined
     */

    /**
     * Renders widget in target container immediately.
     * @method render
     * @memberof common_Widget
     * @instance
     * @param {Widget~RenderCb} [callback] - The callback function that is executed after widget render.
     * @returns {Widget}
     * @example <caption>Example usage of render.</caption>
     * var w = new Widget.target("divID").render(function(widget) { console.log(widget); });
     */
    Widget.prototype.render = function (callback) {
        if (!this._parentElement)
            return this;

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
            .each(function exit(context) {
                context.exit(this, context._element);
            })
            .remove()
        ;
        this._renderCount++;

        if (callback) {
            callback(this);
        }

        return this;
    };

    /**
     * The function that is called when this widget "enters" the web page.
     * @method enter
     * @memberof common_Widget
     * @instance
     * @protected
     * @param {HTMLElement} domeNode HTML DOMNode of widget container.
     * @param {D3Selection} element d3 selection object of widget.
     */
    Widget.prototype.enter = function (domeNode, element) { };

    Widget.prototype.preUpdate = function (domeNode, element) { };

    /**
     * The function that is called when this widget "enters" the web page. After enter() and everytime the widget is updated with subsequent render calls.
     * @method update
     * @memberof common_Widget
     * @instance
     * @protected
     * @param {HTMLElement} domeNode HTML/SVG DOMNode of widget container.
     * @param {D3Selection} element d3 selection object of widget.
     */
    Widget.prototype.update = function (domeNode, element) { };

    Widget.prototype.postUpdate = function (domeNode, element) { };

    /**
     * The function that is executed after render. It is used for doing destroying/cleanup.
     * @method exit
     * @memberof common_Widget
     * @instance
     * @protected
     * @param {HTMLElement} domeNode HTML DOMNode of widget container.
     * @param {D3Selection} element d3 selection object of widget.
     */
    Widget.prototype.exit = function (domeNode, element) { };

    /**
     * An optional callback function as parameter. The current widget object being operated on is passed to the function. The function will execute ater the widget has completed rendering.
     * @name Widget~DebounceCb
     * @function
     */

    /**
     * Limits rate at which a function can be fired. (Normally used for "resize / positioning" events)
     * @method debounce
     * @memberof common_Widget
     * @instance
     * @param {Widget~DebounceCb} [callback] Function that needs it's fire rate limited.
     * @param {Number} [threshold=100] Fire rate threshold in milliseconds.
     * @param {Boolean} [execAsap=False] Sets whether the function should be executed immediately or wait for threshold amount of time.
     * @returns {Function}
     * @example <caption>Example usage of debounce from dermatology.html .</caption>
     * propEditor.onChange =  Surface.prototype.debounce(function (widget, propID) {
     *     if (propID === "columns") {
     *     } else if (propID === "data") {
     *     } else {
     *         displaySerialization();
     *         displaySerializationText();
     *     }
     * }, 500);
     * @see https://github.com/hpcc-systems/Visualization/blob/master/demos/dermatology.html (propEditor.onChange)
     */
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
