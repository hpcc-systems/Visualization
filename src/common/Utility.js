"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "require", "es6-promise"], factory);
    } else {
        root.common_Utility = factory(root.d3, root.require);
    }
}(this, function (d3, require) {

    function _naturalSort(a, b, order, idx, sortCaseSensitive) {
        var re = /(^([+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?)?$|^0x[0-9a-f]+$|\d+)/gi,
            sre = /(^[ ]*|[ ]*$)/g,
            dre = /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/,
            hre = /^0x[0-9a-f]+$/i,
            ore = /^0/,
            i = function(s) { return !sortCaseSensitive && ("" + s).toLowerCase() || "" + s; },
            // convert all to strings strip whitespace
            x = i(idx ? a[idx] : a).replace(sre, "") || "",
            y = i(idx ? b[idx] : b).replace(sre, "") || "",
            // chunk/tokenize
            xN = x.replace(re, "\0$1\0").replace(/\0$/,"").replace(/^\0/,"").split("\0"),
            yN = y.replace(re, "\0$1\0").replace(/\0$/,"").replace(/^\0/,"").split("\0"),
            // numeric, hex or date detection
            xD = parseInt(x.match(hre), 16) || (xN.length !== 1 && x.match(dre) && Date.parse(x)),
            yD = parseInt(y.match(hre), 16) || xD && y.match(dre) && Date.parse(y) || null,
            oFxNcL, oFyNcL;
        // first try and sort Hex codes or Dates
        if (yD) {
            if ( xD < yD ) { return order === "ascending" ? -1 : 1; }
            else if ( xD > yD ) { return order === "ascending" ? 1 : -1; }
        }
        // natural sorting through split numeric strings and default strings
        for(var cLoc=0, numS=Math.max(xN.length, yN.length); cLoc < numS; cLoc++) {
            // find floats not starting with "0", string or 0 if not defined (Clint Priest)
            oFxNcL = !(xN[cLoc] || "").match(ore) && parseFloat(xN[cLoc]) || xN[cLoc] || 0;
            oFyNcL = !(yN[cLoc] || "").match(ore) && parseFloat(yN[cLoc]) || yN[cLoc] || 0;
            // handle numeric vs string comparison - number < string - (Kyle Adams)
            if (isNaN(oFxNcL) !== isNaN(oFyNcL)) { return (isNaN(oFxNcL)) ? 1 : -1; }
            // rely on string comparison if different types - i.e. "02" < 2 != "02" < "2"
            else if (typeof oFxNcL !== typeof oFyNcL) {
                oFxNcL += "";
                oFyNcL += "";
            }
            if (oFxNcL < oFyNcL) { return order === "ascending" ? -1 : 1; }
            if (oFxNcL > oFyNcL) { return order === "ascending" ? 1 : -1; }
        }
        return 0;
    }

    //  Selection Bag(s)  ---
    function SelectionBag() {
        this.items = {};
    }

    SelectionBag.prototype.clear = function () {
        for (var key in this.items) {
            this.items[key].element().classed("selected", false);
        }
        this.items = {};
    };

    SelectionBag.prototype.isEmpty = function () {
        for (var key in this.items) { // jshint ignore:line
            return false;
        }
        return true;
    };

    SelectionBag.prototype.append = function (item) {
        this.items[item._id] = item;
        item.element().classed("selected", true);
    };

    SelectionBag.prototype.remove = function (item) {
        this.items[item._id].element().classed("selected", false);
        delete this.items[item._id];
    };

    SelectionBag.prototype.isSelected = function (item) {
        return this.items[item._id] !== undefined;
    };

    SelectionBag.prototype.get = function () {
        var retVal = [];
        for (var key in this.items) {
            retVal.push(this.items[key]);
        }
        return retVal;
    };

    SelectionBag.prototype.set = function (itemArray) {
        this.clear();
        itemArray.forEach(function (item, idx) {
            this.append(item);
        }, this);
    };

    SelectionBag.prototype.click = function (item, d3Event) {
        if (d3Event.ctrlKey) {
            if (this.items[item._id]) {
                this.remove(item);
            } else {
                this.append(item);
            }
        } else {
            this.clear();
            this.append(item);
        }
    };

    function SimpleSelection(widgetElement) {
        this._widgetElement = widgetElement;
    }
    SimpleSelection.prototype.enter = function (elements, idx) {
        var context = this;
        elements
            .on("click.SimpleSelection", function (d, idx) {
                var element = d3.select(this);
                var wasSelected = element.classed("selected");
                context._widgetElement.selectAll(".selected")
                    .classed("selected", null)
                ;
                if (!wasSelected) {
                    element.classed("selected", true);
                }
            })
            .on("mouseover.SimpleSelection", function (d, idx) {
                d3.select(this)
                    .classed("over", true)
                ;
            })
            .on("mouseout.SimpleSelection", function (d, idx) {
                d3.select(this)
                    .classed("over", null)
                ;
            })
        ;
    };
    SimpleSelection.prototype.selected = function (domNode) {
        return d3.select(domNode).classed("selected");
    };

    var perf = window.performance;
    var now = perf && (perf.now || perf.mozNow || perf.msNow || perf.oNow || perf.webkitNow);

    return {
        naturalSort: function(data, order, idx, sortCaseSensitive) {
            return data.slice(0).sort(function(a,b) {
                return _naturalSort(a,b,order,idx,sortCaseSensitive);
            });
        },

        multiSort: function (data, sortBy) {
            data.sort(function (l, r) {
                for (var i = 0; i < sortBy.length; ++i) {
                    var lVal = l[sortBy[i].idx];
                    var rVal = r[sortBy[i].idx];
                    if (lVal !== rVal) {
                        return sortBy[i].reverse ? d3.descending(lVal, rVal) : d3.ascending(lVal, rVal);
                    }
                }
                return 0;
            });
            return data;
        },

        Selection: SelectionBag,
        SimpleSelection: SimpleSelection,

        urlParams: function () {
            var def = window.location.search.split("?")[1];
            var retVal = {};
            if (def) {
                def.split("&").forEach(function (param, idx) {
                    var paramParts = param.split("=");
                    switch (paramParts.length) {
                        case 1:
                            retVal[decodeURIComponent(paramParts[0])] = undefined;
                            break;
                        case 2:
                            retVal[decodeURIComponent(paramParts[0])] = decodeURIComponent(paramParts[1]);
                            break;
                        default:
                            throw "Invalid URL Param:  " + param;
                    }
                });
            }
            return retVal;
        },
        endsWith: function(str, searchStr, pos) {
            var subjectString = str.toString();
            if (typeof pos !== "number" || !isFinite(pos) || Math.floor(pos) !== pos || pos > subjectString.length) {
                pos = subjectString.length;
            }
            pos -= searchStr.length;
            var lastIndex = subjectString.indexOf(searchStr, pos);
            return lastIndex !== -1 && lastIndex === pos;
        },
        d3ArrayAdapter: function (array) {
            return {
                ownerDocument: {
                    createElement: function (tagName) {
                        return {
                            get __data__() { return this.row; },
                            set __data__(_) { this.row = array[this.index] = _; }
                        };
                    },
                    createElementNS: function (ns, tagName) {
                        return this.createElement(tagName);
                    }
                },
                querySelectorAll: function (selectors) {
                    if (selectors) throw "unsupported";
                    var context = this;
                    return array.map(function (row, idx) {
                        return {
                            ownerDocument: context.ownerDocument,
                            parentNode: context,
                            get __data__() { return row; },
                            set __data__(_) { array[idx] = _; }
                        };
                    });
                },
                appendChild: function (node) {
                    node.parentNode = this;
                    node.index = array.length;
                    array.push(null);
                    return node;
                },
                insertBefore: function (node, referenceNode) {
                    var idx = array.indexOf(node.__data__);
                    var refIdx = array.indexOf(referenceNode.__data__);
                    if (idx > refIdx) {
                        array.splice(refIdx, 0, array.splice(idx, 1)[0]);
                    } else if (idx < refIdx - 1) {
                        array.splice(refIdx - 1, 0, array.splice(idx, 1)[0]);
                    }
                    return node;
                },
                removeChild: function (node) {
                    array.splice(array.indexOf(node.__data__), 1);
                    return node;
                }
            };
        },
        downloadBlob: function (format, blob, id) {
            id = id || "data";
            var currentdate = new Date(); 
            var timeFormat =  d3.time.format("%Y-%m-%dT%H_%M_%S");
            var now = timeFormat(currentdate);

            var filename = id + "_" + now + "." + format.toLowerCase();
            
            var mimeType = "";
            switch (format) {
                case "TSV":
                    mimeType = "text/tab-seperated-values";
                    break;
                case "JSON":
                    mimeType = "application/json";
                    break;
                default:
                    mimeType = "text/csv";
            }

            var a = document.createElement('a');
            if (navigator.msSaveBlob) { // IE10+
                a = null;
                return navigator.msSaveBlob(new Blob([blob], { type: mimeType }), filename);
            } else if ('download' in a) { //html 5
                a.href = 'data:' + mimeType + ',' + encodeURIComponent(blob);
                a.setAttribute('download', filename);
                document.body.appendChild(a);
                setTimeout(function() {
                    a.click();
                    document.body.removeChild(a);
                }, 10);
                return true;
            } else { //old chrome and FF:
                a = null;
                var frame = document.createElement('iframe');
                document.body.appendChild(frame);
                frame.src = 'data:' + mimeType + ',' + encodeURIComponent(blob);

                setTimeout(function() {
                    document.body.removeChild(frame);
                }, 100);
                return true;
            }

            return false;
        },
        requireWidget: function(classID) {
            return new Promise(function (resolve, reject) {
                var parts = classID.split(".");
                var path = "../" + parts[0].split("_").join("/");
                require([path], function (Widget) {
                    resolve(parts.length > 1 ? (Widget.prototype ? Widget.prototype[parts[1]] : Widget[parts[1]]) : Widget);
                });
            });
        },
        checksum: function (s) {
            if (s instanceof Array) {
                s = s.join("") + s.length;
            }
            switch (typeof s) {
                case "string":
                    break;
                default:
                    s = "" + s;
            }
            var chk = 0x12345678;
            for (var i = 0, l = s.length; i < l; ++i) {
                chk += (s.charCodeAt(i) * (i + 1));
            }
            return (chk & 0xffffffff).toString(16);
        },
        getTime: function () {
            return (now && now.call(perf)) || (new Date().getTime());
        }
    };
}));
