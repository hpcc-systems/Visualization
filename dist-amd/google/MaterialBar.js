!function(t,r){"function"==typeof define&&define.amd?define(["./Material"],r):t.google_MaterialBar=r(t.google_Material)}(this,function(t){function r(){t.call(this),this._chartType="Bar",this._gType="Bar",this._chartLibrary="charts"}return r.prototype=Object.create(t.prototype),r.prototype.constructor=r,r.prototype._class+=" google_MaterialBar",r.prototype.getChartOptions=function(){var r=t.prototype.getChartOptions.apply(this,arguments);return r.bars="horizontal",r},r});