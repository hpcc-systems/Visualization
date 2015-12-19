"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["../common/Utility"], factory);
    } else {
        root.other_Persist = factory(root.common_Utility);
    }
}(this, function (Utility) {
    function discover(widget) {
        var retVal = [];
        widget.publishedProperties().forEach(function (_meta) {
            var item = widget;
            var meta = _meta;
            if (meta.type) {
                while (meta.type === "proxy") {
                    item = item[meta.proxy];
                    meta = item.publishedProperty(meta.method);
                }
                if (meta.id !== widget.publishedProperty(_meta.id).id) {
                    meta = JSON.parse(JSON.stringify(meta));  //  Clone meta so we can safely replace the id.
                    meta.id = widget.publishedProperty(_meta.id).id;
                }
                retVal.push(meta);
            }
        }, this);
        return retVal;
    }

    function widgetWalker(widget, visitor) {
        if (!widget)
            return;
        visitor(widget);
        var publishedProps = discover(widget);
        for (var i = 0; i < publishedProps.length; ++i) {
            var publishItem = publishedProps[i];
            switch (publishItem.type) {
                case "widget":
                    widgetWalker(widget[publishItem.id](), visitor);
                    break;
                case "widgetArray":
                case "propertyArray":
                    var widgetArray = widget[publishItem.id]();
                    widgetArray.forEach(function(widget) {
                        widgetWalker(widget, visitor);
                    });
                    break;
            }
        }
    }

    function propertyWalker(widget, filter, visitor) {
        var publishedProps = discover(widget);
        for (var i = 0; i < publishedProps.length; ++i) {
            var publishItem = publishedProps[i];
            if(typeof (filter) !== "function" || !filter(widget, publishItem)){
                visitor(widget, publishItem);
            }
        }
    }
    
    function widgetPropertyWalker(widget, filter, visitor) {
        widgetWalker(widget, function (widget) {
            propertyWalker(widget, filter, visitor);
        });
    }

    return {
        discover: discover,
        widgetWalker: widgetWalker,
        propertyWalker: propertyWalker,
        widgetPropertyWalker: widgetPropertyWalker,
        serializeTheme: function(widget,filter){
            return JSON.stringify(this.serializeThemeToObject(widget,filter));
        },
        serializeThemeToObject: function (widget, filter){
            filter = filter || ["surface", "Color", "Font", "palette"];

            var propObj = {};
            widgetPropertyWalker(widget, null, function (widget, item) {
                if (widget[item.id + "_modified"]() || widget.publishedProperties(item.id).origDefaultValue !== widget.publishedProperties(item.id).defaultValue) {
                    if (_isFilterMatch(item.id, filter)) {
                        var classParts = widget._class.trim().split(" ");
                        for (var i in classParts) {
                            if (propObj[classParts[i]] === undefined) {
                                propObj[classParts[i]] = {};
                            }
                            if (propObj[classParts[i]][item.id] === undefined) {
                                propObj[classParts[i]][item.id] = widget[item.id]();
                                break;
                            } else if (propObj[classParts[i]][item.id] === widget[item.id]()) {
                                break;
                            }
                        }
                    }
                }
            });

            function _isFilterMatch(str, arr) {
                var ret = false;
                for (var i in arr) {
                    if (str.indexOf(arr[i]) !== -1) {
                        ret = true;
                        break;
                    }
                }
                return ret;
            }
            return propObj;
        },
        removeTheme: function (widget,callback) {
            widgetPropertyWalker(widget, null, function (widget, item) {
                widget.publishedProperties(item.id).defaultValue = widget.publishedProperties(item.id).origDefaultValue;
            });

            if (typeof (callback) === "function") {
                callback.call(this);
            }
        },
        applyTheme: function (widget,themeObj,callback) {
            var context = this;
            widgetPropertyWalker(widget, null, function (widget, item) {
                switch (item.type) {
                    case "widget":
                        context.applyTheme(widget[item.id](), themeObj);
                        return true;
                    case "widgetArray":
                        var widgetArray = widget[item.id]();
                        widgetArray.forEach(function (widget) {
                            context.applyTheme(widget, themeObj);
                        }, this);
                        return true;
                    default:
                        widget.applyTheme(themeObj);
                        break;
                }
            });
            if(typeof (callback) === "function"){
                callback.call(this);
            }
        },

        serializeToObject: function (widget, filter, includeData) {
            var retVal = {
                __version: 3,
                __class: widget.classID(),
                __properties: {}
            };
            if (widget._id.indexOf("_w") !== 0) {
                retVal.__id = widget._id;
            }

            var context = this;
            propertyWalker(widget, filter, function (widget, item) {
                if (widget[item.id + "_modified"]()) {
                    switch (item.type) {
                        case "widget":
                            retVal.__properties[item.id] = context.serializeToObject(widget[item.id](), null, includeData);
                            return true;
                        case "widgetArray":
                        case "propertyArray":
                            retVal.__properties[item.id] = [];
                            var widgetArray = widget[item.id]();
                            widgetArray.forEach(function (widget, idx) {
                                retVal.__properties[item.id].push(context.serializeToObject(widget, null, includeData));
                            });
                            return true;
                        default:
                            retVal.__properties[item.id] = widget[item.id]();
                            break;
                    }
                }
            });

            if (widget.classID() === "marshaller_Graph") {
                var vertices = widget.data().vertices;
                if (vertices) {
                    this.__vertices = vertices.map(function (item) {
                        return this.serializeToObject(item, null, includeData);
                    }, this);
                }
            }
            if (includeData && widget.data) {
                retVal.__data = {};
                retVal.__data.data = widget.data();
            }
            return retVal;
        },

        serialize: function (widget, properties, includeData) {
            return JSON.stringify(this.serializeToObject(widget, properties, includeData));
        },

        deserializeFromObject: function(widget, state, callback) {
            var createCount = 0;
            var context = this;
            widgetPropertyWalker(widget, null, function (widget, item) {
                widget[item.id + "_reset"]();
                if (state.__properties[item.id] !== undefined) {
                    switch (item.type) {
                        case "widget":
                            ++createCount;
                            var widgetKey = item.id;
                            context.create(state.__properties[item.id], function (widgetItem) {
                                widget[widgetKey](widgetItem);
                                --createCount;
                            });
                            break;
                        case "widgetArray":
                        case "propertyArray":
                            var widgetArrayKey = item.id;
                            var widgetStateArray = state.__properties[item.id];
                            if (widgetStateArray.length) {
                                ++createCount;
                                var widgetArray = [];
                                widgetArray.length = widgetStateArray.length;
                                var arrayCreateCount = 0;
                                widgetStateArray.forEach(function (widgetState, idx) {
                                    ++arrayCreateCount;
                                    context.create(widgetState, function (widgetItem) {
                                        widgetArray[idx] = widgetItem;
                                        --arrayCreateCount;
                                    });
                                    var arrayIntervalHandler = setInterval(function () {
                                        if (arrayCreateCount <= 0) {
                                            clearInterval(arrayIntervalHandler);
                                            arrayCreateCount = undefined;
                                            widget[widgetArrayKey](widgetArray);
                                            --createCount;
                                        }
                                    }, 20);
                                });
                            }
                            break;
                        default:
                            widget[item.id](state.__properties[item.id]);
                            break;
                    }
                }
            });
            var intervalHandler = setInterval(function () {
                if (createCount <= 0) {
                    clearInterval(intervalHandler);
                    createCount = undefined;
                    if (state.__data) {
                        for (var key in state.__data) {
                            widget[key](state.__data[key]);
                        }
                    }
                    callback(widget);
                }
            }, 20);
        },

        deserialize: function (widget, state, callback) {
            if (typeof state === "string") {
                state = JSON.parse(state);
            }
            if (state.__id && state.__id.indexOf("_w") !== 0 && widget._id !== state.__id) {
                console.log("Deserialize:  IDs do not match - " + widget._id);
            }
            this.deserializeFromObject(widget, state, callback);
        },

        create: function (state, callback) {
            if (typeof state === "string") {
                state = JSON.parse(state);
            }
            var context = this;
            Utility.requireWidget(state.__class).then(function (Widget) {
                var widget = new Widget();
                if (state.__id && state.__id.indexOf("_w") !== 0 && state.__id.indexOf("_pe") !== 0) {
                    widget._id = state.__id;
                }
                context.deserializeFromObject(widget, state, callback);
            });
        },

        clone: function (widget, callback) {
            this.create(this.serializeToObject(widget, [], true), callback);
        }
    };
}));