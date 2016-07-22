(function(e,t){typeof define=="function"&&define.amd?define(["./CommonND"],t):e.c3chart_Combo=t(e.c3chart_CommonND)})(this,function(e){function t(t){e.call(this),this._type="bar",this._previousTypes=undefined}return t.prototype=Object.create(e.prototype),t.prototype.constructor=t,t.prototype._class+=" c3chart_Column",t.prototype.publish("stacked",!1,"boolean","Stack Chart",null,{tags:["Basic"]}),t.prototype.publish("defaultType","bar","set","Default chart type",["bar","line","spline","area","area-spline","step","area-step","scatter"],{tags:["Basic"]}),t.prototype.publish("types",[],"array","Array of chart types (ex:bar|line|spline|area|area-spline|step|area-step|scatter)",null,{tags:["Basic"]}),t.prototype.publish("areaFillOpacity",.4,"number","Opacity of all 'Area' chart types in this Combo chart",null,{tags:["Basic"],number:{min:0,max:1,step:.1,slider:!1}}),t.prototype.enter=function(t,n){var r={},i=this.types();this._previousTypes=this.types().join("|");for(var s in i)r[this.columns()[parseInt(s)+1]]=i[s];i.length>0&&(this._config.data.types=r),e.prototype.enter.apply(this,arguments)},t.prototype.update=function(t,n){e.prototype.update.apply(this,arguments);if(this._previousTypes!==this.types().join("|")){var r=this._previousTypes.split("|"),i=this.getC3Columns();for(var s in i)if(typeof r[s]=="undefined"||this.types()[s]!==r[s])this.c3Chart.unload({ids:i[s][0]}),this.c3Chart.load({columns:[i[s]],type:typeof this.types()[s]!="undefined"?this.types()[s]:this.defaultType()});this._previousTypes=this.types().join("|")}this.stacked()?this.c3Chart.groups([this.columns().slice(1,this.columns().length)]):this.c3Chart.groups([]),n.selectAll(".c3-area").style({opacity:this.areaFillOpacity()})},t});