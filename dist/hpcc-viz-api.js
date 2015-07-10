
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('api/I1DChart.js',["../common/Palette"], factory);
    } else {
        root.api_I1DChart = factory(root.common_Palette);
    }
}(this, function (Palette) {
    function I1DChart() {
    }
    I1DChart.prototype._palette = Palette.rainbow("default");

    //  Data ---
    I1DChart.prototype.testData = function () {
        this.columns("Result");
        this.data(66);
        return this;
    };

    //  Events  ---
    I1DChart.prototype.click = function (row, column) {
        console.log("Click:  " + JSON.stringify(row) + ", " + column);
    };

    return I1DChart;
}));


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('api/I2DChart.js',["../common/Palette"], factory);
    } else {
        root.api_I2DChart = factory(root.common_Palette);
    }
}(this, function (Palette) {
    function I2DChart() {
    }
    I2DChart.prototype._palette = Palette.ordinal("default");

    //  Data ---
    I2DChart.prototype.testData = function () {
        this.columns(["Subject", "2nd Year"]);
        this.data([
            ["Geography", 75],
            ["English", 45],
            ["Math", 98],
            ["Science", 66]
        ]);
        return this;
    };

    //  Events  ---
    I2DChart.prototype.click = function (row, column) {
        console.log("Click:  " + JSON.stringify(row) + ", " + column);
    };

    return I2DChart;
}));

(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('api/IGraph.js',[], factory);
    } else {
        root.api_IGraph = factory();
    }
}(this, function () {
    function IGraph() {
    }

    //  Events  ---
    IGraph.prototype.vertex_click = function (d) {
        console.log("Vertex Click: " + d.id());
    };

    IGraph.prototype.edge_click = function (d) {
        console.log("Edge Click: " + d.id());
    };

    return IGraph;
}));


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('api/IInput.js',["../common/Widget"], factory);
    } else {
        root.api_IInput = factory(root.common_Widget);
    }
}(this, function (Widget) {
    function IInput() {
        Widget.call(this);
    }
    IInput.prototype = Object.create(Widget.prototype);

    IInput.prototype.publish("name", "", "string", "HTML name for the input");
    IInput.prototype.publish("label", "", "string", "Descriptive label");
    IInput.prototype.publish("value", "", "string", "Input type");
    IInput.prototype.publish("validate", null, "string", "Input Validation");

    //  Implementation  ---
    IInput.prototype.isValid = function () {
        if (this.validate()) {
            var re = new RegExp(this.validate());
            if (!re.test(this.value())) {
                return false;
            }
        }
        return true;
    };

    //  Events  ---
    IInput.prototype.blur = function (w) {
    };
    IInput.prototype.click = function (w) {
    };
    IInput.prototype.change = function (w) {
    };

    return IInput;
}));


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('api/INDChart.js',["../common/Palette"], factory);
    } else {
        root.api_INDChart = factory(root.common_Palette);
    }
}(this, function (Palette) {
    function INDChart() {
    }
    INDChart.prototype._palette = Palette.ordinal("default");

    //  Data ---
    INDChart.prototype.testData = function () {
        switch (this._chartType) {
            case 'ScatterChart':
                this.columns(["ID", "Year 1", "Year 2", "Year 3"]);
                this.data([
                    [10, 75, 68, 65],
                    [20, 45, 55, 52],
                    [30, 98, 92, 90],
                    [40, 66, 60, 86]
                ]);
                break;
                
            default:
                this.columns(["Subject", "Year 1", "Year 2", "Year 3"]);
                this.data([
                    ["Geography", 75, 68, 65],
                    ["English", 45, 55, 52],
                    ["Math", 98, 92, 90],
                    ["Science", 66, 60, 66]
                ]);
                break;
        }
       
        return this;
    };

    //  Events  ---
    INDChart.prototype.click = function (row, column) {
        console.log("Click:  " + JSON.stringify(row) + ", " + column);
    };

    return INDChart;
}));


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('api/ITree.js',["../common/Palette"], factory);
    } else {
        root.api_ITree = factory(root.common_Palette);
    }
}(this, function (Palette) {
    function ITree() {
    }
    ITree.prototype._palette = Palette.ordinal("default");

    //  Data ---
    ITree.prototype.testData = function () {
        var data = {label: "root", children: [{
            label: "A",
            children: [{
                label: "AA",
                children: [{
                    label: "AAA"
                }]
            }, {
                label: "AB",
                children: [{
                    label: "ABA"
                }]
            }]
        }, {
            label: "B",
            children: [{
                label: "BA",
                children: [{
                    label: "BAA"
                }]
            }, {
                label: "BB"
            }]
        }]};
        this.data(data);
        return this;
    };

    //  Events  ---
    ITree.prototype.click = function (d) {
        console.log("Click:  " + d.label);
    };

    return ITree;
}));

