import { Cache, StateObject, scopedLogger, RecursivePartial } from "@hpcc-js/util";
import { format as d3Format } from "d3-format";
import { IConnection, IOptions } from "../connection.ts";
import { EclService, IWsEclRequest, IWsEclResponse, IWsEclResult } from "../services/wsEcl.ts";
import { WorkunitsService, WsWorkunits } from "../services/wsWorkunits.ts";
import { Topology } from "./topology.ts";
import { Workunit, IScope } from "./workunit.ts";
import { QueryGraph } from "./queryGraph.ts";

export { QueryGraph };

const logger = scopedLogger("@hpcc-js/comms/ecl/query.ts");

const siFormatter = d3Format("~s");

function isNumber(n) {
    return !isNaN(parseFloat(n)) && !isNaN(n - 0);
}
export interface QueryEx extends WsWorkunits.WUQueryDetailsResponse {
    BaseUrl: string;
}

class QueryCache extends Cache<QueryEx, Query> {
    constructor() {
        super((obj) => {
            return Cache.hash([obj.QueryId, obj.QuerySet]);
        });
    }
}
const _queries = new QueryCache();

export class Query extends StateObject<QueryEx, QueryEx> implements QueryEx {
    protected wsWorkunitsService: WorkunitsService;
    get BaseUrl() { return this.wsWorkunitsService.baseUrl; }
    protected topology: Topology;
    protected _requestSchema: IWsEclRequest;
    protected _responseSchema: IWsEclResponse;

    get properties(): WsWorkunits.WUQueryDetailsResponse { return this.get(); }
    get Exceptions(): WsWorkunits.Exceptions { return this.get("Exceptions"); }
    get QueryId(): string { return this.get("QueryId"); }
    get QuerySet(): string { return this.get("QuerySet"); }
    get QueryName(): string { return this.get("QueryName"); }
    get Wuid(): string { return this.get("Wuid"); }
    get Dll(): string { return this.get("Dll"); }
    get Suspended(): boolean { return this.get("Suspended"); }
    get Activated(): boolean { return this.get("Activated"); }
    get SuspendedBy(): string { return this.get("SuspendedBy"); }
    get Clusters(): WsWorkunits.Clusters2 { return this.get("Clusters"); }
    get PublishedBy(): string { return this.get("PublishedBy"); }
    get Comment() { return this.get("Comment"); }
    get LogicalFiles(): WsWorkunits.LogicalFiles { return this.get("LogicalFiles"); }
    get SuperFiles(): WsWorkunits.SuperFiles { return this.get("SuperFiles"); }
    get IsLibrary(): boolean { return this.get("IsLibrary"); }
    get Priority(): string { return this.get("Priority"); }
    get WUSnapShot(): string { return this.get("WUSnapShot"); }
    get CompileTime(): string { return this.get("CompileTime"); }
    get LibrariesUsed(): WsWorkunits.LibrariesUsed { return this.get("LibrariesUsed"); }
    get CountGraphs(): number { return this.get("CountGraphs"); }
    get ResourceURLCount(): number { return this.get("ResourceURLCount"); }
    get WsEclAddresses(): WsWorkunits.WsEclAddresses { return this.get("WsEclAddresses"); }
    get WUGraphs(): WsWorkunits.WUGraphs { return this.get("WUGraphs"); }
    get WUTimers(): WsWorkunits.WUTimers { return this.get("WUTimers"); }
    get PriorityID(): number { return this.get("PriorityID"); }

    private constructor(optsConnection: IOptions | IConnection | WorkunitsService, querySet: string, queryID: string, queryDetails?: WsWorkunits.WUQueryDetailsResponse) {
        super();
        if (optsConnection instanceof WorkunitsService) {
            this.wsWorkunitsService = optsConnection;
        } else {
            this.wsWorkunitsService = new WorkunitsService(optsConnection);
        }
        this.topology = Topology.attach(this.wsWorkunitsService.opts());
        this.set({
            QuerySet: querySet,
            QueryId: queryID,
            ...queryDetails
        } as QueryEx);
    }

    static attach(optsConnection: IOptions | IConnection, querySet: string, queryId: string, state?: QueryEx): Query {
        const retVal: Query = _queries.get({ BaseUrl: optsConnection.baseUrl, QuerySet: querySet, QueryId: queryId } as QueryEx, () => {
            return new Query(optsConnection, querySet, queryId);
        });
        if (state) {
            retVal.set(state);
        }
        return retVal;
    }

    private _eclService: Promise<EclService>;
    protected async wsEclService(): Promise<EclService | undefined> {
        if (!this._eclService) {
            this._eclService = this.topology.fetchServices({}).then(services => {
                for (const espServer of services?.TpEspServers?.TpEspServer ?? []) {
                    for (const binding of espServer?.TpBindings?.TpBinding ?? []) {
                        if (binding?.Service === "ws_ecl") {
                            const baseUrl = `${binding.Protocol}://${globalThis.location.hostname}:${binding.Port}`;
                            return new EclService({ baseUrl });
                        }
                    }
                }
                return undefined;
            });
        }
        return this._eclService;
    }

    private async fetchDetails(): Promise<void> {
        const queryDetails = await this.wsWorkunitsService.WUQueryDetails({
            QuerySet: this.QuerySet,
            QueryId: this.QueryId,
            IncludeStateOnClusters: true,
            IncludeSuperFiles: true,
            IncludeWsEclAddresses: true,
            CheckAllNodes: false
        });
        this.set({ ...queryDetails } as QueryEx);
    }

    private async fetchRequestSchema(): Promise<void> {
        const wsEclService = await this.wsEclService();
        try {
            this._requestSchema = await wsEclService?.requestJson(this.QuerySet, this.QueryId) ?? [];
        } catch (e: any) {
            //  See:  https://track.hpccsystems.com/browse/HPCC-29827
            logger.debug(e.message ?? e);
            this._requestSchema = [];
        }
    }

    private async fetchResponseSchema(): Promise<void> {
        const wsEclService = await this.wsEclService();
        try {
            this._responseSchema = await wsEclService?.responseJson(this.QuerySet, this.QueryId) ?? {};
        } catch (e: any) {
            //  See:  https://track.hpccsystems.com/browse/HPCC-29827
            logger.debug(e.message ?? e);
            this._responseSchema = {};
        }
    }

    private async fetchSchema(): Promise<void> {
        await Promise.all([this.fetchRequestSchema(), this.fetchResponseSchema()]);
    }

    fetchSummaryStats() {
        return this.wsWorkunitsService.WUQueryGetSummaryStats({ Target: this.QuerySet, QueryId: this.QueryId });
    }

    fetchGraph(GraphName: string = "", SubGraphId: string = ""): Promise<QueryGraph> {
        return this.wsWorkunitsService.WUQueryGetGraph({ Target: this.QuerySet, QueryId: this.QueryId, GraphName, SubGraphId }).then(response => {
            const graph = new QueryGraph();
            let first = true;
            for (const graphItem of response?.Graphs?.ECLGraphEx || []) {
                if (first) {
                    graph.load(graphItem.Graph);
                    first = false;
                } else {
                    graph.merge(graphItem.Graph);
                }
            }
            return graph;
        });
    }

    fetchDetailsNormalized(request: RecursivePartial<WsWorkunits.WUDetails> = {}): Promise<{ meta: WsWorkunits.WUDetailsMetaResponse | undefined, columns: { [id: string]: any } | undefined, data: IScope[] | undefined }> {
        const wu = Workunit.attach(this.wsWorkunitsService, this.Wuid);
        if (wu) {
            return Promise.all([this.fetchGraph(), wu.fetchDetailsMeta(), wu.fetchDetailsRaw(request)]).then(promises => {
                const graph = promises[0];
                const meta = promises[1];
                const metrics: WsWorkunits.Scope[] = promises[2];
                const data = metrics.map(metric => {
                    const firstChar = metric.Id[0];
                    if (firstChar === "a" || firstChar === "e") {
                        const item = graph.idx[metric.Id.substring(1)];
                        if (!item) {
                            logger.debug(`Missing graph data for metric ID: ${metric.Id}`);
                            return metric;
                        }
                        const existingProperties = new Set(metric.Properties.Property.map(prop => prop.Name));
                        const newProperties: WsWorkunits.Property[] = [];
                        for (const key in item) {
                            const firstCharOfKey = key.charAt(0);
                            if (firstCharOfKey !== "_" &&
                                firstCharOfKey === firstCharOfKey.toUpperCase() &&
                                !existingProperties.has(key)) {
                                const value = item[key];
                                const valueType = typeof value;
                                if (valueType === "string" || valueType === "number" || valueType === "boolean") {
                                    const isNum = isNumber(value);
                                    let rawValue = isNum ? parseFloat(value as string) : value;
                                    let formatted = value;
                                    if (key.indexOf("Time") >= 0) {
                                        rawValue = (rawValue as number) / 1000000000;
                                        formatted = siFormatter(rawValue) + "s";
                                    }
                                    newProperties.push({
                                        Name: key,
                                        RawValue: rawValue as any,
                                        Formatted: formatted
                                    } as WsWorkunits.Property);
                                }
                            }
                        }
                        if (newProperties.length > 0) {
                            metric.Properties.Property.push(...newProperties);
                        }
                    }
                    return metric;
                });
                return wu.normalizeDetails(meta, data);
            });
        }
        return Promise.resolve({ meta: undefined, columns: undefined, data: undefined });
    }

    async submit(request: object): Promise<Array<{ [key: string]: object[] }>> {
        const wsEclService = await this.wsEclService();
        try {
            return wsEclService?.submit(this.QuerySet, this.QueryId, request).then(results => {
                for (const key in results) {
                    results[key] = results[key].Row;
                }
                return results;
            }) ?? [];
        } catch (e: any) {
            //  See:  https://track.hpccsystems.com/browse/HPCC-29827
            logger.debug(e.message ?? e);
            return [];
        }
    }

    async refresh(): Promise<this> {
        await Promise.all([
            this.fetchDetails(),
            this.fetchSchema()
        ]);
        return this;
    }

    requestFields(): IWsEclRequest {
        if (!this._requestSchema) return [];
        return this._requestSchema;
    }

    responseFields(): IWsEclResponse {
        if (!this._responseSchema) return {};
        return this._responseSchema;
    }

    resultNames(): string[] {
        const retVal: string[] = [];
        for (const key in this.responseFields()) {
            retVal.push(key);
        }
        return retVal;
    }

    resultFields(resultName: string): IWsEclResult {
        if (!this._responseSchema[resultName]) return [];
        return this._responseSchema[resultName];
    }
}
