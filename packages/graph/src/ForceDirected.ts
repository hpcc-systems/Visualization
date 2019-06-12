import { SVGWidget } from "@hpcc-js/common";
import { drag as d3Drag } from "d3-drag";
import { forceCenter as d3ForceCenter, forceLink as d3ForceLink, forceManyBody as d3ForceManyBody, forceSimulation as d3ForceSimulation } from "d3-force";
import { event as d3Event, select as d3Select } from "d3-selection";
import { zoom as d3Zoom } from "d3-zoom";

export class ForceDirected extends SVGWidget {
    _g;
    _zoom;
    _drag;
    _container;
    _simulation;
    constructor() {
        super();
    }
    enter(domNode, element) {
        super.enter(domNode, element);
        this._container = element.append("g");
        const context = this;
        this._zoom = d3Zoom()
            .on("zoom", function() {
                context._container.attr("transform", d3Event.transform);
            });
        this._g = element.append("g")
            .attr("class", "zoom_g")
            .call(this._zoom)
            ;
        const size = this.size();
        this._g.append("rect")
            .attr("width", size.width)
            .attr("height", size.height)
            .attr("transform", `translate(${-size.width / 2} ${-size.height / 2})`)
            .style("fill", "none")
            .style("pointer-events", "all")
            ;
        this._drag = d3Drag()
            .on("drag", function (d: any) {
                d3Select(this).attr("cx", d.x = d3Event.x).attr("cy", d.y = d3Event.y);
                context._simulation.alpha(0.1);
                context._simulation.restart();
                context._simulation.tick();
            });
    }
    update(domNode, element) {
        super.update(domNode, element);

        const graph = this.useSampleData() ? this.sampleData(this.sampleDataCount()) : this.transformGraphData(this.data());

        if (graph.nodes.length === 0) {
            if (this._simulation) {
                this._simulation.stop();
            }
        } else {
            this._simulation = d3ForceSimulation()
                .force("link", d3ForceLink().distance(80))
                .force("charge", d3ForceManyBody().strength(-300))
                .force("center", d3ForceCenter(150, 150));
            this._simulation
                .nodes(graph.nodes)
                .on("tick", n => {
                    link.attr("x1", d => d.source.x).attr("y1", d => d.source.y)
                    .attr("x2", d => d.target.x).attr("y2", d => d.target.y);
                    node.attr("cx", d => d.x).attr("cy", d => d.y);
                });
            this._simulation
                .force("link").links(graph.links);
            const link = this.enterLinkElement(graph);
            const node = this.enterNodeElement(graph);
        }
    }

    enterLinkElement(graphData) {
        return this._container.selectAll(".link").data(graphData.links).enter().append("line")
            .style("stroke", "#000").attr("class", "link")
            ;
    }

    enterNodeElement(graphData) {
        return this._container.selectAll(".node").data(graphData.nodes).enter().append("circle")
            .attr("class", "node").style("fill", "#ccc").style("stroke", "#000").attr("r", 10)
            .call(this._drag)
            ;
    }

    transformGraphData(data) {
        if (!data.vertices || !data.edges)return { nodes: [], edges: [] };
        const idxMap = {};
        const nodes = data.vertices.map((n, i) => {
            idxMap[n.id()] = i;
            return {id: i, label: n.text(), icon: n.faChar()};
        });
        const links = data.edges.map(edge => {
            return {
                source: idxMap[edge.sourceVertex().id()],
                target: idxMap[edge.targetVertex().id()]
            };
        });
        return { nodes, links };
    }

    sampleData(n) {
        const nodeCount = n;
        const ncSqrt = Math.ceil(Math.sqrt(nodeCount));
        const ncSqrt2 = Math.ceil(Math.sqrt(ncSqrt));
        const nodes = (Array(nodeCount) as any).fill(1).map((n, i) => {
            return {id: i};
        });

        const links = nodes.reduce((acc, n) => {
            if (n.id > 0) acc.push({ source: n.id, target: n.id - 1 });
            if (n.id > ncSqrt2) acc.push({ source: n.id, target: n.id - ncSqrt2 });
            return acc;
        }, []);

        return { links, nodes };
    }
}
ForceDirected.prototype._class += " graph_ForceDirected";

export interface ForceDirected {
    useSampleData(): boolean;
    useSampleData(_: boolean): this;
    sampleDataCount(): number;
    sampleDataCount(_: number): this;
}
ForceDirected.prototype.publish("sampleDataCount", 100, "number", "Number of nodes in sample data", undefined, { disable: w => !w.useSampleData() });
ForceDirected.prototype.publish("useSampleData", false, "boolean", "Generate sample data");
