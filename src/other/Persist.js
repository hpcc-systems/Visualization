"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["require"], factory);
    } else {
        root.other_Persist = factory(root.require);
    }
}(this, function (require) {
    return {
        discover: function (widget) {
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
        },

        serializeToObject: function (widget, properties, includeData) {
            var retVal = {
                __version: 3,
                __class: widget._class.split(" ").pop(),
                __id: widget._id,
                __properties: {}
            };
            if (properties && properties.length) {
                properties.forEach.forEach(function (item) {
                    if (widget[item.id + "_modified"]()) {
                        retVal.__properties[item] = widget[item]();
                    }
                });
            } else {
                this.discover(widget).forEach(function (item) {
                    if (widget[item.id + "_modified"]()) {
                        switch (item.type) {
                            case "widget":
                                retVal.__properties[item.id] = this.serializeToObject(widget[item.id](), null, includeData);
                                break;
                            case "widgetArray":
                                retVal.__properties[item.id] = [];
                                var widgetArray = widget[item.id]();
                                widgetArray.forEach(function (widget, idx) {
                                    retVal.__properties[item.id].push(this.serializeToObject(widget, null, includeData));
                                }, this);
                                break;
                            default:
                                retVal.__properties[item.id] = widget[item.id]();
                                break;
                        }
                    }
                }, this);
            }
            if (widget._class === "marshaller_Graph") {
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

        deserialize: function (state, callback) {
            var context = this;
            var path = "src/" + state.__class.split("_").join("/");
            require([path], function (Widget) {
                var widget = new Widget();
                if (state instanceof String) {
                    state = JSON.parse(state);
                }
                if (state.__id.indexOf("_w") !== 0) {
                    widget._id = state.__id;
                }
                var createCount = 0;
                for (var key in state.__properties) {
                    if (widget["__meta_" + key]) {
                        switch (widget["__meta_" + key].type) {
                            case "widget":
                                ++createCount;
                                context.deserialize(state.__properties[key], function (widgetItem) {
                                    widget[key](widgetItem);
                                    --createCount;
                                });
                                break;
                            case "widgetArray":
                                ++createCount;
                                var widgetStateArray = state.__properties[key];
                                var widgetArray = [];
                                widgetArray.length = widgetStateArray.length;
                                var arrayCreateCount = 0;
                                widgetStateArray.forEach(function (widgetState, idx) {
                                    ++arrayCreateCount;
                                    context.deserialize(widgetState, function (widgetItem) {
                                        widgetArray[idx] = widgetItem;
                                        --arrayCreateCount;
                                    });
                                    var arrayIntervalHandler = setInterval(function () {
                                        if (arrayCreateCount <= 0) {
                                            clearInterval(arrayIntervalHandler);
                                            arrayCreateCount = undefined;
                                            widget[key](widgetArray);
                                            --createCount;
                                        }
                                    }, 20);
                                });
                                break;
                            default:
                                widget[key](state.__properties[key]);
                                break;
                        }
                    }
                }
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
            });
        },

        create: function (state, callback) {
            if (typeof state === "string") {
                state = JSON.parse(state);
            }
            this.deserialize(state, callback);
        },

        clone: function (widget, callback) {
            this.create(this.serializeToObject(widget, [], true), callback);
        }
    };
}));
