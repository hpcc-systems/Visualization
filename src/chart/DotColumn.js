"use strict";
//  Ported From:  https://bl.ocks.org/osoken/447febbc7ec374a6ab6d
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "./XYAxis", "../api/INDChart", "../api/ITooltip"], factory);
    } else {
        root.chart_DotColumn = factory(root.d3, root.chart_XYAxis, root.api_INDChart, root.api_ITooltip);
    }
}(this, function(d3, XYAxis, INDChart, ITooltip) {
    function DotColumn(target) {
        XYAxis.call(this);
        INDChart.call(this);
        ITooltip.call(this);
        this._linearGap = 25;
    }
    DotColumn.prototype = Object.create(XYAxis.prototype);
    DotColumn.prototype.constructor = DotColumn;
    DotColumn.prototype._class += " chart_DotColumn";
    DotColumn.prototype.implements(INDChart.prototype);
    DotColumn.prototype.implements(ITooltip.prototype);

    DotColumn.prototype.publish("paletteID", "default", "set", "Palette ID", DotColumn.prototype._palette.switch(), {tags: ["Basic", "Shared"]});
    DotColumn.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette", null, {tags: ["Intermediate", "Shared"]});
    DotColumn.prototype.publish("alignment", "bottom", "set", "alignment", ["top", "bottom"]);
    DotColumn.prototype.enter = function(domNode, element) {
        XYAxis.prototype.enter.apply(this, arguments);
        var context = this;
        this
            .tooltipHTML(function(d) {
                var value = d.row[d.idx];
                if (value instanceof Array) {
                    value = value[1] - value[0];
                }
                return context.tooltipFormat({
                    label: d.row[0],
                    series: context.columns()[d.idx],
                    value: value
                });
            });
    };

    XYAxis.prototype.adjustedData = function() {
        var retVal = this.data().map(function(row) {
            var prevValue = 0;
            return row.map(function(cell, idx) {
                if (idx === 0) {
                    return cell;
                }
                if (idx >= this.columns().length) {
                    return cell;
                }
                var retVal = this.yAxisStacked() ? [prevValue, prevValue + cell] : cell;
                prevValue += cell;
                return retVal;
            }, this);
        }, this);
        return retVal;
    };

    DotColumn.prototype.updateChart = function(domNode, element, margin, width, height, isHorizontal, duration, inputTime) {
        var context = this;
        this._palette = this._palette.switch(this.paletteID());
        if (this.useClonedPalette()) {
            this._palette = this._palette.cloneNotExists(this.paletteID() + "_" + this.id());
        }

        var dataLen = 10;
        var offset = 0;
        switch (this.xAxisType()) {
            case "ordinal":
                dataLen = this.domainAxis.d3Scale.rangeBand();
                offset = -dataLen / 2;
                break;
            case "linear":
            case "time":
                dataLen = Math.max(Math.abs(this.dataPos(2) - this.dataPos(1)) * (100 - this._linearGap) / 100, dataLen);
                offset = -dataLen / 2;
                break;
        }

        d3.scale.ordinal()
            .domain(context.columns().filter(function(d, idx) {
                return idx > 0;
            }))
            .rangeRoundBands(isHorizontal ? [0, dataLen] : [dataLen, 0]);

        var column = this.svgData.selectAll(".dataRow")
            .data(this.adjustedData());
        column.exit().remove();

        column.enter().append("g")
            .attr("class", "dataRow")
            .classed("update", true);

        this.tooltip.direction(isHorizontal ? "n" : "e");
        var inputHeight = 20;
        var xScale = d3.scale.ordinal().rangeBands([0, width], 0.05);
        var xLocalScale = d3.scale.ordinal();
        var yScale = d3.scale.ordinal().rangePoints([height, 0]);
        var inputScale = d3.scale.ordinal().rangeBands([0, width]);

        this.svg.selectAll('.yearsData').remove();

        if (this.alignment() === "bottom") {
            this.inputLayer = this.svg.append('g')
                .attr('transform', 'translate(30,' + (height + 30) + ')')
                .attr('class', 'yearsData')
                .classed("update", true);
        } else {
            this.inputLayer = this.svg.append('g')
                .attr('transform', 'translate(30,' + 0 + ')')
                .attr('class', 'yearsData')
                .classed("update", true);
        }

        if (!this.graphLayer) {
            this.svgData.append('g');
            this.graphLayer = this.svgData.append('g');
        }
        var time = 0;

        var radius = 3;
        var mar = 0.6;
        var barWidth = 16;
        var displaydata = [];
        var years = [];
        var delayMax = 1000;
        duration = 2000;
        var yearIdx = 0;
        var yearTarget;
        if (inputTime) {
            time = inputTime;
            barWidth = 10;
            mar = 0.2;
        }

        function trans(to) {
            if (to === time || to < 0 || to >= years.length) {
                return;
            }
            var current = time;
            time = to;
            yearTarget = years[time];
            if (d3.selectAll('#surface') &&
                d3.selectAll('#surface').length > 0 &&
                (d3.selectAll('#surface')[0]).length > 0 &&
                (d3.selectAll('#surface')[0])[0].clientWidth &&
                (d3.selectAll('#surface')[0])[0].clientWidth > 0) {
                width = (d3.selectAll('#surface')[0])[0].clientWidth;
            }
            var votes = context.graphLayer.selectAll('.vote');

            votes.filter(function(d) {
                return d[current].label !== d[time].label || d[current].idx !== d[time].idx;
            })
                .transition()
                .duration(duration)
                .delay(function(d) {
                    return Math.random() * delayMax;
                })
                .attr('cx', function(d) { return ((d[time].label !== null) ? (xScale(d[time].label) + xLocalScale(d[time].idx % barWidth) + radius + mar) : (width / 2));})
                .attr('cy', function(d) { return ((d[time].label !== null) ? (yScale(Math.floor((d[time].idx + 0.1) / barWidth)) - radius - mar) : 0);})
                .style('opacity', function(d) { return (d[time].label !== null) ? 0.8 : 0.0;})
                .style('fill', function(d) { return context._palette(d[time].label);});


            context.inputLayer.selectAll('.button rect')
                .style('fill', function(d, i) {
                    return (i === time) ? 'rgba(0,0,0,0.9)' : 'rgba(0,0,0,0.1)';
                });
            context.inputLayer.selectAll('.button text').transition().duration(duration / 2)
                .style('fill', function(d, i) {
                    return (i === time) ? '#FFF' : '#000';
                });
        }

        years = this.columns().filter(function(col, idx) {
            return idx > 0;
        });

        yearTarget = years[yearIdx];
        var parties = this.data().map(function(row) {
            return row[0];
        });
        var partDict = {};
        parties.forEach(function(d, i) {
            partDict[d] = i;
        });
        var sums = {};
        var data = {};
        years.forEach(function(year, colIdx) {
            data[year] = [];
            this.data().forEach(function(row, rowIdx) {
                data[year].push(row[colIdx + 1]);
            });
            sums[year] = d3.sum(data[year]);
        }, this);
        var max = d3.max(years.map(function(d) {
            return d3.max(data[d]);
        }));
        var nrow = Math.ceil(height / (2 * (radius + mar)));
        barWidth = Math.ceil(max / nrow);
        yScale.domain(d3.range(nrow));
        xScale.domain(parties.map(function(d, i) {
            return i;
        }));
        xLocalScale.rangeBands([0, xScale.rangeBand()]).domain(d3.range(barWidth));
        context._palette(d3.range(parties.length));

        inputScale.domain(years);

        this.inputLayer.selectAll('.button').remove();

        var buttons = this.inputLayer.selectAll('.button').data(years);

        buttons.exit().remove();

        var buttonsEnter = buttons.enter().append('g')
            .attr('class', 'button')
            .classed("update", true);

        buttonsEnter.attr('transform', function(d) {
            return 'translate(' + (inputScale(d)) + ',' + 0 + ')';
        }).on('click', function() {
            var s = d3.select(this);
            trans(years.indexOf(s.datum()));
        });
        buttonsEnter.each(function(d, i) {
            var button = d3.select(this);
            button.append('rect')
                .attr({
                    x: 0,
                    y: 0,
                    height: inputHeight,
                    width: inputScale.rangeBand()
                })
                .style('stroke', '#FFF')
                .style('stroke-width', 2)
                .style('fill', (i === time) ? 'rgba(0,0,0,0.9)' : 'rgba(0,0,0,0.1)');
            button.append('text')
                .attr('x', function(d) {
                    return inputScale.rangeBand() / 2;
                })
                .attr('y', 0)
                .style('fill', (i === time) ? '#FFF' : '#000')
                .style('text-anchor', 'middle')
                .style('font', 12 + 'px "Lucida Grande", Helvetica, Arial, sans-serif')
                .style('dominant-baseline', 'text-before-edge')
                .text(d);
        });

        var summax = d3.max(years.map(function(d) {
            return sums[d];
        }));
        displaydata = [];
        displaydata = d3.range(summax).map(function(d) {
            return [];
        });
        var indexMargin = 0;
        parties.forEach(function(party, partyidx) {
            for (var i = 0; i < data[years[0]][partyidx]; ++i) {
                displaydata[indexMargin + i].push({
                    label: partyidx,
                    idx: i
                });
            }
            indexMargin += data[years[0]][partyidx];
        });
        for (var i = indexMargin; i < summax; ++i) {
            displaydata[i].push({
                label: null,
                idx: null
            });
        }
        d3.range(1, years.length).forEach(function(idx) {
            var year = years[idx];
            var lastyear = years[idx - 1];
            var yearidx = idx;
            var pool = [];
            var unused = [];
            var keep = [];
            displaydata.forEach(function(d, i) {
                var copy = {
                    label: d[yearidx - 1].label,
                    idx: d[yearidx - 1].idx
                };
                d.push(copy);
                if (d[yearidx].label === null) {
                    unused.push(i);
                } else {
                    if (data[year][d[yearidx].label] <= d[yearidx].idx) {
                        pool.push(i);
                    } else {
                        keep.push(i);
                    }
                }
            });
            d3.shuffle(pool);
            if (sums[year] - sums[lastyear] > 0) {
                pool = pool.concat(unused.splice(0, sums[year] - sums[lastyear]));
                d3.shuffle(pool);
            } else {
                pool.splice(sums[year] - keep.length).forEach(function(d) {
                    displaydata[d][yearidx] = {
                        label: null,
                        idx: null
                    };
                });
                pool = pool.splice(0, sums[year] - keep.length);
            }
            var poolmargin = 0;
            parties.forEach(function(party) {
                if (data[year][partDict[party]] - data[lastyear][partDict[party]] > 0) {
                    for (var i = 0; i < (data[year][partDict[party]] - data[lastyear][partDict[party]]); ++i) {
                        displaydata[pool[poolmargin + i]][yearidx] = {
                            label: partDict[party],
                            idx: i + data[lastyear][partDict[party]]
                        };
                    }
                    poolmargin += data[year][partDict[party]] - data[lastyear][partDict[party]];
                }
            });
        });
        var votes = this.graphLayer.selectAll('.vote').data(displaydata);
        votes.exit().remove();
        if(isHorizontal){
             votes.enter().append('circle')
             .attr('class', 'vote')
             .classed("update", true);

             votes
             .attr('r', radius)
             .attr('cx', function(d) { return ((d[time].label !== null) ? (xScale(d[time].label) + xLocalScale(d[time].idx % barWidth) + radius + mar) : (width / 2));})
             .attr('cy', function(d) { return ((d[time].label !== null) ? (yScale(Math.floor((d[time].idx + 0.1) / barWidth)) - radius - mar) : 0);})
             .style('opacity', function(d) { return (d[time].label !== null) ? 0.8 : 0.0;})
             .style('fill', function(d) { return context._palette(d[time].label);});
        }else{
            votes.enter().append('circle')
                .attr('class', 'vote')
                .classed("update", true);

            votes
                .attr('r', radius)
                .attr('cx', function(d) {
                    return ((d[time].label !== null) ? (yScale(Math.floor((d[time].idx + 0.1) / barWidth)) - radius - mar) : 0) + offset;
                })
                .attr('cy', function(d) {
                    return ((d[time].label !== null) ? (xScale(d[time].label) + xLocalScale(d[time].idx % barWidth) + radius + mar) : (width / 2));
                })
                .style('opacity', function(d) { return (d[time].label !== null) ? 0.8 : 0.0;})
                .style('fill', function(d) { return context._palette(d[time].label);});
        }

       votes.exit().remove();
    };

    return DotColumn;
}));