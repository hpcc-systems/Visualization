import { Cache, Edge, Graph, StateObject, StringAnyMap, Subgraph, Vertex, XMLNode } from "@hpcc-js/util";
import { WUInfo } from "../services/wsWorkunits";
import { BaseScope } from "./scope";
import { Timer } from "./timer";
import { Workunit } from "./workunit";

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

    fetchDetails(rootID: string, rootType: string): Promise<BaseScope[]> {
        return this.wu.fetchDetails({
            ScopeFilter: {
                MaxDepth: 999999,
                Ids: [rootID],
                ScopeTypes: [rootType]
            },
            NestedFilter: {
                Depth: 999999,
                ScopeTypes: ["graph", "subgraph", "activity", "edge"]
            },
            PropertiesToReturn: {
                AllStatistics: true,
                AllAttributes: true,
                AllHints: true,
                AllProperties: true,
                AllScopes: true
            },
            ScopeOptions: {
                IncludeId: true,
                IncludeScope: true,
                IncludeScopeType: true
            },
            PropertyOptions: {
                IncludeName: true,
                IncludeRawValue: true,
                IncludeFormatted: true,
                IncludeMeasure: true,
                IncludeCreator: false,
                IncludeCreatorType: false
            }
        });
    }

    fetchScopeGraph(subgraphID?: string): Promise<ScopeGraph> {
        if (subgraphID) {
            return this.fetchDetails(subgraphID, "subgraph").then((scopes) => {
                return createGraph(scopes);
            });
        }
        return this.fetchDetails(this.Name, "graph").then((scopes) => {
            return createGraph(scopes);
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

export class XGMMLGraph extends Graph<StringAnyMap, StringAnyMap, StringAnyMap> { }
export class XGMMLSubgraph extends Subgraph<StringAnyMap, StringAnyMap, StringAnyMap> { }
export class XGMMLVertex extends Vertex<StringAnyMap, StringAnyMap, StringAnyMap> { }
export class XGMMLEdge extends Edge<StringAnyMap, StringAnyMap, StringAnyMap> { }

export function createXGMMLGraph(id: string, graphs: XMLNode): XGMMLGraph {
    const subgraphs: { [id: string]: XGMMLSubgraph } = {};
    const vertices: { [id: string]: XGMMLVertex } = {};
    const edges: { [id: string]: XGMMLEdge } = {};

    const graph = new XGMMLGraph((item) => {
        return item._!["id"];
    });

    const stack: XGMMLSubgraph[] = [graph.root];
    walkXmlJson(graphs, (tag: string, attributes: StringAnyMap, childNodes: XMLNode[], _stack) => {
        const top = stack[stack.length - 1];
        switch (tag) {
            case "graph":
                break;
            case "node":
                if (childNodes.length && childNodes[0].children().length && childNodes[0].children()[0].name === "graph") {
                    const subgraph = top.createSubgraph(flattenAtt(childNodes));
                    stack.push(subgraph);
                    subgraphs[attributes["id"]] = subgraph;
                } else {
                }
                // TODO:  Is this really a node when its also a subgraph?
                const vertex = top.createVertex(flattenAtt(childNodes));
                vertices[attributes["id"]] = vertex;
                break;
            case "edge":
                const edge = top.createEdge(vertices[attributes["source"]], vertices[attributes["target"]], flattenAtt(childNodes));
                edges[attributes["id"]] = edge;
                break;
            default:
        }
    });
    return graph;
}

export class ScopeGraph extends Graph<BaseScope, BaseScope, BaseScope> { }
export class ScopeSubgraph extends Subgraph<BaseScope, BaseScope, BaseScope> { }
export class ScopeVertex extends Vertex<BaseScope, BaseScope, BaseScope> { }
export class ScopeEdge extends Edge<BaseScope, BaseScope, BaseScope> { }

function createGraph(scopes: BaseScope[]): ScopeGraph {
    const subgraphs: { [scopeName: string]: ScopeSubgraph } = {};
    const edges: { [scopeName: string]: BaseScope } = {};

    let graph: ScopeGraph | undefined;
    for (const scope of scopes) {
        switch (scope.ScopeType) {
            case "graph":
                graph = new ScopeGraph(item => item._!.Id, scope);
                subgraphs[scope.ScopeName] = graph.root;
                break;
            case "subgraph":
                if (!graph) {
                    graph = new ScopeGraph(item => item._!.Id, scope);
                    subgraphs[scope.ScopeName] = graph.root;
                }
                const scopeStack = scope.parentScope().split(":");
                let scopeParent1 = subgraphs[scope.parentScope()];
                while (scopeStack.length && !scopeParent1) {
                    scopeParent1 = subgraphs[scopeStack.join(":")];
                    scopeStack.pop();
                }
                if (!scopeParent1) {
                    console.log(`Missing SG:Parent (${scope.Id}): ${scope.parentScope()}`);
                } else {
                    const parent1: ScopeSubgraph = scopeParent1;
                    subgraphs[scope.ScopeName] = parent1.createSubgraph(scope);
                }
                break;
            case "activity":
                const scopeParent2 = subgraphs[scope.parentScope()];
                if (!scopeParent2) {
                    console.log(`Missing A:Parent (${scope.Id}): ${scope.parentScope()}`);
                } else {
                    scopeParent2.createVertex(scope);
                }
                break;
            case "edge":
                edges[scope.ScopeName] = scope;
                break;
        }
    }
    for (const id in edges) {
        const scope = edges[id];
        const scopeParent3 = subgraphs[scope.parentScope()];
        if (!scopeParent3) {
            console.log(`Missing E:Parent (${scope.Id}): ${scope.parentScope()}`);
        } else {
            const parent3: ScopeSubgraph = scopeParent3;
            try {
                const source = graph!.vertex(scope.attr("IdSource").RawValue);
                const target = graph!.vertex(scope.attr("IdTarget").RawValue);
                parent3.createEdge(source, target, scope);
            } catch (e) {
                // const sourceIndex = scope.attr("SourceIndex").RawValue;
                // const targetIndex = scope.attr("TargetIndex").RawValue;
                console.log(`Invalid Edge: ${id}`);
            }
        }
    }
    return graph!;
}
