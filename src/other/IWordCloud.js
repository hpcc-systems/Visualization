/**
* @file WordCloud Interface
* @author HPCC Systems
*/

"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else {
        root.other_IWordCloud = factory();
    }
}(this, function () {
    /**
     * @interface other_IWordCloud
     * @class other_IWordCloud
     */
    function IWordCloud() {
    }

    /**
     * Populates Data and Columns with test data.
     * @method testData
     * @memberof other_IWordCloud
     * @instance
     * @returns {Widget}
     */
    IWordCloud.prototype.testData = function () {
        this.columns(["Word", "Weight"]);
        var words = ["Myriel", "Napoleon", "Mlle.Baptistine", "Mme.Magloire", "CountessdeLo", "Geborand", "Champtercier", "Cravatte", "Count", "OldMan", "Labarre", "Valjean", "Marguerite", "Mme.deR", "Isabeau", "Gervais", "Tholomyes", "Listolier", "Fameuil", "Blacheville", "Favourite", "Dahlia", "Zephine", "Fantine", "Mme.Thenardier", "Thenardier", "Cosette", "Javert", "Fauchelevent", "Bamatabois", "Perpetue", "Simplice", "Scaufflaire", "Woman1", "Judge", "Champmathieu", "Brevet", "Chenildieu", "Cochepaille", "Pontmercy", "Boulatruelle", "Eponine", "Anzelma", "Woman2", "MotherInnocent", "Gribier", "Jondrette", "Mme.Burgon", "Gavroche", "Gillenormand", "Magnon", "Mlle.Gillenormand", "Mme.Pontmercy", "Mlle.Vaubois", "Lt.Gillenormand", "Marius", "BaronessT", "Mabeuf", "Enjolras", "Combeferre", "Prouvaire", "Feuilly", "Courfeyrac", "Bahorel", "Bossuet", "Joly", "Grantaire", "MotherPlutarch", "Gueulemer", "Babet", "Claquesous", "Montparnasse", "Toussaint", "Child1", "Child2", "Brujon", "Mme.Hucheloup"].map(function (d) {
            return [ d, 10 + Math.random() * 14 ];
        });
        this.data(words);
        return this;
    };

    /**
     * (event) Overridable click callback function.
     * @method click
     * @memberof other_IWordCloud
     * @param {type} row
     * @param {type} column
     */
    IWordCloud.prototype.click = function (d) {
        console.log("Click:  " + d.label);
    };

    return IWordCloud;
}));
