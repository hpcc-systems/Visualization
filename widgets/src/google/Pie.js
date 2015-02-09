(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "./Common"], factory);
    } else {
        root.Pie = factory(root.d3, root.Common);
    }
}(this, function (d3, Common) {

    function Pie(tget) {
        Common.call(this);
        this._class = "google_Pie";

    };
    Pie.prototype = Object.create(Common.prototype);
    
    Pie.prototype.publish("is3D", true, "boolean", "Enable 3D");
    Pie.prototype.publish("chartAreaWidth", "80%", "string", "Chart Area Width");
    Pie.prototype.publish("chartAreaHeight", "80%", "string", "Chart Area Height");
    Pie.prototype.publish("fontSize", 12, "number", "Font Size");
    Pie.prototype.publish("fontName", "Calibri", "string", "Font Name");
    Pie.prototype.publish("pieHole", 0, "number", "Pie Hole Size");
    
    Pie.prototype.publish("pieStartAngle", 0, "number", "Pie Start Angle");
    
    Pie.prototype.publish("legendAlignment", "center", "set", "Legend Alignment", ["","start","center","end"]);
    Pie.prototype.publish("legendPosition", "top", "set", "Legend Position", ["","bottom","labeled","left","none","right","top"]);
    Pie.prototype.publish("legendFontColor", "#000", "html-color", "Legend Font Color");
    Pie.prototype.publish("legendFontName", "Calibri", "string", "Legend Font Name");
    Pie.prototype.publish("legendFontSize", 12, "number", "Legend Font Size");
    Pie.prototype.publish("legendFontBold", true, "boolean", "Legend Font Bold");
    Pie.prototype.publish("legendFontItalic", true, "boolean", "Legend Font Italic");

    Pie.prototype.is3D = function (_) {
        if (!arguments.length) return this._is3D;
        this._is3D = _;
        return this;
    }

    Pie.prototype.enter = function (domNode, element) {
        var context = this;

        element.style("overflow", "hidden");
        this.pieChart = new google.visualization.PieChart(element.node());

        google.visualization.events.addListener(this.pieChart, "select", function () {
            var selectedItem = context.pieChart.getSelection()[0];
            if (selectedItem) {
                context.click(context.rowToObj(context._data[selectedItem.row]), context._columns[1]);
            }
        });
    };

    Pie.prototype.update = function (domNode, element) {
        var context = this;

        var colors = this._data.map(function (row) {
            return this._palette(row[0]);
        }, this);

        var chartOptions = {
            backgroundColor: "none",
            width: this.width(),
            height: this.height(),
            fontSize:this._fontSize,
            fontName:this._fontName,
            chartArea: { 
                width: this._chartAreaWidth, 
                height: this._chartAreaHeight 
            },
            colors: colors,
            is3D: this._is3D,
            pieStartAngle:this._pieStartAngle,
            legend: { 
                alignment: this._legendAlignment,
                position: this._legendPosition,
                maxLines:2,
                textStyle: {
                    color: this._legendFontColor,
                    fontName: this._legendFontName,
                    fontSize: this._legendFontSize,
                    bold: this._legendFontBold,
                    italic: this._legendFontItalic,
                }
            },
            pieHole:this._pieHole
        };

        this.pieChart.draw(this._data_google, chartOptions);
    };

    return Pie;
}));
