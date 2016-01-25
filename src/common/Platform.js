"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "es6-promise"], factory);
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
        root.common_Platform = factory(root.d3);
    }
}(this, function (d3) {
    //  Do not touch - updated by gulp bump  ---
    var version = "1.9.0";

    function Platform() {
    }

    Platform.prototype.version = function () {
        return version;
    };

    Platform.prototype.ieVersion = (function () {
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
    Platform.prototype.isIE = Platform.prototype.ieVersion !== null;
    Platform.prototype.svgMarkerGlitch = Platform.prototype.isIE && Platform.prototype.ieVersion <= 12;
    Platform.prototype.MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver || function (callback) {
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
        window.MutationObserver = Platform.prototype.MutationObserver;
    }

    Platform.prototype._scrollBarWidth = null;
    Platform.prototype.getScrollbarWidth = function () {
        if (Platform.prototype._scrollBarWidth === null) {
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

            Platform.prototype._scrollBarWidth = widthNoScroll - widthWithScroll;
        }
        return Platform.prototype._scrollBarWidth;
    };

    Platform.prototype.debounce = function (func, threshold, execAsap) {
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

    return Platform;
}));
