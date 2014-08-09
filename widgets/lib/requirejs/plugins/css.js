/*global define:false*/
//TODO : get maximum attempts from parent config
(function () {
    "use strict";
    var doc = document, head = doc.getElementsByTagName("head")[0], IE7_8_9_StylesheetLimit = 30;
    var css2 = {
        version: "0.1.0",
        maxAttempts: 10,

        _jsEscape: function (content) {
            return content.replace(/(['\\])/g, '\\$1')
                .replace(/[\f]/g, "\\f")
                .replace(/[\b]/g, "\\b")
                .replace(/[\n]/g, "\\n")
                .replace(/[\t]/g, "\\t")
                .replace(/[\r]/g, "\\r")
                .replace(/[\u2028]/g, "\\u2028")
                .replace(/[\u2029]/g, "\\u2029");
        },

        _getIEVersion: function () {
            var rv = -1; // Return value assumes failure.
            if (navigator.appName === 'Microsoft Internet Explorer') {
                var ua = navigator.userAgent;
                var re = new RegExp("MSIE ([0-9]{1,}[\\.0-9]{0,})");
                if (re.exec(ua) !== null) {
                    rv = parseFloat(RegExp.$1);
                }
            }
            return rv;
        },

        _checkIeLimitWorkaround: function (url, callback) {
            var loadedWithWorkaround = false;
            var version = this._getIEVersion();
            var ieAndVersion = (version !== -1 && version <= 9) ? true : false;
            try {
                //workaround for loading IE 31 stylesheet limit
                // (http://blogs.msdn.com/b/ieinternals/archive/2011/05/14/internet-explorer-stylesheet-rule-selector-import-sheet-limit-maximum.aspx)
                if (doc.createStyleSheet && doc.styleSheets && doc.styleSheets.length > IE7_8_9_StylesheetLimit) {
                    var lastStylesheet = doc.styleSheets[doc.styleSheets.length - 1];
                    lastStylesheet.addImport(url, doc.styleSheets.length - 1);
                    loadedWithWorkaround = true;
                    callback();

                }
            }
            catch (e) {
                this._onerror(callback, e);
                loadedWithWorkaround = false;
            }
            return loadedWithWorkaround;
        },

        _getUniqueId: function () {
            return "cssPreloader_" + Math.round(Math.random() * 9999999999);
        },
        _createLink: function (url) {
            var link = doc.createElement("link");
            link.rel = "stylesheet"; link.type = "text/css"; link.id = this._getUniqueId(); link.href = url;
            return link;
        },
        _isEventSupported: function (element, event) {
            var c = document.createElement(element);
            event = "on" + event;
            var isEventSupported = event in c;
            if (!isEventSupported) {
                c.setAttribute(event, "return;");
                isEventSupported = (typeof c[event] === "function");
                c = null;
            }
            return isEventSupported;
        },

        _loadNative: function (url, callback) {
            var link = this._createLink(url);
            link.onload = function () {
                callback();
            };
            var that = this;
            link.onerror = function () {
                that._onerror(callback);
            };

            head.appendChild(link);
        },

        _onerror: function (callback, exception) {
            if (Object.prototype.toString.call(callback.error) === '[object Function]') {
                var err = { message: 'Failed to load stylesheet', innerException: exception };
                callback.error(err);


            }
        },


        _loadWhenNotSupported: function (url, callback) {
            var checkLoaded = function (stylesheetLink, callback, attemptsCount) {
                try {
                    if (attemptsCount < this.maxAttempts) {
                        var stylesheets = document.styleSheets;
                        for (var i = 0; i < stylesheets.length; i++) {
                            var g = stylesheets[i];
                            var link = g.ownerNode ? g.ownerNode : g.owningElement;
                            if (link && link.id === stylesheetLink.id) {
                                //check if stylesheet has cssRules collection,because server can return some html in case of 404 ,making ownerNode to be created
                                var cssRulesAllowed = true;
                                var cssRules = null;
                                //Check if access to rules is allowed,if generates Security exception - looks css from different domain and we can't reliably check rules
                                try {

                                    //can be also null like in Google chrome or undefined like in IE8,7
                                    if (!g.cssRules) {
                                        //IE7 and IE8 css rules collection
                                        if (g.rules) {
                                            cssRules = g.rules;
                                        }
                                        else {
                                            cssRulesAllowed = false;
                                        }
                                    }
                                    else {
                                        cssRules = g.cssRules;
                                    }

                                }
                                catch (e) {
                                    cssRulesAllowed = false;
                                }

                                if (cssRulesAllowed) {
                                    if (cssRules && cssRules.length && cssRules.length > 0) {
                                        callback();
                                        return;
                                    }
                                    else {
                                        this._onerror(callback);
                                        return;
                                    }


                                }
                                    //Can't  check for 100% if css is loaded when no access to cssRules (stylesheet from different domain),
                                    //so make optimistic  assumption css rules are valid and are applied  if has ownerNode with matching id
                                else {
                                    callback();
                                }


                            }
                        }
                        var that = this;
                        setTimeout(function () {

                            checkLoaded.call(that, stylesheetLink, callback, ++attemptsCount);
                        }, 100);
                    }
                        //not loaded with maximum attempts
                    else {
                        this._onerror(callback);
                        return;

                    }
                }
                catch (e) {
                    this._onerror(callback, e);
                    return;
                }

            };


            var link = this._createLink(url);
            head.appendChild(link);
            var that = this, attemptsCount = 0;
            //TODO : calculate setTimeout according to wait interval
            setTimeout(function () {
                checkLoaded.call(that, link, callback, attemptsCount);
            }, 100);


        },

        loadStylesheet: function (url, callback) {
            var loadedWithWorkaround = this._checkIeLimitWorkaround(url, callback);
            if (!loadedWithWorkaround) {
                if (this._isEventSupported("link", "load")) {
                    this._loadNative(url, callback);
                }
                else {
                    this._loadWhenNotSupported(url, callback);
                }
            }

        }
    };

    var css = {
        version: "0.1.0",
        maxAttempts: 10,

        ///requireJS interface function  - called when css! is called
        load: function (name, parentConf, load, config, isBuild) {
            try {
                var url = parentConf.toUrl(name.search(/\.(css)$/i) === -1 ? name + ".css" : name);
                css2.loadStylesheet(url, load);
            }
            catch (e) {
                load();
            }
        }
    };



    //check if AMD loader uses the code
    if (typeof define === 'function') {
        define(['module'], function () { return css; });
    }
        //put cssLoader on global scope
    else {
        window.css = css;
    }
})();
