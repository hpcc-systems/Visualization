(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3"], factory);
    } else {
        root.Widget = factory(root.d3);
    }
}(this, function (d3) {
    var widgetID = 0;
    var widgetMeta = {};
    function Widget() {
        this._id = "_w" + widgetID++;
        this._class = "";

        this._columns = [];
        this._data = [];
        this._pos = { x: 0, y: 0 };
        this._size = { width: 0, height: 0 };
        this._scale = 1;

        this._target = null;
        this._parentElement = null;
        this._parentWidget = null;

        this._element = d3.select();
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
    Widget.prototype.svgMarkerGlitch = Widget.prototype.isIE && Widget.prototype.ieVersion <= 11;
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
                }
                this.callback([mutation]);
            }
        };

        this.observe = function (domNode, config) {
            if (config.attributes) {
                var listener = new MutationListener(this.callback, domNode, "attributes");
                this.listeners.push(listener);
                domNode.addEventListener('DOMAttrModified', listener, true);
            }

            if (config.characterData) {
                var listener = new MutationListener(this.callback, domNode, "characterData");
                this.listeners.push(listener);
                domNode.addEventListener('DOMCharacterDataModified', listener, true);
            }

            if (config.childList) {
                var listener = new MutationListener(this.callback, domNode, "childList");
                this.listeners.push(listener);
                domNode.addEventListener('DOMNodeInserted', listener, true);
                domNode.addEventListener('DOMNodeRemoved', listener, true);
            }
        }

        this.disconnect = function () {
            this.listeners.forEach(function (item) {
                switch (item.type) {
                    case "attributes":
                        item.domNode.removeEventListener('DOMAttrModified', item, true);
                        break;
                    case "characterData":
                        item.domNode.removeEventListener('DOMCharacterDataModified', item, true);
                        break;
                    case "childList":
                        item.domNode.removeEventListener('DOMNodeRemoved', item, true);
                        item.domNode.removeEventListener('DOMNodeInserted', item, true);
                        break;
                }
            });
            this.listeners = [];
        }
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
    Widget.prototype.publish = function (id, defaultValue, type, description, options, ext) {
        if (this["__meta_" + id] !== undefined) {
            throw id + " is already published."
        }
        this["__meta_" + id] = {
            id: id,
            type: type,
            options: options,
            description: description,
            ext: ext || {}
        }
        this[id] = function (_) {
            if (!arguments.length) return this["_" + id];
            switch (type) {
                case "set":
                    if (!options || options.indexOf(_) < 0) {
                        throw "Invalid value for '" + id + "':  " + _;
                    }
                    break;
                case "boolean":
                    _ = Boolean(_);
                    break;
                case "number":
                    _ = Number(_);
                    break;
                case "string":
                    _ = String(_);
                    break;
            }
            this["_" + id] = _;
            return this;
        };
        this["_" + id] = defaultValue;
    };

    Widget.prototype.publishProxy = function (id, proxy, method, _private) {
        method = method || id;
        if (this["__meta_" + id] !== undefined) {
            throw id + " is already published."
        }
        if (!_private) {
            this["__meta_" + id] = {
                id: id,
                type: "proxy",
                proxy: proxy,
                method: method
            }
        }
        this[id] = function (_) {
            if (!arguments.length) return this[proxy][method]();
            this[proxy][method](_);
            return this;
        };
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

    Widget.prototype.columns = function (_) {
        if (!arguments.length) return this._columns;
        this._columns = _;
        return this;
    };

    Widget.prototype.data = function (_) {
        if (!arguments.length) return this._data;
        this._data = _;
        return this;
    };

    Widget.prototype.cloneData = function () {
        return this._data.map(function (row) { return row.slice(0); });
    };

    Widget.prototype.rowToObj = function (row) {
        var retVal = {};
        if (row.length !== this._columns.length) {
            throw "Columns and row do not match";
        }
        this._columns.forEach(function(col, idx) {
            retVal[col] = row[idx];
        });
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
        this.pos({ x: _, y: this._pos.y })
        return this;
    };

    Widget.prototype.y = function (_) {
        if (!arguments.length) return this._pos.y;
        this.pos({ x: this._pos.x, y: _ })
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
        this.size({ width: _, height: this._size.height })
        return this;
    };

    Widget.prototype.height = function (_) {
        if (!arguments.length) return this._size.height;
        this.size({ width: this._size.width, height: _ })
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
            this._parentElement.style("visibility", this._visible ? null : "hidden");
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
                this._parentElement
                    .style({
                        left: newPos.x - newPos.width / 2 + "px",
                        top: newPos.y - newPos.height / 2 + "px",
                        width: newPos.width + "px",
                        height: newPos.height + "px"
                    })
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
    Widget.prototype.render = function () {
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
                context.update(this, context._element);
                context._element.attr("transform", function (d) { return "translate(" + context._pos.x + "," + context._pos.y + ")scale(" + context._scale + ")"; });
            })
        ;
        elements.exit()
            .each(function exit(context) {
                context.exit(this, context._element);
            })
            .remove()
        ;
        this._renderCount++;

        return this;
    };

    Widget.prototype.enter = function (domeNode, element, d) { };
    Widget.prototype.update = function (domeNode, element, d) { };
    Widget.prototype.exit = function (domeNode, element, d) { };

    //  Util  ---
    Widget.prototype.debounce = function (func, threshold, execAsap) {
        return function debounced() {
            var obj = this, args = arguments;
            function delayed() {
                if (!execAsap)
                    func.apply(obj, args);
                obj.timeout = null;
            };
            if (obj.timeout)
                clearTimeout(obj.timeout);
            else if (execAsap)
                func.apply(obj, args);
            obj.timeout = setTimeout(delayed, threshold || 100);
        }
    };

    return Widget;
}));
