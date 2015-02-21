"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["require"], factory);
    } else {
        root.Entity = factory();
    }
}(this, function (require) {
    return {
        discover: function (widget, includePrivate) {
            var retVal = [];
            for (var key in widget) {
                if (key.indexOf("__meta_") >= 0) {
                    var item = widget;
                    var meta = item[key];
                    if (meta.type || includePrivate) {
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
            return retVal;
        },

        serializeToObject: function (widget, properties, includeData) {
            var retVal = {
                __version: 2,
                __class: widget._class,
                __properties: {}
            };
            if (properties && properties.length) {
                properties.forEach.forEach(function (item) {
                    if (widget[item.id + "_modified"]()) {
                        retVal.__properties[item] = widget[item]();
                    }
                });
            } else {
                this.discover(widget, true).forEach(function (item) {
                    if (widget[item.id + "_modified"]()) {
                        retVal.__properties[item.id] = widget[item.id]();
                    }
                });
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

        deserialize: function (widget, state) {
            if (state instanceof String) {
                state = JSON.parse(state)
            }
            for (var key in state.__properties) {
                widget[key](state.__properties[key]);
            }
            if (state.__data) {
                for (var key in state.__data) {
                    widget[key](state.__data[key]);
                }
            }
            return widget;
        },

        create: function (state, callback) {
            if (state instanceof String) {
                state = JSON.parse(state)
            }
            var context = this;
            var path = "../" + state.__class.split("_").join("/");
            require([path], function (Widget) {
                var widget = new Widget();
                context.deserialize(widget, state);
                callback(widget);
            });
        },

        clone: function (widget, callback) {
            this.create(this.serializeToObject(widget, [], true), callback);
        }
    };
}));
