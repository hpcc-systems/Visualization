"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["require"], factory);
    } else {
        root.other_Persist = factory(root.require);
    }
}(this, function (require) {
    function discover(widget) {
        var retVal = [];
        var isPrototype = widget._id === undefined;
        for (var key in widget) {
            if (key.indexOf("__meta_") >= 0) {
                var item = widget;
                var meta = item[key];
                if (meta.type) {
                    if (!(isPrototype && meta.type === "proxy")) {
                        while (meta.type === "proxy") {
                            item = item[meta.proxy];
                            meta = item["__meta_" + meta.method];
                        }
                        if (meta.id !== widget[key].id) {
                            meta = JSON.parse(JSON.stringify(meta));  //  Clone meta so we can safely replace the id.
                            meta.id = widget[key].id;
                        }
                        retVal.push(meta);
                    }
                }
            }
        }
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
                if (widget[item.id + "_modified"]() || widget["__meta_" + item.id].origDefaultValue !== widget["__meta_" + item.id].defaultValue) {
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
                widget["__meta_" + item.id].defaultValue = widget["__meta_" + item.id].origDefaultValue;
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
            if (includeData) {
                retVal.__data = {};
                retVal.__data.columns = widget.columns();
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
                                console.log(widget._class)
                                widget[widgetKey](widgetItem);
                                --createCount;
                            });
                            break;
                        case "widgetArray":
                            ++createCount;
                            var widgetArrayKey = item.id;
                            console.log(widgetArrayKey);
                            var widgetStateArray = state.__properties[item.id];
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
                            break;
                        default:
                            console.log(item.id)
                            console.log(state.__properties[item.id])
                            widget[item.id](state.__properties[item.id]);
                            console.log('herexxxxx');
                            console.log(widget[item.id]())
                            console.log(widget.id())
                            console.log('/herexxxxx');

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
            var path = "src/" + state.__class.split("_").join("/");
            var context = this;
            require([path], function (Widget) {
                var widget = new Widget();
                if (state.__id && state.__id.indexOf("_w") !== 0) {
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