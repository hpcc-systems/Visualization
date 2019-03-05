!function(e,i){"function"==typeof define&&define.amd?define(["d3","./CommonND"],i):e.google_Combo=i(e.d3,e.google_CommonND)}(this,function(e,i){function t(){i.call(this),this._chartType="ComboChart"}return t.prototype=Object.create(i.prototype),t.prototype.constructor=t,t.prototype._class+=" google_Combo",t.prototype.publish("defaultseriesType","bars","set","The default type for the series (columns) in the chart (line, area or bars)",["line","area","bars"],{tags:["Basic","Shared"]}),t.prototype.publish("types",[],"array","Array of chart types (ex:bar|line|spline|area|area-spline|step|area-step|scatter)",null,{tags:["Basic"]}),t.prototype.publish("stacked",!1,"boolean","Stacks the elements in a series",null,{tags:["Basic","Shared"]}),t.prototype.publish("lineWidth",null,"number","The width of the lines in the chart.  Set to '0' to show only the points",null,{tags:["Basic","Shared"]}),t.prototype.publish("lineDashStyle",[],"array","Line Dash Style",null,{tags:["Advanced","Shared"]}),t.prototype.publish("curveType","none","set","Causes chart data lines to draw smoothly",["none","function"],{tags:["Basic","Shared"]}),t.prototype.publish("pointSize",null,"number","Diameter of displayed points in pixels",null,{tags:["Private"]}),t.prototype.publish("pointShape","circle","set","The shape of individual data elements",["circle","triangle","square","diamond","star","polygon"],{tags:["Advanced"]}),t.prototype.publish("axisFontSize",null,"number","X/Y Axis Label Font Size",null,{tags:["Basic","Shared"]}),t.prototype.publish("axisFontFamily",null,"string","X/Y Axis Label Font Name",null,{tags:["Basic","Shared"]}),t.prototype.publish("xAxisFontColor",null,"html-color","X Axis Text Font Color",null,{tags:["Basic","Shared"]}),t.prototype.publish("yAxisFontColor",null,"html-color","X Axis Text Font Color",null,{tags:["Basic","Shared"]}),t.prototype.publish("xAxisBaselineColor",null,"html-color","Specifies The Color of The Baseline For The Horizontal Axis",null,{tags:["Intermediate","Shared"]}),t.prototype.publish("yAxisBaselineColor",null,"html-color","Specifies The Color of The Baseline For The Vertical Axis",null,{tags:["Intermediate","Shared"]}),t.prototype.publish("xAxisTitle","","string","X Axis Title",null,{tags:["Basic","Shared"]}),t.prototype.publish("yAxisTitle","","string","Y Axis Title",null,{tags:["Basic","Shared"]}),t.prototype.publish("xAxisTitleFontColor",null,"html-color","Horizontal Axis Title Text Style (Color)",null,{tags:["Intermediate","Shared"]}),t.prototype.publish("yAxisTitleFontColor",null,"html-color","Vertical Axis Title Text Style (Color)",null,{tags:["Intermediate","Shared"]}),t.prototype.publish("xAxisTitleFontSize",null,"number","Horizontal Axis Titletext Style (Font Size)",null,{tags:["Intermediate","Shared"]}),t.prototype.publish("yAxisTitleFontSize",null,"number","Vertical Axis Titletext Style (Font Size)",null,{tags:["Intermediate","Shared"]}),t.prototype.publish("xAxisTitleFontFamily",null,"string","Horizontal Axis Title Text Style (Font Name)",null,{tags:["Intermediate","Shared"]}),t.prototype.publish("yAxisTitleFontFamily",null,"string","Vertical Axis Title Text Style (Font Name)",null,{tags:["Intermediate","Shared"]}),t.prototype.publish("xAxisLabelRotation",0,"number","X Axis Label Angle",null,{tags:["Intermediate","Shared"]}),t.prototype.publish("groupWidth","","string","The width of a group of Combos, Percent or Pixels",null,{tags:["Advanced"]}),t.prototype.publish("dataOpacity",1,"number","Transparency of Data Points",null,{tags:["Intermediate"]}),t.prototype.publish("xAxisBaseline",null,"number","Specifies the color of the baseline for the horizontal axis",null,{tags:["Intermediate"]}),t.prototype.publish("yAxisBaseline",null,"number","Specifies the color of the baseline for the vertical axis",null,{tags:["Intermediate"]}),t.prototype.publish("xAxisInversed",!1,"boolean","The Direction In Which The Values Along The Horizontal Axis Grow.",null,{tags:["Advanced"]}),t.prototype.publish("yAxisInversed",!1,"boolean","The Direction In Which The Values Along The Vertical Axis Grow.",null,{tags:["Advanced"]}),t.prototype.publish("xAxisFormatType","","set","Format String For Numeric Axis Labels",["","decimal","scientific","currency","percent","short","long"],{tags:["Intermediate"]}),t.prototype.publish("yAxisFormatType","","set","Format String For Numeric Axis Labels",["","decimal","scientific","currency","percent","short","long"],{tags:["Intermediate"]}),t.prototype.publish("xAxisGridlinesCount",5,"number","The Number of Horizontal Gridlines Between Two Regular Gridlines",null,{tags:["Intermediate"]}),t.prototype.publish("yAxisGridlinesCount",5,"number","The Number of Vertical Gridlines Between Two Regular Gridline",null,{tags:["Intermediate"]}),t.prototype.publish("xAxisGridlinesColor",null,"html-color","The Color of The Horizontal Gridlines Inside The Chart Area",null,{tags:["Basic"]}),t.prototype.publish("yAxisGridlinesColor",null,"html-color","The Color of The Vertical Gridlines Inside The Chart Area",null,{tags:["Basic"]}),t.prototype.publish("xAxisMinorGridlinesCount",0,"number","The Number of Horizontal Minor Gridlines Between Two Regular Gridlines",null,{tags:["Intermediate"]}),t.prototype.publish("yAxisMinorGridlinesCount",0,"number","The Number of Vertical Minor Gridlines Between Two Regular Gridlines",null,{tags:["Intermediate"]}),t.prototype.publish("xAxisMinorGridlinesColor",null,"html-color","The Color of The Horizontal Minor Gridlines Inside The Chart Area",null,{tags:["Intermediate"]}),t.prototype.publish("yAxisMinorGridlinesColor",null,"html-color","The Color of The Vertical Minor Gridlines Inside The Chart Area",null,{tags:["Intermediate"]}),t.prototype.publish("xAxisLogScale",!1,"boolean","Makes Horizontal Axis A log Scale",null,{tags:["Advanced"]}),t.prototype.publish("yAxisLogScale",!1,"boolean","Makes Vertical Axis A Log Scale",null,{tags:["Advanced"]}),t.prototype.publish("xAxisTextPosition","out","set","Position of The Horizontal Axis Text, Relative To The Chart Area",["out","in","none"],{tags:["Advanced"]}),t.prototype.publish("yAxisTextPosition","out","set","Position of The Vertical Axis Text, Relative To The Chart Area",["out","in","none"],{tags:["Advanced"]}),t.prototype.publish("xAxisTicks",[],"array","Replaces The Automatically Generated X-Axis Ticks With The Specified Array",null,{tags:["Private"]}),t.prototype.publish("yAxisTicks",[],"array","Replaces The Automatically Generated Y-Axis Ticks With The Specified Array",null,{tags:["Private"]}),t.prototype.publish("xAxisMaxValue",null,"number","Moves The Max Value of The Horizontal Axis To The Specified Value",null,{tags:["Advanced"]}),t.prototype.publish("yAxisMaxValue",null,"number","Moves The Max Value of The Vertical Axis To The Specified Value",null,{tags:["Advanced"]}),t.prototype.publish("xAxisMinValue",null,"number","Moves The Min Value of The Horizontal Axis To The Specified Value",null,{tags:["Advanced"]}),t.prototype.publish("yAxisMinValue",null,"number","Moves The Min Value of The Vertical Axis To The Specified Value",null,{tags:["Advanced"]}),t.prototype.publish("xAxisViewWindowMode","pretty","set","Specifies How To Scale The Horizontal Axis To Render The values Within The Chart Area",["pretty","maximized","explicit"],{tags:["Advanced"]}),t.prototype.publish("yAxisViewWindowMode","pretty","set","Specifies How To Scale The Vertical Axis To Render The Values Within The Chart Area",["pretty","maximized","explicit"],{tags:["Advanced"]}),t.prototype.publish("xAxisViewWindowMax",null,"number","The Maximum Horizontal Data Value To Render",null,{tags:["Advanced"]}),t.prototype.publish("yAxisViewWindowMax",null,"number","The Maximum Vertical Data Value To Render",null,{tags:["Advanced"]}),t.prototype.publish("xAxisViewWindowMin",null,"number","The Minimum Horizontal Data Value To Render",null,{tags:["Advanced"]}),t.prototype.publish("yAxisViewWindowMin",null,"number","The Minimum Vertical Data Value To Render",null,{tags:["Advanced"]}),t.prototype.getChartOptions=function(){var e=i.prototype.getChartOptions.apply(this,arguments),t={};return this.types().forEach(function(e,i){t[i]={type:e}}),e.seriesType=this.defaultseriesType(),e.series=t,e.dataOpacity=this.dataOpacity(),e.isStacked=this.stacked(),e.lineWidth=this.lineWidth(),e.lineDashStyle=this.lineDashStyle(),e.curveType=this.curveType(),e.pointSize=this.pointSize(),e.pointShape=this.pointShape(),e.bar={groupWidth:this.groupWidth()},e.hAxis={},e.vAxis={},e.hAxis.baseline=this.xAxisBaseline(),e.hAxis.baselineColor=this.xAxisBaselineColor(),e.hAxis.direction=this.xAxisInversed()?-1:1,e.hAxis.gridlines={count:this.xAxisGridlinesCount(),color:this.xAxisGridlinesColor()},e.hAxis.minorGridlines={count:this.xAxisMinorGridlinesCount(),color:this.xAxisMinorGridlinesColor()},e.hAxis.logScale=this.xAxisLogScale(),e.hAxis.textPosition=this.xAxisTextPosition(),e.hAxis.title=this.xAxisTitle(),e.hAxis.minValue=this.xAxisMinValue(),e.hAxis.maxValue=this.xAxisMaxValue(),e.hAxis.slantedText=0!==this.xAxisLabelRotation(),e.hAxis.slantedTextAngle=this.xAxisLabelRotation(),e.hAxis.format=this.xAxisFormatType(),e.hAxis.textStyle={color:this.xAxisFontColor(),fontName:this.axisFontFamily()?this.axisFontFamily():this.fontFamily(),fontSize:this.axisFontSize()?this.axisFontSize():this.fontSize()},this.xAxisTicks().length>0&&(e.hAxis.ticks=this.xAxisTicks()),e.hAxis.titleTextStyle={color:this.xAxisTitleFontColor(),fontName:this.xAxisTitleFontFamily(),fontSize:this.xAxisTitleFontSize()},e.hAxis.viewWindowMode=this.xAxisViewWindowMode(),e.hAxis.viewWindow={min:this.xAxisViewWindowMin(),max:this.xAxisViewWindowMax()},e.vAxis.baseline=this.yAxisBaseline(),e.vAxis.baselineColor=this.yAxisBaselineColor(),e.vAxis.direction=this.yAxisInversed()?-1:1,e.vAxis.gridlines={count:this.yAxisGridlinesCount(),color:this.yAxisGridlinesColor()},e.vAxis.minorGridlines={count:this.yAxisMinorGridlinesCount(),color:this.yAxisMinorGridlinesColor()},e.vAxis.logScale=this.yAxisLogScale(),e.vAxis.textPosition=this.yAxisTextPosition(),e.vAxis.title=this.yAxisTitle(),e.vAxis.minValue=this.yAxisMinValue(),e.vAxis.maxValue=this.yAxisMaxValue(),e.vAxis.format=this.yAxisFormatType(),e.vAxis.textStyle={color:this.yAxisFontColor(),fontName:this.axisFontFamily()?this.axisFontFamily():this.fontFamily(),fontSize:this.axisFontSize()?this.axisFontSize():this.fontSize()},this.yAxisTicks().length>0&&(e.vAxis.ticks=this.yAxisTicks()),e.vAxis.titleTextStyle={color:this.yAxisTitleFontColor(),fontName:this.yAxisTitleFontFamily(),fontSize:this.yAxisTitleFontSize()},e.vAxis.viewWindowMode=this.yAxisViewWindowMode(),e.vAxis.viewWindow={min:this.yAxisViewWindowMin(),max:this.yAxisViewWindowMax()},e},t.prototype.enter=function(e,t){i.prototype.enter.apply(this,arguments)},t.prototype.update=function(e,t){i.prototype.update.apply(this,arguments)},t});