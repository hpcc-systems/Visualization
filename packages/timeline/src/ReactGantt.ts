import { d3Event, select as d3Select, SVGZoomWidget, Utility } from "@hpcc-js/common";
import { HTMLTooltip } from "@hpcc-js/html";
import { scaleLinear as d3ScaleLinear } from "d3-scale";
import { React, render, LabelledRect } from "@hpcc-js/react";

export type IGanttData = [ string, number, number, any? ];

export interface IRangeOptions {
    rangePadding: number;
    fontFamily: string;
    fontSize: number;
    strokeWidth?: number;
    fill: string;
    stroke: string;
    textFill: string;
    cornerRadius: number;
}

export class ReactGantt extends SVGZoomWidget {

    protected _selection = new Utility.Selection(this);

    protected _buckets;
    protected _bucketHeight;
    protected _interpolateX;
    protected _interpolateY;

    protected _maxFontSize;

    public _tooltip;

    public _minStart: number;
    public _maxEnd: number;

    protected _title_idx = 0;
    protected _startDate_idx = 1;
    protected _endDate_idx = 2;
    protected _icon_idx = -1;
    protected _color_idx = -1;
    protected _yoffset_idx = -1;

    public _rangeOptions: IRangeOptions = {
        rangePadding: 2,
        fontFamily: "Verdana",
        fontSize: 12,
        fill: "white",
        stroke: "black",
        textFill: "black",
        cornerRadius: 3
    };
    
    constructor(drawStartPosition: "origin" | "center" = "origin"){
        super();
        this._drawStartPos = drawStartPosition;

        this.showToolbar_default(false);

        this._tooltip = new HTMLTooltip();
        this._tooltip
            .tooltipHTML(d => {
                return `<div style="text-align:center;">${d[0]}<br/><br/>${d[1]} -&gt; ${d[2]}</div>`;
            });
        this._tooltip
            .followCursor(true)
            ;
    }

    private _rangeRenderer: React.FunctionComponent = LabelledRect;
    rangeRenderer(): React.FunctionComponent;
    rangeRenderer(_: React.FunctionComponent): this;
    rangeRenderer(_?: React.FunctionComponent): this | React.FunctionComponent {
        if (!arguments.length) return this._rangeRenderer;
        this._rangeRenderer = _;
        return this._rangeRenderer;
    }

    enter(domNode, element){
        super.enter(domNode, element);

        this._tooltip.target(domNode);
    }
    update(domNode, element){
        super.update(domNode, element);

        this.zoomExtent([0.05, this.maxZoom()]);

        this._title_idx = this.titleColumn() !== null ? this.columns().indexOf(this.titleColumn()) : this._title_idx;
        this._startDate_idx = this.startDateColumn() !== null ? this.columns().indexOf(this.startDateColumn()) : this._startDate_idx;
        this._endDate_idx = this.endDateColumn() !== null ? this.columns().indexOf(this.endDateColumn()) : this._endDate_idx;
        this._icon_idx = this.iconColumn() !== null ? this.columns().indexOf(this.iconColumn()) : this._icon_idx;
        this._color_idx = this.colorColumn() !== null ? this.columns().indexOf(this.colorColumn()) : this._color_idx;

        const context = this;
        const w = this.width();
        const h = this.height();

        const x0 = 0;
        const x1 = w;
        const y0 = 0;
        
        this._interpolateX = d3ScaleLinear()
            .domain([this._minStart, this._maxEnd])
            .range([x0, x1])
            ;

        this.data().sort((a, b)=>a[1]-b[1]);
        const interpedStart = this._interpolateX(this._minStart);
        this._buckets = this.calcBuckets(1, 2);

        this.zoomTo(
            [interpedStart, 0],
            1
        );

        this._bucketHeight = Math.max(
            this.minBucketHeight(),
            Math.min(h / (this._maxBucket + 1), this.maxBucketHeight())
        );

        this.setRangeOptions();

        this._maxFontScale = (this._bucketHeight - (this.rangePadding() * 2));
        this.measureDataText();

        this._interpolateY = d3ScaleLinear()
            .domain([0, (this._maxBucket + 1)])
            .range([
                y0,
                Math.min(
                    h,
                    (this._maxBucket + 1) * (this._bucketHeight + this.gutter())
                )
            ])
            ;
        
        const itemSelection = this._renderElement.selectAll(".item")
            .data(this.data(), (d, i) => {
                return `${d[1]}_${d[2]}`;
            })
            ;
        
        const borderOffset1 = this.strokeWidth();
        const borderOffset2 = borderOffset1 * 2;

        itemSelection
            .join(
                enter => enter.append("g")
                    .attr("class", "item")
                    .on("click.selectionBag", function (d) {
                        context._selection.click(
                            {
                                _id: d.id,
                                element: () => d.element
                            }, 
                            d3Event
                        );
                        context.selectionChanged();
                    })
                    .on("click", function (this: SVGElement, d) {
                        const selected = d.element.classed("selected");
                        if(d[context.columns().length]){
                            d.__lparam = d[context.columns().length];
                        }
                        context.click(d, "", selected);
                    })
                    .on("dblclick", function (this: SVGElement, d) {
                        const selected = d.element.classed("selected");
                        if(d[context.columns().length]){
                            d.__lparam = d[context.columns().length];
                        }
                        context.click(d, "", selected);
                    })
                    .on("mousein", function (d) {
                        context.highlightItem(d3Select(this), d);
                        const selected = d.element.classed("selected");
                        context.mousein(d, "", selected);
                    })
                    .on("mouseover", function (d) {
                        const d3evt = d3Event();
                        context._tooltip._triggerElement = d.element;
                        context._tooltip._cursorLoc = [
                            d3evt.clientX,
                            d3evt.clientY
                        ];
                        context._tooltip
                            .data(d)
                            .visible(true)
                            .fitContent(true)
                            .render()
                            ;
                        context.highlightItem(d3Select(this), d);
                        const selected = d.element.classed("selected");
                        context.mouseover(d, "", selected);
                    })
                    .on("mouseout", function (d) {
                        context._tooltip
                            .visible(false)
                            .render()
                            ;
                        context.highlightItem(null, null);
                        const selected = d.element.classed("selected");
                        context.mouseout(d, "", selected);
                    })
                    .each(function (d, i) {
                        d.element = d3Select(this);
                        d.x = context._interpolateX(d[1]);
                        const endX = context._interpolateX(d[2]);
                        d.y = context._interpolateY(context._buckets[i]);
                        d.props={
                            ...d[3],
                            text: d[0]
                        };
                        d.props.width = endX - d.x;
                        d.props.height = context._bucketHeight;
                        d.x += borderOffset1;
                        d.y += borderOffset1;
                        d.props.width -= borderOffset2;
                        d.props.height -= borderOffset2;
                        d.element.attr("transform", `translate(${d.x+(d.props.width/2)} ${d.y+(d.props.height/2)})`);
                    }),
                update => update,
                exit => exit
                    .each(function (d) {
                        delete d.element;
                    })
                    .remove()
            )
            .attr("opacity", d => d.props && d.props.hidden ? 0 : 1)
            .each(function (this: SVGGElement, d, i) {
                d.that = this;
                d.x = context.renderRangeElement(d, i, false, context._rangeOptions);
            })
            .on("dblclick.zoom", d => {
                const x1 = this._interpolateX(d[1]);
                const x2 = this._interpolateX(d[2]);
                const xRange = x2 - x1;
                const xScale = w / xRange;
                this.zoomTo(
                    [
                        -x1 * xScale,
                        0
                    ],
                    xScale
                );
            })
            ;
            element.on("dblclick.zoom", null);
    }
    renderRangeElement(d, i, transformEach = false, options: any = {}) {
        const borderOffset1 = options.strokeWidth;
        const borderOffset2 = borderOffset1 * 2;
        const padding = options.rangePadding;
        let endX;
        const x = isNaN(this._transform.x) ? 0 : this._transform.x;
        const k = isNaN(this._transform.k) ? 1 : this._transform.k;
        if(!transformEach){
            d.x = this._interpolateX(d[1]);
            endX = this._interpolateX(d[2]);
            d.y = this._interpolateY(this._buckets[i]);
            d.props={
                ...d[3],
                text: d[0]
            };
            d.props.width = (endX - d.x) / k;
        } else {
            d.x = this._interpolateX(d[1]) * k;
            endX = this._interpolateX(d[2]) * k;
            d.y = this._interpolateY(this._buckets[i]);
            d.props={
                ...d[3],
                text: d[0]
            };
            d.props.width = (endX - d.x)/k;
            d.x += x;
            d.props.width *= k;
        }
        d.props.height = this._bucketHeight;
        if(d.element === undefined && d.that){
            d.element = d3Select(d.that);
        }
        d.element.attr("transform", `translate(${d.x+(d.props.width/2)} ${d.y+(d.props.height/2)})`);
        
        d.x += borderOffset1;
        d.y += borderOffset1;
        d.props.width -= borderOffset2;
        d.props.height -= borderOffset2;
        d.props.width = d.props.width < 1 ? 1 : d.props.width;
        d.props.height = d.props.height < 1 ? 1 : d.props.height;

        let text = this.truncateText(d.props.text, d.props.width - padding, this._maxFontScale);

        if(text !== d.props.text){
            text = this.truncateText(d.props.text, d.props.width - padding);
        } else {
            d.props.fontSize = this._maxFontScale * options.fontSize;
        }

        render(
            this._rangeRenderer,
            {
                ...options,
                ...d.props,
                text,
            },
            d.that
        );
    }

    setRangeOptions(){
        this._rangeOptions = {
            rangePadding: this.rangePadding(),
            fontFamily: this.fontFamily(),
            fontSize: this.fontSize(),
            strokeWidth: this.strokeWidth(),
            fill: this.fill(),
            stroke: this.stroke(),
            textFill: this.rangeFontColor(),
            cornerRadius: this.cornerRadius(),
        };
    }
    
    public _transform = {k:1, x:0, y:0};
    zoomed(transform) {
        this._transform = transform;
        switch(this.renderMode()){
            case "scale-all": 
                this._zoomScale = transform.k;
                this._zoomTranslate = [transform.x, 0];
                this._zoomG.attr("transform", `translate(${transform.x} ${0})scale(${transform.k} 1)`);
                break;
            default:
                const options = this._rangeOptions;
                const colorIdx = this._color_idx;
                const useColorColumn = colorIdx !== -1;
                this.data().forEach((d, i)=>{
                    if(useColorColumn)options.fill = d[colorIdx];
                    this.renderRangeElement(d, i, true, options);
                });
        }

        this.zoomedHook(transform);
    }

    zoomedHook(transform) {

    }

    private _maxBucket: number = 0;
    private _minRangeWidth: number = Infinity;
    calcBuckets(startKey: string | number, endKey: string | number) {
        const bucketMap = {};
        const tol = this.overlapTolerence();
        const buckets = [{end:-Infinity}];
        this.data().forEach((d, i)=>{
            const rangeWidth = d[endKey] - d[startKey];
            if(this._minRangeWidth > rangeWidth)this._minRangeWidth = rangeWidth;
            for (let i2 = 0; i2 < buckets.length; ++i2) {
                if (i === 0 || buckets[i2][endKey] + tol <= d[startKey]) {
                    bucketMap[i] = i2;
                    if(this._maxBucket < i2)this._maxBucket = i2;
                    buckets[i2][endKey] = d[endKey];
                    break;
                }
            }
            if(bucketMap[i] === undefined){
                bucketMap[i] = buckets.length;
                const b = {};
                b[endKey] = d[endKey];
                buckets.push(b as any);
            }
            
            if(this._maxBucket < bucketMap[i])this._maxBucket = bucketMap[i];
        });
        return bucketMap;
    }

    data(): IGanttData[];
    data(_: IGanttData[]): this;
    data(_?: IGanttData[]): this | IGanttData[] {
        const retVal = super.data.apply(this, arguments);
        if(arguments.length > 0) {
            this._minStart = Math.min(...this.data().map(n=>n[1])) ?? 0;
            this._maxEnd = Math.max(...this.data().map(n=>n[2])) ?? 1;
            this.measureDataText(true);
        }
        return retVal;
    }
    
    protected _textWidths;
    protected _maxFontScale;
    protected _characterWidths;
    protected _prevFontFamily;
    protected _prevFontSize;
    measureDataText(forceMeasure = false) {
        const textWidths = {};
        const characterWidths = {};
        const fontFamily = this.fontFamily();
        const fontSize = this.fontSize();

        if(this._bucketHeight){
            this._maxFontScale = (this._bucketHeight - (this.rangePadding() * 2)) / fontSize;
        }

        if(forceMeasure || this._prevFontFamily !== fontFamily || this._prevFontSize !== fontSize) {
            characterWidths["."] = Utility.textSize(".", fontFamily, fontSize).width;
            this.data().forEach(d=>{
                if(!textWidths[d[0]]){
                    textWidths[d[0]] = Utility.textSize(d[0], fontFamily, fontSize).width;
                }
                d[0].split("").forEach(char=>{
                    if(!characterWidths[char]){
                        characterWidths[char] = Utility.textSize(char, fontFamily, fontSize).width;
                    }
                });
            });
            this._textWidths = textWidths;
            this._characterWidths = characterWidths;
        }
        this._prevFontFamily = fontFamily;
        this._prevFontSize = fontSize;
    }

    truncateText(text, width, scale = 1) {
        const textFits = this._textWidths[text] * scale < width;
        if(textFits){
            return text;
        }
        let ret = "";
        let sum = 0;
        const _width = width - (this._characterWidths["."] * 3);
        for(const char of text){
            sum += this._characterWidths[char];
            if(sum < _width){
                ret += char;
            } else {
                break;
            }
        }
        return _width < 0 ? "" : ret + "...";
    }

    selectionChanged() {
        
    }
    
    highlightItem(_element, d) {
        
    }

    click(row, _col, sel) {
        
    }

    dblclick(row, _col, sel) {
        
    }

    mousein(row, _col, sel) {
    }

    mouseover(row, _col, sel) {
    }

    mouseout(row, _col, sel) {
    }
}
ReactGantt.prototype._class += " timeline_ReactGantt";

export interface ReactGantt {
    titleColumn(): string;
    titleColumn(_: string): this;
    startDateColumn(): string;
    startDateColumn(_: string): this;
    endDateColumn(): string;
    endDateColumn(_: string): this;
    iconColumn(): string;
    iconColumn(_: string): this;
    colorColumn(): string;
    colorColumn(_: string): this;
    overlapTolerence(): number;
    overlapTolerence(_: number): this;
    smallestRangeWidth(): number;
    smallestRangeWidth(_: number): this;
    minBucketHeight(): number;
    minBucketHeight(_: number): this;
    maxBucketHeight(): number;
    maxBucketHeight(_: number): this;
    gutter(): number;
    gutter(_: number): this;
    showToolbar_default(_: boolean): this;
    fontSize(): number;
    fontSize(_: number): this;
    fontFamily(): string;
    fontFamily(_: string): this;
    strokeWidth(): number;
    strokeWidth(_: number): this;
    stroke(): string;
    stroke(_: string): this;
    cornerRadius(): number;
    cornerRadius(_: number): this;
    fill(): string;
    fill(_: string): this;
    rangeFontColor(): string;
    rangeFontColor(_: string): this;
    rangePadding(): number;
    rangePadding(_: number): this;
    renderMode(): "default" | "scale-all";
    renderMode(_: "default" | "scale-all"): this;
    maxZoom(): number;
    maxZoom(_: number): this;
}

ReactGantt.prototype.publish("titleColumn", null, "string", "Column name to for the title");
ReactGantt.prototype.publish("startDateColumn", null, "string", "Column name to for the start date");
ReactGantt.prototype.publish("endDateColumn", null, "string", "Column name to for the end date");
ReactGantt.prototype.publish("iconColumn", null, "string", "Column name to for the icon");
ReactGantt.prototype.publish("colorColumn", null, "string", "Column name to for the color");
ReactGantt.prototype.publish("renderMode", "default", "set", "Render modes vary in features and performance", ["default", "scale-all"]);
ReactGantt.prototype.publish("rangePadding", 3, "number", "Padding within each range rectangle (pixels)");
ReactGantt.prototype.publish("fill", "#1f77b4", "string", "Background color of range rectangle");
ReactGantt.prototype.publish("stroke", null, "string", "Color of range rectangle border");
ReactGantt.prototype.publish("strokeWidth", null, "number", "Width of range rectangle border (pixels)");
ReactGantt.prototype.publish("cornerRadius", 3, "number", "Space between range buckets (pixels)");
ReactGantt.prototype.publish("fontFamily", null, "string", "Font family within range rectangle", null, {optional:true});
ReactGantt.prototype.publish("fontSize", 10, "number", "Size of font within range rectangle (pixels)");
ReactGantt.prototype.publish("rangeFontColor", "#ecf0f1", "html-color", "rangeFontColor");
ReactGantt.prototype.publish("overlapTolerence", 2, "number", "overlapTolerence");
ReactGantt.prototype.publish("smallestRangeWidth", 10, "number", "Width of the shortest range (pixels)");
ReactGantt.prototype.publish("minBucketHeight", 2, "number", "Min height of range element (pixels)");
ReactGantt.prototype.publish("maxBucketHeight", 100, "number", "Max height of range element (pixels)");
ReactGantt.prototype.publish("gutter", 2, "number", "Space between range buckets (pixels)");
ReactGantt.prototype.publish("maxZoom", 16, "number", "Maximum zoom");
