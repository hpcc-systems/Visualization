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
        serializeTheme: function(widget,filter){
            return JSON.stringify(this.serializeThemeToObject(widget,filter));
        },
        serializeThemeToObject: function (widget,filter){
            var context = this;
            
            var propObj = {};
            _paramCrawler(widget,filter);
            return propObj;
            
            function _paramCrawler(widget,filter){
                var retArr = [];
                filter = typeof(filter) === "undefined" ? ["surface","Color","Font","palette"] : filter;
                context.discover(widget).forEach(function (item) {
                    if (widget[item.id + "_modified"]() || typeof(widget["__meta_"+item.id].trueDefaultValue) !== "undefined") {
                        switch (item.type) {
                            case "widget":
                                var tempArr = _paramCrawler(widget[item.id](),filter);
                                retArr = retArr.concat(tempArr);
                                break;
                            case "widgetArray":
                                var widgetArray = widget[item.id]();
                                widgetArray.forEach(function (widget) {
                                    var tempArr = _paramCrawler(widget,filter);
                                    retArr = retArr.concat(tempArr);
                                }, this);
                                break;
                            default:
                                if(_isFilterMatch(item.id,filter)){
                                    var paramIsIncluded = false;
                                    var classParts = widget._class.trim().split(" ");
                                    for(var i in classParts) { 
                                        if(!paramIsIncluded){
                                            if(propObj[classParts[i]] === undefined){
                                                propObj[classParts[i]] = {};
                                            } 
                                            if (propObj[classParts[i]][item.id] === undefined) { 
                                                propObj[classParts[i]][item.id] = widget[item.id](); 
                                                paramIsIncluded = true;
                                                break;
                                            } 
                                            else if (propObj[classParts[i]][item.id] === widget[item.id]()) {
                                                paramIsIncluded = true;
                                                break;
                                            }
                                        }
                                    }
                                }
                                break;
                        }
                    }
                });
                function _isFilterMatch(str,arr){
                    var ret = false;
                    for(var i in arr){
                        if(str.indexOf(arr[i]) !== -1){
                            ret = true;
                            break;
                        }
                    }
                    return ret;
                }
            }
        },
        removeTheme: function (widget,callback) {
            var context = this;
            
            _paramCrawler(widget,"restore defaults");
            
            _paramCrawler(widget,"delete trueDefaultValue");
            
            if(typeof (callback) === "function"){
                callback.call(this);
            }
            
            function _paramCrawler(widget,mode){
                context.discover(widget).forEach(function (item) {
                    switch (item.type) {
                        case "widget":
                            _paramCrawler(widget[item.id](),mode);
                            break;
                        case "widgetArray":
                            var widgetArray = widget[item.id]();
                            widgetArray.forEach(function (widget) {
                                _paramCrawler(widget,mode);
                            }, this);
                            break;
                        default:
                            var proto = Object.getPrototypeOf(widget);
                            if (typeof(widget["__meta_"+item.id].trueDefaultValue) !== "undefined") {
                                switch(mode){
                                    case "restore defaults":
                                        var trueDefault = proto["__meta_"+item.id].trueDefaultValue;
                                        proto["__meta_"+item.id].defaultValue = trueDefault;
                                        widget[item.id+"_reset"]();
                                        break;
                                    case "delete trueDefaultValue":
                                        delete proto["__meta_"+item.id].trueDefaultValue;
                                        break;
                                }
                            }
                            break;
                    }
                });
            }
        },
        applyTheme: function (widget,themeObj,callback) {
            var context = this;
            this.discover(widget).forEach(function (item) {
                    switch (item.type) {
                        case "widget":
                            context.applyTheme(widget[item.id](),themeObj);
                            break;
                        case "widgetArray":
                            var widgetArray = widget[item.id]();
                            widgetArray.forEach(function (widget) {
                                context.applyTheme(widget,themeObj);
                            }, this);
                            break;
                        default:
                            var clsArr = widget._class.trim().split(" ").reverse();
                            for(var i in clsArr){
                                if(typeof (themeObj[clsArr[i]]) !== "undefined"){
                                    if(typeof (themeObj[clsArr[i]][item.id]) !== "undefined"){
                                        var proto = Object.getPrototypeOf(widget);
                                        if(typeof (proto["__meta_"+item.id].trueDefaultValue) === "undefined"){
                                            proto["__meta_"+item.id].trueDefaultValue = widget[item.id]();
                                        }
                                        proto["__meta_"+item.id].defaultValue = themeObj[clsArr[i]][item.id];
                                    }
                                }
                            }
                            break;
                    }
            });
            if(typeof (callback) === "function"){
                callback.call(this);
            }
        },
        
        serializeToObject: function (widget, properties, includeData) {
            var retVal = {
                __version: 3,
                __class: widget.classID(),
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
                    if (widget[item.id + "_modified"]() || typeof(widget["__meta_"+item.id].trueDefaultValue) !== "undefined") {
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
                                var widgetKey = key;
                                context.deserialize(state.__properties[key], function (widgetItem) {
                                    widget[widgetKey](widgetItem);
                                    --createCount;
                                });
                                break;
                            case "widgetArray":
                                ++createCount;
                                var widgetArrayKey = key;
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
                                            widget[widgetArrayKey](widgetArray);
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