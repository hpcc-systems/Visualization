"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../layout/Grid", "./HipieDDL", "../layout/Surface", "../layout/Cell"], factory);
    } else {
        root.marshaller_HTML = factory(root.d3, root.layout_Grid, root.marshaller_HipieDDL, root.layout_Surface, root.layout_Cell);
    }
}(this, function (d3, Grid, HipieDDL, Surface, Cell) {
    function HTML() {
        Grid.call(this);
    }
    HTML.prototype = Object.create(Grid.prototype);
    HTML.prototype.constructor = HTML;
    HTML.prototype._class += " marshaller_HTML";

    HTML.prototype.publish("ddlUrl", "", "string", "DDL URL",null,{tags:["Private"]});
    HTML.prototype.publish("databomb", "", "string", "Data Bomb",null,{tags:["Private"]});
    HTML.prototype.publish("proxyMappings", {}, "object", "Proxy Mappings",null,{tags:["Private"]});
    HTML.prototype.publish("timeout", 5, "number", "Timeout (Seconds)",null,{tags:["Private"]});

    HTML.prototype.timeoutCallback = function (callback) {
        this._timeoutCallback = callback;
        return this;
    };

    function walkDashboards(marshaller, databomb) {
        if (databomb instanceof Object) {
        } else if (databomb){
            databomb = JSON.parse(databomb);
        }
        var curr = null;
        var dashboards = {};
        marshaller.accept({
            visit: function (item) {
                if (item instanceof HipieDDL.Dashboard) {
                    curr = {
                        dashboard: item,
                        visualizations: []
                    };
                    dashboards[item.getQualifiedID()] = curr;
                } else if (item instanceof HipieDDL.DataSource) {
                    if (item.databomb && databomb[item.id]) {
                        item.comms.databomb(databomb[item.id]);
                    }
                } else if (item instanceof HipieDDL.Output) {
                    if (item.dataSource.databomb) {
                        item.dataSource.comms.databombOutput(item.from);
                    }
                } else if (item instanceof HipieDDL.Visualization) {
                    if (item.widget) {
                        curr.visualizations.push(item);
                    }
                }
            }
        });
        return dashboards;
    }

    HTML.prototype.render = function (callback) {
        if (this.ddlUrl() === "" || (this.ddlUrl() === this._prev_ddlUrl && this.databomb() === this._prev_databomb)) {
            return Grid.prototype.render.apply(this, arguments);
        } else if (this._prev_ddlUrl && this._prev_ddlUrl !== this.ddlUrl()) {
            //  DDL has actually changed (not just a deserialization)
            this
                .clearContent()
            ;
        }
        this._prev_ddlUrl = this.ddlUrl();
        this._prev_databomb = this.databomb();

        //  Gather existing widgets for reuse  ---
        this.marshaller = new HipieDDL.Marshaller()
            .proxyMappings(this.proxyMappings())
            .widgetMappings(d3.map(this.content().map(function (d) {
                return d.widget();
            }), function (d) {
                return d.id();
            }))
        ;

        // Handle Timeout ---
        var context = this;
        var timeout = true;
        var timeoutCounter = 0; 
        var mTimeoutHander = setInterval(function() {
            console.log('running...')
            if (timeoutCounter >= context.timeout()) {
                clearInterval(mTimeoutHander);
                if (timeout) {
                    console.log('timeout occurred');
                    if (context._timeoutCallback) {
                        var error = {}.desc = "timeout";
                        context._timeoutCallback.call(context, error);
                    } else if (callback) {
                        var error = {}.desc = "timeout";
                        callback(null, error);
                    }
                }
            }
            timeoutCounter++;
        }, 1000);

        //  Parse DDL  ---
        if (this.ddlUrl()[0] === "[" || this.ddlUrl()[0] === "{") {
            this.marshaller.parse(this.ddlUrl(), function () {
                timeout = false;
                populateContent();
            });
        } else {
            this.marshaller.url(this.ddlUrl(), function () {
                timeout = false;
                populateContent();
            });
        }

        function populateContent() {
            var dashboards = walkDashboards(context.marshaller, context.databomb());
            if (context.marshaller.widgetMappings().empty()) {
                for (var key in dashboards) {
                    var cellRow = 0;
                    var cellCol = 0;
                    var maxCol = Math.floor(Math.sqrt(dashboards[key].visualizations.length));
                    dashboards[key].visualizations.forEach(function (viz, idx) {
                        if (idx && (idx % maxCol === 0)) {
                            cellRow++;
                            cellCol = 0;
                        }
                        viz.widget.size({ width: 0, height: 0 });
                        context.setContent(cellRow, cellCol, viz.widget, viz.title);
                        cellCol++;
                    });
                }
            }
            Grid.prototype.render.call(context, function (widget) {
                for (var dashKey in dashboards) {
                    for (var dsKey in dashboards[dashKey].dashboard.datasources) {
                        dashboards[dashKey].dashboard.datasources[dsKey].fetchData({}, true);
                    }
                }
                if (callback) {
                    callback(widget);
                }
            });
        }
        return this;
    };

    return HTML;
}));
