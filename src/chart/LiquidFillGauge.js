"use strict";
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/SVGWidget", "../api/I2DChart", "../common/Text", "../common/FAChar", "../common/Utility", "../api/ITooltip", "css!./LiquidFillGauge"], factory);
    } else {
        root.chart_LiquidFillGauge = factory(root.d3, root.common_SVGWidget, root.api_I2DChart, root.common_Text, root.common_FAChar, root.common_Utility, root.api_ITooltip);
    }
}(this, function(d3, SVGWidget, I2DChart, Text, FAChar, Utility, ITooltip) {
    function LiquidFillGauge(target) {
        SVGWidget.call(this);
        I2DChart.call(this);
        ITooltip.call(this);
        Utility.SimpleSelectionMixin.call(this);
        this.labelWidgets = {};
        this.dropDownOptionsList = this.columns();
        this.ndData = this.data();
    }
    LiquidFillGauge.prototype = Object.create(SVGWidget.prototype);
    LiquidFillGauge.prototype.constructor = LiquidFillGauge;
    LiquidFillGauge.prototype._class += " chart_LiquidFillGauge";
    LiquidFillGauge.prototype.implements(I2DChart.prototype);
    LiquidFillGauge.prototype.implements(ITooltip.prototype);
    LiquidFillGauge.prototype.mixin(Utility.SimpleSelectionMixin);
    LiquidFillGauge.prototype.publish("paletteID", "default", "set", "Palette ID", LiquidFillGauge.prototype._palette.switch(), {
        tags: ["Basic", "Shared"]
    });
    LiquidFillGauge.prototype.publish("numerator", "A", "set", "Numerator", function() {
        return this.columns();
    }, {
        tags: ["Basic", "Shared"]
    });
    LiquidFillGauge.prototype.publish("denominator", "B", "set", "Denominator", function() {return this.columns();}, {tags: ["Basic", "Shared"]});
    LiquidFillGauge.prototype.publish("liquidFillWidth", 300, "number", "Guage liquid fill width", null, {tags: ["Basic"]});
    LiquidFillGauge.prototype.publish("liquidFillHeight", 500, "number", "Guage liquid fill height", null, {tags: ["Basic"]});
    LiquidFillGauge.prototype.publish("value", 55, "number", "Guage Percentage value", null, {tags: ["Basic"]}); // The gauge minimum value.
    LiquidFillGauge.prototype.publish("locationX", 50, "number", "Guage Minimum value", null, {tags: ["Basic"]});
    LiquidFillGauge.prototype.publish("locationY", 20, "number", "Guage Minimum value", null, {tags: ["Basic"]});
    LiquidFillGauge.prototype.publish("minValue", 0, "number", "Guage Minimum value", null, {tags: ["Basic"]}); // The gauge minimum value.
    LiquidFillGauge.prototype.publish("maxValue", 100, "number", "Guage Maximun value", null, {tags: ["Basic"]}); // The gauge maximum value.
    LiquidFillGauge.prototype.publish("circleThickness", 0.15, "number", "Guage Circle Thickness value", null, {tags: ["Basic"]}); // The outer circle thickness as a percentage of it's radius.
    LiquidFillGauge.prototype.publish("circleFillGap", 0.05, "number", "Guage Circle Fill gap value", null, {tags: ["Basic"]}); // The size of the gap between the outer circle and wave circle as a percentage of the outer circles radius.
    LiquidFillGauge.prototype.publish("circleColor", "#808015", "html-color", "Value Color", null, {}); // The color of the outer circle.
    LiquidFillGauge.prototype.publish("waveHeight", 0.05, "number", "Guage Wave Height value", null, {tags: ["Basic"]}); // The wave height as a percentage of the radius of the wave circle.
    LiquidFillGauge.prototype.publish("waveCount", 3, "number", "Guage Wave count", null, {tags: ["Basic"]}); // The number of full waves per width of the wave circle.
    LiquidFillGauge.prototype.publish("waveRiseTime", 1000, "number", "Guage WaveRiseTime value", null, {tags: ["Basic"]}); // The amount of time in milliseconds for the wave to rise from 0 to it's final height.
    LiquidFillGauge.prototype.publish("waveAnimateTime", 1000, "number", "Guage WaveAnimateTime value", null, {tags: ["Basic"]}); // The amount of time in milliseconds for a full wave to enter the wave circle.
    LiquidFillGauge.prototype.publish("waveRise", true, "boolean", "Sets Waverise vales true or false", null, {tags: ["Basic"]}); // Control if the wave should rise from 0 to it's full height, or start at it's full height.
    LiquidFillGauge.prototype.publish("waveHeightScaling", true, "boolean", "Sets Wave Height Scaling", null, {tags: ["Basic"]}); // Controls wave size scaling at low and high fill percentages. When true, wave height reaches it's maximum at 50% fill, and minimum at 0% and 100% fill. This helps to prevent the wave from making the wave circle from appear totally full or empty when near it's minimum or maximum fill.
    LiquidFillGauge.prototype.publish("waveAnimate", true, "boolean", "Sets Wave Anaimate", null, {tags: ["Basic"]}); // Controls if the wave scrolls or is static.
    LiquidFillGauge.prototype.publish("waveColor", "#AAAA39", "html-color", "Value Color", null, {}); // The color of the fill wave.
    LiquidFillGauge.prototype.publish("waveOffset", 0.25, "number", "Guage WaveOffset value", null, {tags: ["Basic"]}); // The amount to initially offset the wave. 0 = no offset. 1 = offset of one full wave.
    LiquidFillGauge.prototype.publish("textVertPosition", 0.8, "number", "Guage TextVertPosition value", null, {tags: ["Basic"]}); // The height at which to display the percentage text withing the wave circle. 0 = bottom, 1 = top.
    LiquidFillGauge.prototype.publish("textSize", 0.35, "number", "Guage TextSize value", null, {tags: ["Basic"]}); // The relative height of the text to display in the wave circle. 1 = 50%
    LiquidFillGauge.prototype.publish("valueCountUp", true, "boolean", "Sets Value CountUp", null, {tags: ["Basic"]}); // If true, the displayed value counts up from 0 to it's final value upon loading. If false, the final value is displayed.
    LiquidFillGauge.prototype.publish("displayPercent", true, "boolean", "Sets Display Percentage", null, {tags: ["Basic"]}); // If true, a % symbol is displayed after the value.
    LiquidFillGauge.prototype.publish("textColor", "#555500", "html-color", "Value textColor", null, {}); // The color of the value text when the wave does not overlap it.
    LiquidFillGauge.prototype.publish("waveTextColor", "#FFFFAA", "html-color", "Value waveTextColor", null, {}); // The color of the value text when the wave overlaps it.
    LiquidFillGauge.prototype.enter = function(domNode, element) {
        SVGWidget.prototype.enter.apply(this, arguments);
        this._selection.widgetElement(element);
        var context = this;
        this
            .tooltipHTML(function(d) {
                return context.tooltipFormat({
                    label: d.data[0],
                    value: d.data[1]
                });
            });
    };
    LiquidFillGauge.prototype.update = function(domNode, element) {
        SVGWidget.prototype.update.apply(this, arguments);
        var context = this;
        this._palette = this._palette.switch(this.paletteID());
        if (d3.selectAll('.liquidfillguage')) {
            d3.selectAll('.liquidfillguage').remove();
        }
        var numeratorSum = (context.data()[context.numerator()]).reduce(function(x, y) {
            return x + y;
        });
        var denominatorSum = (context.data()[context.denominator()]).reduce(function(x, y) {
            return x + y;
        });
        context.value((numeratorSum / denominatorSum));
        var radius = Math.min(context.liquidFillWidth(), context.liquidFillHeight()) / 2;
        var locationX = parseInt(context.locationX()) / 2 - radius;
        var locationY = parseInt(context.locationY()) / 2 - radius;
        var fillPercent = Math.max(context.minValue(), Math.min(context.maxValue(), context.value())) / context.maxValue();
        var waveHeightScale;
        if (context.waveHeightScaling()) {
            waveHeightScale = d3.scale.linear()
                .range([0, context.waveHeight(), 0])
                .domain([0, 50, 100]);
        } else {
            waveHeightScale = d3.scale.linear()
                .range([context.waveHeight(), context.waveHeight()])
                .domain([0, 100]);
        }
        var textPixels = (context.textSize() * radius / 2);
        var textFinalValue = parseFloat(context.value()).toFixed(2);
        var textStartValue = context.valueCountUp() ? context.minValue() : textFinalValue;
        var percentText = context.displayPercent() ? "%" : "";
        var circleThickness = context.circleThickness() * radius;
        var circleFillGap = context.circleFillGap() * radius;
        var fillCircleMargin = circleThickness + circleFillGap;
        var fillCircleRadius = radius - fillCircleMargin;
        var waveHeight = fillCircleRadius * waveHeightScale(fillPercent * 100);
        var waveLength = fillCircleRadius * 2 / context.waveCount();
        var waveClipCount = 1 + context.waveCount();
        var waveClipWidth = waveLength * waveClipCount;
        // Rounding functions so that the correct number of decimal places is always displayed as the value counts up.
        var textRounder = function(value) {
            return Math.round(value);
        };
        if (parseFloat(textFinalValue) !== parseFloat(textRounder(textFinalValue))) {
            textRounder = function(value) {
                return parseFloat(value).toFixed(1);
            };
        }
        if (parseFloat(textFinalValue) !== parseFloat(textRounder(textFinalValue))) {
            textRounder = function(value) {
                return parseFloat(value).toFixed(2);
            };
        }
        // Data for building the clip wave area.
        var data = context.getData(waveClipCount);
        // Scales for controlling the position of the clipping path.
        var waveRiseScale = d3.scale.linear()
            // The clipping area size is the height of the fill circle + the wave height, so we position the clip wave
            // such that the it will overlap the fill circle at all when at 0%, and will totally cover the fill
            // circle at 100%.
            .range([(fillCircleMargin + fillCircleRadius * 2 + waveHeight), (fillCircleMargin - waveHeight)])
            .domain([0, 1]);
        var waveAnimateScale = d3.scale.linear()
            .range([0, waveClipWidth - fillCircleRadius * 2]) // Push the clip area one full wave then snap back.
            .domain([0, 1]);
        // Scale for controlling the position of the text within the gauge.
        var textRiseScaleY = d3.scale.linear()
            .range([fillCircleMargin + fillCircleRadius * 2, (fillCircleMargin + textPixels * 0.7)])
            .domain([0, 1]);
        // Center the gauge within the parent SVG.
        var gaugeGroup = element.append("g")
            .attr('class', 'liquidfillguage')
            .attr('transform', 'translate(' + locationX + ',' + locationY + ')');
        // Draw the outer circle.
        gaugeGroup.append("path")
            .attr("d", context.gaugeCircleArc(radius, circleThickness))
            .style("fill", context.circleColor())
            .attr('transform', 'translate(' + radius + ',' + radius + ')');
        // Text where the wave does not overlap.
        var text1 = gaugeGroup.append("text")
            .text(numeratorSum + '/' + denominatorSum + ' = ' + textRounder(textStartValue) + percentText)
            .attr("class", "liquidFillGaugeText")
            .attr("text-anchor", "middle")
            .attr("font-size", textPixels + "px")
            .style("fill", context.textColor())
            .attr('transform', 'translate(' + radius + ',' + textRiseScaleY(parseFloat(context.textVertPosition())) + ')');
        var waveGroup = gaugeGroup.append("defs")
            .append("clipPath")
            .attr("id", "clipWave_liquidfillguage");
        var wave = waveGroup.append("path")
            .datum(data)
            .attr("d", context.clipArea(waveClipWidth, waveHeight, fillCircleRadius))
            .attr("T", 0);
        // The inner circle with the clipping wave attached.
        var fillCircleGroup = gaugeGroup.append("g")
            .attr("clip-path", "url(#clipWave_liquidfillguage)");
        fillCircleGroup.append("circle")
            .attr("cx", radius)
            .attr("cy", radius)
            .attr("r", fillCircleRadius)
            .style("fill", context.waveColor());
        // Text where the wave does overlap.
        var text2 = fillCircleGroup.append("text")
            .text(numeratorSum + '/' + denominatorSum + ' = ' + textRounder(textStartValue) + percentText)
            .attr("class", "liquidFillGaugeText")
            .attr("text-anchor", "middle")
            .attr("font-size", textPixels + "px")
            .style("fill", context.waveTextColor())
            .attr('transform', 'translate(' + radius + ',' + textRiseScaleY(context.textVertPosition()) + ')');
        // Make the value count up.
        if (context.valueCountUp()) {
            var textTween = function() {
                var i = d3.interpolate(this.textContent, textFinalValue);
                return function(t) {
                    this.textContent = textRounder(i(t)) + percentText;
                };
            };
            text1.transition()
                .duration(context.waveRiseTime())
                .tween("text", textTween);
            text2.transition()
                .duration(context.waveRiseTime())
                .tween("text", textTween);
        }
        // Make the wave rise. wave and waveGroup are separate so that horizontal and vertical movement can be controlled independently.
        var waveGroupXPosition = fillCircleMargin + fillCircleRadius * 2 - waveClipWidth;
        if (context.waveRise()) {
            waveGroup.attr('transform', 'translate(' + waveGroupXPosition + ',' + waveRiseScale(0) + ')')
                .transition()
                .duration(context.waveRiseTime())
                .attr('transform', 'translate(' + waveGroupXPosition + ',' + waveRiseScale(fillPercent) + ')')
                .each("start", function() {
                    wave.attr('transform', 'translate(1,0)');
                }); // This transform is necessary to get the clip wave positioned correctly when waveRise=true and waveAnimate=false. The wave will not position correctly without this, but it's not clear why this is actually necessary.
        } else {
            waveGroup.attr('transform', 'translate(' + waveGroupXPosition + ',' + waveRiseScale(fillPercent) + ')');
        }
        if (context.waveAnimate()) {
            context.animateWave(waveAnimateScale, wave);
        }
    };
    // The clipping wave area.
    LiquidFillGauge.prototype.clipArea = function(waveClipWidth, waveHeight, fillCircleRadius) {
        var context = this;
        return d3.svg.area()
            .x(function(d) {
                return context.waveScale(waveClipWidth, d.x);
            })
            .y0(function(d) {
                return context.waveScale(waveHeight, Math.sin(Math.PI * 2 * context.waveOffset() * -1 + Math.PI * 2 * (1 - context.waveCount()) + d.y * 2 * Math.PI));
            })
            .y1(function(d) {
                return (fillCircleRadius * 2 + waveHeight);
            });
    };
    LiquidFillGauge.prototype.getData = function(waveClipCount) {
        var data = [];
        for (var i = 0; i <= 40 * waveClipCount; i++) {
            data.push({
                x: i / (40 * waveClipCount),
                y: (i / (40))
            });
        }
        return data;
    };
    LiquidFillGauge.prototype.gaugeCircleArc = function(radius, circleThickness) {
        var context = this;
        return d3.svg.arc()
            .startAngle(context.gaugeCircleX(0))
            .endAngle(context.gaugeCircleX(1))
            .outerRadius(context.gaugeCircleY(radius))
            .innerRadius(context.gaugeCircleY(radius - circleThickness));
    };
    // Scales for drawing the outer circle.
    LiquidFillGauge.prototype.gaugeCircleX = function(angle) {
        var circlexValue = d3.scale.linear().range([0, 2 * Math.PI]).domain([0, 1]);
        return circlexValue(angle);
    };
    // Scales for drawing the outer circle.
    LiquidFillGauge.prototype.gaugeCircleY = function(radius) {
        var circleYValue = d3.scale.linear().range([0, radius]).domain([0, radius]);
        return circleYValue(radius);
    };
    // Scales for controlling the size of the clipping path.
    LiquidFillGauge.prototype.waveScale = function(waveWidthOrHeight, waveValue) {
        var waveScale = d3.scale.linear().range([0, waveWidthOrHeight]).domain([0, 1]);
        return waveScale(waveValue);
    };
    LiquidFillGauge.prototype.animateWave = function(waveAnimateScale, wave) {
        var context = this;
        wave.attr('transform', 'translate(' + waveAnimateScale(parseInt(wave.attr('T'))) + ',0)');
        wave.transition()
            .duration(context.waveAnimateTime() * (1 - wave.attr('T')))
            .ease('linear')
            .attr('transform', 'translate(' + waveAnimateScale(1) + ',0)')
            .attr('T', 1)
            .each('end', function() {
                wave.attr('T', 0);
                context.animateWave(waveAnimateScale, wave);
            });
    };
    LiquidFillGauge.prototype.exit = function(domNode, element) {
        SVGWidget.prototype.exit.apply(this, arguments);
    };
    return LiquidFillGauge;
}));