"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["../common/Utility"], factory);
    } else {
        root.other_Persist = factory(root.common_Utility);
    }
}(this, function (Utility) {
    function discover(widget) {
        return widget.publishedProperties(false, true);
    }

    function widgetWalker(widget, visitor) {
        if (!widget)
            return;
        visitor(widget);
        discover(widget).forEach(function (publishItem) {
            switch (publishItem.type) {
                case "widget":
                    widgetWalker(widget[publishItem.id](), visitor);
                    break;
                case "widgetArray":
                case "propertyArray":
                    widgetArrayWalker(widget[publishItem.id](), visitor);
                    break;
            }
        });
    }

    function widgetArrayWalker(widgets, visitor) {
        if (!widgets)
            return;
        widgets.forEach(function (widget) {
            widgetWalker(widget, visitor);
        });
    }

    function propertyWalker(widget, filter, visitor) {
            widget.propertyWalker(filter, visitor);
    }
    
    function widgetPropertyWalker(widget, filter, visitor) {
        widgetWalker(widget, function (widget) {
            propertyWalker(widget, filter, visitor);
        });
    }

    return {
        discover: discover,
        widgetWalker: widgetWalker,
        widgetArrayWalker: widgetArrayWalker,
        propertyWalker: propertyWalker,
        widgetPropertyWalker: widgetPropertyWalker,
        serializeTheme: function(widget,filter){
            return JSON.stringify(this.serializeThemeToObject(widget,filter));
        },
        serializeThemeToObject: function (widget, filter){
            filter = filter || ["surface", "Color", "Font", "palette"];

            var propObj = {};
            widgetPropertyWalker(widget, null, function (widget, item) {
                if (widget[item.id + "_modified"]() || widget.publishedProperty(item.id).origDefaultValue !== widget.publishedProperty(item.id).defaultValue) {
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
                widget.publishedProperty(item.id).defaultValue = widget.publishedProperty(item.id).origDefaultValue;
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

        serializeToObject: function (widget, filter, includeData, includeState) {
            var retVal = {
                __class: widget.classID(),
            };
            if (widget._id.indexOf(widget._idSeed) !== 0) {
                retVal.__id = widget._id;
            }
            if (widget.version) {
                retVal.__version = widget.version();
            }
            retVal.__properties = {};

            var context = this;
            propertyWalker(widget, filter, function (childWwidget, item) {
                if (childWwidget[item.id + "_modified"]()) {
                    switch (item.type) {
                        case "widget":
                            retVal.__properties[item.id] = context.serializeToObject(childWwidget[item.id](), null, includeData, includeState && !widget.serializeState);  //  Only include state once
                            return true;
                        case "widgetArray":
                        case "propertyArray":
                            retVal.__properties[item.id] = [];
                            var widgetArray = childWwidget[item.id]();
                            widgetArray.forEach(function (childWwidget, idx) {
                                retVal.__properties[item.id].push(context.serializeToObject(childWwidget, null, includeData, includeState && !widget.serializeState));  //  Only include state once
                            });
                            return true;
                        default:
                            retVal.__properties[item.id] = childWwidget[item.id]();
                            break;
                    }
                }
            });

            if (widget.classID() === "marshaller_Graph") {
                var vertices = widget.data().vertices;
                if (vertices) {
                    this.__vertices = vertices.map(function (item) {
                        return this.serializeToObject(item, null, includeData, includeState && !widget.serializeState);
                    }, this);
                }
            }
            if (includeData && widget.data) {
                if (!retVal.__data) retVal.__data = {};
                retVal.__data.data = widget.data();
            }
            if (includeState) {
                if (widget.serializeState) {
                    retVal.__state = widget.serializeState();
                } else if (widget.data) {
                    retVal.__state = {
                        data: widget.data()
                    };
                }
            }
            return retVal;
        },

        serialize: function (widget, filter, includeData, includeState) {
            return JSON.stringify(this.serializeToObject(widget, filter, includeData, includeState));
        },

        deserializeFromObject: function (widget, state, callback) {
            var context = this;
            return new Promise(function (resolve, reject) {
                var createCount = 0;
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
                                            widgetItem._owner = widget;
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
                                switch (key) {
                                    case "data":
                                        widget.data(state.__data[key]);
                                        break;
                                    default:
                                        console.log("Unexpected __data item:  " + key);
                                        widget[key](state.__data[key]);
                                        break;
                                }
                            }
                        }
                        if (state.__state) {
                            if (widget.deserializeState) {
                                widget.deserializeState(state.__state);
                            } else if (state.__state.data && widget.data) {
                                widget.data(state.__state.data);
                            }
                        }
                        if (callback) {
                            console.log("Deprecated:  callback, use promise (Persist.deserializeFromObject)");
                            callback(widget);
                        }
                        resolve(widget);
                    }
                }, 20);
            });
        },

        deserialize: function (widget, state, callback) {
            if (typeof state === "string") {
                state = JSON.parse(state);
            }
            if (state.__id && state.__id.indexOf(widget._idSeed) !== 0 && widget._id !== state.__id) {
                console.log("Deserialize:  IDs do not match - " + widget._id);
            }
            this.deserializeFromObject(widget, state, callback);
        },

        create: function (state, callback) {
            if (typeof state === "string") {
                state = JSON.parse(state);
            }
            var context = this;
            return Utility.requireWidget(state.__class).then(function (Widget) {
                var widget = new Widget();
                if (state.__id && state.__id.indexOf(widget._idSeed) !== 0 && state.__id.indexOf("_pe") !== 0) {
                    widget._id = state.__id;
                }
                return context.deserializeFromObject(widget, state, callback);
            }).catch(function (e) {
                console.log("Persist.create:  ***exception***");
                console.log(e);
                if (callback) {
                    console.log("Deprecated:  callback, use promise (Persist.create)");
                    callback(null);
                }
            });
        },

        clone: function (widget, callback) {
            this.create(this.serializeToObject(widget, [], true, true), callback);
        }
    };
}));