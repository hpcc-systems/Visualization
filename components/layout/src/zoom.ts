import { HPCCSVGElement, attribute, customElement, css, ChangeMap, html, ref, display, WebComponent } from "@hpcc-js/wc-core";
import * as d3 from "d3";

const template = html<HPCCZoomElement>`\
<svg ${ref("_svg")}>
    <foreignObject ${ref("_content")} x="0" y="0" width="100%" height="100%" style="overflow:visible">
        <slot></slot>
    </foreignObject>
</svg>`;

const styles = css`
${display("inline-block")} 
`;

@customElement("hpcc-zoom", { template, styles })
export class HPCCZoomElement extends HPCCSVGElement {
    /**
     * The minimum scale extent that can be applied to the content
     *
     * @defaultValue 0.5
     */
    @attribute({ type: "number" }) scale_min = 0.5;

    /**
     * The maximum scale extent that can be applied to the content
     *
     * @defaultValue 0.5
     */
    @attribute({ type: "number" }) scale_max = 1.5;

    /**
     * The current x-position of the content
     *
     * @defaultValue 0
     */
    @attribute({ type: "number" }) x = 0;

    /**
     * The current y-position of the content
     *
     * @defaultValue 0
     */
    @attribute({ type: "number" }) y = 0;

    /**
     * The current scale of the content
     *
     * @defaultValue 1
     */
    @attribute({ type: "number" }) scale = 1;

    protected svg: d3.Selection<SVGSVGElement, any, any, any>;
    _content: SVGGElement;
    protected content: d3.Selection<SVGGElement, any, any, any>;

    _zoom = d3
        .zoom<SVGSVGElement, unknown>()
        .duration(0)
        .on("zoom", ({ transform }) => {
            this.x = transform.x;
            this.y = transform.y;
            this.scale = transform.k;
            this.$emit("changed");
        });

    constructor() {
        super();
    }

    enter() {
        super.enter();
        this.svg = d3.select(this.shadowRoot! as any).select("svg");
        this.content = this.svg.select("foreignObject");
        this.svg.call(this._zoom, d3.zoomIdentity.translate(this.x, this.y).scale(this.scale));
    }

    update(changes: ChangeMap<this>) {
        super.update(changes);
        this.content
            .attr("width", `${this.clientWidth}`)
            .attr("height", `${this.clientHeight}`)
            ;
        this._zoom
            .extent([
                [0, 0],
                [this.clientWidth, this.clientHeight]
            ])
            .scaleExtent([this.scale_min, this.scale_max]);
        if (changes.x !== undefined || changes.y !== undefined || changes.scale !== undefined) {
            this.content.attr("transform", d3.zoomIdentity.translate(this.x, this.y).scale(this.scale).toString());
            this.$emit("zoom");
        }
        this._zoom.transform(this.svg, d3.zoomIdentity.translate(this.x, this.y).scale(this.scale));
    }
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            ["hpcc-zoom"]: WebComponent<HPCCZoomElement, "changed">;
        }
    }
}
