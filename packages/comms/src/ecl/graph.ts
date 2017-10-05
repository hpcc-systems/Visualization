import { Cache, Graph as Digraph, ISubgraph, scopedLogger, Stack, StateObject, StringAnyMap, XMLNode } from "@hpcc-js/util";
import { WUInfo } from "../services/wsWorkunits";
import { Scope } from "./scope";
import { Timer } from "./timer";
import { Workunit } from "./workunit";

const logger = scopedLogger("ecl/egraph");

export interface ECLGraphEx extends WUInfo.ECLGraph {
    Time: number;
}

export class ECLGraph extends StateObject<ECLGraphEx, ECLGraphEx> implements ECLGraphEx {
    protected wu: Workunit;

    get properties(): ECLGraphEx { return this.get(); }
    get Name(): string { return this.get("Name"); }
    get Label(): string { return this.get("Label"); }
    get Type(): string { return this.get("Type"); }
    get Complete(): boolean { return this.get("Complete"); }
    get WhenStarted(): string { return this.get("WhenStarted"); }
    get WhenFinished(): string { return this.get("WhenFinished"); }
    get Time(): number { return this.get("Time"); }
    get Running(): boolean { return this.get("Running"); }
    get RunningId(): number { return this.get("RunningId"); }
    get Failed(): boolean { return this.get("Failed"); }

    constructor(wu: Workunit, eclGraph: WUInfo.ECLGraph, eclTimers: Timer[]) {
        super();
        this.wu = wu;
        let duration = 0;
        for (const eclTimer of eclTimers) {
            if (eclTimer.GraphName === eclGraph.Name && !eclTimer.HasSubGraphId) {
                duration = Math.round(eclTimer.Seconds * 1000) / 1000;
                break;
            }
        }
        this.set({ Time: duration, ...eclGraph });
    }

    fetchDetails(): Promise<Digraph> {
        return this.wu.fetchDetailsHierarchy({
            Filter: {
                Scopes: {
                    Scope: [this.Name]
                }
            },
            Nested: {
                ScopeTypes: {
                    ScopeType: ["graph", "subgraph", "activity", "edge"]
                }
            }
        }).then((scopes) => {
            const retVal = scopes.map((scope) => createGraph(scope));
            return retVal[0];
        });
    }
}

export class GraphCache extends Cache<WUInfo.ECLGraph, ECLGraph> {
    constructor() {
        super((obj) => {
            return Cache.hash([obj.Name]);
        });
    }
}

type Callback = (tag: string, attributes: StringAnyMap, children: XMLNode[], _stack: XMLNode[]) => void;
function walkXmlJson(node: XMLNode, callback: Callback, stack?: XMLNode[]) {
    stack = stack || [];
    stack.push(node);
    callback(node.name, node.$, node.children(), stack);
    node.children().forEach((childNode) => {
        walkXmlJson(childNode, callback, stack);
    });
    stack.pop();
}

function flattenAtt(nodes: XMLNode[]): StringAnyMap {
    const retVal: StringAnyMap = {};
    nodes.forEach((node: XMLNode) => {
        if (node.name === "att") {
            retVal[node.$["name"]] = node.$["value"];
        }
    });
    return retVal;
}

export function createXGMMLGraph(id: string, graphs: XMLNode): Digraph {
    const graph = new Digraph(id);

    const stack: ISubgraph[] = [graph];
    walkXmlJson(graphs, (tag: string, attributes: StringAnyMap, childNodes: XMLNode[], _stack) => {
        const top = stack[stack.length - 1];
        switch (tag) {
            case "graph":
                break;
            case "node":
                if (childNodes.length && childNodes[0].children().length && childNodes[0].children()[0].name === "graph") {
                    const subgraph = graph.createSubgraph(top, `graph${attributes["id"]}`, flattenAtt(childNodes));
                    stack.push(subgraph);
                } else {
                }
                // TODO:  Is this really a node when its also a subgraph?
                graph.createVertex(top, attributes["id"], attributes["label"], flattenAtt(childNodes));
                break;
            case "edge":
                graph.createEdge(top, attributes["id"], attributes["source"], attributes["target"], flattenAtt(childNodes));
                break;
            default:
        }
    });
    return graph;
}

interface IEdgeRef {
    subgraph: ISubgraph;
    edge: Scope;
}

function createGraph(scope: Scope): Digraph {
    const graph = new Digraph(scope.Id);
    const stack: Stack<ISubgraph> = new Stack<ISubgraph>();
    stack.push(graph);
    const edges: IEdgeRef[] = [];
    scope.walk({
        start: (scope2): boolean => {
            logger.debug(scope2.Id);
            switch (scope2.ScopeType) {
                case "subgraph":
                    stack.push(graph.createSubgraph(stack.top()!, scope2.Id));
                    break;
                case "activity":
                    graph.createVertex(stack.top()!, scope2.Id, scope2.Id);
                    break;
                case "edge":
                    edges.push({ subgraph: stack.top()!, edge: scope2 });
                    break;
                default:
            }
            return false;
        },
        end: (scope2): boolean => {
            switch (scope2.ScopeType) {
                case "subgraph":
                    stack.pop();
                    break;
                default:
            }
            return false;
        }
    });
    edges.forEach(edgeRef => {
        const source = edgeRef.edge.attr("Source").Formatted;
        const target = edgeRef.edge.attr("Target").Formatted;
        if (source && target) {
            try {
                graph.createEdge(edgeRef.subgraph, edgeRef.edge.Id, "a" + source, "a" + target);
            } catch (e) {

            }
        } else {
            logger.debug(`Bad edge:  ${edgeRef.edge.Id}`);
        }
    });

    return graph;
}
