"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "./CommonND","goog!visualization,1,packages:[treemap]"], factory);
    } else {
        root.TreeMap = factory(root.d3, root.CommonND);
    }
}(this, function (d3, CommonND) {

    function TreeMap() {
        CommonND.call(this);
        this._class = "google_TreeMap";

        this._chartType = "TreeMap";
    };
    TreeMap.prototype = Object.create(CommonND.prototype);
    // TODO impliment ITree?
    
    TreeMap.prototype.publish("minColor", "", "html-color", "");
    TreeMap.prototype.publish("midColor", "", "html-color", "");
    TreeMap.prototype.publish("maxColor", "", "html-color", "");
    TreeMap.prototype.publish("headerHeight", "", "number", "");
    TreeMap.prototype.publish("showScale", false, "boolean", "");
    
    TreeMap.prototype.getChartOptions = function () {
        var retVal = CommonND.prototype.getChartOptions.apply(this, arguments);
        //  TODO:  Add TreeMap Properties Here
        retVal.minColor = this._minColor;
        retVal.midColor = this._midColor;
        retVal.maxColor = this._maxColor;
        
        retVal.headerHeight = this._headerHeight;
        retVal.showScale = this._showScale;
        
        return retVal;
    };

    TreeMap.prototype.enter = function (domNode, element) {
        CommonND.prototype.enter.apply(this, arguments);
    };

    TreeMap.prototype.update = function (domNode, element) {
        CommonND.prototype.update.apply(this, arguments);
    };
    
    TreeMap.prototype.testData = function() {
        // do we need to map this like like we do Dendogram and convert over?
        
        var columns = ['Location', 'Parent', 'Market trade volume (size)', 'Market increase/decrease (color)'];
        var data = [
          ['Global',    null,                 0,                               0],
          ['America',   'Global',             0,                               0],
          ['Europe',    'Global',             0,                               0],
          ['Asia',      'Global',             0,                               0],
          ['Australia', 'Global',             0,                               0],
          ['Africa',    'Global',             0,                               0],
          ['Brazil',    'America',            11,                              10],
          ['USA',       'America',            52,                              31],
          ['Mexico',    'America',            24,                              12],
          ['Canada',    'America',            16,                              -23],
          ['France',    'Europe',             42,                              -11],
          ['Germany',   'Europe',             31,                              -2],
          ['Sweden',    'Europe',             22,                              -13],
          ['Italy',     'Europe',             17,                              4],
          ['UK',        'Europe',             21,                              -5],
          ['China',     'Asia',               36,                              4],
          ['Japan',     'Asia',               20,                              -12],
          ['India',     'Asia',               40,                              63],
          ['Laos',      'Asia',               4,                               34],
          ['Mongolia',  'Asia',               1,                               -5],
          ['Israel',    'Asia',               12,                              24],
          ['Iran',      'Asia',               18,                              13],
          ['Pakistan',  'Asia',               11,                              -52],
          ['Egypt',     'Africa',             21,                              0],
          ['S. Africa', 'Africa',             30,                              43],
          ['Sudan',     'Africa',             12,                              2],
          ['Congo',     'Africa',             10,                              12],
          ['Zaire',     'Africa',             8,                               10]
        ];
       
        this.columns(columns);
        this.data(data);
        
        return this;
    }
    return TreeMap;
}));
