"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "./XYAxis", "../api/I2DChart", "css!./Column"], factory);
    } else {
        root.chart_Column = factory(root.d3, root.chart_XYAxis, root.api_I2DChart);
    }
}(this, function (d3, XYAxis, I2DChart) {
    function Column(target) {
        XYAxis.call(this);
        I2DChart.call(this);
    }
    Column.prototype = Object.create(XYAxis.prototype);
    Column.prototype._class += " chart_Column";
    Column.prototype.implements(I2DChart.prototype);

    Column.prototype.publish("paletteID", "default", "set", "Palette ID", Column.prototype._palette.switch(),{tags:['Basic','Shared']});

    Column.prototype.testData2 = function () {
        var rawData = [{ "DateTime": "2014-06-01T07:01:39", "Price": 821 }, { "DateTime": "2015-12-01T01:33:35", "Price": 841 }, { "DateTime": "2015-12-25T23:58:34", "Price": 1356 }, { "DateTime": "2015-05-16T17:02:17", "Price": 1136 }, { "DateTime": "2015-09-11T10:37:50", "Price": 1094 }, { "DateTime": "2014-11-03T21:34:47", "Price": 1266 }, { "DateTime": "2015-11-05T12:31:45", "Price": 1159 }, { "DateTime": "2014-11-27T16:25:57", "Price": 1572 }, { "DateTime": "2015-12-26T15:13:48", "Price": 1083 }, { "DateTime": "2014-06-18T16:21:06", "Price": 1324 }, { "DateTime": "2014-05-13T05:35:12", "Price": 1553 }, { "DateTime": "2014-06-01T20:40:50", "Price": 1216 }, { "DateTime": "2015-07-15T07:19:39", "Price": 1403 }, { "DateTime": "2016-03-17T09:32:59", "Price": 1382 }, { "DateTime": "2015-05-28T02:24:27", "Price": 1337 }, { "DateTime": "2015-08-08T18:46:00", "Price": 1084 }, { "DateTime": "2015-10-25T15:42:48", "Price": 1217 }, { "DateTime": "2016-01-07T00:48:47", "Price": 1464 }, { "DateTime": "2015-12-13T23:21:16", "Price": 894 }, { "DateTime": "2014-06-13T22:49:52", "Price": 967 }, { "DateTime": "2015-01-07T20:33:03", "Price": 1033 }, { "DateTime": "2015-02-28T10:08:16", "Price": 1119 }, { "DateTime": "2015-11-09T15:33:56", "Price": 1298 }, { "DateTime": "2015-04-18T00:05:19", "Price": 808 }, { "DateTime": "2016-04-19T04:09:19", "Price": 1331 }, { "DateTime": "2015-11-26T05:03:53", "Price": 1221 }, { "DateTime": "2014-09-17T08:59:31", "Price": 1450 }, { "DateTime": "2016-03-29T15:34:22", "Price": 1403 }, { "DateTime": "2015-09-13T13:46:01", "Price": 1088 }, { "DateTime": "2014-12-04T20:41:36", "Price": 1503 }, { "DateTime": "2015-06-19T12:43:51", "Price": 1350 }, { "DateTime": "2014-05-21T12:58:46", "Price": 874 }, { "DateTime": "2016-02-11T07:48:56", "Price": 1519 }, { "DateTime": "2015-02-23T22:35:44", "Price": 1383 }, { "DateTime": "2015-11-28T11:35:45", "Price": 928 }, { "DateTime": "2016-01-17T10:27:12", "Price": 941 }, { "DateTime": "2015-02-04T07:17:50", "Price": 1076 }, { "DateTime": "2016-04-11T08:28:10", "Price": 907 }, { "DateTime": "2015-02-27T15:02:35", "Price": 1263 }, { "DateTime": "2016-03-23T15:54:53", "Price": 911 }, { "DateTime": "2014-09-26T19:15:38", "Price": 1076 }, { "DateTime": "2015-10-15T15:13:47", "Price": 1052 }, { "DateTime": "2015-04-07T13:22:52", "Price": 1481 }, { "DateTime": "2016-01-31T11:15:52", "Price": 1248 }, { "DateTime": "2014-11-20T09:46:51", "Price": 1360 }, { "DateTime": "2015-10-19T15:05:26", "Price": 1094 }, { "DateTime": "2016-04-30T09:54:01", "Price": 1552 }, { "DateTime": "2015-06-07T23:49:49", "Price": 1329 }, { "DateTime": "2015-07-10T20:12:46", "Price": 801 }, { "DateTime": "2014-12-22T19:11:04", "Price": 1066 }, { "DateTime": "2015-12-07T17:03:07", "Price": 1032 }, { "DateTime": "2015-11-30T13:11:22", "Price": 1546 }, { "DateTime": "2014-06-29T07:24:44", "Price": 1042 }, { "DateTime": "2014-08-03T08:15:25", "Price": 1326 }, { "DateTime": "2015-09-01T20:32:23", "Price": 928 }, { "DateTime": "2016-05-02T12:56:47", "Price": 1550 }, { "DateTime": "2014-11-18T04:38:21", "Price": 972 }, { "DateTime": "2016-05-03T01:05:51", "Price": 1164 }, { "DateTime": "2015-02-03T17:16:07", "Price": 998 }, { "DateTime": "2015-09-04T21:29:16", "Price": 1199 }, { "DateTime": "2015-12-02T10:44:32", "Price": 1250 }, { "DateTime": "2016-01-26T16:11:51", "Price": 1241 }, { "DateTime": "2015-05-30T12:42:11", "Price": 1336 }, { "DateTime": "2014-09-11T10:19:44", "Price": 1231 }, { "DateTime": "2016-04-06T05:54:55", "Price": 1276 }, { "DateTime": "2016-02-18T00:29:49", "Price": 939 }, { "DateTime": "2014-11-16T15:35:04", "Price": 1557 }, { "DateTime": "2015-12-10T03:06:01", "Price": 1292 }, { "DateTime": "2015-05-31T04:19:33", "Price": 1347 }, { "DateTime": "2014-10-08T17:26:41", "Price": 1041 }, { "DateTime": "2015-01-13T10:43:21", "Price": 1089 }, { "DateTime": "2015-04-14T04:05:10", "Price": 999 }, { "DateTime": "2015-10-05T11:47:54", "Price": 1520 }, { "DateTime": "2015-06-26T00:22:00", "Price": 1342 }, { "DateTime": "2015-05-13T14:32:54", "Price": 976 }, { "DateTime": "2015-07-13T19:13:18", "Price": 1576 }, { "DateTime": "2014-05-17T21:59:02", "Price": 1220 }, { "DateTime": "2015-03-15T07:15:00", "Price": 1230 }, { "DateTime": "2015-02-22T22:04:01", "Price": 1510 }, { "DateTime": "2015-11-26T06:03:07", "Price": 816 }, { "DateTime": "2014-07-02T20:20:52", "Price": 1343 }, { "DateTime": "2015-07-14T13:10:03", "Price": 1285 }, { "DateTime": "2015-11-01T03:18:14", "Price": 1424 }, { "DateTime": "2015-03-17T12:04:38", "Price": 1109 }, { "DateTime": "2015-11-19T05:47:16", "Price": 1278 }, { "DateTime": "2015-11-12T09:03:53", "Price": 841 }, { "DateTime": "2014-10-17T18:37:00", "Price": 1425 }, { "DateTime": "2015-09-27T04:37:49", "Price": 1555 }, { "DateTime": "2015-07-30T04:01:21", "Price": 1222 }, { "DateTime": "2015-02-11T17:59:08", "Price": 1464 }, { "DateTime": "2014-09-13T19:57:59", "Price": 1271 }, { "DateTime": "2015-03-25T10:55:59", "Price": 1397 }, { "DateTime": "2014-07-13T09:36:47", "Price": 915 }, { "DateTime": "2015-02-15T10:49:48", "Price": 1015 }, { "DateTime": "2014-10-24T08:50:59", "Price": 835 }, { "DateTime": "2016-01-14T18:23:43", "Price": 1088 }, { "DateTime": "2016-03-05T04:11:37", "Price": 1573 }, { "DateTime": "2014-08-09T06:02:06", "Price": 1504 }, { "DateTime": "2015-05-25T07:47:41", "Price": 1326 }, { "DateTime": "2016-02-11T06:53:58", "Price": 1525 }];
        return this
            .columns(["Date", "Price"])
            .xAxisType("timeseries")
            .timeseriesPattern("%Y-%m-%dT%H:%M:%S")
            .data(rawData.map(function (row) { return [row.DateTime, row.Price]; }))
        ;
    };

    Column.prototype.updateChart = function (domNode, element, margin, width, height) {
        var context = this;

        this._palette = this._palette.switch(this.paletteID());

        var column = this.svgData.selectAll(".columnRect")
            .data(this.data())
        ;

        var title = column
          .enter().append("rect")
            .attr("class", "columnRect")
            .on("click", function (d) {
                context.click(context.rowToObj(d), context._columns[1]);
            })
            .append("title")
        ;

        if (this.orientation() === "horizontal") {
            column.transition()
                .attr("class", "columnRect")
                .attr("x", function (d) { return context.dataScale(d[0]); })
                .attr("width", this.dataScale.rangeBand ? this.dataScale.rangeBand() : 10)
                .attr("y", function (d) { return context.valueScale(d[1]); })
                .attr("height", function (d) { return height - context.valueScale(d[1]); })
                .style("fill", function (d) { return context._palette(d[0]); })
            ;
        } else {
            column.transition()
                .attr("class", "columnRect")
                .attr("x", function (d) { return 0; })
                .attr("height", this.dataScale.rangeBand ? this.dataScale.rangeBand() : 10)
                .attr("y", function (d) { return context.dataScale(d[0]); })
                .attr("width", function (d) { return context.valueScale(d[1]); })
                .style("fill", function (d) { return context._palette(d[0]); })
            ;
        }

        title
            .text(function (d) { return d[0] + " (" + d[1] + ")"; })
        ;

        column.exit().transition()
            .remove()
        ;
    };

    return Column;
}));
