"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "./Class", "./Platform", "./PropertyExt", "./Database"], factory);
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
        this._id = "_w" + widgetID++;

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
    Widget.prototype._class += " common_Widget";
    Widget.prototype.mixin(Platform);
    Widget.prototype.mixin(PropertyExt);

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
                    if (this.publishedProperty(paramName)) {
                        this.publishedProperty(paramName).defaultValue = theme[clsArr[i]][paramName];
                    }
                }
            }
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
                if (d3.event) {
                    d3.event.stopPropagation();
                }
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
        this.publishedProperties().forEach(function (meta) {
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

    Widget.prototype.enter = function (domNode, element) { };
    Widget.prototype.preUpdate = function (domeNode, element) { };
    Widget.prototype.update = function (domeNode, element) { };
    Widget.prototype.postUpdate = function (domeNode, element) { };
    Widget.prototype.exit = function (domeNode, element) { };

    return Widget;
}));
