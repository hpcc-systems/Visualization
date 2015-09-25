"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./CommonND"], factory);
    } else {
        root.c3chart_Column = factory(root.c3chart_CommonND);
    }
}(this, function (CommonND) {
    function Combo(target) {
        CommonND.call(this);

        this._type = "bar";
    }
    Combo.prototype = Object.create(CommonND.prototype);
    Combo.prototype.constructor = Combo;
    Combo.prototype._class += " c3chart_Column";

    Combo.prototype.publish("isStacked", false, "boolean", "Stack Chart",null,{tags:["Basic"]});
    Combo.prototype.publish("types", [], "array", "Array of chart types",null,{tags:["Basic"]});

    Combo.prototype.enter = function (domNode, element) {
        
        var typesObj = {};
        
        var typesArr = this.types();
        for(var i in typesArr){
            typesObj[this.columns()[i]] = typesArr[i];
        }
        this._config.data = {
            columns: this.getC3Columns(),
            type:"bar",
        };
        if(typesArr.length > 0){
            this._config.data.types = typesObj;
        }
        CommonND.prototype.enter.apply(this, arguments);
    };

    Combo.prototype.update = function (domNode, element) {
        CommonND.prototype.update.apply(this, arguments);

        if (this.isStacked()) {
            this.c3Chart.groups([this.columns().slice(1, this.columns().length)]);
        } else {
            this.c3Chart.groups([]);
        }
    };

    return Combo;
}));
